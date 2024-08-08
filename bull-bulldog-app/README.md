# Bull-Bulldog (v1.0)

**Bull-Bulldog** is an application for finding dogs for mating. It allows users to search for suitable dogs using various search filters.

## Description

Developed by: Anastasia Volovik

**Important:** This application is intended for educational purposes only and cannot be used for commercial purposes.

### Database Setup

1. Ensure that MySQL is installed on your system. If not, download and install it from the [official MySQL website](https://dev.mysql.com/downloads/mysql/).

2. Create a new database, for example, dogs, if it does not already exist:
   CREATE DATABASE dogs;

3. Import the database schema from the dogs.sql file:
  mysql -u root -p dogs < path/to/database/dogs.sql

4. Configure the database connection in the server/db.js file. Ensure that the connection parameters match your MySQL settings.