import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize';

export interface UserAddressesDB extends Model<InferAttributes<UserAddressesDB>, InferCreationAttributes<UserAddressesDB>> {
    id: CreationOptional<number>;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    userId: number;
    createdAt: CreationOptional<Date>;
    createdBy: number;
    updatedAt?: Date;
    updatedBy?: number;
    deletedAt?: Date;
    deletedBy?: number;
}

export const UserAddressesDBProps = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deletedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
};
