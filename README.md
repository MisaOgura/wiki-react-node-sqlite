## Wiki-like app with React, React Router, Express and SQLite

## Instructions

### To run the app locally
1. Install dependencies - it might take a while (!)
    ```
    $ yarn/npm install
    ```
    
2. Run the app locally in a _development_ mode.
    ```
    $ yarn/npm run start:dev
    ```
    
3. Run the app locally in a _production_ mode.
    ```
    $ yarn/npm start
    ```
    
4. The SQLite database is automatically created on the initial run. The application
creates a `db` directory at the project root, and configures a database according to
the environment - `dev.db` for development and `prod.db` for the production. 

5. Checkout `http://localhost:3000` :D


### To run the test suite
I chose Jest as a test runner, as it requires almost no configuration
and provides useful features such as parallel testing, intelligent test
watching and coverage report out of the box. Happy TDD!

1. Install dependencies.

2. Run all the tests once.
    ```
    $ yarn/npm test
    ``` 
    - Also runs `standard` once all the test has passed, in order to
    highlight any linting errors.

3. Run tests in a watch mode.
    ```
    $ yarn/npm test:watch
    ```

## Approach

### Features
With the time given, I have chosen a combination of features and decided on how
the MVP should look like. I then followed the Kanban style of agile development
with Trello board and user stories to keep track of the progress and priority. 

With this MVP, users can:
- see the list of existing wiki entries for a quick overview
- create a new wiki with a title and content
- visit the individual page for each wiki to read the content 

### Main frameworks and libraries
- Frontend: React, React Router, React-Bootstrap
- Backend: Node.js, Express
- Database: SQLite, better-sqlite3
- Test: Jest, Enzyme, SuperTest
- Lint: JavaScript Standard Style

### Application architecture
The frontend serves as an interface with the user. I aimed to achieve a simple yet
attracting and user-friendly design. I used a React Router to create a single-page
application, which allows the user to navigate seamlessly without the page reload
when navigating through different views.

The backend serves as a RESTful API endpoint to serve and receive data in a JSON
format, mediating the connection between the frontend and the database in a controlled
manner. It also renders the application with pre-loaded data, so that the user can
see the content as soon as the page loads, while the client side is still loading.

### Code quality & TDD
I placed a strong emphasis on driving the development by writing thorough tests.
It allowed me to structure my thoughts and strategies for implementing new features 
and experiment with the ideas, whilst ensuring that the existing features were working
as expected. The TDD cycle also enabled refactoring of the code with confidence.

### Future improvements
I'd like to keep expanding this project to hone my existing skills, as well as
to explore new technologies.

Technologies:
- Introduce Redux for better application state management
- Use other database such as mongoDB
- Deploy to AWS with server-less architecture using Lambda

Features:
- Edit and delete functionality
- Sorting alphabetically, or by date, as well as pagination
- Ability to write wikis in a markdown format
- Ability to create and switch between different databases

## Authour

Misa Ogura