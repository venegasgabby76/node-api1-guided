//this import is now pulling from the node_modules instead of the Node stdlib
const express = require("express");
const db = require("./database");

// create an express server instance
const server = express();

// this allows us to parse request JSON bodies,
// well talk about this further later
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Hello, World" });
});

server.get("/users", (req, res) => {
  // gets a list of users from our "fake" database
  const users = db.getUsers();
  res.json(users);
});

server.get("/users/:id", (req, res) => {
  // the param variable matches up to the name of our URL param above
  const id = req.params.id;
  // get a specific user by their ID from the "fake" database
  const user = db.getUserById(id);

  // make sure the system doesn't break if someone calls the endpoint with
  // a user ID that doesn't exist in the database
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

server.post("/users", (req, res) => {
  const newUser = db.createUser({
    name: req.body.name,
  });

  res.status(201).json(newUser);
});

server.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (user) {
    const upDateUser = db.updateUser(id, {
      name: req.body.name,
    });
    res.json(upDateUser);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (user) {
    db.deleteUser(id);
    // 204 means a successful empty response
    res.status(204).end();
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

//web servers need to be continuously listening.
server.listen(8080, () => {
  console.log("server started");
});
