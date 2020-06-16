// Cálculo de IMC

const name = "Fernanda";
const weight = 60;
const height = 1.65;

const imc = weight / (height * height);

if (imc >= 30) {
  console.log(`${name}, you are overweight.`);
} else {
  console.log(`${name}, you are not overweight`);
}

// Cálculo de aposentadoria

const gender = "F";
const age = 19;
const contribuitionTime = 1;

if (gender === "F" && contribuitionTime >= 30) {
  if (age + contribuitionTime >= 85) {
    console.log(`${name}, you can retire!`);
  } else {
    console.log(`${name}, you can't retire!`);
  }
} else if (gender === "M" && contribuitionTime >= 35) {
  if (age + contribuitionTime >= 95) {
    console.log(`${name}, you can retire!`);
  } else {
    console.log(`${name}, you can't retire!`);
  }
} else {
  console.log("Please, check the data entered!");
}
