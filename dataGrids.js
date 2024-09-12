(function (Scratch) {
  "use strict";
  const vm = Scratch.vm
  function repeat(count, action) {
    for (let i = 0; i < count; i++) {
      action(i);
    }
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
  class MapPlus {
    #map = new Map(); // Internal storage for key-value pairs

    constructor(entries = []) {
      // Initialize the map with optional entries
      this.#map = new Map(entries);
    }

    // Add or update a key-value pair
    set(key, value) {
      this.#map.set(key, value);
    }

    // Get the value associated with a key
    get(key) {
      return this.#map.get(key);
    }

    // Remove a key-value pair
    delete(key) {
      this.#map.delete(key);
    }

    // Check if a key exists
    has(key) {
      return this.#map.has(key);
    }

    // size of map
    size() {
      return this.#map.size
    }

    // Get all keys
    keys() {
      return Array.from(this.#map.keys());
    }

    // Get all values
    values() {
      return Array.from(this.#map.values());
    }

    // Get all key-value pairs
    entries() {
      return Array.from(this.#map.entries());
    }

    // Clear all key-value pairs
    clear() {
      this.#map.clear();
    }

    // Serialize the MapPlus instance to JSON
    serialize() {
      return JSON.stringify(Array.from(this.#map.entries()));
    }

    // Deserialize a JSON string to create a MapPlus instance
    static deserialize(json) {
      const entries = JSON.parse(json);
      return new MapPlus(entries);
    }
  }
  class Grid {
    #gridWidth;
    #gridHeight;
    #gridItems;

    constructor(width, height) {
      this.#gridWidth = width < 1 ? 1 : width;
      this.#gridHeight = height < 1 ? 1 : height;
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
  let GridsMap = new MapPlus();
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
            hideFromPalette: MapPlus.size() > 0
          }
        ]
      };
    }
    newGrid() {
      const input = prompt('what should the grid be called?')
    }
  }

  Scratch.extensions.register(new dataGrids());
})(Scratch);
