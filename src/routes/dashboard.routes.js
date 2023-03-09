const express = require('express');
const router = express.Router();
const controller= require('../controllers');

router.route('/collection-names').get(controller.getCollectionNames);
router.route('/content-types').get(controller.getAllContentTypes);
router.route('/content-types/:id').get(controller.getContentTypeById);
router.route('/collection-fields/:id').get(controller.getCollectionFieldsById);

module.exports=router;