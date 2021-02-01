import * as express from 'express';
const router = express.Router();
import loginRouter from './login';
import registerRouter from './register';

router.use('/login', loginRouter);
router.use('/register', registerRouter);

export default router;