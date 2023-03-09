const models = require('../../database/models');
const httpError = require('../exceptions/httpError.exceptions');
const http2Constants = require('http2').constants;
const updateJsonKey = require('../utils/updateJsonKey.util');

const getCollectionNames = async () => {
  if (! await models.collection_details.findAll())
    throw new httpError('No collection names found',http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
  const collectionNames = await models.collection_details.findAll();
  return collectionNames;
};

const getAllContentTypes = async () => {
  if (! await models.content_type.findAll())
    throw new httpError('No content types found',http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
  const contentTypes = await models.content_type.findAll();
  return contentTypes;
};

const getContentTypeById = async (id) => {
  if (! await models.content_type.findByPk(id))
    throw new httpError(`No content type with id ${id} found`,http2Constants.HTTP_STATUS_NOT_FOUND);
  const contentType = await models.content_type.findByPk(id);
  return contentType;
};

const getCollectionFieldsById = async (id) => {
  if (! await models.collection_fields.findAll({ where: { collection_id: id } }))
    throw new httpError(`No collection fields with id ${id} found`,http2Constants.HTTP_STATUS_NOT_FOUND);
  const collectionFields = await models.collection_fields.findAll({
    where: {
      collection_id: id
    }
  });
  return collectionFields;
};

const addContentType = async (body) => {
  if (await models.content_type.findOne({ where: { name: body.name } }))
    throw new httpError('Content type already exists',http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
  const contentType = await models.content_type.create({
    name: body.name,
    fields:{}
  });
  const collectionType = await models.collection_details.create({
    name: contentType.name,
    content_id: contentType.id
  });
  return {...contentType.dataValues, ...collectionType.dataValues};
};

const updateContentTypeName = async (id, body) => {
  if(! await models.content_type.findByPk(id)) 
    throw new httpError(`Content type with id ${id} not found`,http2Constants.HTTP_STATUS_NOT_FOUND);

  const contentId = await models.content_type.update({
    name: body.name
  }, {
    where: {
      id: id
    }
  });
  if (! await models.collection_details.findOne({ where: { content_id: contentId } }))
    throw new httpError(`No collection type with id ${contentId} found`,http2Constants.HTTP_STATUS_NOT_FOUND);
  const collectionId = await models.collection_details.update({
    name: body.name
  }, {
    where: {
      content_id: contentId
    }
  });
  return {contentId: contentId,collectionId: collectionId };
};

const addContentTypeFields = async (id, body) => {
  const originalFields = await models.content_type.findByPk(id);
  if (! originalFields)
    throw new httpError(`No content type with id ${id} found`,http2Constants.HTTP_STATUS_NOT_FOUND);
  if (Object.keys(body.fields).some(key => originalFields.fields[key]))
    throw new httpError('Field already exists',http2Constants.HTTP_STATUS_BAD_REQUEST);
  const updatedContentTypeId = await models.content_type.update({
    fields: {...originalFields.dataValues.fields, ...body.fields}
  }, {
    where: {
      id: id
    }
  });
  const collection_id = await models.collection_details.findOne({ where: { content_id: id } });
  const collectionDetails = await models.collection_fields.findOne({ where: { collection_id: collection_id.id} });
  if (!collectionDetails){
    return {contentId:updatedContentTypeId};
  }

  const newEntry = Object.keys(body.fields).reduce((acc, key) => {
    acc[key] = null;
    return acc;
  }, {});

  const updatedCollectionFieldId = await models.collection_fields.update({
    entry: {...collectionDetails.dataValues.entry, ...newEntry}
  }, {
    where: {
      collection_id: collection_id.id
    }
  });
  return {contentId:updatedContentTypeId, collectionId:updatedCollectionFieldId};
};

const updateFieldName = async (id, body) => {
  const contentDetails = await models.content_type.findByPk(id);
  if (! contentDetails)
  { throw new httpError(`No content type with id ${id} found`,http2Constants.HTTP_STATUS_NOT_FOUND);}
  if (body.updateWith in contentDetails.fields)
    throw new httpError('Field already exists',http2Constants.HTTP_STATUS_BAD_REQUEST);
  const updatedFields = updateJsonKey(contentDetails.fields, body);
  const updatedContentTypeId = await models.content_type.update({
    fields: updatedFields
  }, {
    where: {
      id: id
    }
  });
  const collection_id = await models.collection_details.findOne({ where: { content_id: id } });
  const collectionDetails = await models.collection_fields.findOne({ where: { collection_id: collection_id.id} });
  if (!collectionDetails){
    return {contentId:updatedContentTypeId};
  }
  const collectionEntry = updateJsonKey(collectionDetails.entry, body);
  const updatedCollectionFieldId = await models.collection_fields.update({
    entry: collectionEntry
  }, {
    where: {
      collection_id: collection_id.id
    }
  });
  return {contentId:updatedContentTypeId, collectionId:updatedCollectionFieldId};
};

const deleteContentTypeField = async (id,body) => {
  const contentDetails = await models.content_type.findByPk(id);
  if (! contentDetails)
    throw new httpError(`No content type with id ${id} found`,http2Constants.HTTP_STATUS_NOT_FOUND);
  let fields = contentDetails.fields;
  delete fields[body.fieldName];
  const updatedContentTypeId = await models.content_type.update({
    fields: fields
  }, {
    where: {
      id: id
    }
  });
  const collection_id = await models.collection_details.findOne({ where: { content_id: id } });
  const collectionDetails = await models.collection_fields.findOne({ where: { collection_id: collection_id.id} });
  if (!collectionDetails){
    return {contentId:updatedContentTypeId};
  }
  let collectionEntry = collectionDetails.entry;
  delete collectionEntry[body.fieldName];
  const updatedCollectionFieldId = await models.collection_fields.update({
    entry: collectionEntry
  }, {
    where: {
      collection_id: collection_id.id
    }
  });
  return {contentId:updatedContentTypeId, collectionId:updatedCollectionFieldId};
};

module.exports = {
  getCollectionNames,
  getAllContentTypes,
  getContentTypeById,
  getCollectionFieldsById,
  addContentType,
  updateContentTypeName,
  addContentTypeFields,
  updateFieldName,
  deleteContentTypeField
};
