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
        each_item: function (count, operation, options) {
            var str='';
            for (let index = 0; index < count; index++) {
                const info = this[operation+index];
                const field = info.split(" ")[0];
                const label = info.split(" ")[1];
                const type = info.split(" ")[2];
                str+=options.fn(this,{data:{field:field,label:label,type:type}});
            }
            return str;
        },
        if_is: function (v1, v2, options) {
            if(v1===v2){
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
            when:"searchItems",
            type:"input",
            message:"set your first item info (field label type)"
        },
        search_1:{
            when:"searchItems>1",
            type:"input",
            message:"set your second item info (field label type)"
        },
        search_2:{
            when:"searchItems>2",
            type:"input",
            message:"set your third item info (field label type)"
        },
        search_3:{
            when:"searchItems>3",
            type:"input",
            message:"set your fourth item info (field label type)"
        },
        search_4:{
            when:"searchItems>4",
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
            when:"addItems",
            type:"input",
            message:"set your first item info (field label type)"
        },
        add_1:{
            when:"addItems>1",
            type:"input",
            message:"set your second item info (field label type)"
        },
        add_2:{
            when:"addItems>2",
            type:"input",
            message:"set your third item info (field label type)"
        },
        add_3:{
            when:"addItems>3",
            type:"input",
            message:"set your fourth item info (field label type)"
        },
        add_4:{
            when:"addItems>4",
            type:"input",
            message:"set your five item info (field label type)"
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
            when:"editItems",
            type:"input",
            message:"set your first item info (field label type)"
        },
        edit_1:{
            when:"editItems>1",
            type:"input",
            message:"set your second item info (field label type)"
        },
        edit_2:{
            when:"editItems>2",
            type:"input",
            message:"set your third item info (field label type)"
        },
        edit_3:{
            when:"editItems>3",
            type:"input",
            message:"set your fourth item info (field label type)"
        },
        edit_4:{
            when:"editItems>4",
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
            when:"viewItems",
            type:"input",
            message:"set your first item info (field label type)"
        },
        view_1:{
            when:"viewItems>1",
            type:"input",
            message:"set your second item info (field label type)"
        },
        view_2:{
            when:"viewItems>2",
            type:"input",
            message:"set your third item info (field label type)"
        },
        view_3:{
            when:"viewItems>3",
            type:"input",
            message:"set your fourth item info (field label type)"
        },
        view_4:{
            when:"viewItems>4",
            type:"input",
            message:"set your five item info (field label type)"
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
