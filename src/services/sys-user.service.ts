import { inject, injectable } from "tsyringe";
import jwt from 'jsonwebtoken';
import { env } from '@env';
import { SysUserRepository } from "@repositories/sys-user.repository";

@injectable()
export class SysUserService {
    constructor(@inject('SysUserRepository') private repository: SysUserRepository) {
    }

    login = async (username: string, password: string) => {
        const user = await this.repository.get(username, password);

        if (!user) throw new Error('User not found');

        return { token: this.signToken(user) };
    }

    private signToken = (user) => {
        const payload = {
            sysUserId: user.id,
            username: user.username,
        }

        const options = {
            expiresIn: '24h',
        };

        return jwt.sign(payload, env.getValue('JWT_PRIVATE_KEY'), options);
    }
}
