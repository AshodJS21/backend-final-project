const User = require("../models/users");
const TaskMessage = require("../models/taskmessage");
const Task = require("../models/tasks");

//logings
(async () => {
  await User.bulkCreate([ {
    userName: "admin",
    userPassword: "admin",
    userEmail: "admin@admin.se",
    userRole: "admin" 
  }, { 
      userName: "userOne",
      userPassword: "userOne",
      userEmail: "userOne@user.se",
      userRole: "client",
  } , {
    userName: "userTwo",
    userPassword: "userTwo",
    userEmail: "userTwo@user.se",
    userRole: "client",
  }, {
    userName: "userThree",
    userPassword: "userThree",
    userEmail: "userThree@user.se",
    userRole: "worker",
  }]);

    //subjects
  await Task.bulkCreate([
    {
      taskName: "Fix my porch",
      taskDescription: "I need a help to solve this problem",
      taskStatus: "Incomplete",
      taskImage:
        "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      clientId: 2,
      workerId: 4,
      taskCreatedAt: new Date(),
      taskUpdatedAt: new Date(),
      taskCompletedAt: new Date(),
    },
    {
      taskName: "Measuring",
      taskDescription: "Measure my window",
      taskStatus: "Incomplete",
      taskImage:
        "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      clientId: 3,
      workerId: 4,
      taskCreatedAt: new Date(),
      taskUpdatedAt: new Date(),
      taskCompletedAt: new Date(),
    },
  ]);

  //messages
  await TaskMessage.bulkCreate([
    {
      messageContent: "help messsage ... 1/1",
      userId: 2,
      taskId: 1,
    },
    {
      messageContent: "help messsage ... 1/2",
      userId: 4,
      taskId: 1,
    },
    {
      messageContent: "help messsage ... 1/2",
      userId: 3,
      taskId: 2,
    },
    {
      messageContent: "help messsage ... 2/2",
      userId: 4,
      taskId: 2,
    },
  ]);
}) () ;
