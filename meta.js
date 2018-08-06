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
        search_item: function (v1, options) {
            var str='';
            for (let index = 0; index < v1; index++) {
                const info = this["seaarch_"+index];
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
//         "name": {
//             "type": "string",
//             "required": true,
//             "message": 'project name'
//         },
//         "description": {
//             "type": "string",
//             "required": false,
//             "message": "Project description",
//             "default": "A Vue.js project"
//         },
//         "author": {
//             "type": "string",
//             "message": "Author"
//         },
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
        searchItems:{
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
