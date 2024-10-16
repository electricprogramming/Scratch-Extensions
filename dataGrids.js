(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    alert(`Data Grids Extension must be ran unsandboxed.`);
    throw new Error(`Data Grids Extension must be ran unsandboxed.`);
  }
  const [isTW,isPM] = [!Scratch.extensions.isPenguinMod, Scratch.extensions.isPenguinMod];
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
  const regenReporters = ['epDataGrids_iterationItem', 'epDataGrids_iterationX', 'epDataGrids_iterationY', 'epDataGrids_iterationRow', 'epDataGrids_iterationColumn', 'epDataGrids_iterationIdx'];
  if (Scratch.gui) Scratch.gui.getBlockly().then(SB => {
    const originalCheck = SB.scratchBlocksUtils.isShadowArgumentReporter;
    SB.scratchBlocksUtils.isShadowArgumentReporter = function (block) {
      const result = originalCheck(block);
      if (result) return true;
      return block.isShadow() && regenReporters.includes(block.type);
    };
  });
  const originalConverter = vm.runtime._convertBlockForScratchBlocks.bind(vm.runtime);
  vm.runtime._convertBlockForScratchBlocks = function (blockInfo, categoryInfo) {
    const res = originalConverter(blockInfo, categoryInfo);
    if (blockInfo.outputShape) res.json.outputShape = blockInfo.outputShape;
    return res;
  }
  let grids = {};
  const customStorage = {
    set: (data) => {
      if (isTW) vm.runtime.extensionStorage.epDataGrids = {data};
    },
    get: () => {
      if (isTW) return vm.runtime.extensionStorage.epDataGrids?.data; else return;
    }
  }
  function serializeState() {
    let result = {};
    Object.keys(grids).forEach(key => {
      result[key] = grids[key].serialize();
    })
    return result
  }
  function updateProjectStorage() {
    customStorage.set(serializeState());
  }
  function deserializeState(state) {
    console.log('Data Grids: Loading serialized project data')
    grids = {};
    Object.keys(state).forEach(key => {
      grids[key] = Grid.deserialize(state[key])
    })
    vm.extensionManager.refreshBlocks();
  }
  if (isTW) vm.runtime.on('PROJECT_LOADED', () => {
    const data = customStorage.get();
    deserializeState(data)
  })
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
          {
            opcode: 'getGrids',
            blockType: Scratch.BlockType.REPORTER,
            text: 'all grids',
            disableMonitor: true,
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
            disableMonitor: true,
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
            disableMonitor: true,
            hideFromPalette: false
          },
          {blockType: Scratch.BlockType.LABEL, text: 'Iteration'},
          {
            opcode: 'iterateItems',
            blockType: Scratch.BlockType.LOOP,
            text: 'for each [item] [x] [y] in grid [gridName]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                fillIn: 'iterationItem'
              },
              x: {
                type: Scratch.ArgumentType.STRING,
                fillIn: 'iterationX'
              },
              y: {
                type: Scratch.ArgumentType.STRING,
                fillIn: 'iterationY'
              },
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            hideFromPalette: true
          },
          {
            opcode: 'iterationItem',
            blockType: Scratch.BlockType.REPORTER,
            outputShape: 3,
            text: 'item',
            canDragDuplicate: true,
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            opcode: 'iterationX',
            blockType: Scratch.BlockType.REPORTER,
            outputShape: 3,
            text: 'x',
            canDragDuplicate: true,
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            opcode: 'iterationY',
            blockType: Scratch.BlockType.REPORTER,
            outputShape: 3,
            text: 'y',
            canDragDuplicate: true,
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
              row: {
                type: Scratch.ArgumentType.STRING,
                fillIn: 'iterationRow'
              },
              idx: {
                type: Scratch.ArgumentType.STRING,
                fillIn: 'iterationIdx'
              }
            },
            hideFromPalette: true
          },
          {
            opcode: 'iterationRow',
            blockType: Scratch.BlockType.REPORTER,
            outputShape: 3,
            text: 'row',
            canDragDuplicate: true,
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
              column: {
                type: Scratch.ArgumentType.STRING,
                fillIn: 'iterationColumn'
              },
              idx: {
                type: Scratch.ArgumentType.STRING,
                fillIn: 'iterationIdx'
              }
            },
            hideFromPalette: true
          },
          {
            opcode: 'iterationColumn',
            blockType: Scratch.BlockType.REPORTER,
            outputShape: 3,
            text: 'column',
            canDragDuplicate: true,
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            opcode: 'iterationIdx',
            blockType: Scratch.BlockType.REPORTER,
            outputShape: 3,
            text: 'index',
            canDragDuplicate: true,
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            opcode: 'xmlMenu',
            func: 'getGridName',
            blockType: Scratch.BlockType.REPORTER,
            text: '[gridName]',
            arguments: {
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            // Iteration for Items
            blockType: Scratch.BlockType.XML,
            xml: `
              <block type="epDataGrids_iterateItems">
                <value name="item"><shadow type="epDataGrids_iterationItem"></shadow></value>
                <value name="x"><shadow type="epDataGrids_iterationX"></shadow></value>
                <value name="y"><shadow type="epDataGrids_iterationY"></shadow></value>
              </block>`
          },
          {
            // Iteration for Rows
            blockType: Scratch.BlockType.XML,
            xml: `
              <block type="epDataGrids_iterateRows">
                <value name="row"><shadow type="epDataGrids_iterationRow"></shadow></value>
                <value name="idx"><shadow type="epDataGrids_iterationIdx"></shadow></value>
              </block>`
          },
          {
            // Iteration for Columns
            blockType: Scratch.BlockType.XML,
            xml: `
              <block type="epDataGrids_iterateColumns">
                <value name="column"><shadow type="epDataGrids_iterationColumn"></shadow></value>
                <value name="idx"><shadow type="epDataGrids_iterationIdx"></shadow></value>
              </block>
            `
          },
          {blockType: Scratch.BlockType.LABEL, text: 'Utilities'},
          {
            blockType: Scratch.BlockType.XML,
            xml: `<label text="This one is for grid-related custom"/><sep gap="-12"/><sep gap="12"/>
            <sep gap="-10"/><label text="blocks so you can use a menu instead"/><sep gap="-12"/><sep gap="12"/>
            <sep gap="-10"/><label text="of manually typing a name every time."/><sep gap="-12"/><sep gap="12"/>`
          },
          {
            opcode: 'getGridName',
            blockType: Scratch.BlockType.REPORTER,
            text: 'util [gridName]',
            arguments: {
              gridName: {
                type: Scratch.ArgumentType.STRING,
                menu: 'gridMenu'
              }
            },
            disableMonitor: true,
            hideFromPalette: false
          }
        ],
        menus: {
          gridMenu: {
            acceptReporters: false,
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
        if (confirm(`Are you sure you want to delete grid ${JSON.stringify(toDelete)}?`)) {
          delete grids[toDelete];
        }
      } else {
        alert(`Grid ${JSON.stringify(toDelete)} not found`)
      }
      vm.extensionManager.refreshBlocks();
      updateProjectStorage();
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
      updateProjectStorage();
    }
    addColumns(args) {
      if (args.gridName in grids) {
        grids[args.gridName].addColumns(args.count)
      } else {
        console.error('Data Grids: Grid not found')
      }
      updateProjectStorage();
    }
    insertRows(args) {
      if (args.gridName in grids) {
        grids[args.gridName].insertRows(args.count,args.idx)
      } else {
        console.error('Data Grids: Grid not found')
      }
      updateProjectStorage();
    }
    insertColumns(args) {
      if (args.gridName in grids) {
        grids[args.gridName].insertColumns(args.count,args.idx);
      } else {
        console.error('Data Grids: Grid not found');
      }
      updateProjectStorage();
    }
    deleteRow(args) {
      if (args.gridName in grids) {
        grids[args.gridName].deleteRow(args.rowNum);
      } else {
        console.error('Data Grids: Grid not found')
      }
      updateProjectStorage();
    }
    deleteColumn(args) {
      if (args.gridName in grids) {
        grids[args.gridName].deleteColumn(args.columnNum);
      } else {
        console.error('Data Grids: Grid not found')
      }
      updateProjectStorage();
    }
    setCellValue(args) {
      if (args.gridName in grids) {
        grids[args.gridName].set(args.x,args.y,args.value);
      } else {
        console.error('Data Grids: Grid not found');
      }
      updateProjectStorage();
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
        return '[]';
      }
    }
    replaceAll(args) {
      if (args.gridName in grids) {
        grids[args.gridName].replaceAll(args.oldValue,args.newValue)
      } else {
        console.error('Data Grids: Grid not found')
      }
      updateProjectStorage();
    }
    fillGrid(args) {
      if (args.gridName in grids) {
        grids[args.gridName].fill(args.value)
      } else {
        console.error('Data Grids: Grid not found')
      }
      updateProjectStorage();
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
    iterateItems(args, util) {
      if (!(args.gridName in grids)) {
        console.error('Data Grids: Grid not found');
        return false;
      }
      const grid = grids[args.gridName];
      const itemCount = grid.getWidth() * grid.getHeight();
      const flattenedArr = grid.getItems().flat(Infinity);
      if (util.stackFrame.loopCounter === undefined) {
        util.stackFrame.loopCounter = itemCount;
      }
      const index = Math.abs(util.stackFrame.loopCounter - itemCount);
      
      util.thread.epGridsIterationData = {
        item: flattenedArr[index],
        x: (index % grid.getWidth()) + 1,
        y: Math.floor(index / grid.getWidth()) + 1
      }
      util.stackFrame.loopCounter--;
      if (util.stackFrame.loopCounter >= 0) {
        util.startBranch(1, true);
      } else {
        delete util.thread.epGridsIterationData;
      }
    }
    iterationItem(args,util) {
      return util.thread.epGridsIterationData?.item || '';
    }
    iterationX(args, util) {
      return util.thread.epGridsIterationData?.x || '';
    }
    iterationY(args, util) {
      return util.thread.epGridsIterationData?.y || '';
    }
    iterateRows(args, util) {
      if (!(args.gridName in grids)) {
        console.error('Data Grids: Grid not found');
        return false;
      }
      const grid = grids[args.gridName];
      const rowCount = grid.getHeight();
      if (util.stackFrame.loopCounter === undefined) {
        util.stackFrame.loopCounter = rowCount;
      }
      const index = Math.abs(util.stackFrame.loopCounter - rowCount) + 1;
      
      util.thread.epGridsIterationData = {
        row: JSON.stringify(grid.getRow(index)),
        idx: index
      }
      util.stackFrame.loopCounter--;
      if (util.stackFrame.loopCounter >= 0) {
        util.startBranch(1, true);
      } else {
        delete util.thread.epGridsIterationData;
      }
    }
    iterationRow(args, util) {
      return util.thread.epGridsIterationData?.row || '';
    }
    iterateColumns(args, util) {
      if (!(args.gridName in grids)) {
        console.error('Data Grids: Grid not found');
        return false;
      }
      const grid = grids[args.gridName];
      const columnCount = grid.getWidth();
      if (util.stackFrame.loopCounter === undefined) {
        util.stackFrame.loopCounter = columnCount;
      }
      const index = Math.abs(util.stackFrame.loopCounter - columnCount) + 1;
      
      util.thread.epGridsIterationData = {
        column: JSON.stringify(grid.getColumn(index)),
        idx: index
      }
      util.stackFrame.loopCounter--;
      if (util.stackFrame.loopCounter >= 0) {
        util.startBranch(1, true);
      } else {
        delete util.thread.epGridsIterationData;
      }
    }
    iterationColumn(args, util) {
      return util.thread.epGridsIterationData?.column || '';
    }
    iterationIdx(args, util) {
      return util.thread.epGridsIterationData?.idx || '';
    }
  }
  if (isPM) {
    epDataGrids.prototype.serialize = () => {
      return {epDataGrids: serializeState()}
    }
    epDataGrids.prototype.deserialize = (data) => {
      if (data.epDataGrids !== undefined) {
        deserializeState(data.epDataGrids);
      }
    }
  }
  Scratch.extensions.register(new epDataGrids());
})(Scratch);
