'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bnad = sequelize.define('Bnad', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    album: DataTypes.STRING,
    year: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Bnad.associate = function(models) {
    // associations can be defined here
    Bnad.belongsTo(models.User);
  };
  return Bnad;
};