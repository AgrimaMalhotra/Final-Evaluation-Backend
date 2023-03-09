const services = require('../services');
const http2Constants = require('http2').constants;
const httpError= require('../exceptions/httpError.exception');

const getCollectionNames = async (req, res) => {
  try{
    const collectionNames = await services.getCollectionNames();
    if(!collectionNames)
      throw new httpError('No collection names found', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).send(collectionNames);
  }
  catch(err){
    res.status(err.status).send(err.message);
  }
};

const getAllContentTypes = async (req, res) => {
  try{
    const contentTypes = await services.getAllContentTypes();
    if(!contentTypes)
      throw new httpError('No content types found', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).send(contentTypes);
  }
  catch(err){
    res.status(err.status).send(err.message);
  }
};

const getContentTypeById = async (req, res) => {
  try{
    const contentType = await services.getContentTypeById(req.params.id);
    if(!contentType)
      throw new httpError('No content type found', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).send(contentType);
  }
  catch(err){
    res.status(err.status).send(err.message);
  }
};

const getCollectionFieldsById = async (req, res) => {
  try{
    const collectionFields = await services.getCollectionFieldsById(req.params.id);
    if(!collectionFields)
      throw new httpError('No collection fields found', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).send(collectionFields);
  }
  catch(err){
    res.status(err.status).send(err.message);
  }
};

module.exports = {
  getCollectionNames,
  getAllContentTypes,
  getContentTypeById,
  getCollectionFieldsById
};
