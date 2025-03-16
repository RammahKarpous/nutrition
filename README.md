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
- [ ] Display added products in a pop-up
- [ ] From the pop-up select the products for nutrition calculation
- [ ] Calculate the total nutrition intake in a table

#### CRUD functionalities
- [x] Add a product (with product name and the above mentioned nutrition)
- [x] Delete a product
- [x] Update a product
- [x] Display all products in a table

## Getting Started
---------------
1. Clone the repo
```bash 
# using Git
git clone https://github.com/rammahkarpous/nutrition.git 

# Using gh CLI
gh clone rammahkarpous/nutrition
```

2. Install all the dependencies
```bash
# NPM
npm install

# Composer
composer install
```

3. Run the server
```bash
composer run dev
```

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