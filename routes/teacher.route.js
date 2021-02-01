const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');

router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getSingleTeacher);
router.post('/', teacherController.create);
router.put('/:id', teacherController.update);
router.delete('/:id', teacherController.delete);
module.exports = router;