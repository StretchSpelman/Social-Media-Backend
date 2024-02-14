const users = [{ username: "dev", email: "dev@dev.com" }];
for (let i = 1; i <= 30; i++) {
  users.push({
    username: `user${i}`,
    email: `user${i}@example.com`,
  });
}

function createThoughts(users) {
  const thoughts = [];

  users.forEach((user) => {
    const thought = {
      thoughtText: `Sample thought by ${user.username}`,
      username: user._id,
      reactions: [],
    };

    // Add 3 reactions to each thought
    for (let i = 1; i <= 3; i++) {
      thought.reactions.push({
        reactionBody: `Reaction ${i} by ${user.username}`,
        username: user.username,
      });
    }

    thoughts.push(thought);
  });
  return thoughts;
}

module.exports = { createThoughts, users };