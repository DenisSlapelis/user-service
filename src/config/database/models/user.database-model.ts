import { DataTypes } from 'sequelize';

export const UserDB = {
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
    brithDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'brith_date',
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
    },
    createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: 'created_by',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
    },
    updatedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: 'updated_by',
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at',
    },
    deletedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        field: 'deleted_by',
    },
};
