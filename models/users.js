const { DataTypes } = require("sequelize");
const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = db.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userRole: {
    type: DataTypes.ENUM("admin", "client", "worker"),
    allowNull: false,
  },
});


User.authenticate = async (email, password) => {
  const user = await User.findOne({ where: { userEmail: email } });
  if (!user) {
    throw new Error("User not found");
  }
  
  if (user ) {  
    const payload = {
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
      userRole: user.userRole,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1week" });
  } else {
    throw new Error("password is not correct");
  }
};

module.exports = User;
