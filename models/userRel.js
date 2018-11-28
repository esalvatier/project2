module.exports = function (sequelize, DataTypes) {
  var userRelationship = sequelize.define("userRelationship", {
    relID: {
      type: DataTypes.INTEGER,
      primary: true,
      autoIncrement: true
    },
    fromUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    targetUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    timestamps: true,
    createdAt: "sentTime",
    updatedAt: "responseTime"
  });
  return userRelationship;
};