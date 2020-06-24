const fs = require("fs");

const data = require("./data.json");

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (req.body[key] === "") {
      return res.send("Please, fill all fields!");
    }
  });

  data.instructors.push(req.body);

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/instructors");
  });
};
