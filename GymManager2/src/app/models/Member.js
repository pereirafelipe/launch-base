const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM members`, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },
  create(data, callback) {
    let {
      avatar_url,
      name,
      email,
      birth,
      gender,
      blood,
      weight,
      height,
      instructor,
    } = data;

    const query = `
    INSERT INTO members (
      avatar_url,
      name,
      email,
      birth,
      gender,
      blood,
      weight,
      height,
      instructor_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id
  `;

    const values = [
      avatar_url,
      name,
      email,
      birth,
      gender,
      blood,
      weight,
      height,
      instructor,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT *, instructors.name AS instructor_name FROM members 
      LEFT JOIN instructors ON (members.instructor_id = instructors.id) 
      WHERE members.id = $1`,
      [id],
      (err, results) => {
        if (err) throw `Database Error! ${err}`;

        callback(results.rows[0]);
      }
    );
  },
  update(data, callback) {
    let {
      avatar_url,
      name,
      email,
      birth,
      gender,
      blood,
      weight,
      height,
      instructor,
      id,
    } = data;

    const query = `
      UPDATE members SET
      avatar_url=($1),
      name=($2),
      email=($3),
      birth=($4),
      gender=($5),
      blood=($6),
      weight=($7),
      height=($8)
      instructor_id=($9)
      WHERE id = $10
    `;

    const values = [
      avatar_url,
      name,
      email,
      birth,
      gender,
      blood,
      weight,
      height,
      instructor,
      id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM members WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  instructorSelectOptions(callback) {
    db.query(`SELECT name, id FROM instructors`, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },
};
