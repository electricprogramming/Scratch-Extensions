(function (Scratch) {
  "use strict";

  class Base64Extension {
    getInfo() {
      return {
        id: "base64Extension",
        name: "Base64 Translate",
        color1: "#4fbcfa",
        color2: "#287ffa",
        blocks: [
          {
            opcode: "base64",
            blockType: Scratch.BlockType.REPORTER,
            text: "base64 [encodeDecode] [text]",
            arguments: {
              encodeDecode: {
                type: Scratch.ArgumentType.STRING,
                menu: "encodeDecodeMenu",
                defaultValue: "encode"
              },
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ""
              }
            }
          }
        ],
        menus: {
          encodeDecodeMenu: {
            items: [
              { text: "encode", value: "encode" },
              { text: "decode", value: "decode" }
            ]
          }
        }
      };
    }

    base64({ encodeDecode, text }) {
      if (encodeDecode === "encode") {
        return btoa(unescape(encodeURIComponent(text)));
      } else if (encodeDecode === "decode") {
        try {
          return decodeURIComponent(escape(atob(text)));
        } catch (e) {
          return "Invalid Base64";
        }
      }
    }
  }

  Scratch.extensions.register(new Base64Extension());
})(Scratch);
