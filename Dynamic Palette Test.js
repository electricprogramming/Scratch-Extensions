(function (Scratch) {
  "use strict";
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
  function escapeBrackets(text) {
    return text
      .replace(/\[/g, '[')
      .replace(/\]/g, ']');
  }
  let counter = 0;

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
          opcode: `reporter${counter}`,
          blockType: Scratch.BlockType.REPORTER,
          text: name,
          disableMonitor: true,
          args: {
          },
        }
      }
      userInput = prompt('reporter name')
      if (!(userInput.trim()==='')) {
        array.push(reporterBlockData(escapeBrackets(userInput)));
        console.log(array);
        addMethod(dynamicPaletteTest,`reporter${counter}`,function(){
          return Math.random();
        });
        vm.extensionManager.refreshBlocks();
      } else {
        if (true){
          alert('reporter name cannot be empty.');
        }
      }
    }
  }

  Scratch.extensions.register(new dynamicPaletteTest());
})(Scratch);
