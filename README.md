# User Service

User microservice to Create, Read, Update and Delete Users.

---

![Static Badge](https://img.shields.io/badge/backend%20project-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v20.9.0-version?logo=nodedotjs&logoColor=%23339933&color=%23339933&labelColor=white&label=Node%2EJS)
![Static Badge](https://img.shields.io/badge/v5.x-version?logo=typescript&logoColor=%233178c6&color=%233178c6&labelColor=white&label=TypeScript)
![Static Badge](https://img.shields.io/badge/v4.x-version?logo=express&logoColor=%23000000&color=%23000000&labelColor=white&label=Express)

---
![Static Badge](https://img.shields.io/badge/database-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v8.0.33-version?logo=mysql&logoColor=%234479A1&color=%234479A1&labelColor=white&label=MySQL)
![Static Badge](https://img.shields.io/badge/v6.x-version?logo=sequelize&logoColor=%2352B0E7&color=%2352B0E7&labelColor=white&label=Sequelize)

---
![Static Badge](https://img.shields.io/badge/cloud%20integrations-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v3.x-version?logo=amazonaws&logoColor=%23FF9900&color=%23FF9900&labelColor=white&label=AWS%20SDK)

---
![Static Badge](https://img.shields.io/badge/utils-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v4.x-version?logo=lodash&logoColor=%233492FF&color=%233492FF&labelColor=white&label=Lodash)
![Static Badge](https://img.shields.io/badge/v4.x-version?logo=dayjs&logoColor=%23FB6052&color=%23FB6052&labelColor=white&label=Dayjs)

---

<a name="table-of-contents"></a>

## Table of contents

* [Usage documentation](#table-of-contents)
    * [Usage with Node.JS](#table-of-contents)
        * [Prerequisites](#node-prerequisites)
        * [Installation](#node-installation)
        * [Usage](#node-usage)
        * [Tests](#tests)
    * [Endpoints Rules](#endpoints-rules)
    * [Postman Collection](#postman)
* [Architecture documentation](#table-of-contents)
    * [Database](#database)
    * [Integrations](#integrations)
    * [Folder Structure](#folder-structure)
* [Others](#table-of-contents)
    * [Changelog](CHANGELOG.md)
    * [Redis Utils Commands](#redis-utils-commands)

---

<a name="node-prerequisites"></a>

## Node Prerequisites

To run this project, ensure that you have the following items:

* [Node.JS](https://nodejs.org) (v20.9.0)
* [Configured .env file](#envs)

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

### Envs

You must configure **.env** file following the [.env.example](/.env.example) template.

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="node-installation"></a>

## Node Installation

1. Clone this repository to your local machine or download the source code.
2. Open a terminal and navigate to the project's root directory.
3. Run the following command to install the project dependencies:

   ```shell
   npm install
   ```

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="node-usage"></a>

## Node Usage

Start the node server in developer mode with the following command:

```shell
npm run start:dev
```

This will start the server and watch for any file changes, automatically restarting the server when necessary.

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="tests"></a>

## Tests

* Run the following command to execute the project tests:

    ```shell
    npm run test
    ```

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="endpoints-rules"></a>

## Endpoints rules

* Except healthcheck, all endpoints have the prefix `/api` followed by the route version, for example `/api/v1/`.
* All endpoints require authorization, which can be passed through the `Authorization` header with a valid **JWT token** (this can be obtained by making a **POST** request on the login route with username and password).
* The `Authorization` header is an `Bearer Token`.

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="postman"></a>

## Postman

(WIP)

[![Run in Postman](https://run.pstmn.io/button.svg)]()

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="database"></a>

## Database

(WIP)

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="integrations"></a>

## Integrations

(WIP)

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="folder-structure"></a>

## Folder Structure

(WIP)

* `.vscode`: vscode configs.
* `docs`: all project documentations, like scripts, diagrams, texts.
* `src`
  * `config`: generic project configurations, like database configs, commit configs.
    * `.husky`: project validations with husky.
    * `database`: database configs.
    * `envs`: local and async envs configs.
  * `controllers`: application controllers.
  * `dtos`: application dtos.
  * `middlewares`: application middlewares.
  * `models`: application models.
  * `repositories`: application repositories.
  * `routes`: application routes.
    * `v1`: v1 endpoints.
  * `services`: application services.
    * `models`: application models.
  * `utils`: common utils functions, constants, and application dependencies.
    * `logger`: logger module.
* `tests`: project tests.

([Back to Table of contents](#table-of-contents) :arrow_up:)
