(function (Scratch) {
  "use strict";
  let replacersJSON = {}
  function applyReplacers(text, replacersJSON) {
    const replacers = Object.entries(replacersJSON);
    const placeholderMap = {};
    let index = 0;

    // Function to escape special characters for use in a regular expression
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    replacers.forEach(([searchValue]) => {
      if (!placeholderMap[searchValue]) {
        placeholderMap[searchValue] = `__PLACEHOLDER_${index++}__`;
      }
    });

    let result = text;
    replacers.forEach(([searchValue]) => {
      const escapedSearchValue = escapeRegExp(searchValue);
      const placeholder = placeholderMap[searchValue];
      const regex = new RegExp(escapedSearchValue, 'g');
      result = result.replace(regex, placeholder);
    });

    replacers.forEach(([searchValue, replaceValue]) => {
      const placeholder = placeholderMap[searchValue];
      const escapedReplaceValue = escapeRegExp(replaceValue);
      result = result.replace(new RegExp(escapeRegExp(placeholder), 'g'), escapedReplaceValue);
    });

    return result;
  }
  class replacers {
    getInfo() {
      return {
        id: "epReplacers",
        name: "Text Replacers",
        blocks: [
          {
            opcode: "resetReplacers",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset replacers"
          },
          {
            opcode: "setReplacer",
            blockType: Scratch.BlockType.COMMAND,
            text: "set replacer [key] to [value]",
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hi"
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello"
              }
            }
          },
          {
            opcode: "getReplacers",
            blockType: Scratch.BlockType.REPORTER,
            text: "get replacers as JSON"
          },
          {
            opcode: "applyReplacers",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply replacers to [text]",
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hi dude"
              }
            }
          }
        ]
      };
    }
    resetReplacers() {
      replacersJSON = {}
    }
    setReplacer(args) {
      replacersJSON[args.key]=args.value
    }
    getReplacers() {
      return JSON.stringify(replacersJSON)
    }
    applyReplacers(args) {
      return applyReplacers(args.text,replacersJSON)
    }
  }

  Scratch.extensions.register(new replacers());
})(Scratch);
