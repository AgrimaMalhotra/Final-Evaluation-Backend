const express = require('express');
const router = express.Router();
const controller= require('../controllers');

router.route('/collection-names').get(controller.getCollectionNames);
router.route('/content-types').get(controller.getAllContentTypes);
router.route('/content-types/:id').get(controller.getContentTypeById);
router.route('/collection-fields/:id').get(controller.getCollectionFieldsById);

router.route('/add-content-type').post(controller.addContentType);

router.route('/update-content-name/:id').patch(controller.updateContentTypeName);
router.route('/add-content-fields/:id').patch(controller.updateContentTypeFields);
router.route('/update-field-name/:id').patch(controller.updateFieldName);

router.route('/delete-content-field/:id').delete(controller.deleteContentTypeField);

module.exports=router;