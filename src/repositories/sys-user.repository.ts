import { database } from '@database';
import { injectable } from "tsyringe";

@injectable()
export class SysUserRepository {
    constructor() {
    }

    get = async (username: string, password: string) => {
        return database.mysql.models.SysUser.findOne({
            where: {
                username,
                password
            }
        });
    }

    create = async (username: string, password: string) => {
        return database.mysql.models.SysUser.create({
            username, password, createdBy: 1
        });
    }
}
