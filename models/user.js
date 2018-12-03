module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Event, { as: "Events" });
  };

  return User;
};
