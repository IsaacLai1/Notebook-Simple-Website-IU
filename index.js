var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var noteController = require("./controller/notebookController");
const handlebars = require("express-handlebars");
const { query } = require("express");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  handlebars({
    layoutsDir: __dirname + "/template",
    defaultLayout: null,
  })
);

app.set("views", __dirname + "/template");
app.use(express.static(path.join(__dirname, "/public")));

// fetch all data to the client using index.hbs (template) and data from server (controller: noteController.js)
app.get("/", async function (req, res) {
  console.log("Fetch Note");
  noteController
    .fetchNoteForHandlebars()
    .then(function (data) {
      //   console.log("types = " + JSON.stringify(data));
      return data;
    })
    .then((notes) => {
      return notes;
    })
    .catch(function (msg) {
      console.log("Error: " + msg);
    })
    .then((notes) => {
      //   console.log(notes);
      if (notes == null)
        types = [
          { customertypeid: -1, abbreviation: "ALL", description: "empty" },
        ];
      res.render("index", {
        card: notes,
      });
    });
});

// Receive a post API from client (javascript/jquery) then add to server  (controller: noteController.js) then render and return hole website
router.post("/addNewNote", async function (req, res, next) {
  console.log("Post Note");
  noteController
    .addNoteForHandlebars(req)
    .then(function (data) {
      return data;
    })
    .then((notes) => {
      return notes;
    })
    .catch(function (msg) {
      console.log("Error: " + msg);
    })
    .then((notes) => {
      if (notes == null)
        types = [
          { customertypeid: -1, abbreviation: "ALL", description: "empty" },
        ];
      res.render("index", {
        card: notes,
      });
    });
});

// Receive a delete API from client (javascript/jquery) then delete in server  (controller: noteController.js) then render and return hole website
router.delete("/deleteNote", async function (req, res, next) {
  console.log(req.query);
  noteController
    .deleteNoteForHandlebars(req)
    .then(function (data) {
      console.log(req.body);
      return data;
    })
    .catch(function (msg) {
      console.log("Error: " + msg);
    })
    .then((notes) => {
      if (notes == null)
        types = [
          { customertypeid: -1, abbreviation: "ALL", description: "empty" },
        ];
      res.render("index", {
        card: notes,
      });
    });
});

// Receive a update API from client (javascript/jquery) then update in server  (controller: noteController.js) then render and return hole website
router.put("/updateNote", async function (req, res, next) {
  noteController
    .updateNoteForHandlebars(req)
    .then(function (data) {
      console.log(req.body);
      return data;
    })
    .catch(function (msg) {
      console.log("Error: " + msg);
    })
    .then((notes) => {
      if (notes == null)
        types = [
          { customertypeid: -1, abbreviation: "ALL", description: "empty" },
        ];
      res.render("index", {
        card: notes,
      });
    });
});
app.use("/", router);

app.listen(3003);
console.log("Express server listening on port 3003");
