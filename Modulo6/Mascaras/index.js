const cpf = "12345678900";
const cnpj = "12345678912345";
const percent = 0.56;

const Masks = {
  CPF(value) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  },
  CNPJ(value) {
    return value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  },
  percent(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);
  },
};

console.log(Masks.CNPJ(cnpj));
console.log(Masks.CPF(cpf));
console.log(Masks.percent(percent));
