/* eslint-disable no-undef */
/* eslint-disable no-multi-spaces */

// CONTAINER SVG
const svgNs = 'http://www.w3.org/2000/svg';
const svgCanvas = document.createElementNS(svgNs, 'svg');
svgCanvas.setAttribute('viewBox', '0 0 100 100');

const shapesWidth = 10;
const xColsOrigin = 18;
let   xCols       = 18;
let   yRows       = 18;

for (let i = 0; i < 5; i += 1) {
  for (let j = 0; j < 5; j += 1) {
    if (i === j) {
      const rectangle = document.createElementNS(svgNs, 'rect');
      rectangle.setAttribute('x', xCols - 5);
      rectangle.setAttribute('y', yRows - 5);
      rectangle.setAttribute('width', shapesWidth);
      rectangle.setAttribute('height', shapesWidth);
      rectangle.setAttribute('stroke', '#33FF21');
      rectangle.setAttribute('fill', 'white');
      rectangle.setAttribute('id', `${i}${j}`);
      if (i === 2 && j === 2) {
        rectangle.setAttribute('transform', 'rotate(-45 48 48)');
      }
      svgCanvas.appendChild(rectangle);
    } else {
      const circle = document.createElementNS(svgNs, 'circle');
      circle.setAttribute('cx', xCols);
      circle.setAttribute('cy', yRows);
      circle.setAttribute('r', shapesWidth / 2);
      circle.setAttribute('stroke', 'blue');
      circle.setAttribute('fill', 'white');
      circle.setAttribute('id', `${i}${j}`);
      svgCanvas.appendChild(circle);
    }
    xCols += 15;
  }
  xCols  = xColsOrigin;
  yRows += 15;
}

document.getElementById('container').appendChild(svgCanvas);

function fillShapes(params) {
  $('circle, rect').addClass('fill');
}
$('#fill-shapes').on('click', fillShapes);


function clearShapes(params) {
  $('circle, rect').removeClass('fill');
}
$('#clear-shapes').on('click', clearShapes);

document.addEventListener('click', (el) => {
  if (el.target.nodeName === 'circle') {
    $(el.target).toggleClass('fill');
  }
}, true);
