import { IUserAddress } from "src/interfaces/user.interface";

export class UserAddress implements IUserAddress {
    id: number;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    userId: number;

    constructor(params: IUserAddress) {
        this.id = params.id;
        this.street = params.street;
        this.number = params.number;
        this.complement = params.complement;
        this.neighborhood = params.neighborhood;
        this.city = params.city;
        this.state = params.state;
        this.zipCode = params.zipCode;
        this.userId = params.userId;
    }
}
