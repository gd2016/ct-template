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
          console.log(this)
            if (v1 || v2) {
                return options.fn(this);
            }

            return options.inverse(this);
        },
        each_item: function(count, operation, options) {
            console.log(this,count,operation);
            var _count, _operation,str = '';

            if (this.same){                 // 如果编辑项与添加项相同
                if (operation === 'edit_'){   // 如果当前循环的是编辑则把添加项的输入赋给编辑
                    _operation = 'add_';
                    _count = this.addCount;
                } 
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
            message:"set your first item info (field label type)"
        },
        search_1:{
            when:"operation.search && searchCount>1",
            type:"input",
            message:"set your second item info (field label type)"
        },
        search_2:{
            when:"operation.search && searchCount>2",
            type:"input",
            message:"set your third item info (field label type)"
        },
        search_3:{
            when:"operation.search && searchCount>3",
            type:"input",
            message:"set your fourth item info (field label type)"
        },
        search_4:{
            when:"operation.search && searchCount>4",
            type:"input",
            message:"set your five item info (field label type)"
        },
        addCount:{
            when:"operation.add",
            type:"list",
            message :"how many add items?",
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
        add_0:{
            when:"operation.add && addCount",
            type:"input",
            message:"set your first item info (field label type)"
        },
        add_1:{
            when:"operation.add && addCount>1",
            type:"input",
            message:"set your second item info (field label type)"
        },
        add_2:{
            when:"operation.add && addCount>2",
            type:"input",
            message:"set your third item info (field label type)"
        },
        add_3:{
            when:"operation.add && addCount>3",
            type:"input",
            message:"set your fourth item info (field label type)"
        },
        add_4:{
            when:"operation.add && addCount>4",
            type:"input",
            message:"set your five item info (field label type)"
        },
        same:{
            when:"operation.add && operation.edit",
            type:"confirm",
            message :"whethere or not the same to edit item?"
        },
        editCount:{
            when:"operation.edit",
            type:"list",
            message :"how many edit items?",
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
        edit_0:{
            when:"operation.edit && editCount",
            type:"input",
            message:"set your first item info (field label type)"
        },
        edit_1:{
            when:"operation.edit && editCount>1",
            type:"input",
            message:"set your second item info (field label type)"
        },
        edit_2:{
            when:"operation.edit && editCount>2",
            type:"input",
            message:"set your third item info (field label type)"
        },
        edit_3:{
            when:"operation.edit && editCount>3",
            type:"input",
            message:"set your fourth item info (field label type)"
        },
        edit_4:{
            when:"operation.edit && editCount>4",
            type:"input",
            message:"set your five item info (field label type)"
        },
        viewCount:{
            when:"operation.view",
            type:"list",
            message :"how many view items?",
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
        view_0:{
            when:"operation.view && viewCount",
            type:"input",
            message:"set your first item info (field label)"
        },
        view_1:{
            when:"operation.view && viewCount>1",
            type:"input",
            message:"set your second item info (field label)"
        },
        view_2:{
            when:"operation.view && viewCount>2",
            type:"input",
            message:"set your third item info (field label)"
        },
        view_3:{
            when:"operation.view && viewCount>3",
            type:"input",
            message:"set your fourth item info (field label)"
        },
        view_4:{
            when:"operation.view && viewCount>4",
            type:"input",
            message:"set your five item info (field label)"
        }
        // ,
        // "build": {
        //     "type": "list",
        //     "message": "Vue build",
        //     "choices": [
        //         {
        //             "name": "Runtime + Compiler: recommended for most users",
        //             "value": "standalone",
        //             "short": "standalone"
        //         },
        //         {
        //             "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
        //             "value": "runtime",
        //             "short": "runtime"
        //         }
        //     ]
        // },
        // "autoInstall": {
        //     type: 'confirm',
        //     message: 'Should we run `npm install` for you after the project has been created? (recommended)'
        // }
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
