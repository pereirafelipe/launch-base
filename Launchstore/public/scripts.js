// Formatando moeda
const Mask = {
  apply(input, func) {
    setTimeout(() => {
      input.value = Mask[func](input.value);
    }, 1);
  },
  formatBRL(value) {
    value = value.replace(/\D/g, "");
    // Máscara de campo
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value) / 100);
  },
};
