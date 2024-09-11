(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;

  function generateUUID() {
    // UUID version 4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      const UUID = v.toString(16);
      console.log(`Generated UUID: ` + UUID)
      return UUID;
    });
  }

  class customstorageextension {
    getInfo() {
      return {
        id: "customstorageextension",
        name: "Custom Storage Extension",
        blocks: [
          {
            opcode: "set_project_data",
            blockType: Scratch.BlockType.COMMAND,
            text: "set project data to [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello, World!'
              }
            }
          },
          {
            opcode: "get_project_data",
            blockType: Scratch.BlockType.REPORTER,
            text: "get project data"
          }
        ]
      };
    }

    set_project_data(args) {
      const data = args.TEXT;
      const stage = vm.runtime.targets.find(target => target.isStage);

      if (!stage) {
        console.error('Stage not found');
        return;
      }

      let comment = null;
      for (const id in stage.comments) {
        const commentData = stage.comments[id];
        if (commentData.text.startsWith("CONFIGURATION FOR TEST EXTENSION:")) {
          comment = commentData;
          break;
        }
      }

      if (!comment) {
        console.log('Creating new comment');
        comment = {
          id: generateUUID(),
          text: `CONFIGURATION FOR TEST EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
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
        comment.text = `CONFIGURATION FOR TEST EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
` + data;
      }

      // Request a re-render of blocks and comments
      vm.runtime.emitProjectChanged();
    }

    get_project_data() {
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
        if (comment.text.startsWith("CONFIGURATION FOR TEST EXTENSION:")) {
          const prefix = `CONFIGURATION FOR TEST EXTENSION: YOU CAN MOVE, RESIZE, AND MINIMIZE THIS COMMENT, BUT DO NOT DELETE IT OR IT WILL BREAK THE EXTENSION'S SAVED DATA, WHICH MAY BE CRITICAL TO THE PROJECT. EDITING IT OR CREATING ANOTHER COMMENT TOO SIMILAR TO IT MAY ALSO BREAK THE SAVED DATA.
`;
          const data = comment.text.slice(prefix.length).trim();
          console.log('Found comment data');
          return data;
        }
      }

      console.log('No relevant comment found');
      return '';
    }
  }

  Scratch.extensions.register(new customstorageextension());
})(Scratch);
