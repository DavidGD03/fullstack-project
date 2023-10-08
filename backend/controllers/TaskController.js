const task = require('../models/Task')

const getAllTasks = async (req, res) => {
  const tasks = await task.getAll()
  res.status(200).send({tasks})
}

const insertTask = async (req, res) => {
  const { title, description, deadline, owner } = req.body

  await task.insertTask({ title, description, deadline,owner })
    .then((response) => {
      res.status(201).send({message: 'Tarea agregada'})
    })
    .catch((error) => {
      res.status(401).send({message: 'Error, datos invalidos'})
    })
}

const updateTask = async (req,res) => {
  const { id } = req.params
  const { title, description, deadline,done } = req.body

  await task.updateTask(id, { title, description, deadline,done })
  .then((response) => {
    res.status(200).send({message: 'Tarea actualizada'})
  })
  .catch((error) => {
    res.status(401).send({message: 'Error, datos invalidos'})
  })
}

const updateTaskStatus = async (req,res) => {
  const { id } = req.params
  const { done } = req.body

  await task.updateTaskStatus(id, { done })
  .then((response) => {
    res.status(200).send({message: 'Estado de tarea actualizado'})
  })
  .catch((error) => {
    res.status(401).send({message: 'Error, datos invalidos'})
  })
}

const removeTask = async (req,res) => {
  const { id } = req.params

  await task.removeTask(id)
  .then((response) => {
    res.status(204).send({message: 'Tarea Eliminada'})
  })
  .catch((error) => {
    res.status(401).send({message: 'Error, tarea no encontrada'})
  })
}

const getOneTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await task.getTask(id);

    if (!result) {
      return res.status(404).send({ message: "Tarea no encontrada" });
    }

    res.status(200).send( result );
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
};


module.exports = {
  getAllTasks,
  insertTask,
  updateTask,
  updateTaskStatus,
  removeTask,
  getOneTask
}
