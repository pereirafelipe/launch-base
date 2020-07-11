const db = require("../../config/db");

module.exports = {
  all(callback) {
    const query = `
      SELECT teachers.*, count(students) AS total_students 
      FROM teachers 
      LEFT JOIN students ON (students.teacher_id = teachers.id)
      GROUP BY teachers.id
      ORDER BY total_students DESC
    `;

    db.query(query, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },
  create(data, callback) {
    let { avatar_url, name, birth, schooling, type_class, services } = data;

    const query = `
    INSERT INTO teachers (
      avatar_url,
      name,
      birth_date,
      education_level,
      class_type,
      subjects_taught,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;

    created_at = new Date(Date.now());

    const values = [
      avatar_url,
      name,
      birth,
      schooling,
      type_class,
      services,
      created_at,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(`SELECT * FROM teachers WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },
  findBy(filter, callback) {
    const query = `
      SELECT teachers.*, count(students) AS total_students 
      FROM teachers 
      LEFT JOIN students ON (students.teacher_id = teachers.id)
      WHERE teachers.name ILIKE '%${filter}%' 
      OR teachers.subjects_taught ILIKE '%${filter}%'
      GROUP BY teachers.id
      ORDER BY total_students DESC
    `;
    db.query(query, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },
  update(data, callback) {
    let { avatar_url, name, birth, schooling, type_class, services, id } = data;

    const query = `
      UPDATE teachers SET
      avatar_url=($1),
      name=($2),
      birth_date=($3),
      education_level=($4),
      class_type=($5),
      subjects_taught=($6)
      WHERE id = $7
    `;

    const values = [
      avatar_url,
      name,
      birth,
      schooling,
      type_class,
      services,
      id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM teachers WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  paginate(params, callback) {
    const { filter, limit, offset } = params;

    let query = "",
      filterQuery = "",
      totalQuery = `( SELECT count(*) FROM teachers) AS total`;

    if (filter) {
      filterQuery = `
        WHERE teachers.name ILIKE '%${filter}%' 
        OR teachers.subjects_taught ILIKE '%${filter}%' 
      `;

      totalQuery = `( SELECT count(*) FROM teachers ${filterQuery} ) AS total`;
    }

    query = `
      SELECT teachers.*, ${totalQuery}, count(students) AS total_students FROM teachers 
      LEFT JOIN students ON (teachers.id = students.teacher_id) ${filterQuery}
      GROUP BY teachers.id
      LIMIT $1 OFFSET $2
    `;

    db.query(query, [limit, offset], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },
};
