# Nutrition 
================

_Both the project and this README.md file are a work in progress_

## Overview
------------
Nutrition is a free and open-source web app that allows people to calculate their daily nutrition intake. As of now the nutrition are limited to:
- Kcal
- Fat
- Saturated fat
- Carbs
- Protein

## Features
------------
#### Non-CRUD functionalities
- [x] Display added products in a pop-up
- [x] From the pop-up select the products for nutrition calculation
- [x] Calculate the total nutrition intake in a table

#### CRUD functionalities
- [x] Add a product (with product name and the above mentioned nutrition)
- [x] Delete a product
- [x] Update a product
- [x] Display all products in a table

## Setting up the Local Development Environment

1. **Clone the repository**

   ```bash
   git clone https://github.com/rammahkarpous/nutrition.git
   cd nutrition
   ```

2. **Install PHP dependencies**

   ```bash
   composer install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure the database**

   Edit the `.env` file to set up the database connection. For local development with SQLite:

   ```
   DB_CONNECTION=sqlite
   # Create an empty database file
   touch database/database.sqlite
   ```

   For MySQL:

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nutrition
   DB_USERNAME=root
   DB_PASSWORD=
   ```

   If necessary add a password to the `DB_PASSWORD` environment variable.

5. **Run database migrations and seeders**

   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Install frontend dependencies**

   ```bash
   npm install
   ```

7. **Start the development server**

   ```bash
   composer run dev
   ```

   The application will be available at http://localhost:8000

## Tech stack
-----

### Back-end / Front-end
- Laravel 12 with ReactJS Starter Kit (TypeScript)

### Middleman
- InertiaJS

### Database
- SQLite (for local development)
- MySQL

## Contributing
------------

Contributions to this project are welcome. Please contact me at [info@rammahkarpous.com](mailto:info@rammahkarpous.com).

## License
-------

This project is licensed under [insert license here].
