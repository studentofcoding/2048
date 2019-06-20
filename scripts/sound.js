const sOne = new Audio('sound/one.wav');
const sTwo = new Audio('sound/two.wav');
const sThree = new Audio('sound/three.wav');
const sFour = new Audio('sound/four.wav');
const sFive = new Audio('sound/five.wav');
const sSix = new Audio('sound/six.wav');
const sSeven = new Audio('sound/seven.wav');
const sEight = new Audio('sound/eight.wav');

let arrpos = 0;
const soundArr = [sOne, sTwo, sThree, sFour, sFive, sSix, sSeven, sEight];

var playSound = () => {
  if(soundArr[arrpos]) {
    soundArr[arrpos].play();
  }
  arrpos = (arrpos + 1) % 8;
}
