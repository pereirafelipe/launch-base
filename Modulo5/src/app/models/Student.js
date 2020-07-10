const db = require("../../config/db");

module.exports = {
  all(callback) {
    const query = `
      SELECT * FROM students
    `;

    db.query(query, (err, results) => {
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
      school_year,
      workload,
      teacher,
    } = data;

    const query = `
    INSERT INTO students (
      avatar_url,
      name,
      email,
      birth,
      school_year,
      workload,
      teacher_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;

    const values = [
      avatar_url,
      name,
      email,
      birth,
      school_year,
      workload,
      teacher,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT students.*, teachers.name AS teacher_name FROM students 
      LEFT JOIN teachers ON (students.teacher_id = teachers.id) 
      WHERE students.id = $1`,
      [id],
      (err, results) => {
        if (err) throw `Database Error! ${err}`;

        console.log(id);

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
      school_year,
      workload,
      teacher,
      id,
    } = data;

    const query = `
      UPDATE students SET
      avatar_url=($1),
      name=($2),
      email=($3),
      birth=($4),
      school_year=($5),
      workload=($6),
      teacher_id=($7)
      WHERE id = $8
    `;

    const values = [
      avatar_url,
      name,
      email,
      birth,
      school_year,
      workload,
      teacher,
      id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM students WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  teachersSelectOptions(callback) {
    db.query(`SELECT name, id FROM teachers`, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },
};
