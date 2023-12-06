const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log('Unable to connect to the database', err.message));

// Define the schema
const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Define the model
const Person = mongoose.model('Person', PersonSchema);

// Create and save a record
const addPerson = (onePerson) => {
  const person = new Person(onePerson);
  person.save((err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(data);
    }
  });
};

// Create multiple records
const addManyPeople = (people) => {
  Person.create(people, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(data);
    }
  });
};

// Search the database by name
const findPerson = (name) => {
  Person.find({ name }, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(data);
    }
  });
};

// Search the database by favorite food
const findOnePerson = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(data);
    }
  });
};

// Search the database by _id
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(data);
    }
  });
};

// Update a record
const updatePerson = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) {
      console.log(err.message);
    } else {
      person.favoriteFoods.push('hamburger');
      person.save((error, data) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log(data);
        }
      });
    }
  });
};

// Update a person's age
const updatePersonAge = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(data);
      }
    }
  );
};

// Delete a record by _id
const deletePersonById = (personId) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(data);
    }
  });
};

// Delete multiple records by name
const deletePeopleByName = (name) => {
  Person.remove({ name }, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(result);
    }
  });
};

// Chain search query helpers to narrow search results
const searchPeopleByFood = (food) => {
  Person.find({ favoriteFoods: food })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(data);
      }
    });
};

// Usage of functions:

// addPerson({ name: 'khaoula', age: 21, favoriteFoods: ['Pizza', 'Burger'] });
// addManyPeople([{ name: 'Mariem', age: 37, favoriteFoods: ['burritos', 'Salad'] },{ name: 'Mariem', age: 37, favoriteFoods: ['Pasta', 'Pizza'] },{ name: 'aziz', age: 23, favoriteFoods: ['Pizza', 'Salad'] }]);
// findPerson('khaoula');
// findOnePerson('Pizza');
// findPersonById('656cb8f4769db24e470b9a7f');
// updatePerson('656cb8f4769db24e470b9a7f');
// updatePersonAge('Mariem');
// deletePersonById('656cb8f4769db24e470b9a7f');
// deletePeopleByName('Mariem');
// searchPeopleByFood('burritos');
