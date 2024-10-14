(function (Scratch) {
  "use strict";
  class EnhancedMap {
    constructor(entries = []) {
        this.map = new Map(entries);
    }

    // Add or update a key-value pair
    set(key, value) {
        this.map.set(key, value);
    }

    // Get the value for a key
    get(key) {
        return this.map.get(key);
    }

    // Check if a key exists
    has(key) {
        return this.map.has(key);
    }

    // Remove a key-value pair by key
    delete(key) {
        return this.map.delete(key);
    }

    // Remove all key-value pairs
    clear() {
        this.map.clear();
    }

    // Get the number of key-value pairs
    size() {
        return this.map.size;
    }

    // Iterate over keys
    forEachKey(callback) {
        for (let key of this.map.keys()) {
            callback(key);
        }
    }

    // Iterate over values
    forEachValue(callback) {
        for (let value of this.map.values()) {
            callback(value);
        }
    }

    // Iterate over entries (key-value pairs)
    forEachEntry(callback) {
        for (let [key, value] of this.map.entries()) {
            callback(key, value);
        }
    }

    // Convert Map to an array of entries
    toArray() {
        return Array.from(this.map.entries());
    }

    // Convert Map to an array of keys
    keysArray() {
        return Array.from(this.map.keys());
    }

    // Convert Map to an array of values
    valuesArray() {
        return Array.from(this.map.values());
    }

    // Serialize the EnhancedMap to a JSON string
    serialize() {
        // Convert map to a plain object
        const obj = Object.fromEntries(this.map);
        // Convert object to JSON string
        return JSON.stringify(obj);
    }

    // Deserialize a JSON string into the EnhancedMap
    deserialize(serialized) {
        // Parse JSON string to object
        const obj = JSON.parse(serialized);
        // Clear existing map and populate with new data
        this.clear();
        Object.entries(obj).forEach(([key, value]) => {
            this.set(key, value);
        });
    }
  }
  function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
  class customProjectStorage {
    static set(data) {
      const customData = data;
      const stage = vm.runtime.targets.find(target => target.isStage);

      if (!stage) {
        console.error('Stage not found');
        return;
      }

      let comment = null;
      for (const id in stage.comments) {
        const commentData = stage.comments[id];
        if (commentData.text.startsWith("CONFIGURATION FOR BOOLEAN VARIABLES EXTENSION:")) {
          comment = commentData;
          break;
        }
      }

      if (!comment) {
        console.log('Creating new comment');
        comment = {
          id: generateUUID(),
          text: `CONFIGURATION FOR BOOLEAN VARIABLES EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
` + data,
          blockID: null,
          x: 100,
          y: 100,
          width: 200, // Set the default width
          height: 100, // Set the default height
          minimized: false // Set default minimized state
        };
        stage.comments[comment.id] = comment;
      } else {
        console.log('Updating comment text');
        comment.text = `CONFIGURATION FOR BOOLEAN VARIABLES EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
` + data;
      }

      // Request a re-render of blocks and comments
      vm.runtime.emitProjectChanged();
    }
    static get() {
      const stage = vm.runtime.targets.find(target => target.isStage);

      if (!stage) {
        console.error('Stage not found');
        return '';
      }

      if (Object.keys(stage.comments).length === 0) {
        console.log('No comments found');
        return '';
      }

      console.log('Searching for relevant comment');
      for (const id in stage.comments) {
        const comment = stage.comments[id];
        if (comment.text.startsWith(`CONFIGURATION FOR BOOLEAN VARIABLES EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
`)) {
          const prefix = `CONFIGURATION FOR BOOLEAN VARIABLES EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
`;
          const data = comment.text.slice(prefix.length).trim();
          console.log('Found comment data');
          return data;
        }
      }

      console.log('No relevant comment found');
      return '';
    }
  }
  const bool_vars = new EnhancedMap;
  let blocksArray = [
    {
      func: "new_bool_var",
      blockType: Scratch.BlockType.BUTTON,
      text: "New Boolean Variable",
    },
    {
      opcode: "set_bool_var_menu",
      blockType: Scratch.BlockType.COMMAND,
      text: "set [boolVarsMenu] to [trueFalseMenu]",
      arguments: {
        boolVarsMenu: {
          type: Scratch.ArgumentType.STRING,
          menu: 'boolVars',
        },
        trueFalseMenu: {
          type: Scratch.ArgumentType.STRING,
          menu: 'trueFalse',
          defaultValue: true,
        }
      }
    },
    {
      opcode: "set_bool_var_input",
      blockType: Scratch.BlockType.COMMAND,
      text: "set [boolVarsMenu] to [value]",
      arguments: {
        boolVarsMenu: {
          type: Scratch.ArgumentType.STRING,
          menu: 'boolVars',
        },
        value: {
          type: Scratch.ArgumentType.BOOLEAN,
        }
      }
    }
  ]
  function addMethod(cls,methodName,method) {
    cls.prototype[methodName]=method;
  }
  class booleanVariables {
    getInfo() {
      return {
        id: "booleanVariables",
        name: "Boolean Variables",
        blocks: blocksArray,
        menus: {
          boolVars: {
            items: bool_vars.keysArray(),
            defaultValue: bool_vars.keysArray()[0],
            acceptReporters: true,
          },
          trueFalse: {
            items: ['true','false'],
            acceptReporters: false,
          }
        },
      };
    }

    new_bool_var() {
      const boolVarName = prompt('What should the boolean variable be called?')
      if (!(bool_vars.has(boolVarName))) {
        bool_vars.set(boolVarName, false)
        blocksArray.push(
          {
            opcode: 'hello',
            blockType: Scratch.BlockType.REPORTER,
            text: 'hello'
          }
        )
        vm.extensionManager.refreshBlocks();
      } else {
        alert(`A boolean variable named ${boolVarName} already exists.`)
      }
    }
  }

  Scratch.extensions.register(new booleanVariables());
})(Scratch);
