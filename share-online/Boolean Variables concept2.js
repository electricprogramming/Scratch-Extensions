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

    // Serialize the EnhancedMap to a string
    serialize() {
      // Helper function to escape special characters
      const escapeString = (str) => {
        return str.replace(/\\/g, '\\\\') // Escape backslashes
                  .replace(/"/g, '\\"')   // Escape double quotes
                  .replace(/=/g, '\\=')   // Escape equals signs
                  .replace(/</g, '\\<')   // Escape less-than signs
                  .replace(/>/g, '\\>');  // Escape greater-than signs
      };

      const entriesArray = Array.from(this.map.entries())
        .map(([key, value]) => 
          `"${escapeString(key)}"="${escapeString(value)}"`
        )
        .join(',');

      return `<${entriesArray}>`;
    }

    // Deserialize a string into the EnhancedMap
    deserialize(serialized) {
      // Remove angle brackets and split by commas
      const innerString = serialized.slice(1, -1);
      const pairs = innerString.split(/,(?![^"]*"\s*=\s*")/); // Split on commas not within quoted strings

      // Helper function to unescape special characters
      const unescapeString = (str) => {
        return str.replace(/\\</g, '<')   // Unescape less-than signs
                  .replace(/\\>/g, '>')   // Unescape greater-than signs
                  .replace(/\\=/g, '=')   // Unescape equals signs
                  .replace(/\\"/g, '"')   // Unescape double quotes
                  .replace(/\\\\/g, '\\'); // Unescape backslashes
      };

      this.clear(); // Clear existing map

      for (const pair of pairs) {
        // Match key and value using regular expression
        const match = pair.match(/^"([^"]+)"="([^"]+)"$/);
        if (match) {
          const key = unescapeString(match[1]);
          const value = unescapeString(match[2]);
          this.set(key, value);
        }
      }
    }
  } //serialization and desrialization are buggy
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
        if (comment.text.startsWith("CONFIGURATION FOR TEST EXTENSION:")) {
          const prefix = `CONFIGURATION FOR TEST EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
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
  class booleanVariables {
    getInfo() {
      return {
        id: "booleanVariables",
        name: "Boolean Variables",
        blocks: [
          {
            func: "new_bool_var",
            blockType: Scratch.BlockType.BUTTON,
            text: "New Boolean Variable",
          }
        ]
      };
    }

    new_bool_var() {
      const boolVarName = prompt('What should the boolean variable be called?')
    }
  }

  Scratch.extensions.register(new booleanVariables());
})(Scratch);
