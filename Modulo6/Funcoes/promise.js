function double(number) {
  return number * 2;
}

function handleDouble(number) {
  return new Promise((resolve, reject) => {
    resolve(double(number));
  });
}

function setDoubleNumber(number) {
  const time = Math.floor(Math.random() * 100 + 1);

  setTimeout(() => {
    handleDouble(number).then((results) => {
      console.log(results);
    });
  }, time);
}

setDoubleNumber(1);
setDoubleNumber(2);
setDoubleNumber(4);
setDoubleNumber(6);
setDoubleNumber(8);
