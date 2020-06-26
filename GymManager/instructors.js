const fs = require("fs");

const data = require("./data.json");
const { handleAge } = require("./utils");

exports.create = (req, res) => {
  const keys = Object.keys(req.body);
  let { avatar_url, name, birth, gender, services } = req.body;

  keys.map((key) => {
    if (req.body[key] === "") {
      return res.send("Please, fill all fields!");
    }
  });

  birth = Date.parse(req.body.birth);
  created_at = Date.now();
  id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/instructors");
  });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id == id;
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const instructor = {
    ...foundInstructor,
    age: handleAge(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: "",
  };

  return res.render("instructors/show", { instructor });
};
