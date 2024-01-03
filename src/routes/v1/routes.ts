import { configController, userController, sysUserController } from '@utils/dependency.utils';
import { Router } from 'express';

export const router = Router();

router.use('/configs', configController.getRouter());
router.use('/sys-users', sysUserController.getRouter());
router.use('/users', userController.getRouter());
