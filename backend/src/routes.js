const express = require('express');

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');

const routes = express.Router();

routes.post('/sessions', SessionController.Create);

routes.get('/ongs/Get/:id', OngController.Get);
routes.get('/ongs/GetAll', OngController.GetAll);
routes.post('/ongs', OngController.Create);


routes.get('/incidents/Get/:id', IncidentController.Get);
routes.get('/incidents/GetAll', IncidentController.GetAll);
routes.get('/incidents/GetByOngId/:ong_id', IncidentController.GetByOngId);
routes.post('/incidents', IncidentController.Create);
routes.delete('/incidents/:id', IncidentController.Delete);

module.exports = routes;