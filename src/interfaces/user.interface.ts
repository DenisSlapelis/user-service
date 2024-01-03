export interface IUser {
    id: number;
    document: string;
    name: string;
    birthDate: Date;
    active: boolean;
    addresses: IUserAddress[];
}

export interface IAddress {
    id: number
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface IUserAddress extends IAddress {
    userId: number;
}
