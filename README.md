# ToDo List

## [API Documentation](https://app.swaggerhub.com/apis-docs/HanniGusT/ToDo/1.0.0)

## Overview

The ToDo list API is a Node.js application built with TypeScript, Express, and PostgreSQL with PRISMA ORM. It enables the creationg and management of ToDo`s. This project adheres to S.O.L.I.D principles and clean code practices, ensuring a well-structured and maintainable codebase.

## Features

- **TypeScript**: Written in TypeScript, providing type safety and enhanced code quality.
- **Build Options**: Can be built into JavaScript, including a minified version, and executable files for Linux, Mac, and Windows.
- **Organized Folder Structure**: Simple and organized folder structure for easy navigation and module creation.
- **Translation System**: Includes a translation system using i18next, with localization files stored in the `locales` directory.
- **Error Handling**: Custom error handling to standardize endpoint responses.
- **Logging**: Uses winston for logging errors in both development and production environments and simplifies debugging.
- **Authentication and Authorization**: Middleware for user authentication and authorization to control access to routes.

## Folder Structure

data: json files with the storted data
locales: Contains localization files for translations.

modules:

global (all modules logic and services stays here)

admin: user (bussines logic)
    manager: creates a new class for this module and export it for beeing used
    services: Validation and logic is made here

todo: (bussines logic)
    contains the same folder struct in admin, but since the database is beeing used, it has also a persistence folder, validation folder for the logic, and a factory folder.

logger: Inner service for better developmente experience, contains the custom logs handler.

rest: Contains server setup, routes definitions and middleware configuration.

middlewares: Contains middleware for authentication and authorization, errorLogger and i18 middleware for translations.

routes: In the growth of the backend, it's configurable in src/config/routes.ts to allow for versioning (e.g., /api, /api/v1).

## Dependencies

- **Server**: cors, express
- **Translation**: i18next, i18next-fs-backend, i18next-http-middleware
- **Unique IDs**: uuid
- **Logging**: app-root-path, winston
- **Validation**: zod

# Setup

## Install dependencies

```bash
npm install
```

## Generate database

```bash
npx prisma migrate dev --name init
```

## Generate typescript base on prisma models

```bash
npx prisma generate
```

## Run in development mode

```bash
npm run dev
```

## Traspile to javascript

```bash
npm run build
```

## Minimify javascript build

```bash
npm run build:minify
```

## Generate executable to Linux, Windows and MacOS

```bash
npm run dist
```
