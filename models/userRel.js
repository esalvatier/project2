module.exports = function(sequelize, DataTypes) {
  var userRelationship = sequelize.define(
    "userRelationship",
    {
      relID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fromUser: {
        type: DataTypes.STRING,
        allowNull: false
      },
      targetUser: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true,
      createdAt: "sentTime",
      updatedAt: "responseTime"
    }
  );
  userRelationship.associate = function(models) {
    userRelationship.belongsTo(models.Status, {
      foreignKey: "code",
      targetKey: "code"
    });
  };
  return userRelationship;
};
