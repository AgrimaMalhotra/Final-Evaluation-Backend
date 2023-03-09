const models = require('../../database/models');

const addEntry = async (id, body) => {
  const entry = await models.collection_fields.create({
    collection_id: id,
    entry: {...body}
  });
  return entry;
};

const updateEntry = async (id, body) => {
  const entryId = await models.collection_fields.update(
    {
      entry: {...body}
    },
    {
      where: {
        id: id
      }
    }
  );
  return {entryId};
};

const deleteEntry = async (id) => {
  const entryId = await models.collection_fields.destroy({
    where: {
      id: id
    }
  });
  return {entryId};
};

module.exports = {
  addEntry,
  updateEntry,
  deleteEntry
};