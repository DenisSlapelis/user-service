import { SysUserService } from '@services/sys-user.service';
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

            if (!username || !password) return res.status(400).json({message: `Invalid required params 'username' and 'password'.`});

            const result = await this.service.login(username, password).catch(err => {
                return res.status(404).json({ message: err?.message || err });
            })

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({ message: error?.message || error });
        }
    }
}
