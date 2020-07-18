function handleDouble(number) {
  return number * 2;
}

async function setDoubleNumber(number) {
  const time = Math.floor(Math.random() * 100 + 1);

  return await setTimeout(async () => {
    await console.log(handleDouble(number));
  }, time);
}

setDoubleNumber(1);
setDoubleNumber(2);
setDoubleNumber(4);
setDoubleNumber(6);
setDoubleNumber(8);
