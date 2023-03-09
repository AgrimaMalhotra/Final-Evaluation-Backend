const express = require('express');
const router = express.Router();
const controller= require('../controllers');

router.route('/add-entry/:id').post(controller.addEntry);
router.route('/update-entry/:id').patch(controller.updateEntry);
router.route('/delete-entry/:id').delete(controller.deleteEntry);

module.exports=router;