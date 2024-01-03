import { container } from 'tsyringe';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { HealthCheckController } from '@controllers/healthcheck.controller';
import { HealthCheckRepository } from '@repositories/healthcheck.repository';
import { HealthCheckService } from '@services/healthcheck.service';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { PublicRoute } from '@routes/public-routes';
import { Environment } from '../config/envs/environment';
import { Database } from '../config/database/database';
import { ParameterStore } from './parameter-store.utils';
import { AsyncEnvs } from 'src/config/envs/async-envs';
import { ConfigService } from '@services/config.service';
import { ConfigController } from '@controllers/config.controller ';
import { UserRepository } from '@repositories/user.repository';
import { UserService } from '@services/user.service';
import { UserAddressRepository } from '@repositories/user-address.repository';
import { UserAddressService } from '@services/user-address.service';
import { UserController } from '@controllers/user.controller';
import { SysUserController } from '@controllers/sys-user.controller';
import { SysUserRepository } from '@repositories/sys-user.repository';
import { SysUserService } from '@services/sys-user.service';

// Singletons
export const env = container.resolve(Environment);
export const database = container.resolve(Database);
export const parameterStore = container.resolve(ParameterStore);
export const asyncEnvs = container.resolve(AsyncEnvs);
export const loggerMiddleware = container.resolve(LoggerMiddleware);
export const publicRoute = container.resolve(PublicRoute);
export const authMiddleware = container.resolve(AuthMiddleware);

// Configurar o container de injeção de dependências
container.register<HealthCheckRepository>('HealthCheckRepository', { useClass: HealthCheckRepository });
container.register<HealthCheckService>('HealthCheckService', { useClass: HealthCheckService });
container.register<ConfigService>('ConfigService', { useClass: ConfigService });
container.register<SysUserRepository>('SysUserRepository', { useClass: SysUserRepository });
container.register<SysUserService>('SysUserService', { useClass: SysUserService });
container.register<UserRepository>('UserRepository', { useClass: UserRepository });
container.register<UserService>('UserService', { useClass: UserService });
container.register<UserAddressRepository>('UserAddressRepository', { useClass: UserAddressRepository });
container.register<UserAddressService>('UserAddressService', { useClass: UserAddressService });

// Resolver as dependências
export const healthCheckController = container.resolve<HealthCheckController>(HealthCheckController);
export const configController = container.resolve<ConfigController>(ConfigController);
export const sysUserController = container.resolve<SysUserController>(SysUserController);
export const userController = container.resolve<UserController>(UserController);

