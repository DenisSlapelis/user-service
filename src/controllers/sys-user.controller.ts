import { SysUserService } from '@services/sys-user.service';
import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import express, { Request, Response, Router } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SysUserController {
    private router: Router;

    constructor(
        @inject('SysUserService') private service: SysUserService) {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes = () => {
        // ** POST **
        this.router.post('/login', this.login);
        this.router.post('/', this.create);

        // ** GET **
        // ** PATCH **
        // ** PUT **
        // ** DELETE **
    }

    public getRouter = (): Router => {
        return this.router;
    }

    private login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) return res.status(STATUS_CODE.VALIDATION_ERROR).json({message: `Invalid required params 'username' and 'password'.`});

            const result = await this.service.login(username, password);

            return res.status(STATUS_CODE.OK).json(result);
        } catch (error: any) {
            const statusCode = STATUS_CODE_CAUSE[error.cause] || STATUS_CODE.SERVER_ERROR;

            return res.status(statusCode).json({ message: error?.message || error });
        }
    }

    private create = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) return res.status(STATUS_CODE.VALIDATION_ERROR).json({message: `Invalid required params 'username' and 'password'.`});

            const result = await this.service.create(username, password);

            return res.status(STATUS_CODE.OK).json(result);
        } catch (error: any) {
            const statusCode = STATUS_CODE_CAUSE[error.cause] || STATUS_CODE.SERVER_ERROR;

            return res.status(statusCode).json({ message: error?.message || error });
        }
    }
}
