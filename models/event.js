module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    eventID: {
      type: DataTypes.INTEGER,
      primary: true,
      autoIncrement: true
    },
    eventObj: {
      type: DataTypes.JSON
    },
    eventOwner: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Event;
};