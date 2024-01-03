import { singleton } from "tsyringe";

@singleton()
export class PublicRoute {
    private publicRoutes: Record<string, string>;

    constructor() {
        this.publicRoutes = {
            '/healthcheck': 'GET'
        }
    }

    isPublicRoute = (route: string, method: string) => {
        return this.publicRoutes[route] == method;
    }
}
