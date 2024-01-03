import { CreateUserAddressDTO } from '@dtos/user.dto';
import { UserAddress } from '@models/user-address.entity';
import { UserAddressRepository } from '@repositories/user-address.repository';
import { inject, injectable } from "tsyringe";

@injectable()
export class UserAddressService {
    constructor(@inject('UserAddressRepository') private repository: UserAddressRepository) {
    }

    create = async (userAddress: CreateUserAddressDTO) => {
        return this.repository.create(userAddress);
    };

    get = async (userId: number) => {
        const result = await this.repository.get(userId);

        return result.map(address => {
            return new UserAddress(address);
        });
    }
}
