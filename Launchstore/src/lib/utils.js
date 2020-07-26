module.exports = {
  handleDate(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    if (Number(day) < 10) day = `0${day}`;

    if (Number(month) < 10) month = `0${month}`;

    return {
      day,
      month,
      year,
      hour,
      minutes,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`,
    };
  },
  formatPrice(price) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(price) / 100);
  },
};
