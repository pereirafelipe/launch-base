exports.handleDate = (date) => {
  const formatDate = date.split("-").reverse().join("/");
  return formatDate;
};
