// Usuários e tecnologias

const users = [
  {
    name: "Fernanda",
    techs: ["HTML", "CSS", "JS"],
  },
  {
    name: "Igor",
    techs: ["HTML", "JS"],
  },
  {
    name: "Rupp",
    techs: ["HTML", "Python"],
  },
  {
    name: "Gabriella",
    techs: ["HTML"],
  },
  {
    name: "Diego",
    techs: ["React", "React Native", "Node"],
  },
];

for (let i = 0; i < users.length; i++) {
  console.log(`${users[i].name} works with ${users[i].techs}`);
}

// Busca por tecnologia

function checkUserWorksCSS(techs) {
  for (let i = 0; i < techs.length; i++) {
    if (techs[i] === "CSS") {
      return true;
    }
  }

  return false;
}

for (let i = 0; i < users.length; i++) {
  const result = checkUserWorksCSS(users[i].techs);

  if (result) {
    console.log(`The user ${users[i].name} works with CSS`);
  }
}

// Soma de despesas e receitas

const newUsers = [
  {
    name: "Salvio",
    revenue: [115.3, 48.7, 98.3, 14.5],
    expenses: [85.3, 13.5, 19.9],
  },
  {
    name: "Marcio",
    revenue: [24.6, 214.3, 45.3],
    expenses: [185.3, 12.1, 120.0],
  },
  {
    name: "Lucia",
    revenue: [9.8, 120.3, 340.2, 45.3],
    expenses: [450.2, 29.9],
  },
];

function calculateBalance(revenue, expenses) {
  const sumRevenues = sumNumbers(revenue);
  const sumExpenses = sumNumbers(expenses);

  const balance = sumRevenues - sumExpenses;
  return balance;
}

function sumNumbers(numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }

  return sum;
}

for (let i = 0; i < newUsers.length; i++) {
  const result = calculateBalance(newUsers[i].revenue, newUsers[i].expenses);

  if (result >= 0) {
    console.log(
      `${newUsers[i].name} has a positive balance of ${result.toFixed(2)}`
    );
  } else {
    console.log(
      `${newUsers[i].name} has a negative balance of ${result.toFixed(2)}`
    );
  }
}
