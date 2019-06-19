
// AUDIO
const smbTheme           = new Audio('./assets/audio/smb1.mp3');
      smbTheme.loop      = true;
const smbThemeUnder      = new Audio('./assets/audio/smb1_under.mp3');
      smbThemeUnder.loop = true;
const shapeClear         = new Audio('./assets/audio/smb3_pipe.wav');
const congratulations    = new Audio('./assets/audio/smb3_airship_clear.wav');

// SVG CONTAINER
const svgNs       = 'http://www.w3.org/2000/svg';
const shapesWidth = 10;
const xColsOrigin = 18;
let   xCols       = 18;
let   yRows       = 18;
const svgViewbox  = document.createElementNS(svgNs, 'svg');
      svgViewbox.setAttribute('viewBox', '0 0 100 100');

// POPULATE VIEWBOX WITH SVG SHAPES
for (let i = 0; i < 5; i += 1) {
  for (let j = 0; j < 5; j += 1) {
    if (i === j) {
      const rectangle = document.createElementNS(svgNs, 'rect');
      rectangle.setAttribute('x', xCols - 5);
      rectangle.setAttribute('y', yRows - 5);
      rectangle.setAttribute('width', shapesWidth);
      rectangle.setAttribute('height', shapesWidth);
      rectangle.setAttribute('stroke', 'blue');
      rectangle.setAttribute('rx', 0.2);
      rectangle.setAttribute('fill', 'transparent');
      rectangle.setAttribute('id', `${i}${j}`);
      rectangle.setAttribute('class', 'rectangle');
      if (i === 2 && j === 2) {
        rectangle.setAttribute('transform', 'rotate(-45 48 48)');
        rectangle.setAttribute('class', 'diamond');
      }
      svgViewbox.appendChild(rectangle);
    } else {
      const circle = document.createElementNS(svgNs, 'circle');
      circle.setAttribute('cx', xCols);
      circle.setAttribute('cy', yRows);
      circle.setAttribute('r', shapesWidth / 2);
      circle.setAttribute('stroke', 'rgb(255, 204, 0)');
      circle.setAttribute('fill', 'transparent');
      circle.setAttribute('id', `${i}${j}`);
      svgViewbox.appendChild(circle);
    }
    xCols += 15;
  }
  xCols  = xColsOrigin;
  yRows += 15;
}

// ADD POPULATED VIEWBOX TO DOM
document.getElementById('container').appendChild(svgViewbox);

const allShapes = $('circle, rect');
const hereWeGoLavender = 'rgb(183, 165, 251)';
const mammaMiaRed      = 'rgb(254, 100, 73)';

// If Game is won, turn off the MUSIC + GREET
function gameEnded(click) {
  const bodyBgColor = $('body').css('background-color');

  if (bodyBgColor === hereWeGoLavender) {
    for (let i = 0; i < allShapes.length; i += 1) {
      if ([...allShapes[i].classList].includes('fill')) {
        return;
      }
    }

    if (click.target.nodeName !== 'svg') {
      // Stop and Rewind all background sounds
      smbThemeUnder.load();
      smbTheme.load();

      $('body').css({
        'animation-play-state': 'paused',
        'background-color': 'yellow',
      });

      congratulations.play();
      confetti.start(6000);
      return;
    }
  } else { //
    const allFilled = [...allShapes].every(el => [...el.classList].includes('fill'));
    if (allFilled) {
      smbThemeUnder.load();
      smbTheme.load();
      $('body').css('background-color', 'yellow');
      congratulations.play();
      confetti.start(6000);
    }
  }
}

// ADD EVENT DELEGATION LOGIC FOR CLICK LISTENING
document.getElementById('container').addEventListener('click', (el) => {

  const shape = el.target;
  const currentRowId   = `circle[id^="${shape.id[0]}"]`;
  const currentColId   = `circle[id$="${shape.id[1]}"]`;
  const targetIsFilled = shape.classList[1] === 'fill';
  $(shape).removeClass('bounce-coin');
  $(currentRowId).removeClass('bounce-coin');
  $(currentColId).removeClass('bounce-coin');

  if (shape.nodeName === 'circle' && shape.classList.contains('fill')) {
    $(shape).addClass('bounce-coin');
    new Audio('./assets/audio/smb3_coin.wav').play();
  } else if (shape.nodeName === 'circle') {
    new Audio('./assets/audio/smb3_kick.wav').play();
  }
  $(shape).toggleClass('fill');

  if (shape.classList[0] === 'rectangle') {
    if (targetIsFilled) {
      $(currentRowId).removeClass('fill');
      new Audio('./assets/audio/smb3_break_brick_block.wav').play();
    } else {
      new Audio('./assets/audio/smb3_frog_mario_walk.wav').play();
      $(currentRowId).addClass('fill');
    }
  }

  if (shape.classList[0] === 'diamond') {
    if (targetIsFilled) {
      new Audio('./assets/audio/smb3_thwomp.wav').play();
      $(`${currentColId}, ${currentRowId}`).removeClass('fill');
    } else {
      new Audio('./assets/audio/smb3_power-up.wav').play();
      $(`${currentColId}, ${currentRowId}`).addClass('fill');
    }
  }

  gameEnded(el);
}, true);

// BUTTON LOGIC
function fillShapes() {
  $('circle, rect').addClass('fill');
  $('circle, rect').removeClass('bounce-coin');
  $('body').css({
    'animation-play-state': 'running',
    'background-color': 'rgb(183, 165, 251)',
  });

  smbThemeUnder.load();
  smbTheme.play();
}
$('#fill-shapes').on('click', fillShapes);


function clearShapes() {
  $('circle, rect').removeClass('fill');
  $('circle, rect').removeClass('bounce-coin');
  $('body').css({
    'animation-play-state': 'paused',
    'background-color': 'rgb(255, 99, 71)',
  });

  shapeClear.play();
  smbTheme.load(); // pause & rewind main theme
  smbThemeUnder.play();
}
$('#clear-shapes').on('click', clearShapes);
