const updateJsonKey = (json, body) =>{
  json[body.updateWith] = json[body.update];
  delete json[body.update];
  return json;
};

module.exports = updateJsonKey;