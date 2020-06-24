exports.post = (req, res) => {
  const keys = Object.keys(req.body);
  const { avatar_url, name, birth, gender, services } = req.body;

  keys.map((key) => {
    if (req.body[key] === "") {
      return res.send("Please, fill all fields!");
    }
  });

  return res.send("Data received!");
};
