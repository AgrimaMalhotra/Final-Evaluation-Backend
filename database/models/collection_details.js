'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collection_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.collection_fields, {
        foreignKey: 'collection_id',
      });
      this.belongsTo(models.content_type, {
        foreignKey: 'id',
      });
    }
  }
  collection_details.init({
    name: DataTypes.STRING,
    content_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'collection_details',
  });
  return collection_details;
};