import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize';

export interface UserDB extends Model<InferAttributes<UserDB>, InferCreationAttributes<UserDB>> {
    id: CreationOptional<number>;
    document: string;
    name: string;
    birthDate: Date;
    active: CreationOptional<boolean>;
    createdAt: CreationOptional<Date>;
    createdBy: number;
    updatedAt?: Date;
    updatedBy?: number;
    deletedAt?: Date;
    deletedBy?: number;
}

export const UserDBProps = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
