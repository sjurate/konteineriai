const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: "10mb" }));
const cors = require("cors");
app.use(cors());
const md5 = require("js-md5");
const uuid = require("uuid");
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "parcels",
});

//////////////////// LOGIN START /////////////////

const handleAuth = function (req, res, next) {
  if (req.url.indexOf("/server") === 0) {
    // admin
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length || results[0].role !== 10) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else if (
    req.url.indexOf("/login-check") === 0 ||
    req.url.indexOf("/login") === 0 ||
    req.url.indexOf("/register") === 0 ||
    req.url.indexOf("/home") === 0
  ) {
    next();
  }
  // else {
  //   // front
  //   const sql = `
  //       SELECT
  //       name, role
  //       FROM users
  //       WHERE session = ?
  //   `;
  //   con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
  //     if (err) throw err;
  //     if (!results.length) {
  //       res.status(401).send({});
  //       req.connection.destroy();
  //     } else {
  //       next();
  //     }
  //   });
  // }
};

app.use(handleAuth);

// AUTH;
app.get("/login-check", (req, res) => {
  const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
  con.query(sql, [req.headers["authorization"] || ""], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: "error", status: 1 }); // user not logged
    } else {
      if (req.query.role === "admin") {
        if (result[0].role !== 10) {
          res.send({ msg: "error", status: 2 }); // not an admin
        } else {
          res.send({ msg: "ok", status: 3 }); // is admin
        }
      } else {
        res.send({ msg: "ok", status: 4 }); // is user
      }
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: "error", key: "" });
    } else {
      res.send({ msg: "ok", key });
    }
  });
});

/////////////////// LOGIN   END ////////////////////

//  CREATE CONTAINER for admin

app.post("/home/containers", (req, res) => {
  const sql = `
    INSERT INTO containers (number, size)
    VALUES (?, ?)
    `;
  con.query(sql, [req.body.number, req.body.size], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ CONTAINER for admin to create a box

app.get("/home/containers", (req, res) => {
  const sql = `
    SELECT id, number, size, item_count
    FROM containers
    WHERE (size = 'S' AND item_count < 2) OR  (size = 'M' AND item_count < 4) OR (size = 'L' AND item_count < 6)
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//READ CONTAINERS WITH ITEMS

app.get("/home/joined", (req, res) => {
  const sql = `
    SELECT c.*, b.id AS bid, b.item_title, b.weight, b.image, b.flammable, b.short_term
    FROM containers AS c
    LEFT JOIN boxes AS b
    ON b.container_id = c.id
    ORDER BY c.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// UPDATE CONTAINER for admin (add count_item + 1)

// (EDIT ratings (for users))

app.put("/home/containers/:id", (req, res) => {
  const sql = `
    UPDATE containers
    SET 
    item_count = item_count + ?
    WHERE id = ?
    `;
  con.query(sql, [req.body.num, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE CONTAINER for admin

app.delete("/home/containers/:id", (req, res) => {
  const sql = `
    DELETE FROM containers
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//  CREATE BOX for admin

app.post("/home/boxes", (req, res) => {
  const sql = `
    INSERT INTO boxes (item_title, weight, image, flammable, short_term, container_id)
    VALUES (?, ?, ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [
      req.body.item_title,
      req.body.weight,
      req.body.image,
      req.body.flammable,
      req.body.short_term,
      req.body.container_id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// READ BOXES for admin

app.get("/home/boxes", (req, res) => {
  const sql = `
    SELECT *
    FROM boxes
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// UPDATE BOX for admin

app.put("/home/boxes/:id", (req, res) => {
  const sql = `
    UPDATE boxes
    SET item_title = ?, weight = ?, image = ?, flammable = ?, short_term = ?, container_id = ?
    WHERE id = ?
    `;
  con.query(
    sql,
    [
      req.body.item_title,
      req.body.weight,
      req.body.image,
      req.body.flammable,
      req.body.short_term,
      req.body.container_id,
      req.params.id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// DELETE BOX for admin

app.delete("/home/boxes/:id", (req, res) => {
  const sql = `
    DELETE FROM boxes
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// // CREATE KOMENTARAS

// app.post("/home/komentarai", (req, res) => {
//   const sql = `
//     INSERT INTO komentarai (post, savivaldybe_id, sritis_id)
//     VALUES (?, ?, ?)
//     `;
//   con.query(
//     sql,
//     [req.body.post, req.body.savivaldybe_id, req.body.sritis_id],
//     (err, result) => {
//       if (err) throw err;
//       res.send(result);
//     }
//   );
// });

// // READ KOMENTARAI viesas

// app.get("/home/komentarai", (req, res) => {
//   const sql = `
//   SELECT k.*, s.title AS savivaldybeTitle, s.id AS sid, s.image AS savivaldybeImage, sr.title AS sritisTitle, sr.id AS srid
//   FROM komentarai AS k
//   INNER JOIN savivaldybes AS s
//   ON k.savivaldybe_id = s.id
//   INNER JOIN sritys AS sr
//   ON k.sritis_id = sr.id
//   WHERE k.status = 1
//   `;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // READ KOMENTARAI for admin

// app.get("/server/komentarai", (req, res) => {
//   const sql = `
//   SELECT k.*, s.title AS savivaldybeTitle, s.id AS sid, sr.title AS sritisTitle, sr.id AS srid
//   FROM komentarai AS k
//   INNER JOIN savivaldybes AS s
//   ON k.savivaldybe_id = s.id
//   INNER JOIN sritys AS sr
//   ON k.sritis_id = sr.id
//   `;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // UPDATE KOMENTARAS for admin

// app.put("/home/komentarai/:id", (req, res) => {
//   const sql = `
//     UPDATE komentarai
//     SET status = ?
//     WHERE id = ?
//     `;
//   con.query(sql, [req.body.status, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // DELETE KOMENTARAS for admin

// app.delete("/server/komentarai/:id", (req, res) => {
//   const sql = `
//     DELETE FROM komentarai
//     WHERE id = ?
//     `;
//   con.query(sql, [req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

app.listen(port, () => {
  console.log(`Siuvykla per ${port} portą!`);
});
