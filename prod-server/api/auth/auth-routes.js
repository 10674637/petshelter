import express from 'express';
var router = express.Router();
import * as controller from './auth-controller.js';
router.post('/auth', controller.index);
export default router;