const fs = require("fs");

const data = require("./data.json");

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (req.body[key] === "") {
      return res.send("Please, fill all fields!");
    }
  });

  req.body.birth = Date.parse(req.body.birth);
  req.body.crested_at = Date.now();

  data.instructors.push(req.body);

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/instructors");
  });
};
