(function (Scratch) {
  "use strict";
  const vm = Scratch.vm;
  function getMenuIcon() {
    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+ICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIGZpbGw9IiNmZjI4MGEiLz4gICA8ZyBpZD0iYWxsLWVsZW1lbnRzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNCwtNCkgc2NhbGUoMS40LDEuNCkiPiAgICAgPGcgaWQ9ImdyaWQtc3F1YXJlcyIgZmlsbD0id2hpdGUiPiA8IS0tR3JpZCBTcXVhcmVzLS0+ICAgICAgIDxyZWN0IHg9IjMyIiB5PSIzMiIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+ICAgICAgIDxyZWN0IHg9IjQ4IiB5PSIzMiIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+ICAgICAgIDxyZWN0IHg9IjMyIiB5PSI0OCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+ICAgICAgIDxyZWN0IHg9IjQ4IiB5PSI0OCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+ICAgICA8L2c+ICAgICA8ZyBpZD0iYnVsbGV0LXBvaW50cyIgZmlsbD0id2hpdGUiPiAgICAgICA8ZyBpZD0idG9wIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC44NSwwKSI+IDwhLS1Ub3AgQnVsbGV0IFBvaW50cy0tPiAgICAgICAgIDxjaXJjbGUgY3g9IjM4IiBjeT0iMjAiIHI9IjQiLz4gICAgICAgICA8Y2lyY2xlIGN4PSI1NCIgY3k9IjIwIiByPSI0Ii8+ICAgICAgIDwvZz4gICAgICAgPGcgaWQ9ImxlZnQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTAuODUpIj4gPCEtLUxlZnQgQnVsbGV0IFBvaW50cy0tPiAgICAgICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iMzgiIHI9IjQiLz4gICAgICAgICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjU0IiByPSI0Ii8+ICAgICAgIDwvZz4gICAgIDwvZz4gICA8L2c+IDwvc3ZnPg=='
  }
  function getBlockIcon() {
    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+ICAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0NSIgZmlsbD0iI2IyMjIwYSIgLz4gICAgIDxnIGlkPSJhbGwtZWxlbWVudHMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00LC00KSBzY2FsZSgxLjQsMS40KSIgZmlsbD0iI2ZmZmZmZiI+ICAgICAgICAgPGcgaWQ9ImdyaWQtc3F1YXJlcyI+ICAgICAgICAgICAgIDwhLS0gR3JpZCBTcXVhcmVzIC0tPiAgICAgICAgICAgICA8cmVjdCB4PSIzMiIgeT0iMzIiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgLz4gICAgICAgICAgICAgPHJlY3QgeD0iNDgiIHk9IjMyIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIC8+ICAgICAgICAgICAgIDxyZWN0IHg9IjMyIiB5PSI0OCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiAvPiAgICAgICAgICAgICA8cmVjdCB4PSI0OCIgeT0iNDgiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgLz4gICAgICAgICA8L2c+ICAgICAgICAgPGcgaWQ9ImJ1bGxldC1wb2ludHMiPiAgICAgICAgICAgICA8ZyBpZD0idG9wIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC44NSwwKSI+ICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIzOCIgY3k9IjIwIiByPSI0IiAvPiAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iNTQiIGN5PSIyMCIgcj0iNCIgLz4gICAgICAgICAgICAgPC9nPiAgICAgICAgICAgICA8ZyBpZD0ibGVmdCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMC44NSkiPiAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMjAiIGN5PSIzOCIgcj0iNCIgLz4gICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iNTQiIHI9IjQiIC8+ICAgICAgICAgICAgIDwvZz4gICAgICAgICA8L2c+ICAgICA8L2c+IDwvc3ZnPg=='
  }
  function repeat(count = 0, action = () => {}) {  
      for (let i = 0; i < count; i++) {
        const escapeLoop = () => {
          throw new Error('EscapeLoop');
        };
        const continueLoop = () => {
          throw new Error('ContinueLoop');
        };
        try {
          action(i, escapeLoop, continueLoop);
        } catch (e) {
          if (e.message === 'EscapeLoop') {
            break;
          } else if (e.message === 'ContinueLoop') {
            continue;
          } else {
            throw e;
          }
        }
      }
  }
  async function waitUntil(conditionFn = true, callback = () => {}) {
    if (conditionFn) {
      callback(0);
      return;
    }
    let elapsedTime = 0;
    const interval = setInterval(() => {
      elapsedTime += 100;
      if (conditionFn) {
        clearInterval(interval);
        callback(elapsedTime);
      }
    }, 100); // Check every 100ms
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
  const FunctionGroup = (() => {
    class FunctionGroup {
      constructor(...functions) {
        for (let i = 0; i < functions.length; i += 2) {
          const name = functions[i];
          const func = functions[i + 1];
          if (typeof name !== 'string' || typeof func !== 'function') {
            throw new TypeError(`Expected a string name and a function for pair at index ${i}.`);
          }
          this[name] = func.bind(this);
        }
        Object.seal(this); // Seal the instance
      }
    }
    
    // Seal the prototype to prevent adding properties
    Object.seal(FunctionGroup.prototype);
    
    return FunctionGroup;
  })();
  const customStorage = new FunctionGroup(
    'set', (value) => {
      function generateUUID() {
        // UUID version 4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          const thisLetter = v.toString(16);
          return thisLetter;
        });
      }
      const data = value;
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
    },
    'get', () => {
      const stage = vm.runtime.targets.find(target => target.isStage);

      if (!stage) {
        console.error('Stage not found');
        return null;
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
  )
  class Grid { // 1-based
    #gridWidth;
    #gridHeight;
    #gridItems;
    constructor(nestedArray = []) {
      if (!(Array.isArray(nestedArray))) {
        nestedArray = []
        console.error('Data Grids: constructor - not an array')
      }
      let expectedLength;
      repeat(nestedArray.length, (i,escapeLoop) => {
        if (i === 0) {
          expectedLength = nestedArray[i].length
        } else {
          if (nestedArray[i].length !== expectedLength) {
            nestedArray = []
            console.error('Data Grids: constructor - array subarrays are not the same size')
            escapeLoop();
          }
        }
      })
      this.#gridItems = nestedArray
      this.#gridWidth = nestedArray[0]? nestedArray[0].length : 0
      this.#gridHeight = nestedArray.length
    }
    #blankArray(size = 0) {
      return Array(size).fill('');
    }
    static new(width = 0,height = 0) {
      return new Grid(Array.from({ length: toInteger(height) }, () => Array(toInteger(width)).fill('')))
    }
    static deserialize(stringifiedArray = '[]') {
      try {
        var gridData = JSON.parse(stringifiedArray)
      } catch(e) {
        console.error('Data Grids: Deserialization error -- ', e.message)
        gridData = []
      }
      return new Grid(gridData)
    }
    addRows(count = 0) {
      if (count < 0) {
        console.error('Data Grids: addRows count must not be negative.')
      } else {
        this.#gridHeight += count;
        repeat(count, () => {
          this.#gridItems.push(this.#blankArray(this.#gridWidth));
        });
      }
    }
    addColumns(count = 0) {
      if (count < 0) {
        console.error('Data Grids: addColumns count must not be negative.')
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
    insertRows(count = 0, idx = 1) {
      if (idx < 1 || idx > this.#gridHeight + 1) {
        console.error('Data Grids: row insertion index out of bounds');
      } else if (count < 0) {
        console.error('Data Grids: row insertion count must not be negative')
      } else {
        this.#gridHeight += count;
        repeat(count, () => {
          this.#gridItems.splice(idx - 1, 0, this.#blankArray(this.#gridWidth));
        });
      }
    }
    insertColumns(count = 0, idx = 1) {
      if (idx < 1 || idx > this.#gridHeight + 1) {
        console.error('Data Grids: column insertion index out of bounds');
      } else if (count < 0) {
        console.error('Data Grids: column insertion count must not be negative')
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
    deleteRow(rowNum = 0) {
      if (rowNum < 1 || rowNum > this.#gridHeight) {
        console.error('Data Grids: row deletion index out of bounds');
      } else {
        this.#gridHeight -= 1;
        this.#gridItems.splice(rowNum - 1, 1);
      }
    }
    deleteColumn(columnNum = 0) {
      if (columnNum < 1 || columnNum > this.#gridWidth) {
        console.error('Data Grids: column deletion index out of bounds');
      } else {
        this.#gridWidth -= 1;
        repeat(this.#gridHeight, (i) => {
          const currentRow = this.#gridItems[i];
          currentRow.splice(columnNum - 1, 1);
        });
      }
    }
    set(x = 0, y = 0, val = '') {
      if (x < 1 || x > this.#gridWidth || y < 1 || y > this.#gridHeight) {
        console.error('Data Grids: cell value setting index out of bounds');
      } else {
        const rowToEdit = this.#gridItems[y - 1];
        rowToEdit[x - 1] = val;
      }
    }
    get(x = 0, y = 0) {
      if (x < 1 || x > this.#gridWidth || y < 1 || y > this.#gridHeight) {
        console.error('Data Grids: cell value fetch index out of bounds')
        return ''
      } else {
        const row = this.#gridItems[y - 1];
        return row[x - 1];
      }
    }
    getRow(rowNum = 0) {
      if (rowNum < 1 || rowNum > this.#gridHeight) {
        console.error('Data Grids: row fetch index out of bounds');
        return [];
      } else {
        return this.#gridItems[rowNum - 1];
      }
    }
    getColumn(columnNum = 0) {
      if (columnNum < 1 || columnNum > this.#gridWidth) {
        console.error('Data Grids: column fetch index out of bounds');
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
    getItems() {
      return this.#gridItems;
    }
    forEachItem(action = () => {}) {
      repeat(this.#gridHeight, (y) => {
        const row = this.#gridItems[y];
        repeat(this.#gridWidth, (x) => {
          action(x + 1, y + 1, row[x]);
        });
      });
    }
    forEachRow(action = () => {}) {
      repeat(this.#gridHeight, (idx) => {
        action(idx + 1, this.#gridItems[idx]);
      });
    }
    forEachColumn(action = () => {}) {
      repeat(this.#gridWidth, (idx) => {
        const currentColumn = this.getColumn(idx + 1);
        action(idx + 1, currentColumn);
      });
    }
    serialize() {
      return JSON.stringify(this.#gridItems);
    }
    serializeObject() {
      var serialized = {};
      this.forEachRow(
        (rowNum,rowAsArray) => {
          let rowAsJSON = {}
          repeat(
            rowAsArray.length,
            (idx) => {
              rowAsJSON[idx+1] = rowAsArray[idx];
            }
          );
          serialized[rowNum] = rowAsJSON;
        }
      )
      return JSON.stringify(serialized)
    }
    fill(val = '') {
      this.forEachItem((x,y) => {
        this.set(x,y,val)
      })
    }
    clear() {
      this.fill('')
    }
    findAll(item = '') {
      let instances = []
      this.forEachItem((x,y,val) => {
        if (val == item) {
          let object = {}
          object['x'] = x
          object['y'] = y
          instances.push(object)
        }
      })
      return instances;
    }
    replaceAll(oldVal = '', newVal = '') {
      this.forEachItem((x,y,val) => {
        if (val == oldVal) {
          this.set(x,y,newVal)
        }
      })
    }
  }
  let grids = {};
  function serializeState() {
    let result = {};
    Object.keys(grids).forEach(key => {
      result[key] = grids[key].serialize();
    })
    return JSON.stringify(result)
  }
  function updateProjectStorage() {
    customStorage.set(serializeState())
  }
  class epDataGrids {
    getInfo() {
      return {
        id: 'epDataGrids',
        name: 'Data Grids',
        color1: '#ff0000',
        color2: '#b2220a',
        color3: '#b2220a',
        menuIconURI: getMenuIcon(),
        blocks: [
          {blockType: Scratch.BlockType.LABEL, text: 'Grid Management'},
          {
            func: 'newGrid',
            blockType: Scratch.BlockType.BUTTON,
            text: 'New Grid',
            hideFromPalette: false
          },
          {
            func: 'deleteGrid',
            blockType: Scratch.BlockType.BUTTON,
            text: 'Delete a Grid',
            hideFromPalette: Object.keys(grids).length === 0
          },
          {
            opcode: 'gridExists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'grid named [gridName] exists?',
            arguments: {
              gridName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my grid 1'
              }
            },
            hideFromPalette: false
          },
          { blockType: Scratch.BlockType.LABEL, text: 'Data Management'},
          {
            opcode: 'addRows',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add [count] rows to grid [gridName]',
            arguments: {
              count: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'addColumns',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add [count] columns to grid [gridName]',
            arguments: {
              count: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'insertRows',
            blockType: Scratch.BlockType.COMMAND,
            text: 'insert [count] rows into grid [gridName] at index [idx]',
            arguments: {
              count: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu',
              },
              idx: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'insertColumns',
            blockType: Scratch.BlockType.COMMAND,
            text: 'insert [count] columns into grid [gridName] at index [idx]',
            arguments: {
              count: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu',
              },
              idx: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'deleteRow',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete row #[rowNum] from grid [gridName]',
            arguments: {
              rowNum: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'deleteColumn',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete column #[columnNum] from grid [gridName]',
            arguments: {
              columnNum: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'setCellValue',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set value of cell at x: [x] y: [y] to [value] in grid [gridName]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'value'
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'getCellValue',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get value of cell at x: [x] y: [y] in grid [gridName]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'indexesOf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'all indexes of [value] in grid [gridName]',
            arguments: {
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'value'
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'replaceAll',
            blockType: Scratch.BlockType.COMMAND,
            text: 'replace all [oldValue] with [newValue] in grid [gridName]',
            arguments: {
              oldValue: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'value'
              },
              newValue: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'new value'
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'fillGrid',
            blockType: Scratch.BlockType.COMMAND,
            text: 'fill grid [gridName] with [value]',
            arguments: {
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'value'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'getRow',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get row [rowNum] of grid [gridName] as array',
            arguments: {
              rowNum: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'getColumn',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get column [columnNum] of grid [gridName] as array',
            arguments: {
              columnNum: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'getDimension',
            blockType: Scratch.BlockType.REPORTER,
            text: '[dimensionType] of grid [gridName]',
            arguments: {
              dimensionType: {
                type: Scratch.ArgumentType.STRING,
                menu: 'dimensionType'
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'scratchSerialize',
            blockType: Scratch.BlockType.REPORTER,
            text: 'grid [gridName] as [valueType]',
            arguments: {
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              },
              valueType: {
                type: Scratch.ArgumentType.STRING,
                menu: 'JSONtype'
              }
            },
            hideFromPalette: false
          },
          {blockType: Scratch.BlockType.LABEL, text: 'Iteration'},
          {
            opcode: 'iterateItems',
            blockType: Scratch.BlockType.LOOP,
            text: 'for each [item] [x] [y] in grid [gridName]',
            arguments: {
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              },
              item: {}, x: {}, y: {}
            },
            hideFromPalette: true
          },
          {
            opcode: 'iterationItem',
            blockType: Scratch.BlockType.REPORTER,
            text: 'item',
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            opcode: 'iterationX',
            blockType: Scratch.BlockType.REPORTER,
            text: 'x',
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            opcode: 'iterationY',
            blockType: Scratch.BlockType.REPORTER,
            text: 'y',
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            opcode: 'iterateRows',
            blockType: Scratch.BlockType.LOOP,
            text: 'for each [row] [idx] in grid [gridName]',
            arguments: {
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              },
              row: {}, idx: {}
            },
            hideFromPalette: true
          },
          {
            opcode: 'iterationRow',
            blockType: Scratch.BlockType.REPORTER,
            text: 'row',
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            opcode: 'iterateColumns',
            blockType: Scratch.BlockType.LOOP,
            text: 'for each [column] [idx] in grid [gridName]',
            arguments: {
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              },
              column: {}, idx: {}
            },
            hideFromPalette: true
          },
          {
            opcode: 'iterationColumn',
            blockType: Scratch.BlockType.REPORTER,
            text: 'column',
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            opcode: 'iterationIdx',
            blockType: Scratch.BlockType.REPORTER,
            text: 'index',
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: `
              <block type="epDataGrids_iterateItems">
                <value name="item"><shadow type="epDataGrids_iterationItem"></shadow></value>
                <value name="x"><shadow type="epDataGrids_iterationX"></shadow></value>
                <value name="y"><shadow type="epDataGrids_iterationY"></shadow></value>
                <value name="gridName"><shadow type="text"><field name="gridName"/></shadow></value>
              </block>
              <sep gap="36"/>
              <block type="epDataGrids_iterateRows">
                <value name="row"><shadow type="epDataGrids_iterationRow"></shadow></value>
                <value name="idx"><shadow type="epDataGrids_iterationIdx"></shadow></value>
                <value name="gridName"><shadow type="dropdown"/></value>
            `
          },
          {blockType: Scratch.BlockType.LABEL, text: 'Utilities'},
          {blockType: Scratch.BlockType.LABEL,
            text: 'This one is for grid-related custom'
          },{blockType: Scratch.BlockType.LABEL,
            text: 'blocks so you can use a menu instead'
          },{blockType: Scratch.BlockType.LABEL,
            text: 'of manually typing a name every time.'},
          {
            opcode: 'getGridName',
            blockType: Scratch.BlockType.REPORTER,
            text: 'util [gridName]',
            arguments: {
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            }
          }
        ],
        menus: {
          gridMenu: {
            acceptReporters: true,
            items: 'getGridMenu'
          },
          JSONtype: {
            acceptReporters: false,
            items: ['array','object']
          },
          dimensionType: {
            acceptReporters: false,
            items: ['width','height']
          }
        }
      };
    }
    getGridMenu() {
      return Object.keys(grids).length === 0? [''] : Object.keys(grids)
    }
    newGrid() {
      var defaultGridNameNum = 1;
      var defaultGridName = `my grid ${defaultGridNameNum}`;
      Object.keys(grids).forEach(
        key => {
          if (key == defaultGridName) {
            defaultGridNameNum += 1;
            defaultGridName = `my grid ${defaultGridNameNum}`;
          }
        }
      );
      const gridName = prompt('What should the grid be called?',defaultGridName);
      if (gridName in grids) {
        alert('This grid name is in use.');
      } else if (gridName.includes('[') || gridName.includes(']')) {
        alert('Grid names cannot contain square brackets - [ or ]');
      } else {
        grids[gridName] = Grid.new(0,0);
      }
      vm.extensionManager.refreshBlocks();
      updateProjectStorage();
    }
    deleteGrid() {
      const toDelete = prompt('What is the grid that should be deleted called?');
      if (toDelete in grids) {
        if (confirm(`Are you sure you want to delete grid ${JSON.stringify(toDelete)}`)) {
          delete grids[toDelete];
          vm.extensionManager.refreshBlocks();
        }
      } else {
        alert(`Grid ${JSON.stringify(toDelete)} not found`)
      }
    }
    gridExists(args) {
      return args.gridName in grids;
    }
    addRows(args) {
      if (args.gridName in grids) {
        grids[args.gridName].addRows(args.count)
      } else {
        console.error('Data Grids: Grid not found')
      }
    }
    addColumns(args) {
      if (args.gridName in grids) {
        grids[args.gridName].addColumns(args.count)
      } else {
        console.error('Data Grids: Grid not found')
      }
    }
    insertRows(args) {
      if (args.gridName in grids) {
        grids[args.gridName].insertRows(args.count,args.idx)
      } else {
        console.error('Data Grids: Grid not found')
      }
    }
    insertColumns(args) {
      if (args.gridName in grids) {
        grids[args.gridName].insertColumns(args.count,args.idx);
      } else {
        console.error('Data Grids: Grid not found');
      }
    }
    deleteRow(args) {
      if (args.gridName in grids) {
        grids[args.gridName].deleteRow(args.rowNum);
      } else {
        console.error('Data Grids: Grid not found')
      }
    }
    deleteColumn(args) {
      if (args.gridName in grids) {
        grids[args.gridName].deleteColumn(args.columnNum);
      } else {
        console.error('Data Grids: Grid not found')
      }
    }
    setCellValue(args) {
      if (args.gridName in grids) {
        grids[args.gridName].set(args.x,args.y,args.value);
      } else {
        console.error('Data Grids: Grid not found');
      }
    }
    getCellValue(args){
      if (args.gridName in grids) {
        return grids[args.gridName].get(args.x,args.y);
      } else {
        console.error('Data Grids: Grid not found');
        return '';
      }
    }
    indexesOf(args) {
      if (args.gridName in grids) {
        return JSON.stringify(grids[args.gridName].findAll(args.value))
      } else {
        console.error('Data Grids: Grid not found');
        return []
      }
    }
    replaceAll(args) {
      if (args.gridName in grids) {
        grids[args.gridName].replaceAll(args.oldValue,args.newValue)
      } else {
        console.error('Data Grids: Grid not found')
      }
    }
    fillGrid(args) {
      if (args.gridName in grids) {
        grids[args.gridName].fill(args.value)
      } else {
        console.error('Data Grids: Grid not found')
      }
    }
    getRow(args) {
      if (args.gridName in grids) {
        return JSON.stringify(grids[args.gridName].getRow(args.rowNum))
      } else {
        console.error('Data Grids: Grid not found');
        return '[]';
      }
    }
    getColumn(args) {
      if (args.gridName in grids) {
        return JSON.stringify(grids[args.gridName].getColumn(args.columnNum))
      } else {
        console.error('Data Grids: Grid not found');
        return '[]';
      }
    }
    getDimension(args) {
      if (args.gridName in grids) {
        return args.dimensionType === 'width' ? grids[args.gridName].getWidth() : grids[args.gridName].getHeight();
      } else {
        console.error('Data Grids: Grid not found');
        return 0;
      }
    }
    scratchSerialize(args) {
      if (args.gridName in grids) {
        return args.valueType === 'array' ? grids[args.gridName].serialize() : grids[args.gridName].serializeObject();
      } else {
        console.error('Data Grids: Grid not found');
        return args.valueType === 'array' ? '[]' : '{}';
      }
    }
    getGrids() {
      return JSON.stringify(Object.keys(grids));
    }
    getGridName(args) {
      if (args.gridName in grids) {
        return args.gridName;
      } else {
        console.error('Data Grids: Grid not found');
        return '';
      }
    }
  }

  Scratch.extensions.register(new epDataGrids());
})(Scratch);
