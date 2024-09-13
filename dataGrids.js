(function (Scratch) {
  "use strict";
  const vm = Scratch.vm
  function repeat(count, action) {
    for (let i = 0; i < count; i++) {
      action(i);
    }
  }
  function toInteger(value) {
    if (Number.isInteger(value)) {
      return value;
    }

    if (typeof value === 'number') {
      return Math.round(value);
    }

    if (typeof value === 'string') {
      const match = value.trim().match(/^[-+]?\d*\.?\d+$/);
      if (match) {
        return Math.round(parseFloat(match[0]));
      }
      return 0;
    }

    return 0;
  }
  const customStorage = (function() {
    function generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    function set(args) {
      const data = args.TEXT;
      const stage = vm.runtime.targets.find(target => target.isStage);

      if (!stage) {
        console.error('Stage not found');
        return;
      }

      let comment = null;
      for (const id in stage.comments) {
        const commentData = stage.comments[id];
        if (commentData.text.startsWith(`CONFIGURATION FOR DATA GRIDS EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
`)) {
          comment = commentData;
          break;
        }
      }

      if (!comment) {
        console.log('Creating new comment');
        comment = {
          id: generateUUID(),
          text: `CONFIGURATION FOR DATA GRIDS EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
` + data,
          blockID: null,
          x: 100,
          y: 100,
          width: 200,
          height: 100,
          minimized: false
        };
        stage.comments[comment.id] = comment;
      } else {
        console.log('Updating comment text');
        comment.text = `CONFIGURATION FOR DATA GRIDS EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
` + data;
      }

      // Request a re-render of blocks and comments
      vm.runtime.emitProjectChanged();
    }

    function get() {
      const stage = vm.runtime.targets.find(target => target.isStage);

      if (!stage) {
        console.error('Stage not found');
        return '';
      }

      if (Object.keys(stage.comments).length === 0) {
        console.log('No comments found');
        return '';
      }

      console.log('Searching for relevant comment');
      for (const id in stage.comments) {
        const comment = stage.comments[id];
        if (comment.text.startsWith("CONFIGURATION FOR DATA GRIDS EXTENSION:")) {
          const prefix = `CONFIGURATION FOR DATA GRIDS EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
`;
          const data = comment.text.slice(prefix.length).trim();
          console.log('Found comment data');
          return data;
        }
      }

      console.log('No relevant comment found');
      return '';
    }

    // Expose public methods
    return {
      set,
      get
    };
  })();
  class Grid {
    #gridWidth;
    #gridHeight;
    #gridItems;
    constructor(width, height) {
      this.#gridWidth = toInteger(width);
      this.#gridHeight = toInteger(height);
      this.#gridItems = Array.from({ length: this.#gridHeight }, () => this.#blankArray(this.#gridWidth)); // new blank array instance for each row so that rows can be modified individually.
    }

    #blankArray(length) {
      return Array(length).fill('');
    }

    addRows(count) {
      if (count < 0) {
        console.error('Count must not be negative.');
      } else {
        this.#gridHeight += count;
        repeat(count, () => {
          this.#gridItems.push(this.#blankArray(this.#gridWidth));
        });
      }
    }

    addColumns(count) {
      if (count < 0) {
        console.error('Count must not be negative.');
      } else {
        this.#gridWidth += count;
        repeat(this.#gridHeight, (i) => {
          const currentRow = this.#gridItems[i];
          repeat(count, () => {
            currentRow.push('');
          });
        });
      }
    }

    insertRows(count, idx) {
      if (idx < 1 || idx > this.#gridHeight + 1) {
        console.error('Index out of bounds');
      } else if (count < 0) {
        console.error('Count must not be negative.');
      } else {
        this.#gridHeight += count;
        repeat(count, () => {
          this.#gridItems.splice(idx - 1, 0, this.#blankArray(this.#gridWidth));
        });
      }
    }

    insertColumns(count, idx) {
      if (idx < 1 || idx > this.#gridHeight + 1) {
        console.error('Index out of bounds');
      } else if (count < 0) {
        console.error('Count must not be negative.');
      } else {
        this.#gridWidth += count;
        repeat(this.#gridHeight, (i) => {
          const currentRow = this.#gridItems[i];
          repeat(count, () => {
            currentRow.splice(idx - 1, 0, '');
          });
        });
      }
    }

    deleteRow(rowNum) {
      if (rowNum < 1 || rowNum > this.#gridHeight) {
        console.error('Index out of bounds');
      } else {
        this.#gridHeight -= 1;
        this.#gridItems.splice(rowNum - 1, 1);
      }
    }

    deleteColumn(columnNum) {
      if (columnNum < 1 || columnNum > this.#gridWidth) {
        console.error('Index out of bounds');
      } else {
        this.#gridWidth -= 1;
        repeat(this.#gridHeight, (i) => {
          const currentRow = this.#gridItems[i];
          currentRow.splice(columnNum - 1, 1);
        });
      }
    }

    set(x, y, val) {
      if (x < 1 || x > this.#gridWidth || y < 1 || y > this.#gridHeight) {
        throw new Error('Index out of bounds');
      } else {
        const rowToEdit = this.#gridItems[y - 1];
        rowToEdit[x - 1] = val;
      }
    }

    get(x, y) {
      const row = this.#gridItems[y - 1];
      return row[x - 1];
    }

    getRow(rowNum) {
      if (rowNum < 1 || rowNum > this.#gridHeight) {
        console.error('Index is out of bounds');
        return [];
      } else {
        return this.#gridItems[rowNum - 1];
      }
    }

    getColumn(columnNum) {
      if (columnNum < 1 || columnNum > this.#gridWidth) {
        console.error('Index is out of bounds');
        return [];
      } else {
        let column = [];
        repeat(this.#gridHeight, (i) => {
          const thisRow = this.#gridItems[i];
          column.push(thisRow[columnNum - 1]);
        });
        return column;
      }
    }

    getWidth() {
      return this.#gridWidth;
    }

    getHeight() {
      return this.#gridHeight;
    }

    serialize() {
      return JSON.stringify(this.#gridItems);
    }

    getItems() {
      return this.#gridItems;
    }

    deserialize(serialized) {
      this.#gridItems = JSON.parse(serialized);
      this.#gridHeight = this.#gridItems.length;
      this.#gridWidth = this.#gridHeight > 0 ? this.#gridItems[0].length : 0;
    }

    forEachItem(action) {
      let currentX = 1;
      let currentY = 1;
      let currentRow = this.#gridItems[currentY];
      repeat(this.#gridWidth * this.#gridHeight, () => {
        action(currentX, currentY, currentRow[currentX - 1]);
        if (currentX == this.#gridWidth) {
          currentX = 0;
          currentY++;
          currentRow = this.#gridItems[currentY - 1];
        }
        currentX++;
      });
    }

    forEachRow(action) {
      repeat(this.#gridHeight, (idx) => {
        action(idx + 1, this.#gridItems[idx]);
      });
    }

    forEachColumn(action) {
      repeat(this.#gridWidth, (idx) => {
        const currentColumn = this.getColumn(idx + 1);
        action(idx + 1, currentColumn);
      });
    }

    fill(val) {
      this.forEachItem((x, y) => {
        this.set(x, y, val);
      });
    }

    clear() {
      this.fill('');
    }

    findAll(item) {
      let instances = [];
      this.forEachItem((x, y, val) => {
        if (val == item) {
          let object = {};
          object['x'] = x;
          object['y'] = y;
          instances.push(object);
        }
      });
      return instances;
    }

    replaceAll(oldVal, newVal) {
      this.forEachItem((x, y, val) => {
        if (val == oldVal) {
          this.set(x, y, newVal);
        }
      });
    }
  }
  let GridsObj = {}
  class dataGrids {
    getInfo() {
      return {
        id: "epDataGrids",
        name: "Data Grids",
        blocks: [
          {
            func: "newGrid",
            blockType: Scratch.BlockType.BUTTON,
            text: "New Grid",
          },
          {
            func: "removeGrid",
            blockType: Scratch.BlockType.BUTTON,
            text: "Remove a Grid",
            hideFromPalette: GridsObj.size() > 0
          }
        ]
      };
    }
    newGrid() {
      const input = prompt('what should the grid be called?')
      if (input in GridsObj) {
        alert('This name is already in use.')
      } else {
        GridsObj[input] = new Grid(0,0)
      }
    }
  }

  Scratch.extensions.register(new dataGrids());
})(Scratch);
// implement methods... refer to sharkpool's color editor extension for reporters that are dragged out of hats/loops... the question is how to make loops inside of loops work.
