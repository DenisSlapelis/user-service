import { database } from '@database';
import { CreateUserDTO, UpdateUserDTO } from '@dtos/user.dto';
import { UserAddressesDB } from 'src/config/database/models/user-addresses.database-model';
import { UserDB } from 'src/config/database/models/user.database-model';
import { injectable } from "tsyringe";

@injectable()
export class UserRepository {
    constructor() {
    }

    create = async (user: CreateUserDTO): Promise<UserDB> => {
        return database.models.User.create(user);
    }

    list = async (): Promise<Array<UserDB & UserAddressesDB>> => {
        return database.models.User.findAll({
            limit: 15,
            include: {
                model: database.models['UserAddresses'],
            }
        });
    }

    get = async (userId: number): Promise<UserDB> => {
        return database.models.User.findByPk(userId);
    }

    getByDocument = async (document: string): Promise<UserDB> => {
        return database.models.User.findOne({
            where: { document }
        });
    }

    update = async (userId: number, fields: UpdateUserDTO, updatedBy: number) => {
        return database.models.User.update({ ...fields, updatedBy }, {
            where: {
                id: userId
            }
        });
    }

    delete = async (userId: number, deletedBy: number) => {
        return database.models.User.update({ deletedBy, deletedAt: new Date(), active: false }, {
            where: {
                id: userId
            }
        });
    }
}
