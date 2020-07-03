const { handleAge, handleDate } = require("../../lib/utils");

exports.index = (req, res) => {
  return res.send("Index");
};

exports.create = (req, res) => {
  return res.send("Create");
};

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (req.body[key] == "") return res.send("Please, fill all fields!");
  });

  return res.send("Post");
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
