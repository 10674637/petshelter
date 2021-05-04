import express from 'express';
var router = express.Router();
import * as controller from './adoption-controller.js';
import * as auth from '../../services/auth-service.js';

router.post('/adoption', auth.requireLogin, controller.create);
router.get('/adoption/count', controller.countAll);
router.get('/adoptions', controller.showAll);
router.get('/adoption/:id', controller.show);
router.delete('/adoption/:id', auth.requireLogin, controller.remove);
router.post('/adoption/search', controller.search);
router.put('/adoption/:id', auth.requireLogin, controller.update);
export default router;