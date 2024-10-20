(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Custom Blocks Plus must run unsandboxed!");
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  /* Adjusts converter so blocks can have their own color1, color2, and color3 properties. */
  const originalConverter = runtime._convertBlockForScratchBlocks.bind(runtime);
  runtime._convertBlockForScratchBlocks = function (blockInfo, categoryInfo) {
    const res = originalConverter(blockInfo, categoryInfo);
    if (blockInfo.color1) res.json.colour = blockInfo.color1;
    if (blockInfo.color2) res.json.colourSecondary = blockInfo.color2;
    if (blockInfo.color3) res.json.colourTertiary = blockInfo.color3;
    if (blockInfo.color1 && blockInfo.color2 && !blockInfo.color3) {
      console.log('Third color not found, setting third to match second.')
      res.json.colourTertiary = blockInfo.color2;
    }
    console.log(res)
    return res;
  }
  class epMultiColor {
    getInfo() {
      return {
        id: "epMultiColor",
        name: "MultiColor",
        blocks: [
          {
            opcode: 'red',
            func: 'onlyFunc',
            color1: '#ff0000',
            color2: '#ff2222',
            text: 'I AM RED',
          },
          {
            opcode: 'blue',
            func: 'onlyFunc',
            color1: '#0000ff',
            color2: '#2222ff',
            text: 'I AM BLUE',
          }
        ],
        menus: {
          
        }
      };
    }
    onlyFunc() {}
  }
  Scratch.extensions.register(new epMultiColor());
})(Scratch);
