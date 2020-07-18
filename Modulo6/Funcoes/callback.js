function handleRandom(number, time) {
  return setTimeout(() => console.log(number * 2), time);
}

function setDoubleNumber(number, callback) {
  const time = Math.floor(Math.random() * 100 + 1);

  callback(number, time);
}

setDoubleNumber(1, handleRandom);
setDoubleNumber(2, handleRandom);
setDoubleNumber(3, handleRandom);
setDoubleNumber(4, handleRandom);
setDoubleNumber(5, handleRandom);
