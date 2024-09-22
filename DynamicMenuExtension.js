(function (Scratch) {
  'use strict';

  class DynamicMenuExtension {
    constructor() {
      this.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
    }
    getInfo() {
      return {
        id: 'dynamicMenu',
        name: 'Dynamic Menu Extension',
        blocks: [
          {
            opcode: 'chooseItem',
            blockType: Scratch.BlockType.REPORTER,
            text: 'choose item from [ITEM_MENU]',
            arguments: {
              ITEM_MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: 'itemMenu'
              }
            }
          },
          {
            func: 'update',
            blockType: Scratch.BlockType.BUTTON,
            text: 'update'
          }
        ],
        menus: {
          itemMenu: {
            acceptReporters: true,
            items: 'getItems'
          }
        }
      };
    }

    getItems() {
      // Example dynamic items, you can modify this logic
      const items = this.items;
      return items;
    }

    chooseItem(args) {
      return `You chose: ${args.ITEM_MENU}`;
    }
    update() {
      this.items = JSON.parse(prompt())
    }
  }

  Scratch.extensions.register(new DynamicMenuExtension());
})(Scratch);
