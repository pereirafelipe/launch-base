const fs = require("fs");
const crypto = require("crypto");

const data = require("./data.json");

exports.create = (req, res) => {
  const keys = Object.keys(req.body);
  let { avatar_url, name, birth, schooling, type_class, services } = req.body;

  keys.map((key) => {
    if (req.body[key] === "") {
      return res.send("Please, fill all fields!");
    }
  });

  birth = Date.parse(req.body.birth);
  const created_at = Date.now();
  const id = crypto.randomBytes(6).toString("hex");

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    schooling,
    type_class,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/teachers");
  });
};
