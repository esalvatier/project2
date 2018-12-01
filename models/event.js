module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    eventID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    eventObj: {
      type: DataTypes.JSON
    }
  });

  Event.associate = function(models) {
    Event.belongsTo(models.User, {
      foreignKey: "eventOwner",
      targetKey: "uid",
      allowNull: false
    });
  };
  return Event;
};
