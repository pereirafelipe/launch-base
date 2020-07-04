const instructor = require("../models/instructor");
const { handleAge, handleDate } = require("../../lib/utils");

exports.index = (req, res) => {
  instructor.all((instructors) => {
    const foundInstructors = instructors.map((instructor) => {
      const formatServices = instructor.services.split(",");
      const foundInstructor = {
        ...instructor,
        services: formatServices,
      };
      return foundInstructor;
    });

    return res.render("instructors/index", { instructors: foundInstructors });
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

  instructor.create(req.body, (instructor) => {
    return res.redirect(`instructors/${instructor.id}`);
  });
};

exports.show = (req, res) => {
  return res.send("Show");
};

exports.update = (req, res) => {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (req.body[key] == "") return res.send("Please, fill all fields!");
  });

  return res.send("Update");
};

exports.put = (req, res) => {
  return res.send("Put");
};

exports.delete = (req, res) => {
  return res.send("Delete");
};
