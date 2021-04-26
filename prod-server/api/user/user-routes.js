import express from 'express';
var router = express.Router();
import * as controller from './user-controller.js';
router.get('/user', controller.index);
export default router;