import { database } from '@database';
import { QueryTypes } from 'sequelize';
import { injectable } from "tsyringe";

@injectable()
export class HealthCheckRepository {
    constructor() {
    }

    checkDatabase = async () => {
        const [result] = await database.execute('SELECT 1 AS count', {
            queryType: QueryTypes.SELECT
        });

        return result?.count;
    }
}
