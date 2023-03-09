const services = require('../services');
const http2Constants = require('http2').constants;
const httpError= require('../exceptions/httpError.exceptions');

const getCollectionNames = async (req, res) => {
  try{
    const collectionNames = await services.getCollectionNames();
    if(!collectionNames)
      throw new httpError('No collection names found', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json({data:collectionNames});
  }
  catch(err){
    res.status(err.status).json({error: err.message});
  }
};

const getAllContentTypes = async (req, res) => {
  try{
    const contentTypes = await services.getAllContentTypes();
    if(!contentTypes)
      throw new httpError('No content types found', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json({data: contentTypes});
  }
  catch(err){
    res.status(err.status).json({error: err.message});
  }
};

const getContentTypeById = async (req, res) => {
  try{
    const contentType = await services.getContentTypeById(req.params.id);
    if(!contentType)
      throw new httpError('No content type found', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json({data: contentType});
  }
  catch(err){
    res.status(err.status).json({error: err.message});
  }
};

const getCollectionFieldsById = async (req, res) => {
  try{
    const collectionFields = await services.getCollectionFieldsById(req.params.id);
    if(!collectionFields)
      throw new httpError('No collection fields found', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json({data: collectionFields});
  }
  catch(err){
    res.status(err.status).json({error: err.message});
  }
};

const addContentType = async (req, res) => {
  try{
    const contentType = await services.addContentType(req.body);
    if(contentType === {})
      throw new httpError('Failed to add entry', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json({data: contentType});
  }
  catch(err){
    res.status(err.status).json({error: err.message});
  }
};

const updateContentTypeName = async (req, res) => {
  try{
    const contentType = await services.updateContentTypeName(req.params.id, req.body);
    if(contentType === {})
      throw new httpError('Failed to update entry', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json(contentType);
  }
  catch(err){
    res.status(http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const addContentTypeFields = async (req, res) => {
  try{
    const contentType = await services.addContentTypeFields(req.params.id, req.body);
    if(!contentType)
      throw new httpError('Failed to update entry', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json(contentType);
  }
  catch(err){
    res.status(err.status).json(err.message);
  }
};

const updateFieldName = async (req, res) => {
  try{
    const contentType = await services.updateFieldName(req.params.id, req.body);
    if(!contentType)
      throw new httpError('Failed to update entry', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json(contentType);
  }
  catch(err){
    res.status(http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const deleteContentTypeField = async (req, res) => {
  try{
    const contentType = await services.deleteContentTypeField(req.params.id, req.body);
    if(!contentType)
      throw new httpError('Failed to delete entry', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json(contentType);
  }
  catch(err){
    res.status(http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(err.message);
  }
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
