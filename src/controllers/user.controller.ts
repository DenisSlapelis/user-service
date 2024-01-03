import { UserService } from '@services/user.service';
import { STATUS_CODE } from '@utils/constants.utils';
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

        // ** PATCH **
        // ** PUT **
        // ** DELETE **
    }

    public getRouter = (): Router => {
        return this.router;
    }

    private create = async (req: Request, res: Response) => {
        try {
            const user = req.body;
            const userId = req['sysUserId'];

            const result = await this.service.create({ ...user, createdBy: userId });

            return res.status(STATUS_CODE.CREATED).json(result);
        } catch (error: any) {
            const statusCode = error.cause == 'Validation Error' ? STATUS_CODE.VALIDATION_ERROR : STATUS_CODE.SERVER_ERROR;

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

            if (!userId) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Invalid param 'userId'` });

            const result = await this.service.get(userId);

            return res.status(STATUS_CODE.OK).json(result);
        } catch (error: any) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error?.message || error });
        }
    }
}
