const Teacher = require("../models/Teacher");

const { handleAge, handleDate, handleGraduation } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Teacher.all((teachers) => {
      const foundTeachers = teachers.map((teacher) => {
        const formatServices = teacher.subjects_taught.split(",");
        const foundTeacher = {
          ...teacher,
          subjects_taught: formatServices,
        };
        return foundTeacher;
      });

      return res.render("teachers/index", { teachers: foundTeachers });
    });
  },
  create(req, res) {
    return res.render("teachers/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] == "") return res.send("Please, fill all fields!");
    });

    Teacher.create(req.body, (teacher) => {
      return res.redirect(`teachers/${teacher.id}`);
    });
  },
  show(req, res) {
    Teacher.find(req.params.id, (foundTeacher) => {
      if (!foundTeacher) return res.send("Teacher not found!");

      const date = new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(foundTeacher.created_at);

      const teacher = {
        ...foundTeacher,
        education_level: handleGraduation(foundTeacher.education_level),
        age: handleAge(foundTeacher.birth_date),
        subjects_taught: foundTeacher.subjects_taught.split(","),
        created_at: handleDate(date),
      };

      return res.render("teachers/show", { teacher });
    });
  },
  update(req, res) {
    Teacher.find(req.params.id, (foundTeacher) => {
      if (!foundTeacher) return res.send("Teacher not found!");

      const date = new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(foundTeacher.birth_date);

      const teacher = {
        ...foundTeacher,
        birth_date: date,
        subjects_taught: foundTeacher.subjects_taught.split(","),
      };

      return res.render("teachers/edit", { teacher });
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] == "") return res.send("Please, fill all fields!");
    });

    Teacher.update(req.body, () => {
      return res.redirect(`teachers/${req.body.id}`);
    });
  },
  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      return res.redirect(`/teachers`);
    });
  },
};
