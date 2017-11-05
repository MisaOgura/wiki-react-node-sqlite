## Wiki-like app with React, React Router, Express and Sqlite

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
    
4. The SQLite database is automatically configured on the initial run.

5. Checkout `http://localhost:3000`!


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
With the time given, I have chosen a combination of features from the suggested
list to create an MVP. Then I followed the Kanban style of agile development using
Trello board to keep track of the progress and priority. 

With MVP1, users can:
- see the list of existing wiki entries for a quick overview
- create a new wiki with a title and content
- visit the individual page for each wiki to read the content 

### Main frameworks and libraries
- Frontend: React, React Router, React-Bootstrap
- Backend: Node.js, Express
- Database: SQLite, better-sqlite3
- Test: Jest, Enzyme, SuperTest
- Coding style: [Standard]([JavaScript Standard Style](https://standardjs.com/))

### Application architecture
The frontend serves as an interface with the user. I paid an attention to achieve
a simple yet attracting and user-friendly design. I used a React Router to create
a single-page application, which allows the user to navigate seamlessly without the
page reload.

The backend serves as a RESTFUL API to serve and receive data in a JSON format,
hence mediating the connection between the frontend and the database in a controlled
manner. It also initially renders the application with pre-loaded data, so that the
user can see the initial content as soon as the page loads, while the client side
is loading.

### Code quality & TDD
I placed a strong emphasis on driving the development by writing through tests.
It allowed me to structure my thoughts and strategies for implementing new features 
and experiment with them, whilst ensuring that the existing features were working
as expected. The TDD cycle also enabled refactoring of the code with confidence.

### Future improvements
- Introduce Redux for the better application state management
- Add edit and delete functionality
- Enable sorting alphabetically, or by date
- Pagination


## Authour

Misa Ogura