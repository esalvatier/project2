module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define("Status", {
    code: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    meaning: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });
  return Status;
};
