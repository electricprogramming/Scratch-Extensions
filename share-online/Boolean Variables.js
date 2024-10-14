// Name: Boolean Variables
// ID: booleanvariables
// Description: Creates blocks dealing with boolean variables which store either true or false and can be accessed by typing their names.
// By: ElectricProgramming <link>
(function (Scratch) {
  "use strict";
  const bool_vars = new Map();
  let keys = [];
  class BooleanVariables {
    getInfo() {
      return {
        id: "booleanvariables",
        name: "Boolean Variables",
        blocks: [
          {
            opcode: "set_boolean_variable",
            blockType: Scratch.BlockType.COMMAND,
            text: "set boolean variable named [NAME] to [VALUE]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable"
              },
              VALUE: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false
              }
            }
          },
          {
            opcode: "delete_all_boolean_variables",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all boolean variables"
          },
          {
            opcode: "delete_all_boolean_variables_set_to",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all boolean variables set to [VALUE]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false
              }
            }
          },
          {
            opcode: "delete_boolean_variable",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete boolean variable named [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable"
              }
            }
          },
          {
            opcode: "get_boolean_variable",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "get boolean variable named [NAME]",
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable"
              }
            }
          },
          {
            opcode: "boolean_variable_exists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "boolean variable named [NAME] exists?",
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable"
              }
            }
          },
          {
            opcode: "get_all_bool_vars",
            blockType: Scratch.BlockType.REPORTER,
            text: "all boolean variable names",
            disableMonitor: true,
          },
          { blockType: Scratch.BlockType.LABEL, text: "This can be put in the boolean inputs" },
          { blockType: Scratch.BlockType.LABEL, text: "of any other blocks" },
          {
            opcode: "menu_bool",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[MENU]",
            disableMonitor: true,
            arguments: {
              MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "bool_menu",
              }
            },
          }
        ],
        menus: {
          bool_menu: {
            items: ["true","false","random"],
            acceptReporters: false
          }
        },   
      };
    }

    boolean_variable_exists({ NAME }) {
      return bool_vars.has(NAME);
    }

    delete_all_boolean_variables() {
      bool_vars.clear();
    }

    delete_all_boolean_variables_set_to({ VALUE }) {
      bool_vars.forEach((value,key) => {
        if (value == VALUE) {
        bool_vars.delete(key)
        }
      });
    }

    delete_boolean_variable({ NAME }) {
      bool_vars.delete(NAME)
    }

    get_boolean_variable({ NAME }) {
      if (bool_vars.has(NAME)) {
        return bool_vars.get(NAME);
      } else {
        return false;
      };
    }

    set_boolean_variable({ NAME, VALUE }) {
      bool_vars.set(NAME,VALUE)
    }
    
    get_all_bool_vars() {
      keys.length = 0;
      for (const key of bool_vars.keys()) {
      keys.push(key);
      }
      return(JSON.stringify(keys));
    }

    menu_bool({MENU}) {
      switch(MENU){
        case "true":
          return true;
          break;
        case "false":
          return false;
          break;
        case "random":
          return Math.random() >= 0.5;
          break;
      }
    }
  }

  Scratch.extensions.register(new BooleanVariables());
})(Scratch);
