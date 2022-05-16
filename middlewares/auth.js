const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async user(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer " ,"");
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
      
    } catch (error) {
      console.log(error)
      res.status(401).send({ error: "token is unavailable" });
      
    }
  },

  async admin(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = jwt.verify(token, process.env.JWT_SECRET);

      req.user = user;

      if (user.userRole != "admin") {
        res.status(401).send({ error: "You are not an admin" });
      }
      next();
    } catch (error) {
      res.status(401).send({ error: "token is unavailable" });
    }
  },
};
