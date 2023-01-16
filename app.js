/* eslint-disable no-undef */
const express = require("express");
var csrf = require("tiny-csrf");


const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shh! some secret string"));
app.use(csrf("this_should_be_32_character_long", ["POST", "PUT", "DELETE"]));

const path = require("path");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  const overduetodos = await Todo.overdue();
  const duetodaytodos = await Todo.dueToday();
  const duelatertodos = await Todo.dueLater();
  const completed = await Todo.completedTodos();
  if (request.accepts("html")) {
    response.render("index", {
      overduetodos,
      duetodaytodos,
      duelatertodos,
      completed,
      csrfToken: request.csrfToken(),
    });
  } else {
    response.json({ overduetodos, duetodaytodos, duelatertodos, completed });
  }
});

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");

  try {
    const todos = await Todo.findAll({ order: [["id", "ASC"]] });
    return response.json(todos);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    // eslint-disable-next-line no-unused-vars
    //const todo =
    await Todo.addTodo(request.body);
    //return response.json(todo);
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.setCompletionStatus(request.body.completed);
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("Delete a todo by ID: ", request.params.id);
  // FILL IN YOUR CODE HERE
  // const deleteTodo = await Todo.destroy({
  //   where: {
  //     id: request.params.id,
  //   },
  // });
  // response.send(deleteTodo ? true : false);

  try {
    const todoStatus = await Todo.remove(request.params.id);
    return response.send(todoStatus ? true : false);
  } catch (err) {
    return response.status(422).json(err);
  }
  
  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
});

module.exports = app;