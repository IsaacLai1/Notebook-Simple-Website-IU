"use strict";

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "notebook",
});

module.exports = {
  fetchNoteForHandlebars: function () {
    // Promise is a type that can be used to handle async requests
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM notes", function (
        error,
        results,
        fields
      ) {
        if (error) {
          console.log(error);
          reject({ serverError: "error in server" });
        } else {
          //   console.log(results);
          resolve(results);
        }
      });
    });
  },

  addNoteForHandlebars: function (req) {
    return new Promise((resolve, reject) => {
      const data = req.body;
      console.log("Hi");
      connection.query("INSERT INTO notes SET ?", data, function (
        error,
        results,
        fields
      ) {
        if (error) {
          reject({ serverError: "error in server" });
        } else {
          console.log("Hi");
          console.log(results);
          resolve(results);
        }
      });
    });
  },

  deleteNoteForHandlebars: function (req) {
    return new Promise((resolve, reject) => {
      const ID = req.query.id;
      connection.query(`DELETE FROM notes WHERE id = '${ID}'`, function (
        error,
        results,
        fields
      ) {
        if (error) {
          reject({ serverError: "error in server" });
        } else {
          //   console.log(results);
          resolve(results);
        }
      });
    });
  },

  updateNoteForHandlebars: function (req) {
    return new Promise((resolve, reject) => {
      const { ID, created_date, title, content } = req.body;
      connection.query(
        `UPDATE notes SET created_date = '${created_date}', title = '${title}', content = '${content}' WHERE id = '${ID}'`,
        function (error, results, fields) {
          if (error) {
            reject({ serverError: "error in server" });
          } else {
            // console.log(results);
            resolve(results);
          }
        }
      );
    });
  },
};
