(function(Scratch){
  let lastOpenedFileData = {name: '', extension: '', size: 0, contentAsText: '', contentAsDataURL: ''};
  {
    let [ogError,ogWarn] = [console.error,console.warn];
    let ogLog = false ? console.log : () => {} // easy way to control whether console.log does anything.
    console.log = function(...args){
      ogLog('JavaScript Extension:',...args)
    };
    console.error = function(...args) {
      ogError('Error in JavaScript Extension:',...args);
    };
    console.warn = function(...args) {
      ogWarn('Warning from JavaScript Extension:', ...args);
    };
  }
  function promptForFile(acceptedExtensions) {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = acceptedExtensions;
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          readFileData(file).then(resolve).catch(reject);
        } else {
          reject(new Error('No file selected.'));
        }
      };
      input.click();
    });
  }
  function readFileData(file) {
    return new Promise((resolve, reject) => {
      const readerText = new FileReader();
      const readerDataURL = new FileReader();
      readerText.onload = (event) => {
        const contentAsText = event.target.result;
        readerDataURL.onload = (event) => {
          const contentAsDataURL = event.target.result;
          resolve({
            name: file.name,
            extension: `.${file.name.split('.').pop()}`,
            size: file.size,
            contentAsText: contentAsText,
            contentAsDataURL: contentAsDataURL,
          });
        };
        readerDataURL.onerror = (error) => {
          reject(new Error('Error reading file as Data URL: ' + error));
        };
        readerDataURL.readAsDataURL(file);
      };
      readerText.onerror = (error) => {
        reject(new Error('Error reading file as text: ' + error));
      };
      readerText.readAsText(file);
    });
  }
  function _downloadFileByText(fileName, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  function _downloadFileByDataURL(fileName, dataURL) {
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  class JSext {
    getInfo() {
      return {
        id: "epJSext",
        name: "JavaScript",
        menuIconURI: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGN0RGMUUiIC8+PHRleHQgeD0iNjAiIHk9IjE4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjExMCIgZmlsbD0iIzAwMDAwMCIgZm9udC13ZWlnaHQ9ImJvbGQiPkpTPC90ZXh0Pjwvc3ZnPg==`,
        blocks: [
          {
            blockType: "command",
            opcode: "commandJS",
            text: "JS | [code]",
            arguments: {
              code: {
                type: "string",
                defaultValue: "alert('Hello World!')"
              },
            },
          },
          {
            blockType: "reporter",
            opcode: "reporterJS",
            text: "JS | [code]",
            arguments: {
              code: {
                type: "string",
                defaultValue: "prompt('What is your name?','Bob Smith')"
              },
            },
          },
          {
            blockType: "Boolean",
            opcode: "booleanJS",
            text: "JS | [code]",
            arguments: {
              code: {
                type: "string",
                defaultValue: "confirm('Are you sure?')"
              },
            },
          },
          {
            blockType: "command",
            opcode: "functionCommand",
            text: "run function [function] with args [ARGS]",
            arguments: {
              function: {
                type: "string",
                defaultValue: "function(...args){alert(`Running a custom function with args ${JSON.stringify(args)}`);}"
              },
              ARGS: {
                type: "string",
                defaultValue: '["Hello","World!"]'
              }
            }
          },
          {
            blockType: "reporter",
            opcode: "functionReporter",
            text: "run function [function] with args [ARGS]",
            arguments: {
              function: {
                type: "string",
                defaultValue: "function(a,b){return Number(a) + Number(b);}"
              },
              ARGS: {
                type: "string",
                defaultValue: "[2,5]"
              }
            }
          },
          {
            blockType: "Boolean",
            opcode: "functionBoolean",
            text: "run function [function] with args [ARGS]",
            arguments: {
              function: {
                type: "string",
                defaultValue: "function(a,b){return (a || b) && !(a && b);}"
              },
              ARGS: {
                type: "string",
                defaultValue: "[true, false]"
              }
            }
          },
          {
            blockType: "reporter",
            opcode: "monoArr",
            text: "[[item]]",
            arguments: {
              item: {
                type: "string",
                defaultValue: "Hello, World!"
              }
            }
          },
          {
            blockType: "reporter",
            opcode: "addToArr",
            text: "add [item] to [arr]",
            arguments: {
              item: {
                type: "string",
                defaultValue: "Hello, Fellow Scratchers!"
              },
              arr: {
                type: null,
              }
            }
          },
          {
            blockType: "command",
            opcode: "openInNewTab",
            text: "open site [url] in new tab",
            arguments: {
              url: {
                type: "string",
                defaultValue: "https://example.com"
              },
            },
          },
          {
            blockType: "command",
            opcode: "redirect",
            text: "redirect current tab to [url]",
            arguments: {
              url: {
                type: "string",
                defaultValue: "https://example.com"
              },
            },
          },
          {
            blockType: "command",
            opcode: "openFile",
            text: "open a [types] file",
            arguments: {
              types: {
                type: "string",
                defaultValue: '.txt'
              }
            }
          },
          {
            blockType: "reporter",
            opcode: "getFileData",
            text: "last opened file [thing]",
            arguments: {
              thing: {
                type: "string",
                menu: "fileDataTypes"
              }
            },
            disableMonitor: true,
          },
          {
            blockType: "command",
            opcode: "downloadFile",
            text: "download [fileContentType] [contents] as [name]",
            arguments: {
              fileContentType: {
                type: "string",
                menu: "fileContentTypes"
              },
              name: {
                type: "string",
                defaultValue: "example.txt"
              },
              contents: {
                type: "string",
                defaultValue: "Hello World!"
              },
            },
          },
          {
            blockType: "hat",
            opcode: "whenCondition",
            text: "when [bool]",
            isEdgeActivated: true,
            arguments: {
              bool: {
                type: "Boolean",
              },
            },
          },
          {
            blockType: "reporter",
            opcode: "ifElseReturn",
            text: "if [bool] then [val1] else [val2]",
            arguments: {
              bool: {
                type: "Boolean"
              },
              val1: {
                type: "string",
                defaultValue: "Hello"
              },
              val2: {
                type: "string",
                defaultValue: "World"
              },
            },
          },
          {
            blockType: "reporter",
            opcode: "literal",
            text: "[data]",
            arguments: {
              data: {
                type: "string",
                defaultValue: 'Hello, World!'
              },
            },
          }
        ],
        menus: {
          fileDataTypes: {
            acceptReporters: false,
            items: ['content as text','content as dataURL','name','extension','size in bytes']
          },
          fileContentTypes: {
            acceptReporters: false,
            items: ['text','dataURL']
          }
        }
      };
    }
    commandJS(args) {
      try {
        eval(args.code);
      } catch(e) {
        console.error(e);
      }
    }
    reporterJS(args) {
      try {
        return eval(args.code);
      } catch(e) {
        console.error(e);
        return '';
      }
    }
    booleanJS(args) {
      try {
        return eval(args.code)? true : false;
      } catch(e) {
        console.error(e);
        return false;
      }
    }
    functionCommand(args) {
      try {
        eval(`let func = ${args.function}; func(...JSON.parse(args.ARGS))`);
      } catch (e) {
        console.error(e);
      }
    }
    functionReporter(args) {
      try {
        return eval(`let func = ${args.function}; func(...JSON.parse(args.ARGS))`);
      } catch(e) {
        console.error(e);
        return '';
      }
    }
    functionBoolean(args) {
      try {
        return eval(`let func = ${args.function}; func(...JSON.parse(args.ARGS))`)? true : false;
      } catch(e) {
        console.error(e);
        return false;
      }
    }
    monoArr(args) {
      let arr = [];
      arr.push(args.item);
      return JSON.stringify(arr);
    }
    addToArr(args) {
      try {
        let arr = JSON.parse(args.arr);
        arr.push(args.item);
        return arr;
      } catch(e) {
        console.error(e);
        return [];
      }
    }
    openInNewTab(args) {
      window.open(args.url, '_blank');
    }
    redirect(args) {
      window.location.href = args.url;
    }
    whenCondition(args) {
      return args.bool? true : false;
    }
    literal(args) {
      return args.data;
    }
    ifElseReturn(args) {
      return args.bool? args.val1 : args.val2;
    }
    async openFile(args) {
      try {
        promptForFile(args.types)
          .then(fileInfo => {
            lastOpenedFileData = fileInfo;
          })
          .catch(e => {
            console.error(e)
          })
      } catch(e) {
        console.error(e);
        lastOpenedFileData = {name: '', extension: '', size: 0, contentAsText: '', contentAsDataURL: ''};
      }
    }
    getFileData(args) {
      switch (args.thing) {
        case "content as text":
          return lastOpenedFileData.contentAsText;
        case "content as dataURL":
          return lastOpenedFileData.contentAsDataURL;
        case "name":
          return lastOpenedFileData.name;
        case "extension":
          return lastOpenedFileData.extension;
        case "size in bytes":
          return lastOpenedFileData.size;
        default:
          return "";
      }
    }
    downloadFile(args) {
      try {
        if (args.fileContentType === 'text') {
          _downloadFileByText(args.name, args.contents);
        } else if (args.fileContentType === 'dataURL') {
          _downloadFileByDataURL(args.name, args.contents);
        } else return;
      } catch(e) {
        console.error(e);
      }
    }
  }
  Scratch.extensions.register(new JSext());
})(Scratch);
