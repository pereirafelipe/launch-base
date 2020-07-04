const Member = require("../models/Member");
const { handleDate } = require("../../lib/utils");

exports.index = (req, res) => {
  Member.all((members) => {
    return res.render("members/index", { members });
  });
};

exports.create = (req, res) => {
  return res.render("members/create");
};

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (req.body[key] == "") return res.send("Please, fill all fields!");
  });

  Member.create(req.body, (member) => {
    return res.redirect(`members/${member.id}`);
  });
};

exports.show = (req, res) => {
  Member.find(req.params.id, (foundMember) => {
    if (!foundMember) return res.send("Member not found!");

    const birthDay = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(foundMember.birth);

    const member = {
      ...foundMember,
      age: handleDate(birthDay),
    };

    return res.render("members/show", { member });
  });
};

exports.update = (req, res) => {
  Member.find(req.params.id, (foundMember) => {
    if (!foundMember) return res.send("Member not found!");

    const date = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(foundMember.birth);

    const member = {
      ...foundMember,
      birth: date,
    };

    return res.render("members/edit", { member });
  });
};

exports.put = (req, res) => {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (req.body[key] == "") return res.send("Please, fill all fields!");
  });

  Member.update(req.body, () => {
    return res.redirect(`members/${req.body.id}`);
  });
};

exports.delete = (req, res) => {
  Member.delete(req.body.id, () => {
    return res.redirect(`/members`);
  });
};
