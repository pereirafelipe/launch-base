module.exports = {
  handleDate(date) {
    const formatDate = date.split("-").reverse().join("/");
    return formatDate;
  },
  formatPrice(price) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(price) / 100);
  },
};
