export type AddressDTO = {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface CreateUserDTO {
    document: string;
    name: string;
    birthDate: Date;
    addresses: AddressDTO[];
    createdBy: number;
}

export interface CreateUserAddressDTO extends AddressDTO {
    userId: number;
    createdBy: number;
}
