const express = require('express');
const router = express.Router();
const { TaskController } = require('../controllers');

// Obtener todas las tareas
router.get('/', TaskController.getAllTasks)

// Agregar una nueva tarea
router.post('/', TaskController.insertTask)

// Actualizar una tarea
router.patch('/:id', TaskController.updateTask)

// Actualizar el estado de una tarea
router.patch('/changeStatus/:id', TaskController.updateTaskStatus)

// Eliminar una tarea
router.delete('/:id', TaskController.removeTask)

// Obtener una tarea
router.get('/:id', TaskController.getOneTask)


module.exports = router