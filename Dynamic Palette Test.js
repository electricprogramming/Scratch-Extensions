let array = [
  {
    func: "new_reporter",
    blockType: Scratch.BlockType.BUTTON,
    text: "New Reporter",
  },
        ];
let userInput = '';
function addMethod(cls,methodName,method) {
  cls.prototype[methodName] = method;
}
let counter = 0;
(function (Scratch) {
  "use strict";

  class dynamicPaletteTest {
    getInfo() {
      return {
        id: "dynamicPaletteTest",
        name: "Dynamic Palette Test",
        blocks: array, 
      };
    }

    new_reporter() {
      function reporterBlockData(name) {
        counter++;
        return {
          opcode: counter,
          blockType: Scratch.BlockType.REPORTER,
          text: name,
          disableMonitor: true
        }
      }
      userInput = prompt('reporter name')
      array.push(reporterBlockData(userInput));
      console.log(array);
      addMethod(dynamicPaletteTest,counter,function(){
        return Math.random()
      });
      vm.extensionManager.refreshBlocks();
    }
  }

  Scratch.extensions.register(new dynamicPaletteTest());
})(Scratch);
