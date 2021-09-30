const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    weight:{
      type: DataTypes.INTEGER,
    },
    height: {
        type: DataTypes.INTEGER
    },
    bred_for:{
      type: DataTypes.STRING
    },
    life_span: {
      type: DataTypes.INTEGER
    },
    origin:{
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING,
    }
  });
};
