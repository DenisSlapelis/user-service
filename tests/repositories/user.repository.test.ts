import { CreateUserDTO } from "@dtos/user.dto";
import { database, userRepository } from "@env";
import { UserRepository } from "@repositories/user.repository";

describe('UserRepository', () => {
    let _userRepository: UserRepository;
    let user: CreateUserDTO;

    beforeAll(async () => {
        process.env.APPLICATION_ENVIRONMENT = 'test';

        await database.connect({
            databaseName: '',
            host: '',
            password: '',
            user: '',
        });
    })

    beforeEach(async () => {
        _userRepository = userRepository;

        user = {
            document: "123.456.789-00",
            name: "User Example",
            birthDate: new Date("1996-10-12"),
            addresses: [
                {
                    street: "street_example",
                    number: "number_example",
                    complement: "complement_example",
                    neighborhood: "neighborhood_example",
                    city: "city_example",
                    state: "state_example",
                    zipCode: "zipCode_example",
                },
            ],
            createdBy: 1,
        };
    });

    describe('Create user', () => {
        it('should create an user', async () => {
            const createdUser = {
                id: 1,
                document: "123.456.789-00",
                name: "User Example",
                birthDate: new Date("1996-10-12"),
                active: true,
                createdAt: new Date("2024-01-04"),
                createdBy: 1,
                updatedAt: undefined,
            };

            const result = await _userRepository.create(user);

            result.dataValues.createdAt = new Date("2024-01-04");
            result.dataValues.updatedAt = undefined;

            expect(result.dataValues).toEqual(createdUser);
        });
    });

    describe('Get user', () => {
        it('should get an user', async () => {
            const foundUser = {
                id: 1,
                document: "123.456.789-00",
                name: "User Example",
                birthDate: new Date("1996-10-12"),
                active: true,
                createdAt: new Date("2024-01-04"),
                createdBy: 1,
                updatedAt: undefined,
                updatedBy: null,
                deletedAt: null,
                deletedBy: null
            };

            const result = await _userRepository.get(1);

            result.dataValues.createdAt = new Date("2024-01-04");
            result.dataValues.updatedAt = undefined;

            expect(result.dataValues).toEqual(foundUser);
        });

        it('should not found an user', async () => {
            const result = await _userRepository.get(0);

            expect(result).toEqual(null);
        });
    });

    describe('Get user by Document', () => {
        it('should get an user by document', async () => {
            const foundUser = {
                id: 1,
                document: "123.456.789-00",
                name: "User Example",
                birthDate: new Date("1996-10-12"),
                active: true,
                createdAt: new Date("2024-01-04"),
                createdBy: 1,
                updatedAt: undefined,
                updatedBy: null,
                deletedAt: null,
                deletedBy: null
            };

            const result = await _userRepository.getByDocument("123.456.789-00");

            result.dataValues.createdAt = new Date("2024-01-04");
            result.dataValues.updatedAt = undefined;

            expect(result.dataValues).toEqual(foundUser);
        });

        it('should not found an user', async () => {
            const result = await _userRepository.getByDocument("0");

            expect(result).toEqual(null);
        });
    });
});
