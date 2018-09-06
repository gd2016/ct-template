const path = require('path')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')

function getLableArr(info){
    var arr = info.split('//');
    var labelArr = [];
    for (let i = 1; i < arr.length; i++) {
        labelArr.push(arr[i].replace(/(^\s*)|\s[\s\S]*/g,''));
    }
    return labelArr;
}

function jsonFormat(info){
    var jsonReg = /(\\)|\/\/.*$/mg;
    return JSON.parse(info.replace(jsonReg,''));
}

function getSearchType(json, fieldArr, i){
    var value = json[fieldArr[i]];
    if(value===1234567890) return 'dates';
    else if(value===123456789) return 'date';
    else if(value<5) return 'select';
    else if(typeof value === 'number') return 'number';
    else if(value==='autoComplete') return 'autoComplete';
    else return 'text';
}

function getColumnType(json, fieldArr, i){
    var value = json[fieldArr[i]];
    if(value===123456789) return 'date';
    else if(value<5) return 'select';
}

function getHandleType(json, fieldArr, i){
    var value = json[fieldArr[i]];
    if(value===1234567890) return 'dates';
    else if(value===123456789) return 'date';
    else if(value===3) return 'select';
    else if(value==='autoComplete') return 'autoComplete';
    else if(value===1||value[0]===1) return 'checkbox';
    else if(value===2) return 'radio';
    else if(value==='说明' || value==='备注') return 'textarea';
    else if(typeof value === 'object') return 'custom';
    else return 'text';
}

