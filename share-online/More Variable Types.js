const bool_vars = new Map();
let response;
let defaultNameBool = 'boolean variable 1'
let idx;
(function (Scratch) {
  "use strict";

  class templateExtension {
    getInfo() {
      return {
        id: "templateExtension",
        name: "templateExtension",
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text:"Boolean Variables"},
          {
            func: "new_bool_var",
            blockType: Scratch.BlockType.BUTTON,
            text: "New Boolean Variable",
          }
        ]
      };
    }

    new_bool_var() {
      while (bool_vars.has(defaultNameBool)) {
        defaultNameBool = 'boolean variable '+ (defaultNameBool.length > 0 ? defaultNameBool[defaultNameBool.length - 1] : undefined)+1;
      }
      response = prompt('What should the boolean variable be called?',defaultNameBool)
      bool_vars.set(response,false)
    }
  }

  Scratch.extensions.register(new templateExtension());
})(Scratch);
