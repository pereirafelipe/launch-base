const fs = require("fs");
const crypto = require("crypto");

const data = require("../../../data.json");
const { handleDate, handleSchollYear } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    const students = data.students.map((student) => {
      const formatSchoolYear = handleSchollYear(student.schoolYear);
      const foundStudent = {
        ...student,
        schoolYear: formatSchoolYear,
      };
      return foundStudent;
    });

    return res.render("students/index", { students });
  },
  create(req, res) {
    return res.render("students/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    let { avatar_url, name, email, birth, schoolYear, workload } = req.body;

    keys.map((key) => {
      if (req.body[key] === "") {
        return res.send("Please, fill all fields!");
      }
    });

    birth = Date.parse(req.body.birth);
    const id = crypto.randomBytes(6).toString("hex");

    data.students.push({
      id,
      avatar_url,
      name,
      email,
      birth,
      schoolYear,
      workload,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write file error!");

      return res.redirect("/students");
    });
  },
  show(req, res) {
    const { id } = req.params;

    const foundStudent = data.students.find((student) => {
      return student.id == id;
    });

    if (!foundStudent) return res.send("Student not found!");

    const birthDay = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(foundStudent.birth);

    const student = {
      ...foundStudent,
      schoolYear: handleSchollYear(foundStudent.schoolYear),
      birth: handleDate(birthDay),
    };

    return res.render("students/show", { student });
  },
  update(req, res) {
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
  },
  put(req, res) {
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
  },
  delete(req, res) {
    const { id } = req.body;

    const filteredStudent = data.students.filter((student) => {
      return student.id != id;
    });

    data.students = filteredStudent;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write file error!");

      return res.redirect(`/students`);
    });
  },
};
