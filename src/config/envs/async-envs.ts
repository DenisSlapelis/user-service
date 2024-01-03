import { parameterStore } from "@dependency";
import _ from "lodash";
import { singleton } from "tsyringe";
import { env } from '@env';

@singleton()
export class AsyncEnvs {
    private readonly APPLICATION_NAME: string = env.getValue('APPLICATION_NAME');
    private readonly VARIABLES_FROM_AWS: Array<string> = [
        `${this.APPLICATION_NAME}/MYSQL_DATABASE_HOST`,
        `${this.APPLICATION_NAME}/MYSQL_DATABASE_PASSWORD`,
        `${this.APPLICATION_NAME}/MYSQL_DATABASE_USER`,
    ];

    constructor() {
    }

    async getValues() {
        const result = {};

        const envChunk = _.chunk(this.VARIABLES_FROM_AWS, 10);

        for (const envList of envChunk) {
            const parameterStoreEnvs = await parameterStore.getParametersFromStore(envList);

            for (const key in parameterStoreEnvs) {
                result[key] = parameterStoreEnvs[key];
            }
        }

        return result;
    }
}
