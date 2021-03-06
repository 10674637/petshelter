import express from 'express';
var router = express.Router();
import * as controller from './lost-found-controller.js';
import * as auth from '../../services/auth-service.js';

router.post('/lost-found', auth.requireLogin, controller.create);
router.get('/lost-found/count', controller.countAll);
router.get('/lost-found', controller.index);
router.get('/lost-found/type/:type', controller.getByType);
router.get('/lost-found/:id', controller.show);
router.delete('/lost-found/:id', auth.requireLogin, controller.remove);
router.post('/lost-found/search', controller.search);
router.put('/lost-found', auth.requireLogin, controller.update);
export default router;