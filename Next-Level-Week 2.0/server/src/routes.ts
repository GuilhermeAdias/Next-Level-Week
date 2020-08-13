import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();
// GET : Buscar ou listar uma indformação.
// POST : Criar alguma nova imformação.
// PUT : Atuliazar uma informaçãp existente.
// DELETE : Deletar uma informação existente.

// Corpo (Request Body): Dados para crição ou atualização de um registro.
// Route Params: Identificar qual reurso eu quero atualizar ou deletar.
// Query Params: Paginação, fIltros, ordenaçao ...
routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);


export default routes;