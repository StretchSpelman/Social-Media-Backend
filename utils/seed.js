const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, createThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  await User.collection.insertMany(users);
  const thoughts = createThoughts(users);
  await Thought.collection.insertMany(thoughts);

  for (let i = 0; i < thoughts.length; i++) {
    const thought = thoughts[i];
    await User.findOneAndUpdate(
      { _id: thought.username },
      {
        $push: { thoughts: thought._id },
      },
      {
        new: true,
      }
    );
  }

  console.table(users);
  console.table(thoughts);
  console.info("Seeding Complete!");
  process.exit(0);
});