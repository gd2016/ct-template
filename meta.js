const path = require('path')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')

module.exports = {
    helpers: {
        if_or: function (v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this);
            }

            return options.inverse(this);
        },
        each_item: function(count, operation, options) {
            console.log(JSON.parse(this.addMessage.replace(/\\/g,"")));
            var _count, _operation,str = '';

            if (this.same && operation === 'edit_'){ // 如果编辑项与添加项相同
              _operation = 'add_';
              _count = this.addCount;
            } else {
                _count = count;
                _operation = operation;
            }

            for (let index = 0; index < _count; index++) {
                const info = this[_operation + index];
                const field = info.split(' ')[0];
                const label = info.split(' ')[1];

                if (_operation !== 'view_'){   //查看功能只有label和value  需要区分
                    const type = info.split(' ')[2];

                    str += options.fn(this, {data: {field: field, label: label, type: type}});
                } else {
                    str += options.fn(this, {data: {field: field, label: label}});
                }
            }
            return str;
        },
        forin: function(count, options){
            var str = '';
            for (let index = 0; index < count; index++) {
                str+=options.fn(this);
            }
            return str;
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
            message: 'What operations are included ？',
            choices: [
                {
                    name: "1) add operation",
                    value: "add"
                },
                {
                    name: "2) edit operation",
                    value: "edit"
                },
                {
                    name: "3) search operation",
                    value: "search"
                },
                {
                    name: "4) view operation",
                    value: "view"
                }
            ]
        },
        searchCount:{
            when:"operation.search",
            type:"list",
            message :"how many search items?",
            choices: [
                {
                    name: "1) 1",
                    value: "1"
                },
                {
                    name: "2) 2",
                    value: "2"
                },
                {
                    name: "3) 3",
                    value: "3"
                },
                {
                    name: "4) 4",
                    value: "4"
                },
                {
                    name: "5) 5",
                    value: "5"
                }
            ]
        },
        search_0:{
            when:"operation.search && searchCount",
            type:"input",
            message:"first item info (field label type:text/select/date/dates/autoComplete)"
        },
        search_1:{
            when:"operation.search && searchCount>1",
            type:"input",
            message:"second item info (field label type:text/select/date/dates/autoComplete)"
        },
        search_2:{
            when:"operation.search && searchCount>2",
            type:"input",
            message:"third item info (field label type:text/select/date/dates/autoComplete)"
        },
        search_3:{
            when:"operation.search && searchCount>3",
            type:"input",
            message:"fourth item info (field label type:text/select/date/dates/autoComplete)"
        },
        search_4:{
            when:"operation.search && searchCount>4",
            type:"input",
            message:"fifth item info (field label type:text/select/date/dates/autoComplete)"
        },
        addMessage:{
            when:"operation.add",
            type:"editor",
            message :"add items info?"
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
        "src/js/app/main/component/add.vue": "operation.add",
        "src/js/app/main/component/edit.vue":"operation.edit",
        "src/js/app/main/component/btn.vue":"operation.edit || operation.view",
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
