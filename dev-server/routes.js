import postsRoutes from './api/post/posts-routes.js';
import regRoutes from './api/register/register-routes.js';
import userRoutes from './api/user/user-routes.js';
import authRoutes from './api/auth/auth-routes.js';
import lostFound from './api/lost-found/lost-found-routes.js';
import adoption from './api/adoption/adoption-routes.js';
 
export function registerRoutes(app) {
  app.use('/api', postsRoutes);
  app.use('/api', regRoutes);
  app.use('/api', userRoutes);
  app.use('/api', authRoutes);
  app.use('/api', lostFound);
  app.use('/api', adoption);
}