import { User } from '@models/user.entity';
import { UserRepository } from '@repositories/user.repository';
import { inject, injectable } from "tsyringe";
import { UserAddressService } from './user-address.service';
import { CreateUserDTO } from '@dtos/user.dto';
import { IUserAddress } from 'src/interfaces/user.interface';

@injectable()
export class UserService {
    constructor(
        @inject('UserRepository') private repository: UserRepository,
        @inject('UserAddressService') private userAddressService: UserAddressService,
    ) {
    }

    create = async (user: CreateUserDTO) => {
        this.validCreateParams(user);

        const { document, addresses, createdBy } = user;

        const existsUser = await this.repository.getByDocument(document);

        if (existsUser) throw new Error(`There is already a user with this document (${document}).`, { cause: 'Validation Error' });

        const createdUser = await this.repository.create(user);

        const createdAddresses: IUserAddress[] = [];

        for (const address of addresses) {
            const result = await this.userAddressService.create({ ...address, userId: createdUser.id, createdBy });

            createdAddresses.push(result);
        }

        return new User({ ...createdUser.dataValues, addresses: createdAddresses });
    }

    list = async () => {
        const data = await this.repository.list();

        return data.map(row => {
            const user = row.dataValues;

            return new User({...user, addresses: user['UserAddresses'] })
        });
    }

    get = async (userId: number) => {
        const [user, addresses] = await Promise.all([
            this.repository.get(userId),
            this.userAddressService.get(userId),
        ]);

        const userParams = { ...user.dataValues, addresses: addresses }

        return new User(userParams);
    }

    private validCreateParams = (user: CreateUserDTO) => {
        const { birthDate, addresses, document, name } = user;

        if (!birthDate) throw new Error(`Required param 'birthDate' was not found.`, { cause: 'Validation Error' });

        if (!addresses || !addresses.length) throw new Error(`Required param 'addresses' was not found.`, { cause: 'Validation Error' });

        if (!document) throw new Error(`Required param 'document' was not found.`, { cause: 'Validation Error' });

        if (!name) throw new Error(`Required param 'name' was not found.`, { cause: 'Validation Error' });
    }
}
