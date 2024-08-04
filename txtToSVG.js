// Name: SVG Text Generator
// ID: svgtextgenerator
// Description: Generate SVG for the given text, fitting it within a 340x127 box.
// By: YourName <https://scratch.mit.edu/users/YourName/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  class SVGTextGenerator {
    getInfo() {
      return {
        id: "svgtextgenerator",
        name: "SVG Text Generator",
        blocks: [
          {
            opcode: "getSVGForText",
            blockType: Scratch.BlockType.REPORTER,
            text: "get SVG for text [TXT] with width [WIDTH] and height [HEIGHT]",
            arguments: {
              TXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, World!"
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 340
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 127
              }
            }
          }
        ]
      };
    }

    getSVGForText({ TXT, WIDTH, HEIGHT }) {
      const width = parseFloat(WIDTH);
      const height = parseFloat(HEIGHT);
      const initialFontSize = 1000; // Larger starting font size

      // Create an SVG element
      const svgNamespace = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNamespace, 'svg');
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.setAttribute('xmlns', svgNamespace);

      // Create a text element
      const textElement = document.createElementNS(svgNamespace, 'text');
      textElement.setAttribute('x', width / 2);
      textElement.setAttribute('y', height / 2);
      textElement.setAttribute('text-anchor', 'middle');
      textElement.setAttribute('dominant-baseline', 'middle');

      // Set the initial large font size
      let fontSize = initialFontSize;
      textElement.setAttribute('font-size', fontSize);

      // Create a temporary container to measure text size
      const tempSvg = document.createElementNS(svgNamespace, 'svg');
      tempSvg.setAttribute('width', width);
      tempSvg.setAttribute('height', height);
      const tempText = document.createElementNS(svgNamespace, 'text');
      tempText.setAttribute('x', width / 2);
      tempText.setAttribute('y', height / 2);
      tempText.setAttribute('text-anchor', 'middle');
      tempText.setAttribute('dominant-baseline', 'middle');
      tempSvg.appendChild(tempText);
      document.body.appendChild(tempSvg);

      function measureTextSize(text, fontSize) {
        tempText.textContent = text;
        tempText.setAttribute('font-size', fontSize);
        const bbox = tempText.getBBox();
        return { width: bbox.width, height: bbox.height };
      }

      let textSize = measureTextSize(TXT, fontSize);

      // Adjust the font size to fit within the box
      while (textSize.width > width || textSize.height > height) {
        fontSize -= 1;
        textElement.setAttribute('font-size', fontSize);
        textSize = measureTextSize(TXT, fontSize);
      }

      document.body.removeChild(tempSvg);

      // Set the final font size and add text to SVG
      textElement.textContent = TXT;
      svg.appendChild(textElement);

      // Serialize SVG to string
      const serializer = new XMLSerializer();
      return serializer.serializeToString(svg);
    }
  }

  Scratch.extensions.register(new SVGTextGenerator());
})(Scratch);
