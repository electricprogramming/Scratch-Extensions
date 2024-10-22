/*
This extension is temporarily deprecated, as it uses a dynamic
palette which cannot save and load again without issues.
If you think you know of a way to make the dynamic palette work,
open an issue titled `Dynamic Palette Idea` on this repository.
*/
// Name: Boolean Variables
// ID: epBoolVars
// Description: Creates blocks dealing with boolean variables which store either true or false and can be accessed via a menu.
(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error(`Boolean Variables Extension must be ran unsandboxed.`);
  }
  const [isTW,isPM] = [!Scratch.extensions.isPenguinMod, Scratch.extensions.isPenguinMod];
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const ogConvert = runtime._convertBlockForScratchBlocks.bind(runtime);
  runtime._convertBlockForScratchBlocks = function (blockInfo, categoryInfo) {
    const res = ogConvert(blockInfo, categoryInfo);
    const regex = /^getValueOf[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-]*$/;
    if (res.json.category === 'epBoolVars' && regex.test(res.info.opcode)) {
      // This is a dynamically generated block -- add to palette, refresh, return early.
      blocks.push(res.info);
      vm.extensionManager.refreshBlocks();
      return;
    }
    return res;
  };
  const menuIconURI = (function(){
    return `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgcng9IjIwIiByeT0iMjAiIGZpbGw9IiNmZjhjMWEiIC8+CiAgPHBvbHlnb24gcG9pbnRzPSIxODAsMTAwIDE0MCwxMjAgNjAsMTIwIDIwLDEwMCA2MCw4MCAxNDAsODAiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==`
  })(); // Uses an iife to be compressible in editors that will make it a huge blob instead of just letting it go off the edge.
  let boolVars = {};
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
  const customStorage = {
    set: (data) => {
      if (isTW) vm.runtime.extensionStorage.epBoolVars = {data};
    },
    get: () => {
      if (isTW) return vm.runtime.extensionStorage.epBoolVars?.data; else return;
    }
  };
  function serializeState() {
    return boolVars;
  }
  function updateProjectStorage() {
    customStorage.set(serializeState());
  }
  function deserializeState(state) {
    console.log('Boolean Variables: Loading serialized project data')
    boolVars = state;
    Object.keys(boolVars).forEach(name => {
      const methodSafeName = `getValueOf${methodSafe.encode(name)}`;
      blocks.splice(blocks.indexOf('---'), 0, {
        opcode: methodSafeName,
        blockType: Scratch.BlockType.BOOLEAN,
        text: name
      })
      epBoolVars.prototype[methodSafeName] = function() {
        return boolVars[name];
      };
    })
    vm.extensionManager.refreshBlocks();
  }
  if (isTW) vm.runtime.on('PROJECT_LOADED', () => {
    const data = customStorage.get();
    deserializeState(data);
  })
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
  ];
  class epBoolVars {
    getInfo() {
      return {
        id: "epBoolVars",
        name: "Boolean Variables",
        menuIconURI,
        blocks,
        color1: '#ff8c1a',
        color2: '#ef7c0a',
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
      if (newBvName.length === 0) {
        alert('Grid name cannot be empty.');
        return;
      }
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
      epBoolVars.prototype[methodSafeName] = function() {
        return boolVars[newBvName];
      };
      vm.extensionManager.refreshBlocks();
      updateProjectStorage();
    }
    async deleteBoolVar() {
      let toDelete = await prompt('What is the name of the boolean variable that should be deleted?');
      if (toDelete === null) return;
      if (!(toDelete in boolVars)) {
        alert(`Boolean variable ${JSON.stringify(toDelete)} not found`);
        return;
      }
      if (confirm(`Are you sure you want to delete boolean variable ${JSON.stringify(toDelete)}?`)) {
        delete boolVars[toDelete];
        blocks = blocks.filter(block => block.opcode !== `getValueOf${methodSafe.encode(toDelete)}`)
        delete epBoolVars.prototype[`getValueOf${methodSafe.encode(toDelete)}`];
        vm.extensionManager.refreshBlocks();
        updateProjectStorage();
      }
    }
  }
  if (isPM) {
    epBoolVars.prototype.serialize = () => {
      return {epBoolVars: serializeState()}
    }
    epBoolVars.prototype.deserialize = (data) => {
      if (data.epBoolVars !== undefined) {
        deserializeState(data.epBoolVars);
      }
    }
  }
  Scratch.extensions.register(new epBoolVars());
})(Scratch);
