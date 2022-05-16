const Task = require("../models/tasks");
const taskMessage = require("../models/taskmessage");
const User = require("../models/users");
const { Op } = require("sequelize");
const { Unauthorized, Forbidden } = require("../errors");

module.exports = {
  getUsers: async (req, res) => {
    if (req.user.userRole == "admin" || req.user.userRole == "worker") {
      const users = await User.findAll({});
      res.json(users);
    }

    if (req.user.userRole == "client") {
      const response = await User.findAll({
        where: {
          [Op.or]: [{ userRole: "worker" }, { userId: req.user.userId }],
        },
      });
      res.json(response);
    }
  },

  getUser: async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["user password"] },
    });
    if (req.user.userRole == "client" && req.user.userId != user.userId) {
      throw new Unauthorized();
    }
    res.json(user);
  },

  getMe: async (req, res) => {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ["user password"] },
    });
    res.json(user);
  },

  createUser: async (req, res) => {
    if (req.user.userRole !== "admin") {
      throw new Unauthorized();
    }

    const user = await User.create(req.body);
    res.json(user);
  },

  updateUser: async (req, res) => {
    if (req.user.userRole !== "admin") {
      throw new Unauthorized();
    }

    const user = await User.findByPk(req.params.id);
    if (user.userRole == "admin") {
      throw new Forbidden();
    }
    user.update(req.body);
    res.json(user);
  },
};
