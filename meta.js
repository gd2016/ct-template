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
          console.log(v1,v2,options);
            if (v1 || v2) {
                return options.fn(this);
            }

            return options.inverse(this);
        },
        "foreach": function (v1, options) {
            var templates=null;
            for(var i =0;i<v1;i++){
              templates+=options.fn(this);
            }
            return templates;
        }
    },
    "prompts": {
        "projectType": {
            "type": "list",
            "message": "project type",
            "choices": [
                {
                    "name": "business: for business",
            
