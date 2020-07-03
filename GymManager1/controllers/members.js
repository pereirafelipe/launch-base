const fs = require("fs");

const data = require("../data.json");
const { handleDate } = require("../utils");

exports.index = (req, res) => {
  const members = data.members;

  return res.render("members/index", { members });
};

exports.create = (req, res) => {
  const keys = Object.keys(req.body);
  let {
    avatar_url,
    name,
    email,
    birth,
    gender,
    blood,
    weight,
    height,
  } = req.body;

  keys.map((key) => {
    if (req.body[key] === "") {
      return res.send("Please, fill all fields!");
    }
  });

  birth = Date.parse(req.body.birth);

  let id = 1;
  const lastMember = data.members[data.members.length - 1];

  if (lastMember) {
    id = lastMember.id + 1;
  }

  data.members.push({
    id,
    avatar_url,
    name,
    email,
    birth,
    gender,
    blood,
    weight,
    height,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/members");
  });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find((member) => {
    return member.id == id;
  });

  if (!foundMember) return res.send("Member not found!");

  const birthDay = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(foundMember.birth);

  const member = {
    ...foundMember,
    age: handleDate(birthDay),
  };

  return res.render("members/show", { member });
};

exports.showEdit = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find((member) => {
    return member.id == id;
  });

  if (!foundMember) return res.send("Member not found!");

  const date = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(foundMember.birth);

  const member = {
    ...foundMember,
    birth: date,
  };

  return res.render("members/edit", { member });
};

exports.update = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find((member, foundIndex) => {
    if (member.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) return res.send("Member not found!");

  birth = Date.parse(req.body.birth);

  const member = {
    ...foundMember,
    ...req.body,
    birth,
    id: Number(req.body.id),
  };

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect(`/members/${id}`);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.body;

  const filteredMembers = data.members.filter((member) => {
    return member.id != id;
  });

  data.members = filteredMembers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect(`/members`);
  });
};
