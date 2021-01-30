const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getSingleStudent);
router.post('/', studentController.create);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);

module.exports = router;