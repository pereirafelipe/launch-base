exports.handleAge = (timestamp) => {
  const today = new Date();
  const birthDate = new Date(timestamp);

  let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
  const month = today.getUTCMonth() - birthDate.getUTCMonth();

  if (
    month < 0 ||
    (month == 0 && today.getUTCDate() <= birthDate.getUTCDate())
  ) {
    age = age - 1;
  }

  return age;
};

exports.handleDate = (date) => {
  const formatDate = date.split("-").reverse().join("/");
  return formatDate;
};

exports.handleGraduation = (graduation) => {
  if (graduation === "em") {
    return "Ensino Médio";
  } else if (graduation === "u") {
    return "Ensino Superior Completo";
  } else if (graduation === "m") {
    return "Mestrado";
  } else if (graduation === "d") {
    return "Doutorado";
  } else {
    return "Desculpe, algo deu errado!";
  }
};

exports.handleSchollYear = (schoolYear) => {
  if (schoolYear === "5EF") {
    return "5º ano do ensino fundamental";
  } else if (schoolYear === "6EF") {
    return "6º ano do ensino fundamental";
  } else if (schoolYear === "7EF") {
    return "7º ano do ensino fundamental";
  } else if (schoolYear === "8EF") {
    return "8º ano do ensino fundamental";
  } else if (schoolYear === "9EF") {
    return "9º ano do ensino fundamental";
  } else if (schoolYear === "1EM") {
    return "1º ano do ensino médio";
  } else if (schoolYear === "2EM") {
    return "2º ano do ensino médio";
  } else if (schoolYear === "3EM") {
    return "3º ano do ensino médio";
  } else {
    return "Desculpe, algo deu errado!";
  }
};
