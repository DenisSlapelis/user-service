import { User } from '@models/user.entity';
import { UserRepository } from '@repositories/user.repository';
import { inject, injectable } from "tsyringe";
import { UserAddressService } from './user-address.service';
import { CreateUserDTO, UpdateUserDTO } from '@dtos/user.dto';
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

            return new User({ ...user, addresses: user['UserAddresses'] })
        });
    }

    get = async (userId: number) => {
        const [user, addresses] = await Promise.all([
            this.repository.get(userId),
            this.userAddressService.get(userId),
        ]);

        if (!user) return {};

        const userParams = { ...user.dataValues, addresses: addresses }

        return new User(userParams);
    }

    update = async (userId: number, fields: UpdateUserDTO, updatedBy: number) => {
        const user = await this.repository.get(userId);

        if (!user) throw new Error('User not found', { cause: 'Validation Error' });

        const { document, name, birthDate } = fields;

        const newValues = { document, name, birthDate };

        await this.repository.update(userId, newValues, updatedBy);

        return this.get(userId);
    }

    delete = async (userId: number, deletedBy: number) => {
        const user = await this.repository.get(userId);

        if (!user) throw new Error('User not found', { cause: 'Validation Error' });

        await this.repository.delete(userId, deletedBy);
    }

    private validCreateParams = (user: CreateUserDTO) => {
        const { birthDate, addresses, document, name } = user;

        if (!birthDate) throw new Error(`Required param 'birthDate' was not found.`, { cause: 'Validation Error' });

        if (!addresses || !addresses.length) throw new Error(`Required param 'addresses' was not found.`, { cause: 'Validation Error' });

        if (!document) throw new Error(`Required param 'document' was not found.`, { cause: 'Validation Error' });

        if (!name) throw new Error(`Required param 'name' was not found.`, { cause: 'Validation Error' });
    }
}
