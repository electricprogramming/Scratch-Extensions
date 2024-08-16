(function (Scratch) {
  "use strict";
  let gridList = [];
  let gridListRows = 1;
  let gridListColumns = 1;
  let gridName;
  class epgridlists {
    getInfo() {
      return {
        id: "epgridlists",
        name: "Grid Lists",
        blocks: [
          {
            func: "new_grid",
            blockType: Scratch.BlockType.BUTTON,
            text: "New Grid",
          }
        ],
        menus: {
          grid_menu: "_getGrids"
        }
      };
    }

    new_grid() {
      gridName = prompt('')
    }
  }

  Scratch.extensions.register(new epgridlists());
})(Scratch);
