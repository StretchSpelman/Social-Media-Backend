const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/commentExample');

module.exports = connection;
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;