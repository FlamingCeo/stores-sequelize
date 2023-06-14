const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Set auto-increment property
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = (models) => {
    const {
        user_role,
    } = models
    User.hasOne(user_role, {
        foreignKey: 'user_id'
    })

}


  // Define the beforeCreate hook for User model
  User.beforeCreate(async (user) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  });
  return User;
};
