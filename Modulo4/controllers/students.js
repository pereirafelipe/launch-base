const fs = require("fs");
const crypto = require("crypto");

const data = require("../data.json");
const { handleAge, handleDate, handleGraduation } = require("../utils");

exports.index = (req, res) => {
  const students = data.students.map((student) => {
    const formatServices = student.services.split(",");
    const foundStudent = {
      ...student,
      services: formatServices,
    };
    return foundStudent;
  });

  return res.render("students/index", { students });
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

  data.students.push({
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

    return res.redirect("/students");
  });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const foundStudent = data.students.find((student) => {
    return student.id == id;
  });

  if (!foundStudent) return res.send("Teacher not found!");

  const date = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(foundStudent.created_at);

  const student = {
    ...foundStudent,
    schooling: handleGraduation(foundStudent.schooling),
    age: handleAge(foundStudent.birth),
    services: foundStudent.services.split(","),
    created_at: handleDate(date),
  };

  return res.render("students/show", { student });
};

exports.showEdit = (req, res) => {
  const { id } = req.params;

  const foundStudent = data.students.find((student) => {
    return student.id == id;
  });

  if (!foundStudent) return res.send("Instructor not found!");

  const date = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(foundStudent.birth);

  const student = {
    ...foundStudent,
    birth: date,
  };

  return res.render("students/edit", { student });
};

exports.update = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundStudent = data.students.find((student, foundIndex) => {
    if (student.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundStudent) return res.send("Student not found!");

  birth = Date.parse(req.body.birth);

  const student = {
    ...foundStudent,
    ...req.body,
    birth,
  };

  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect(`/students/${id}`);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.body;

  const filteredStudent = data.students.filter((student) => {
    return student.id != id;
  });

  data.students = filteredStudent;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect(`/students`);
  });
};
