import { UserService } from '@services/user.service';
import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import express, { Request, Response, Router } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserController {
    private router: Router;

    constructor(
        @inject('UserService') private service: UserService) {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes = () => {
        // ** POST **
        this.router.post('/', this.create);

        // ** GET **
        this.router.get('/', this.list);
        this.router.get('/:id', this.getById);

        // ** PUT **
        this.router.put('/:id', this.update);

        // ** DELETE **
        this.router.delete('/:id', this.delete);
    }

    public getRouter = (): Router => {
        return this.router;
    }

    private create = async (req: Request, res: Response) => {
        try {
            const user = req.body;

            const result = await this.service.create({ ...user, createdBy: req['sysUserId'] });

            return res.status(STATUS_CODE.CREATED).json(result);
        } catch (error: any) {
            const statusCode = STATUS_CODE_CAUSE[error.cause] || STATUS_CODE.SERVER_ERROR;

            return res.status(statusCode).json({ message: error?.message || error });
        }
    }

    private list = async (req: Request, res: Response) => {
        try {
            const result = await this.service.list();

            return res.status(STATUS_CODE.OK).json(result);
        } catch (error: any) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error?.message || error });
        }
    }


    private getById = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.id);

            if (!userId) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Invalid param 'id'` });

            const result = await this.service.get(userId);

            return res.status(STATUS_CODE.OK).json(result);
        } catch (error: any) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error?.message || error });
        }
    }

    private update = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.id);
            const { body } = req;

            if (!userId) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Invalid param 'id'` });

            const result = await this.service.update(userId, body, req['sysUserId']);

            return res.status(STATUS_CODE.OK).json(result);
        } catch (error: any) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error?.message || error });
        }
    }

    private delete = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.id);

            if (!userId) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Invalid param 'id'` });

            await this.service.delete(userId, req['sysUserId']);

            return res.status(STATUS_CODE.NO_CONTENT).json();
        } catch (error: any) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error?.message || error });
        }
    }
}
