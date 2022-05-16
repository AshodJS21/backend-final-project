const { Forbidden, Unauthorized } = require("../errors");
const Task = require("../models/tasks");
const TaskMessages = require("../models/taskmessage");
const user = require("../models/users");

module.exports = {
  //tasks 
  getTasks: async (req, res) => {
    const userId = req.user.userId;
    let task
    if (req.user.userRole == "admin") {
      task = await Task.findAll({});
    }
    if (req.user.userRole == "client") {
      task = await Task.findAll({ where: { clientId: userId } });
    }
    if (req.user.userRole == "worker") {
      task = await Task.findAll({ where: { workerId: userId } });
    }
    res.json(task);
  },


  createTask: async (req, res) => {
    const userRole = req.user.userRole;
    if (userRole == "client") {
      throw new Forbidden();
    }
    if (userRole == "worker" || userRole == "admin") {
      const task = await Task.create(req.body);
      res.json("Task Created: " + task.taskName);
    }
  },


  updateTask: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id); //obtains only a single entry
    const userRole = req.user.userRole;

    if (userRole == "client") {
      throw new Forbidden();
    }

    await task.update(req.body, { where: { id } });
    res.json(task);
  },


  //task-id-message-updates
  getMessages: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    const userId = req.user.userId;
    const userRole = req.user.userRole;

    if (userRole === "client" && task.clietId != userId) {
      throw new Unauthorized();
    }
    if (userRole === "worker" && task.workerId != userId) {
      throw new Unauthorized();
    }
    const messages = await TaskMessages.findAll({ where: { taskId: id } });
    res.json(messages);
  },

  createMessage: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    const messageContent = req.body.messageContent;
    const userId = req.user.userId;
    const userRole = req.user.userRole;

    if (userRole == "client" && task.clientId != userId) {
      throw new Unauthorized();
    }
    if (userRole == "worker" && task.workerId != userId) {
      throw new Unauthorized();
    }
    const message = await TaskMessages.create({
      messageContent,
      userId,
      taskId: id,
    });
    res.json("Message Created: " + message.messageContent);
  },

  
  updateMessage: async (req, res) => {
    const { messageId } = req.params.messageId;
    const message = await TaskMessages.findByPk(messageId);
    const userId = req.user.userId;
    const userRole = req.user.userRole;

    if (userRole == "client" && message.userId != userId) {
      throw new Unauthorized();
    }
    if (userRole == "worker" && message.userId != userId) {
      throw new Unauthorized();
    }

    await message.update(req.body);
    res.json("Message Updated: " + message.messageContent);
  },
};

//console.log("get d taskCont");
