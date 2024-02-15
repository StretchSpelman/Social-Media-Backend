const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find();
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      if (!dbThoughtData) {
        return res.status(404).json({ message: "Thought does not exist" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    console.log(req.body)
    try {
      const dbThoughtData = await Thought.create(req.body);
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: dbThoughtData._id } },
        { new: true }
      );
      if (!dbUserData) {
        return res
          .status(404)
          .json({ message: "Thought created, but no user found" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: "Thought ID does not exist" });
      }
      res.json({ message: "Updated Thought" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!dbThoughtData) {
        return res.status(404).json({ message: "Thought ID does not exist" });
      }
      const dbUserData = await User.findOneAndUpdate(
        { _id: dbThoughtData.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!dbUserData) {
        return res
          .status(404)
          .json({ message: "Thought deleted but no user with this ID" });
      }
      res.status(200).json({ message: "Thought Deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate({
        _id: req.params.thoughtId,
      },
        { $addToSet: { reactions: req.body } },
        {
          runValidators: true,
          new: true
        }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: "Thought ID does not exist" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: "Thought ID does not exist" });
      }
      res.json({ message: "Reaction deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};