const Instructor = require("../models/Instructor");
const { handleAge, handleDate } = require("../../lib/utils");

exports.index = (req, res) => {
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

  Instructor.paginate(params, (instructors) => {
    const foundInstructors = instructors.map((instructor) => {
      const formatServices = instructor.services.split(",");
      const foundInstructor = {
        ...instructor,
        services: formatServices,
      };
      return foundInstructor;
    });

    return res.render("instructors/index", {
      instructors: foundInstructors,
      filter,
    });
  });
};

exports.create = (req, res) => {
  return res.render("instructors/create");
};

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (req.body[key] == "") return res.send("Please, fill all fields!");
  });

  Instructor.create(req.body, (instructor) => {
    return res.redirect(`instructors/${instructor.id}`);
  });
};

exports.show = (req, res) => {
  Instructor.find(req.params.id, (foundInstructor) => {
    if (!foundInstructor) return res.send("Instructor not found!");

    const date = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(foundInstructor.created_at);

    const instructor = {
      ...foundInstructor,
      age: handleAge(foundInstructor.birth),
      services: foundInstructor.services.split(","),
      created_at: handleDate(date),
    };

    return res.render("instructors/show", { instructor });
  });
};

exports.update = (req, res) => {
  Instructor.find(req.params.id, (foundInstructor) => {
    if (!foundInstructor) return res.send("Instructor not found!");

    const date = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(foundInstructor.birth);

    const instructor = {
      ...foundInstructor,
      birth: date,
      services: foundInstructor.services.split(","),
    };

    return res.render("instructors/edit", { instructor });
  });
};

exports.put = (req, res) => {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (req.body[key] == "") return res.send("Please, fill all fields!");
  });

  Instructor.update(req.body, () => {
    return res.redirect(`instructors/${req.body.id}`);
  });
};

exports.delete = (req, res) => {
  Instructor.delete(req.body.id, () => {
    return res.redirect(`/instructors`);
  });
};
