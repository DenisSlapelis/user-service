import { QueryTypes, Transaction, BindOrReplacements } from "sequelize";

export interface DatabaseParamsDTO {
    host: string;
    databaseName: string;
    user: string;
    password: string;
    logging?: boolean | ((sql: string, timing?: number | undefined) => void);
}

export interface DatabaseQueryOptionsDTO {
    queryType: QueryTypes;
    transaction?: Transaction;
    replacements?: BindOrReplacements;
    logging?: boolean | ((sql: string, timing?: number | undefined) => void);
}
