function setDoubleNumber(number, callback) {
  return callback(number);
}

function handleRandom(number) {
  const time = Math.floor(Math.random() * 100 + 1);

  return setTimeout(() => console.log(number * 2), time);
}

setDoubleNumber(8, handleRandom);
