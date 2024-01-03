import { database } from '@database';
import { CreateUserAddressDTO } from '@dtos/user.dto';
import { UserAddressesDB } from 'src/config/database/models/user-addresses.database-model';
import { injectable } from "tsyringe";

@injectable()
export class UserAddressRepository {
    constructor() {
    }

    create = async (userAddress: CreateUserAddressDTO): Promise<UserAddressesDB> => {
        return database.models.UserAddresses.create(userAddress);
    }

    get = async (userId: number): Promise<UserAddressesDB[]> => {
       return database.models.UserAddresses.findAll({
            where: {
                userId
            }
        });
    }
}
