const fs = require("fs");
const crypto = require("crypto");

const data = require("./data.json");
const { handleAge, handleDate, handleGraduation } = require("./utils");

exports.index = (req, res) => {
  const teachers = data.teachers.map((teacher) => {
    const formatServices = teacher.services.split(",");
    const foundTeacher = {
      ...teacher,
      services: formatServices,
    };
    return foundTeacher;
  });

  return res.render("teachers/index", { teachers });
};

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

exports.show = (req, res) => {
  const { id } = req.params;

  const foundTeacher = data.teachers.find((teacher) => {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send("Teacher not found!");

  const date = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(foundTeacher.created_at);

  const teacher = {
    ...foundTeacher,
    schooling: handleGraduation(foundTeacher.schooling),
    age: handleAge(foundTeacher.birth),
    services: foundTeacher.services.split(","),
    created_at: handleDate(date),
  };

  return res.render("teachers/show", { teacher });
};

exports.showEdit = (req, res) => {
  const { id } = req.params;

  const foundTeacher = data.teachers.find((teacher) => {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send("Instructor not found!");

  const date = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(foundTeacher.birth);

  const teacher = {
    ...foundTeacher,
    birth: date,
  };

  return res.render("teachers/edit", { teacher });
};

exports.update = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundTeacher = data.teachers.find((teacher, foundIndex) => {
    if (teacher.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundTeacher) return res.send("Teacher not found!");

  birth = Date.parse(req.body.birth);

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birth,
  };

  data.teachers[index] = teacher;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect(`/teachers/${id}`);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.body;

  const filteredTeacher = data.teachers.filter((teacher) => {
    return teacher.id != id;
  });

  data.teachers = filteredTeacher;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect(`/teachers`);
  });
};
