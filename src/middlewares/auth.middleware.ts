import jwt from 'jsonwebtoken';
import { singleton } from "tsyringe";
import { Request, Response, NextFunction } from 'express';
import { env, publicRoute } from "@dependency";

@singleton()
export class AuthMiddleware {
    constructor() { }

    use = (req: Request, res: Response, next: NextFunction) => {
        const { headers, method } = req;

        const route = req.originalUrl || req.url || '';

        if (publicRoute.isPublicRoute(route, method)) return next();

        const { authorization } = headers;

        if (!authorization) return res.status(401).json({ message: 'Acesso não autorizado.' });

        const [_, token] = authorization.split('Bearer');

        if (!token)
            return res.status(401).json({ message: 'Acesso não autorizado.' });

        const decodedToken = this.getDecodedToken(token.trim());

        if (!decodedToken) return res.status(401).json({ message: 'Acesso não autorizado, JWT Token Inválido.' });

        req['decodedToken'] = decodedToken;

        req['sysUserId'] = decodedToken['sysUserId'];

        return next();
    }

    private getDecodedToken = (token: string) => {
        try {
            const decodedToken = jwt.verify(token, env.getValue('JWT_PRIVATE_KEY'));

            return decodedToken;
        } catch (err) {
            return false;
        }
    };
}
