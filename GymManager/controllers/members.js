const fs = require("fs");

const data = require("../data.json");
const { handleAge, handleDate } = require("../utils");

exports.index = (req, res) => {
  const instructors = data.instructors.map((instructor) => {
    const formatServices = instructor.services.split(",");
    const foundInstructor = {
      ...instructor,
      services: formatServices,
    };
    return foundInstructor;
  });

  return res.render("instructors/index", { instructors });
};

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

  const date = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(foundInstructor.created_at);

  const instructor = {
    ...foundInstructor,
    age: handleAge(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: handleDate(date),
  };

  return res.render("instructors/show", { instructor });
};

exports.showEdit = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id == id;
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const date = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(foundInstructor.birth);

  const instructor = {
    ...foundInstructor,
    birth: date,
  };

  return res.render("instructors/edit", { instructor });
};

exports.update = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find((instructor, foundIndex) => {
    if (instructor.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  birth = Date.parse(req.body.birth);

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth,
    id: Number(req.body.id),
  };

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect(`/instructors/${id}`);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter((instructor) => {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect(`/instructors`);
  });
};
