const models = require('../../database/models');

const getCollectionNames = async () => {
  const collectionNames = await models.collection_details.findAll();
  return {data:collectionNames};
};

const getAllContentTypes = async () => {
  const contentTypes = await models.content_type.findAll();
  return {data:contentTypes};
};

const getContentTypeById = async (id) => {
  const contentType = await models.content_type.findByPk(id);
  return {data:contentType};
};

const getCollectionFieldsById = async (id) => {
  const collectionFields = await models.collection_fields.findAll({
    where: {
      collection_id: id
    }
  });
  return {data:collectionFields};
};

const addContentType = async (body) => {
  const contentType = await models.content_type.create({
    name: body.name,
    fields:{}
  });
  const collectionType = await models.collection_details.create({
    name: contentType.name,
    content_id: contentType.id
  });
  return {data:{...contentType.dataValues, ...collectionType.dataValues}};
};

module.exports = {
  getCollectionNames,
  getAllContentTypes,
  getContentTypeById,
  getCollectionFieldsById,
  addContentType
};
