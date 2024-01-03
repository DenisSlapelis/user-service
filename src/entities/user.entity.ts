import { IUser } from "src/interfaces/user.interface";
import { UserAddress } from "./user-address.entity";
import { Document } from "./value-objects/document.value-object";
import { Birthdate } from "./value-objects/birthdate.value-object";

export class User implements IUser {
    id: number;
    document: string;
    name: string;
    birthDate: Date;
    active: boolean;
    addresses: UserAddress[];

    constructor(params: IUser) {
        this.id = params.id;
        this.document = new Document(params.document).getDocument();
        this.name = params.name;
        this.birthDate = new Birthdate(params.birthDate).getDate();
        this.active = params.active;
        this.addresses = params.addresses;
    }
}
