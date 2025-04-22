// src/routes/routes_user.js

import express from 'express';
import { 
  createUser,        // handler que sube imagen + crea user
  get_users,
  get_user_by_id,
  update_user,
  delete_user,
  create_user as createUserJSON,  // si necesitas ruta JSON‑only
  login
} from '../controllers/controllers_users.js';
import { authenticate_token } from '../middlewares/token_auth.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

/**
 * POST /api/users
 * multipart/form-data con campo "image" + name, last_name, email, password
 */
router.post('/create',upload.single('image'),createUser);

/**
 * Si quisieras un endpoint JSON‑only (sin imagen), podrías usar:
 * 
 * router.post(
 *   '/create',
 *   express.json(),
 *   createUserJSON
 * );
 */

/**
 * Rutas protegidas con JWT
 */
router.get('/',authenticate_token,get_users);

router.get('/:id',authenticate_token,get_user_by_id);

router.put('/:id',authenticate_token,update_user);

router.delete('/:id',authenticate_token,delete_user);

/**
 * Login (sin protección)
 */
router.post('/login',login);

export default router;
