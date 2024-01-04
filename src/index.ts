import "reflect-metadata";
import { database } from '@database';
import { Express } from 'express';
import { app } from './app';
import { env } from '@env';
import * as logger from '@logger';
import { showMemory } from "@utils/memory.utils";

const main = async () => {
    logger.warn(JSON.stringify(showMemory()));

    await env.populateAllEnvs();

    await database.connect({
        databaseName: env.getValue('MYSQL_DATABASE_NAME'),
        host: env.getValue('MYSQL_DATABASE_HOST'),
        password: env.getValue('MYSQL_DATABASE_PASSWORD'),
        user: env.getValue('MYSQL_DATABASE_USER'),
    });

    startServer(app, env.getValue('PORT'));
}

const startServer = (app: Express, port: number) => {
    app.listen(port, () => {
        logger.info(`Server is running on http://localhost:${port}`);
    });
}

main().catch(err => logger.error(`== error: ${err}`));

