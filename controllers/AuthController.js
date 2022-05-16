const User = require("../models/users");
module.exports = {
  async authenticate(req, res) {
    const token = await User.authenticate(req.body.userEmail, req.body.userPassword);
    res.json(token);
  },
};
