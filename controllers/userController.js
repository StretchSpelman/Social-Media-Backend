const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        {
          new: true,
        }
      );
      if (!dbUserData) {
        res.status(404).json({ message: "No user with that ID" });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOne({
        _id: req.params.userId,
      });
      if (!dbUserData) {
        res.status(404).json({ message: "No user with that ID" });
        return;
      }

      const thoughts = await Thought.find({
        username: req.params.userId,
      });
      if (thoughts.length > 0) {
        for (const thought of thoughts) {
          await thought.remove();
        }
      }

      await User.deleteOne({ _id: req.params.userId });

      res.json({ message: "User Deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const dbFriendData = await User.findOne({ _id: req.params.friendId });
      if (!dbFriendData) {
        res.status(404).json({ message: "No user with that friend ID" });
        return;
      }

      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $push: { friends: dbFriendData._id },
        },
        {
          new: true,
        }
      );

      res.json(dbUserData);
    } catch (err) {
      res.json(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const dbFriendData = await User.findOne({ _id: req.params.friendId });
      if (!dbFriendData) {
        res.status(404).json({ message: "No user with that friend ID" });
        return;
      }

      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $pull: { friends: dbFriendData._id },
        },
        {
          new: true,
        }
      );

      res.json(dbUserData);
    } catch (err) {
      res.json(500).json(err);
    }
  },
};