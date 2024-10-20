(function (Scratch) {
  "use strict";
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const methodSafe = {
    encode: function(str) {
      const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let encoded = '';
      for (let char of str) {
        const code = char.codePointAt(0);
        let num = code;
        let base62Str = '';
        while (num > 0) {
          const remainder = num % 62;
          base62Str = alphabet[remainder] + base62Str;
          num = Math.floor(num / 62);
        }
        if (base62Str === '') {
          base62Str = '0';
        }
        encoded += base62Str + '-';
      }
      return encoded.slice(0, -1);
    },
    decode: function(encodedStr) {
      const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return encodedStr.split('-').map(part => {
        let num = 0;
        for (let char of part) {
          const index = alphabet.indexOf(char);
          num = num * 62 + index;
        }
        return String.fromCodePoint(num);
      }).join('');
    }
  };
  let boolVars = {};
  let blocks = [
    {
      func: 'newBoolVar',
      blockType: Scratch.BlockType.BUTTON,
      text: 'Make a Boolean Variable',
      hideFromPalette: false
    },
    {
      func: 'deleteBoolVar',
      blockType: Scratch.BlockType.BUTTON,
      text: 'Delete a Boolean Variable',
      get hideFromPalette() {
        return Object.keys(boolVars).length === 0;
      }
    },
    '---'
  ]
  class epBoolVars {
    getInfo() {
      return {
        id: "epBoolVars",
        name: "Boolean Variables",
        blocks: blocks,
        menus: {
          boolVars: {
            items: 'getBoolVars',
            acceptReporters: true
          },
          basicBools: {
            items: ["true","false","random"],
            acceptReporters: false
          }
        },   
      };
    }
    async newBoolVar() {
      function getDefaultName() {
        let nameIdx = 1;
        let name = `Bool Var ${nameIdx}`;
        while (Object.keys(boolVars).includes(name)) {
          nameIdx ++;
          name = `Bool Var ${nameIdx}`;
        };
        return name;
      }
      let newBvName = await prompt('What should the new boolean variable be called?', getDefaultName());
      if (newBvName === null) return;
      newBvName = newBvName
        .replace(/\[/g, '［')
        .replace(/\]/g, '］');
      if (newBvName in boolVars){ 
        alert('A boolean variable with this name already exists.');
        return;
      }
      boolVars[newBvName] = false;
      const methodSafeName = `getValueOf${methodSafe.encode(newBvName)}`;
      blocks.splice(blocks.indexOf('---'), 0, {
        opcode: methodSafeName,
        blockType: Scratch.BlockType.BOOLEAN,
        text: newBvName
      })
      console.log(Object.keys(boolVars).length === 0);
      console.log(blocks)
      epBoolVars.prototype[methodSafeName] = function() {
        return boolVars[newBvName];
      };
      vm.extensionManager.refreshBlocks();
    }
    async deleteBoolVar() {
      
    }
  }
  Scratch.extensions.register(new epBoolVars());
})(Scratch);
