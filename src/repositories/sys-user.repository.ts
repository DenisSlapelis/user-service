import { database } from '@database';
import { injectable } from "tsyringe";

@injectable()
export class SysUserRepository {
    constructor() {
    }

    get = async (username: string, password: string) => {
        const result = await database.mysql.models.SysUser.findOne({
            where: {
                username,
                password
            }
        });

        return result;
    }
}
