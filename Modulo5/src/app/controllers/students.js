const Student = require("../models/Student");

const { handleDate, handleSchollYear } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 3;

    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
    };

    Student.paginate(params, (students) => {
      const foundStudents = students.map((student) => {
        const formatSchoolYear = handleSchollYear(student.school_year);
        const foundStudent = {
          ...student,
          school_year: formatSchoolYear,
        };
        return foundStudent;
      });

      const pagination = {
        total: Math.ceil(students[0].total / limit),
        page,
      };

      return res.render("students/index", {
        students: foundStudents,
        pagination,
        filter,
      });
    });
  },
  create(req, res) {
    Student.teachersSelectOptions((options) => {
      return res.render("students/create", { teacherOptions: options });
    });
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
        school_year: handleSchollYear(foundStudent.school_year),
        birth: handleDate(birthDay),
      };

      return res.render("students/show", { student });
    });
  },
  update(req, res) {
    const { id } = req.params;
    Student.find(id, (foundStudent) => {
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

      Student.teachersSelectOptions((options) => {
        return res.render("students/edit", {
          student,
          teacherOptions: options,
        });
      });
    });
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
    Student.delete(req.body.id, () => {
      return res.redirect(`/students`);
    });
  },
};