module.exports = {
    helpers: {
        if_or: function (v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        each_search: function(info, options) {
            var labelArr = getLableArr(info);
            var json = jsonFormat(info);
            var fieldArr = Object.keys(json);
            var template = "";
            for (let i = 0; i < labelArr.length; i++) {
                template += options.fn(this,{data: {type:getSearchType(json,fieldArr,i), label:labelArr[i], field:fieldArr[i]}})
            }
            return template;
        },
        each_column: function(info, options) {
            var json = jsonFormat(info).Data.List[0];
            var labelArr = getLableArr(info);
            var fieldArr = Object.keys(json);
            var template = "";
            for (let i = 0; i < labelArr.length; i++) {
                template += options.fn(this,{data: {type:getColumnType(json,fieldArr,i), label:labelArr[i], field:fieldArr[i]}})
            }
            return template;
        },
        each_handle: function(info, options){
            var json = jsonFormat(info);
            var labelArr = getLableArr(info);
            var fieldArr = Object.keys(json);
            var template = "";
            for (let i = 0; i < labelArr.length; i++) {
                template += options.fn(this,{data: {index:i, length:labelArr.length-1, type:getHandleType(json,fieldArr,i), label:labelArr[i], field:fieldArr[i]}})
            }
            return template;
        },
        each_view: function(info, options){
            var json = jsonFormat(info);
            var labelArr = getLableArr(info);
            var fieldArr = Object.keys(json.Data);
            var template = "";
            for (let i = 0; i < labelArr.length; i++) {
                template += options.fn(this,{data: {label:labelArr[i], field:fieldArr[i]}})
            }
            return template;
        },
        if_is: function (v1, v2, options) {
            if(v1==v2){
                return options.fn(this);
            }
            return options.inverse(this);
        },
        if_and: function (v1, v2, options) {
              if(v1 && v2){
                  return options.fn(this);
              }
              return options.inverse(this);
        },
        if_nothandle: function (v1, v2, options) {
            if(!v1 && v2){
                return options.fn(this);
            }
            return options.inverse(this);
        }
    },
    prompts: {
        name: {
            type: "string",
            required: true,
            message: 'project name'
        },
        description: {
            type: "string",
            required: false,
            message: "Project description",
            default: "A Vue.js project"
        },
        author: {
            type: "string",
            message: "Author"
        },
        operation: {
            type: "checkbox",
            message: 'What content are included ？',
            choices: [
                {
                    name: "1) table",
                    value: "table",
                    checked: true
                },
                {
                    name: "2) add operation",
                    value: "add"
                },
                {
                    name: "3) delete operation",
                    value: "delete"
                },
                {
                    name: "4) edit operation",
                    value: "edit"
                },
                {
                    name: "5) search operation",
                    value: "search"
                },
                {
                    name: "6) view operation",
                    value: "view"
                },
                {
                    name: "7) export",
                    value: "export"
                }
                // {
                //     name: "7) more operation",
                //     value: "more"
                // }
            ]
        },
        more: {
            when: "operation.more",
            type: "checkbox",
            message: 'What content are included ？',
            choices: [
                {
                    name: "1) slideout",
                    value: "slideout"
                },
                {
                    name: "2) popup",
                    value: "popup"
                },
                {
                    name: "3) child page",
                    value: "page"
                }
            ]
        },
        ishandle:{
            when:"operation.add && operation.edit",
            type:"confirm",
            message :"Is adding and editing the same file?"
        },
        tableInfo:{
            type:"editor",
            message :"table column info?",
            validate: function(val) {
                try {
                    if(!jsonFormat(val).Data.List[0]){
                        return "数据格式错误！";
                    }
                } catch (error) {
                    return "数据格式错误！";
                }
                return true;
            }
        },
        handleInfo:{
            when:'operation.add && operation.edit && ishandle',
            type:"editor",
            message :"add and edit items info?",
            validate: function(val) {
                try {
                    if(!jsonFormat(val)){
                        return "数据格式错误！";
                    }
                } catch (error) {
                    return "数据格式错误！";
                }
                return true;
            }
        },
        searchInfo:{
            when:"operation.search",
            type:"editor",
            message :"search items info?",
            validate: function(val) {
                try {
                    if(!jsonFormat(val)){
                        return "数据格式错误！";
                    }
                } catch (error) {
                    return "数据格式错误！";
                }
                return true;
            }
        },
        addInfo:{
            when:"operation.add && (!operation.edit || operation.edit && !ishandle)",
            type:"editor",
            message :"add items info?",
            validate: function(val) {
                try {
                    if(!jsonFormat(val)){
                        return "数据格式错误！";
                    }
                } catch (error) {
                    return "数据格式错误！";
                }
                return true;
            }
        },
        editInfo:{
            when:"operation.edit && (!operation.add || operation.add && !ishandle)",
            type:"editor",
            message :"edit items info?",
            validate: function(val) {
                try {
                    if(!jsonFormat(val)){
                        return "数据格式错误！";
                    }
                } catch (error) {
                    return "数据格式错误！";
                }
                return true;
            }
        },
        viewInfo:{
            when:"operation.view",
            type:"editor",
            message :"view items info?",
            validate: function(val) {
                try {
                    if(!jsonFormat(val)){
                        return "数据格式错误！";
                    }
                } catch (error) {
                    return "数据格式错误！";
                }
                return true;
            }
        },
        build: {
            "type": "list",
            "message": "Vue build",
            "choices": [
                {
                    "name": "Runtime + Compiler: recommended for most users",
                    "value": "standalone",
                    "short": "standalone"
                },
                {
                    "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
                    "value": "runtime",
                    "short": "runtime"
                }
            ]
        },
        autoInstall: {
            type: 'confirm',
            message: 'Should we run `npm install` for you after the project has been created? (recommended)'
        }
    },
    filters: {
        "src/js/app/main/component/slideout.vue": "operation.more && more.slideout",
        "src/js/app/main/component/handle.vue": "operation.add && operation.edit && ishandle",
        "src/js/app/main/component/search.vue": "operation.search",
        "src/js/module/component/exportBtn.vue": "operation.export",
        "src/js/app/main/component/add.vue": "operation.add && (!operation.edit || operation.edit && !ishandle)",
        "src/js/app/main/component/edit.vue":"operation.edit && (!operation.add || operation.add && !ishandle)",
        "src/js/app/main/component/view.vue":"operation.view"
    },
    complete: function(data, { chalk }) {
        const green = chalk.green
    
        sortDependencies(data, green)
    
        const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)
    
        if (data.autoInstall) {
          installDependencies(cwd, 'npm', green)
            .then(() => {
              return runLintFix(cwd, data, green)
            })
            .then(() => {
              printMessage(data, green)
            })
            .catch(e => {
              console.log(chalk.red('Error:'), e)
            })
        } else {
          printMessage(data, chalk)
        }
      }
};
