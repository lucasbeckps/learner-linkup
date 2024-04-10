# LearnerLinkup 📚
LearnerLinkup is a web application designed to streamline the student enrollment process.

## Prerequisites 📋
Before you can launch the LearnerLinkup project, ensure the following software is installed on your system:
- [Node.js](https://nodejs.org/en/) (version 18 or later)
- [Yarn](https://yarnpkg.com/) for package management
- For database management, either [Docker](https://docs.docker.com/get-docker/) or a local installation of [PostgreSQL](https://www.postgresql.org/download/) can be used.

## Installation ⚙️
Follow these steps to set up the LearnerLinkup project on your machine:

### 1. Clone the repository: 🔽
First, clone the repository to your local machine. You can use either SSH or HTTPS:
```sh
# SSH
git clone git@github.com:lucasbeckps/learner-linkup.git
```
```sh
# HTTPS
git clone https://github.com/lucasbeckps/learner-linkup.git
```

### 2. Install dependencies: 📦
Navigate to the project's root directory and execute `yarn install` to install all required dependencies for the packages within the monorepo.

### 3. Create a `.env` file: 🔑
Duplicate the `.env.example` file and rename the copy to `.env`. 

By default, LearnerLinkup is configured to use a PostgreSQL database within a Docker container. 
Should you prefer utilizing a local PostgreSQL database, adjust the environment variables in the .env file accordingly.

### 4. Start the database: 💾
- For Docker users: Execute `docker compose up --build` to build and start the postgresql database container.
- For local PostgreSQL users: Ensure your PostgreSQL database service is active.

### 5. Apply the migrations: 📝
Execute `yarn migrate` to apply database migrations and create necessary tables.  
If desired, you can set the project seed the database with preliminary data initially. 
These settings can be modified in the [migrations-config.js](/packages/backend/migrations.config.js) file. 

## Running the Application ▶️
Once the installation and setup processes are complete, the application is ready to be launched.
- Start the project by running yarn dev. This command initiates both the API and the frontend server.
- Access the frontend interface at [http://localhost:3001](http://localhost:3001).

# 🐝🤓 
