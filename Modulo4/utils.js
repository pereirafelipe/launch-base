exports.handleAge = (timestamp) => {
  const today = new Date();
  const birthDate = new Date(timestamp);

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month == 0 && today.getDate() <= birthDate.getDate())) {
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
