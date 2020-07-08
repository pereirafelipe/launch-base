const Student = require("../models/Student");

const { handleDate, handleSchollYear } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Student.all((students) => {
      const foundStudents = students.map((student) => {
        const formatSchoolYear = handleSchollYear(student.schoolYear);
        const foundStudent = {
          ...student,
          schoolYear: formatSchoolYear,
        };
        return foundStudent;
      });

      return res.render("students/index", { students: foundStudents });
    });
  },
  create(req, res) {
    return res.render("students/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "") return res.send("Please, fill all fields!");
    });

    Student.create(req.body, (student) => {
      return res.redirect(`/students/${student.id}`);
    });
  },
  show(req, res) {
    Student.find(req.params.id, (foundStudent) => {
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
    });
  },
  update(req, res) {
    Student.find(req.params.id, (foundStudent) => {
      if (!foundStudent) return res.send("Student not found!");

      const date = new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(foundStudent.birth);

      const student = {
        ...foundStudent,
        birth: date,
      };

      return res.render("students/edit", { student });
    });
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
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] == "") return res.send("Please, fill all fields!");
    });

    Student.update(req.body, () => {
      return res.redirect(`students/${req.body.id}`);
    });
  },
  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      return res.redirect(`/students`);
    });
  },
};
