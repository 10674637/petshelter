import express from 'express';
var router = express.Router();
import * as controller from './adoption-controller.js';
import * as auth from '../../services/auth-service.js';

router.post('/adoption', auth.requireLogin, controller.create);
router.get('/adoption/:id',controller.show);
router.get('/adoption',controller.showAll);

export default router;