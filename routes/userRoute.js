import express from 'express';
import userController from '../controllers/userController.js';
const route = express.Router();

route.post('/', userController.create);
route.get('/:id', userController.getOne);
route.get('/', userController.getAll);
route.put('/:id', userController.update);
route.delete('/:id', userController.delete);

export default route;