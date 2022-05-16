const User = require("../models/users");
const Tasks = require("../models/tasks");
const TaskMessages = require("../models/taskmessage");


module.exports = function setupModels() {
  TaskMessages.belongsTo(User, { foreignKey: "userId" });
  TaskMessages.belongsTo(Tasks, { foreignKey: "taskId" });
  User.hasMany(Tasks);
  Tasks.belongsTo(User);
};
