const models = require('../../database/models');

const getCollectionNames = async () => {
  const collectionNames = await models.collection_details.findAll();
  return collectionNames;
};

const getAllContentTypes = async () => {
  const contentTypes = await models.content_type.findAll();
  return contentTypes;
};

const getContentTypeById = async (id) => {
  const contentType = await models.content_type.findByPk(id);
  return contentType;
};

const getCollectionFieldsById = async (id) => {
  const collectionFields = await models.collection_fields.findAll({
    where: {
      collection_id: id
    }
  });
  return collectionFields;
};

module.exports = {
  getCollectionNames,
  getAllContentTypes,
  getContentTypeById,
  getCollectionFieldsById
};
