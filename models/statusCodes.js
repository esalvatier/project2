module.exports = function(sequelize, DataTypes) {
  var statusCode = sequelize.define("statusCode", {
    code: {
      type: DataTypes.INTEGER,
      primary: true,
      autoIncrement: true
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return statusCode;
};
