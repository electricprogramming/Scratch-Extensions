(function (Scratch) {
  "use strict";
  function getIcon() {
    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+ICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIGZpbGw9IiNmZjI4MGEiLz4gICA8ZyBpZD0iYWxsLWVsZW1lbnRzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNCwtNCkgc2NhbGUoMS40LDEuNCkiPiAgICAgPGcgaWQ9ImdyaWQtc3F1YXJlcyIgZmlsbD0id2hpdGUiPiA8IS0tR3JpZCBTcXVhcmVzLS0+ICAgICAgIDxyZWN0IHg9IjMyIiB5PSIzMiIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+ICAgICAgIDxyZWN0IHg9IjQ4IiB5PSIzMiIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+ICAgICAgIDxyZWN0IHg9IjMyIiB5PSI0OCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+ICAgICAgIDxyZWN0IHg9IjQ4IiB5PSI0OCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+ICAgICA8L2c+ICAgICA8ZyBpZD0iYnVsbGV0LXBvaW50cyIgZmlsbD0id2hpdGUiPiAgICAgICA8ZyBpZD0idG9wIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC44NSwwKSI+IDwhLS1Ub3AgQnVsbGV0IFBvaW50cy0tPiAgICAgICAgIDxjaXJjbGUgY3g9IjM4IiBjeT0iMjAiIHI9IjQiLz4gICAgICAgICA8Y2lyY2xlIGN4PSI1NCIgY3k9IjIwIiByPSI0Ii8+ICAgICAgIDwvZz4gICAgICAgPGcgaWQ9ImxlZnQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTAuODUpIj4gPCEtLUxlZnQgQnVsbGV0IFBvaW50cy0tPiAgICAgICAgIDxjaXJjbGUgY3g9IjIwIiBjeT0iMzgiIHI9IjQiLz4gICAgICAgICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjU0IiByPSI0Ii8+ICAgICAgIDwvZz4gICAgIDwvZz4gICA8L2c+IDwvc3ZnPg=='
  }
  const vm = Scratch.vm;
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
    'set',(value) => {
      // set custom storage
    },
    'get',() => {
      // get custom storage
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
    serializeArray() {
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
  class ScratchDataGrids {
    getInfo() {
      return {
        id: 'epDataGrids',
        name: 'Data Grids',
        color1: '#ff280a',
        color2: '#b2220a',
        menuIconURI: getIcon(),
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Grid Management'
          },
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
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Data Management'
          },
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
            }
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
            }
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
            opcode: 'serialize',
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
          {
            opcode: 'getGrids',
            blockType: Scratch.BlockType.REPORTER,
            text: 'all grids',
            disableMonitor: true,
            hideFromPalette: false
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
    getDimension(args) {
      if (args.gridName in grids) {
        return args.dimensionType === 'width' ? grids[args.gridName].getWidth() : grids[args.gridName].getHeight();
      } else {
        console.error('Data Grids: Grid not found');
        return 0;
      }
    }
    serialize(args) {
      if (args.gridName in grids) {
        return args.valueType === 'array' ? grids[args.gridName].serializeArray() : grids[args.gridName].serializeObject();
      } else {
        console.error('Data Grids: Grid not found');
        return args.valueType === 'array' ? '[]' : '{}';
      }
    }
    getGrids() {
      return JSON.stringify(Object.keys(grids));
    }
  }

  Scratch.extensions.register(new ScratchDataGrids());
})(Scratch);
