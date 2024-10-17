(function(){
  let lastOpenedFileData = {name: '', extension: '', size: 0, contentAsText: '', contentAsDataURL: ''};
  function promptForFile(acceptedExtensions = []) {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      if (acceptedExtensions.length > 0) {
        input.accept = acceptedExtensions.map(ext => ext).join(',');
      }
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
  function _downloadFile(fileName, content) {
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
  class JSforScratch {
    getInfo() {
      return {
        id: "jsForScratch",
        name: "JavaScript",
        blocks: [
          {
            blockType: "command",
            opcode: "commandJS",
            text: "js [code]",
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
            text: "js [code]",
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
            text: "js [code]",
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
                defaultValue: "function(a,b){return Number(a) + Number(b);}"
              },
              ARGS: {
                type: "string",
                defaultValue: "[2,5]"
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
                defaultValue: "function(a,b){return Number(a) + Number(b);}"
              },
              ARGS: {
                type: "string",
                defaultValue: "[2,5]"
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
                defaultValue: "['.txt']"
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
            text: "download file [contents] as [name]",
            arguments: {
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
            text: "when [bool] is true",
            isEdgeActivated: true,
            arguments: {
              bool: {
                type: "Boolean",
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
                defaultValue: "Hello"
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
        ],
        menus: {
          fileDataTypes: {
            acceptReporters: false,
            items: ["content as text","content as dataURL","name","extension","size"]
          }
        }
      };
    }
    commandJS(args) {
      eval(args.code);
    }
    reporterJS(args) {
      return eval(args.code);
    }
    booleanJS(args) {
      return eval(args.code)? true : false;
    }
    functionCommand(args) {
      eval(`let func = ${args.function}; func(...JSON.parse(args.ARGS))`);
    }
    functionReporter(args) {
      return eval(`let func = ${args.function}; func(...JSON.parse(args.ARGS))`);
    }
    functionBoolean(args) {
      return eval(`let func = ${args.function}; func(...JSON.parse(args.ARGS))`)? true : false;
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
      promptForFile(JSON.parse(args.types))
        .then(fileInfo => {
          lastOpenedFileData = fileInfo;
        })
        .catch(e => {
          console.error(error)
        })
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
        case "size":
          return lastOpenedFileData.size;
        default:
          return "";
      }
    }
    downloadFile(args) {
      _downloadFile(args.name, args.contents)
    }
  }
  window.vm = (node => {
    node = document.querySelector('div[class*=stage-header_stage-header-wrapper]');
    node = node[Object.keys(node).find(key => (key = String(key), key.startsWith('__reactInternal') || key.startsWith('__reactFiber')))].return.return.return;
    node = node.stateNode?.props?.vm || node.return?.updateQueue?.stores?.[0]?.value?.vm;
    if (!node) throw new Error('Could not find VM :(');
    return node;
  })();
  (function() {
    var extensionInstance = new JSforScratch(window.vm.extensionManager.runtime);
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance);
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName);
  })();
})();
