function handleRandom(number, time) {
  return setTimeout(() => console.log(number * 2), time);
}

function setDoubleNumber(number, callback) {
  const time = Math.floor(Math.random() * 100 + 1);

  callback(number, time);
}

setDoubleNumber(8, handleRandom);
