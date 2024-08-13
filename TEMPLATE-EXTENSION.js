(function (Scratch) {
  "use strict";

  class templateExtension {
    getInfo() {
      return {
        id: "templateExtension",
        name: "templateExtension",
        blocks: [
          {
            opcode: "example_block",
            blockType: Scratch.BlockType.COMMAND,
            text: "example block",
          }
        ]
      };
    }

    example_block() {
      // does nothing
    }
  }

  Scratch.extensions.register(new templateExtension());
})(Scratch);
