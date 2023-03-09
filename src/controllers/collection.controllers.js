const services = require('../services');
const http2Constants = require('http2').constants;
const httpError= require('../exceptions/httpError.exceptions');

const addEntry = async (req, res) => {
  try{
    const entry = await services.addEntry(req.params.id, req.body);
    if(entry === {})
      throw new httpError('Failed to add entry', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json({data: entry});
  }
  catch(err){
    res.status(err.status).json({error: err.message});
  }
};

const updateEntry = async (req, res) => {
  try{
    const entry = await services.updateEntry(req.params.id, req.body);
    if(entry === {})
      throw new httpError('Failed to update entry', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json({data: entry});
  }
  catch(err){
    res.status(err.status).json({error: err.message});
  }
};

const deleteEntry = async (req, res) => {
  try{
    const entry = await services.deleteEntry(req.params.id);
    if(entry === {})
      throw new httpError('Failed to delete entry', http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    res.status(http2Constants.HTTP_STATUS_OK).json({data: entry});
  }
  catch(err){
    res.status(err.status).json({error: err.message});
  }
};

module.exports = {
  addEntry,
  updateEntry,
  deleteEntry
};

