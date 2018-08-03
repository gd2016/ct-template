const path = require('path')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')

module.exports = {
    "helpers": {
        "if_or": function (v1, v2, options) {
          console.log(this)
            if (v1 || v2) {
                return options.fn(this);
            }

            return options.inverse(this);
        },
        "search_item": function (v1, options) {
            console.log(options.fn(this));
            var str='';
            for (let index = 1; index < v1; index++) {
                str+='<form-item v-model="searchInfo.Id" type="'+this["searchItem"+index]+'" label="搜索项"></form-item>'+options.fn(this);
            }
            
            return str;
        },
        "if_is": function (v1, v2, options) {
            if(v1===v2){
                return options.fn(this);
            }
            return options.inverse(this);
        },
        "if_and": function (v1, v2, options) {
              if(v1 && v2){
                  return options.fn(this);
              }
              return options.inverse(this);
        }
    },
    "prompts": {
        "projectType": {
            "type": "list",
            "message": "project type",
            "choices": [
                {
                    "name": "business: for business",
                    "value": "business",
                    "short": "business"
                },
                {
                    "name": "component: for component",
                    "value": "component",
                    "short": "component"
                }
            ]
        },
        "check": {
            "type": "checkbox",
            "message": 'check name',
            "choices": [
                {
                    "name": "firstName",
                    "value": "firstValue",
                    "short": "firstShort"
                },
                {
                    "name": "secondName",
                    "value": "secondName",
                    "short": "secondName"
                },
                {
                    "name": "thirdName",
                    "value": "thirdName",
                    "short": "thirdName"
                }
            ]
        },
        "name": {
            "type": "string",
            "required": true,
            "message": 'project name'
        },
        "description": {
            "type": "string",
            "required": false,
            "message": "Project description",
            "default": "A Vue.js project"
        },
        "author": {
            "type": "string",
            "message": "Author"
        },
        "build": {
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
        "searchOperation":{
            "type":"confirm",
            "message" :"has search operation?"
        },
        "searchItems":{
            "when":"searchOperation",
            "type":"string",
            "message" :"how many search items?"
        },
        "search_first":{
            "when":"searchItems",
            "type":"rawlist",
            "message":"choose your first item type",
            "choices": [
                {
                    "name": "text",
                    "value": "text",
                    "short": "text"
                },
                {
                    "name": "select",
                    "value": "select",
                    "short": "select"
                },
                {
                    "name": "dates",
                    "value": "dates",
                    "short": "dates"
                },
                {
                    "name": "date",
                    "value": "date",
                    "short": "date"
                },
                {
                    "name": "autoComplete",
                    "value": "autoComplete",
                    "short": "autoComplete"
                }
            ]
        },
        "search_second":{
            "when":"searchItems>1",
            "type":"list",
            "message":"choose your second item type",
            "choices": [
                {
                    "name": "text",
                    "value": "text",
                    "short": "text"
                },
                {
                    "name": "select",
                    "value": "select",
                    "short": "select"
                },
                {
                    "name": "dates",
                    "value": "dates",
                    "short": "dates"
                },
                {
                    "name": "date",
                    "value": "date",
                    "short": "date"
                },
                {
                    "name": "autoComplete",
                    "value": "autoComplete",
                    "short": "autoComplete"
                }
            ]
        },
        "search_third":{
            "when":"searchItems>2",
            "type":"list",
            "message":"choose your third item type",
            "choices": [
                {
                    "name": "text",
                    "value": "text",
                    "short": "text"
                },
                {
                    "name": "select",
                    "value": "select",
                    "short": "select"
                },
                {
                    "name": "dates",
                    "value": "dates",
                    "short": "dates"
                },
                {
                    "name": "date",
                    "value": "date",
                    "short": "date"
                },
                {
                    "name": "autoComplete",
                    "value": "autoComplete",
                    "short": "autoComplete"
                }
            ]
        },
        "search_fourth":{
            "when":"searchItems>3",
            "type":"list",
            "message":"choose your fourth item type",
            "choices": [
                {
                    "name": "text",
                    "value": "text",
                    "short": "text"
                },
                {
                    "name": "select",
                    "value": "select",
                    "short": "select"
                },
                {
                    "name": "dates",
                    "value": "dates",
                    "short": "dates"
                },
                {
                    "name": "date",
                    "value": "date",
                    "short": "date"
                },
                {
                    "name": "autoComplete",
                    "value": "autoComplete",
                    "short": "autoComplete"
                }
            ]
        },
        "addOperation":{
            "type":"confirm",
            "message" :"has add operation?"
        },
        "editOperation":{
            "type":"confirm",
            "message" :"has edit operation?"
        },
        "viewOperation":{
            "type":"confirm",
            "message" :"has view operation?"
        },
        "autoInstall": {
            type: 'confirm',
            message: 'Should we run `npm install` for you after the project has been created? (recommended)'
        }
    },
    "filters": {
        "build/webpack.umd.conf.js": "projectType === 'component'",
        "src/component/**/*": "projectType === 'component'",
        "src/js/module/**/*": "projectType === 'business'",
        "src/css/**/*": "projectType === 'business'",
        "src/js/app/main/component/add.vue": "addOperation",
        "src/js/app/main/component/edit.vue":"editOperation",
        "src/js/app/main/component/btn.vue":"editOperation || viewOperation",
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
