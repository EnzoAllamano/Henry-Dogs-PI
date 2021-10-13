const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      weight: {
        type: DataTypes.JSON,
      },
      height: {
        type: DataTypes.JSON,
      },
      bred_for: {
        type: DataTypes.STRING,
      },
      life_span: {
        type: DataTypes.STRING,
      },
      origin: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.JSON,
      },
    },
  );
};
