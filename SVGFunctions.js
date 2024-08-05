// Name: SVG Functions
// ID: SVGFunctions
// Description: Generate SVG for the given text, fitting it within a 340x127 box.
// By: electricprogramming - https://github.com/electricprogramming/
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  class SVGFunctions {
    getInfo() {
      return {
        blockIconURI:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iIzBGQkQ4QyIvPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsMTApIj4KICA8cGF0aCBkPSJNMzAgMTI1IEMgMzUgMzEsIDE2NSAzMSwgMTcwIDEyNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIj48L3BhdGg+CiAgPHBhdGggZD0iTTQwIDU1IEgxNjAiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNCI+PC9wYXRoPgogIDxyZWN0IHg9IjI1LjYiIHk9IjEyMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyLjUiPjwvcmVjdD4KICA8cmVjdCB4PSI5NSIgeT0iNTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMi41Ij48L3JlY3Q+CiAgPHJlY3QgeD0iMTY0LjQiIHk9IjEyMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyLjUiPjwvcmVjdD4KICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjU1IiByPSI1IiBzdHJva2U9ImJsYWNrIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjIiPjwvY2lyY2xlPgogIDxjaXJjbGUgY3g9IjE2MCIgY3k9IjU1IiByPSI1IiBzdHJva2U9ImJsYWNrIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjIiPjwvY2lyY2xlPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTE4IiBmb250LWZhbWlseT0iU2Fucy1TZXJpZiIgZm9udC1zaXplPSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iYmxhY2siIGZvbnQtd2VpZ2h0PSJib2xkIj5TVkc8L3RleHQ+CiAgPC9nPgo8L3N2Zz4=",
        id: "SVGFunctions",
        name: "SVG Functions",
        blocks: [
          {
            opcode: "getSVGForText",
            blockType: Scratch.BlockType.REPORTER,
            text: "get SVG for text [TXT] with width [WIDTH] and height [HEIGHT] shift x [SHIFTX] shift y [SHIFTY]",
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
                defaultValue: 120  // Changed default height to 120
              },
              SHIFTX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              SHIFTY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: "mergeSVGs",
            blockType: Scratch.BlockType.REPORTER,
            text: "merge SVG [SVG1] with [SVG2]",
            arguments: {
              SVG1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<svg width="100" height="100"></svg>'
              },
              SVG2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<svg width="100" height="100"></svg>'
              }
            }
          }
        ]
      };
    }

    getSVGForText({ TXT, WIDTH, HEIGHT, SHIFTX, SHIFTY }) {
      const width = parseFloat(WIDTH);
      const height = parseFloat(HEIGHT);
      const shiftX = parseFloat(SHIFTX);
      const shiftY = parseFloat(SHIFTY);
      const initialFontSize = 1000; // Updated initial font size to 1000

      // Create an SVG element
      const svgNamespace = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNamespace, 'svg');
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.setAttribute('xmlns', svgNamespace);

      // Create a text element
      const textElement = document.createElementNS(svgNamespace, 'text');
      textElement.setAttribute('x', width / 2 + shiftX);
      textElement.setAttribute('y', height / 2 + shiftY);
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

    mergeSVGs({ SVG1, SVG2 }) {
      // Parse the SVG strings into DOM elements
      const parser = new DOMParser();
      const svgDoc1 = parser.parseFromString(SVG1, 'image/svg+xml');
      const svgDoc2 = parser.parseFromString(SVG2, 'image/svg+xml');
      
      // Get the root SVG elements
      const svgElement1 = svgDoc1.documentElement;
      const svgElement2 = svgDoc2.documentElement;
      
      // Ensure the namespaces are correct
      svgElement1.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgElement1.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      
      // Create a new SVG element for the merged result
      const mergedSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      
      // Copy attributes from the first SVG to the merged SVG
      Array.from(svgElement1.attributes).forEach(attr => {
        mergedSVG.setAttribute(attr.name, attr.value);
      });
      
      // Append the contents of the first SVG to the merged SVG
      Array.from(svgElement1.childNodes).forEach(child => {
        mergedSVG.appendChild(child.cloneNode(true));
      });
      
      // Append the contents of the second SVG to the merged SVG
      Array.from(svgElement2.childNodes).forEach(child => {
        mergedSVG.appendChild(child.cloneNode(true));
      });
      
      // Return the merged SVG as a string
      const serializer = new XMLSerializer();
      return serializer.serializeToString(mergedSVG);
    }
  }

  Scratch.extensions.register(new SVGFunctions());
})(Scratch);
