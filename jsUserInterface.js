(function(Scratch) {
    'use strict';
    class jsUserInterface {
        getInfo() {
            return {
                id: 'jsUserInterface',
                name: 'JS User Interface',
                color1: '#4CAF50',
                color2: '#66BB6A',
                blocks: [
                    {
                        opcode: 'alertBlock',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'alert [INPUT]',
                        arguments: {
                            INPUT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello!'
                            }
                        }
                    },
                    {
                        opcode: 'promptBlock',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'prompt [INPUT]',
                        arguments: {
                            INPUT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'What is your name?'
                            }
                        }
                    },
                    {
                        opcode: 'confirmBlock',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'confirm [INPUT]',
                        arguments: {
                            INPUT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Are you sure?'
                            }
                        }
                    }
                ]
            };
        }

        alertBlock(args) {
            alert(args.INPUT);
        }
        promptBlock(args) {
            return prompt(args.INPUT) || '';
        }
        confirmBlock(args) {
            return confirm(args.INPUT);
        }
    }
    Scratch.extensions.register(new jsUserInterface());
})(Scratch);
