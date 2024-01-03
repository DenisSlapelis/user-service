import { DatabaseParamsDTO, DatabaseQueryOptionsDTO } from "src/dtos/database.dto";
import { Sequelize } from "sequelize";
import { Transaction, QueryOptions, QueryTypes } from "sequelize";
import { singleton } from "tsyringe";

@singleton()
export class Database {
    mysqlDatabase: null | Sequelize;

    constructor() {
        this.mysqlDatabase = null;
    }

    connect = async (params: DatabaseParamsDTO) => {
        const { host, databaseName, user, password, logging } = params;

        if (!host || !databaseName || !user || !password)
            throw `Invalid database configs: host: ${host} | databaseName: ${databaseName} | user: ${user} | password: ${password}`;

        const sequelize = new Sequelize(databaseName, user, password, {
            host,
            dialect: 'mysql',
            dialectOptions: { connectTimeout: 300000 },
            pool: {
                acquire: 300000,
                idle: 100000,
            },
            logging: logging || false,
        });

        this.mysqlDatabase = sequelize;

        await this.execute('SELECT 1', {
            queryType: QueryTypes.SELECT
        })
    };

    getTransaction = async () => {
        try {
            return this.mysqlDatabase?.transaction();
        } catch (err) {
            console.error('== Erro ao pegar transação:', err);
            throw err;
        }
    };

    execute = async (sql: string, queryOptions: DatabaseQueryOptionsDTO) => {
        const { transaction, queryType, replacements, logging } = queryOptions;

        try {
            const options: QueryOptions = {
                type: QueryTypes[queryType],
            };

            if (transaction) options.transaction = transaction;
            if (replacements) options.replacements = replacements;
            if (logging) options.logging = logging;

            const result = await this.mysqlDatabase?.query(sql, options);

            return result as any[];
        } catch (err) {
            console.error('== Erro ao executar a consulta:', err);

            if (transaction) transaction.rollback();

            throw err;
        }
    };

    commit = async (transaction: Transaction) => {
        if (!transaction) throw 'Transação inválida';

        await transaction.commit().catch((err) => {
            console.error('== Erro ao executar commit:', err);
            throw err;
        });
    };

    rollback = async (transaction: Transaction) => {
        if (!transaction) throw 'Transação inválida';

        await transaction.rollback().catch((err) => {
            console.error('== Erro ao executar rollback:', err);
            throw err;
        });
    };
}

