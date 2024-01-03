import { DatabaseParamsDTO, DatabaseQueryOptionsDTO } from "src/dtos/database.dto";
import { Sequelize } from "sequelize";
import { Transaction, QueryOptions, QueryTypes } from "sequelize";
import { singleton } from "tsyringe";
import * as logger from '@logger';
import { UserDB } from "./models/user.database-model";
import { env } from "@env";

@singleton()
export class Database {
    mysql: Sequelize;

    constructor() {
        this.mysql = new Sequelize({
            dialect: 'sqlite',
            storage: './'
        });
    }

    connect = async (params: DatabaseParamsDTO) => {
        const { host, databaseName, user, password } = params;

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
            logging: env.getValue('MYSQL_LOGGING_QUERIES') == 'true' ? logger.debug : false,
        });

        this.mysql = sequelize;

        await this.mysql.authenticate().catch(err => {
            logger.error(`SEQUELIZE ERROR ON AUTHENTICATE: ${JSON.stringify(err)}`);

            throw err;
        });

        this.initializeModels();
    };

    private initializeModels = () => {
        this.mysql.define('User', UserDB, { tableName: 'users' });
    }

    getTransaction = async () => {
        try {
            return this.mysql.transaction();
        } catch (err) {
            logger.error('Erro ao pegar transação:', err);
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

            const result = await this.mysql.query(sql, options);

            return result as any[];
        } catch (err) {
            logger.error('Erro ao executar a consulta:', err);

            if (transaction) transaction.rollback();

            throw err;
        }
    };

    commit = async (transaction: Transaction) => {
        if (!transaction) throw 'Transação inválida';

        await transaction.commit().catch((err) => {
            logger.error('Erro ao executar commit:', err);
            throw err;
        });
    };

    rollback = async (transaction: Transaction) => {
        if (!transaction) throw 'Transação inválida';

        await transaction.rollback().catch((err) => {
            logger.error('Erro ao executar rollback:', err);
            throw err;
        });
    };
}

