# E-Commerce Backend ![License](https://img.shields.io/badge/License-ISC-blue.svg)
Express.JS API utilizing Sequelize to interact with a MYSQL database to build out the back end of a fictional e-commerce site

## Deployed Site Link 

N/a

## Table of Contents

- [Description, Setup, and Installation](#description-setup-and-installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Full License Information](#license-information)
- [Conrtibutors](#contributors)
- [Testing Performed](#testing-performed)
- [Questions](#questions)


## Description, Setup, and Installation

This is an application that is to be used with a fictional Ecommerce application to create, seed, and maintain the database of said application using API calls via Sequelize. The functions established in this program will allow a user to manage the database through various possible API routes to store and update, as well as remove old, persistent data housed in a mysql database. Additionally, multiple tables have been joined through connecting elements, such as the product_id to tag_id via product_tags, which allow users to visibly understand the relations between numerous points of data (as shown in the demonstration below).

In order to install and setup all necessary components for this program to run as intended, first all required NPM packages (as specified in the package.json) must be installed via "npm i/install." Afterwards, "mysql -u root -p < SCHEMAPATHNAME" must be run followed by "npm run seed" in order to initialize and seed the database to contain the example data provided. Finally, "node server.js" will allow the server to be spun up in the node environment, allowing users to access the database information via API routes at the specified url (localhost PORT 3001 will serve as the local url).

## Usage
As previously mentioned, this application is meant to establish the backend of, specifically, an ecommerce application. It holds necessary information including categories, products, tags, and a table of product_tags linking the products table to all of their linked tags in a 1:m format. After any information has been saved to the database, it can be accessed to either create (post), retrieve (get), update (put), and delete (delete) said info, providing CRUD functionality to the application.

## Technologies Used
- JavaScript
- Node.JS
- Express.JS

NPM
- Sequelize
- dotenv

## License Information
![License](https://img.shields.io/badge/License-ISC-blue.svg)

[License Link](https://opensource.org/licenses/ISC)

## Contributors
- Austin Joo

## Questions
Please contact me with any questions, comments, or concerns regarding this repo or if you would like to be a fellow contributor to this project!
- GitHub: AustinJoo97 
- Email: austinjoo1997@gmail.com
## Demonstration
https://vimeo.com/549616818
