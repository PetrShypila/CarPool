import publicRoutes from './publicRoutes';
import protectedRoutes from './protectedRoutes';

function init(app) {
  app.use(publicRoutes);
  app.use(protectedRoutes);
}

export default {
  init
};
