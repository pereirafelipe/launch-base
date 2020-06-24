const fs = require("fs");

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (req.body[key] === "") {
      return res.send("Please, fill all fields!");
    }
  });

  fs.writeFile("data.json", JSON.stringify(req.body), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/instructors");
  });
};
