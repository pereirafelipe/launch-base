const user = {
  name: "Fernanda",
  transactions: [],
  balance: 0,
};

function createTransaction(transaction) {
  user.transactions.push(transaction);
}

function handleBalance() {
  user.transactions.map((transaction) => {
    if (transaction.type === "credit") {
      user.balance += transaction.value;
    } else if (transaction.type === "debit") {
      user.balance -= transaction.value;
    }
  });
}

function getHigherTransactionByType(type) {
  const transactionsValues = user.transactions
    .filter((transaction) => {
      return transaction.type === type;
    })
    .map((transaction) => {
      return transaction.value;
    });

  const maxValue = Math.max(...transactionsValues);

  return maxValue;
}

function getAverageTransactionValue() {
  const sum = user.transactions.reduce((acumulator, current) => {
    return (acumulator += current.value);
  }, 0);

  const average = sum / user.transactions.length;

  return average;
}

function getTransactionCount() {
  let credit = 0;
  let debit = 0;

  user.transactions.map((transaction) => {
    if (transaction.type === "credit") credit++;
    else debit++;
  });

  return {
    credit,
    debit,
  };
}

createTransaction({ type: "credit", value: 50 });
createTransaction({ type: "credit", value: 120 });
createTransaction({ type: "debit", value: 80 });
createTransaction({ type: "debit", value: 30 });

handleBalance();

const higherTrasactionCredit = getHigherTransactionByType("credit");
const higherTrasactionDebit = getHigherTransactionByType("debit");

const transactionAverage = getAverageTransactionValue();

const transactionCount = getTransactionCount();

console.log(user);
