const Person = require("./models/person");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

//Create_and_Save_a_Record_of_a_Model
app.put("/add-user", (req, res) => {
  // Create a document instance
  const newPerson = new Person({
    name: "Ksontini Mortadha",
    age: 23,
    favoriteFoods: ["Lasagne", "Pizza", "Watermelon"],
  });

  // Save the document instance to the database
  newPerson.save(function (err, savedPerson) {
    if (err) {
      console.error(err);
    } else {
      res.json({ message: "User have been created" });
    }
  });
});

// Create several people using model.create()
app.post("/create-users", (req, res) => {
  Person.create([
    {
      name: "Person 1",
      age: 34,
      favoriteFoods: ["Pizza"],
    },
    {
      name: "Person 2",
      age: 43,
      favoriteFoods: ["Lablebi"],
    },
    {
      name: "Person 3",
      age: 19,
      favoriteFoods: ["Pasta"],
    },
  ]).then((insertedElement) => {
    res.json({ message: "Users have been created" });
  });
});

// Use_model.find()_to_Search_Your_Database
app.post("/find-users", (req, res) => {
  Person.find().then((remainingPerson) => {
    res.json({ message: remainingPerson });
  });
});

// Find one person with a certain food in favorites
app.post("/find-user-with-food", (req, res) => {
  const foodToSearch = "Lasagne";
  Person.findOne({ favoriteFoods: foodToSearch }, function (err, person) {
    if (err) throw err;
    res.json({
      message: `Person with ${foodToSearch} in favorites: ${person.name}`,
    });
  });
});

// Find a person by _id and update favoriteFoods
const personIdToUpdate = "658bf584bad08144ce8a2d2a";
app.put("/find-user-by-id-update-food", (req, res) => {
  Person.findById(personIdToUpdate, function (err, person) {
    if (err) {
      throw err;
    }
    if (!person) {
      console.log("Person not found with _id:", personIdToUpdate);
      return;
    }
    person.favoriteFoods = person.favoriteFoods || [];
    person.favoriteFoods.push("Hamburger");
    // Save the updated person
    person.save(function (err, updatedPerson) {
      if (err) {
        throw err;
      }
      res.json({
        message: `Person food updated:${updatedPerson}`,
      });
    });
  });
});

// Find a person by name and update age to 20
app.put("/update-age", (req, res) => {
  Person.findOneAndUpdate(
    { name: "ksontini mortadha" },
    { $set: { age: "20" } }
  ).then((updatedPerson) => {
    res.json({ message: `Updated Person: ${updatedPerson}` });
  });
});

// Delete one person by _id
const personIdToRemove = "658bf584bad08144ce8a2d27";
app.delete("/delete-user", (req, res) => {
  Person.findByIdAndRemove(personIdToRemove, function (err, removedPerson) {
    if (err) throw err;
    res.json({ message: `Person removed: ${removedPerson}` });
  });
});

// Delete all people whose name is "Mary"
app.delete("/delete-user-by-name", (req, res) => {
  const personNameToRemove = "Mary";
  Person.deleteOne({ name: personNameToRemove }, function (err, result) {
    if (err) throw err;
    res.json({ message: `Person with name ${personNameToRemove} deleted` });
  });
});

// Find people who like burritos, sort by name, limit to 2, hide their age
app.get("/find-user-burritos", (req, res) => {
  Person.find({ favoriteFoods: "Burritos" })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec(function (err, data) {
      if (err) throw err;
      res.json({
        message: `People who like burritos: ${data}`,
      });
    });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server is running");
});
