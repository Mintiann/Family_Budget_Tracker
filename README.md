
# Family Income and Expenditure Management System

This application facilitates users in three different roles to keep track of their own income and expenditure and to influence family income and expenditure accordingly.

# Points

## Server

### A list/table of services
Get/api/sessions, Post/api/sessions, Delete/api/sessions, Get/api/records, Get/api/familyrecords, Post/api/records, Delete/api/records/:id

### Roles access control

Three different Roles 
+ ADMIN (username: 'Admin'), 
+ LOGGED_IN_USER (username: Numbers and letters with 2-8 in length), 
+ NOT_LOGGED_IN_USER (username: 'Guest').

Different roles correspond to different functions. When a user log in, s/he will all see the user balance/records and family balance/records, and are able to add/delete records. The differences are that 
+ The Header will introduce the permissions of the three roles differently.
+ The record list of User and Guest will show their own record history, while the record list of Admin will show the family history
+ For Admin, he can add or delete his own record, and delete other user's record as well; for normal user, he can add or delete her/his own records to affect the family record and family balance, but s/he can't delete other users' records (since only her/his own records are displayed); for Guest, s/he can add and delete his own records, but these will not affect the family record and family balance.  

### Polling

By employing "useEffect" and calling the "onRefresh" method to update user records and family records, Balance, IncomeExpenses, and History components are refreshed every 10 seconds. 

### Service pagination

Use home and statement buttons to paginate the home page and the statement page.

## Client

### A list of view

+ Login view: for users to log in.
+ Home view: for different users to see their own balance/family balance and add/delete records.
+ Statement view: for reminding all data is private.

### Special UI elements

#### Interactive components
Complex validation with visual feedback
+ If username is invalid, for example, "dog" or numbers/letters other than the length of 2-8, the corresponding username box will turn red and an error message will appear.

#### Animations

 The fadeIn animation applies a fade-in effect accompanied by a slight upward shift to list items, transitioning from transparent to opaque appearance.

#### Intuitive user interface designs

+ Interactive Elements: Buttons and interactive elements (input, .login-btn, .delete-btn, .logout-btn, .refresh-btn) have hover and focus states that provide feedback to users, which is an important aspect of intuitive design.

+ Responsive Design: Media queries adjust the layout and sizing of elements on smaller screens, maintaining usability and intuitiveness on various devices.

+ Container Styles: A centered container with a max-width, background color, padding, border-radius, and box-shadow creates a card-like effect that is a common pattern in intuitive designs.


#### Excellent architecture

#### Following Separation of Concerns

The src directory contains the following files and folders:

+ App.css and index.css - Stylesheet files.
+ App.jsx and main.jsx - React components and entry files.
+ components - Directory containing React components.
+ context - Directory containing state management related code.
+ utils - Directory containing utility functions.


#### Usage of useReducer
+ Reducer Function: The reducer function provided to useReducer determines how the state should change in response to each action dispatched. It takes the current state and an action as arguments and returns the new state. 
+ Initial State: The initial state for the reducer is defined in reducer.js and is passed as the second argument to useReducer.
+ Dispatch Function: The dispatch function provided by "useReducer" is used to trigger state changes. It is used throughout the GlobalProvider to dispatch actions that signify various application events, such as logging in, logging out, refreshing data, adding or deleting user/family records.
#### Usage of useContext
+ Global Context Creation: The GlobalContext is created using "createContext" and holds the initial state and functionality that needs to be accessible across the application. This context is defined in the "GlobalProvider". See context/client.jsx for its definition.
+ Providing Context: The "GlobalProvider" wraps the application's component tree, providing the global state and functions to all child components via the context.
+ Using Context: Any component that needs access to global state or functions uses the "useContext" hook to refer to "GlobalContext". For example, in component directory, global context such as records, familyRecords, loginStatus, onRefresh are accessed by calling useContext(GlobalContext).

# How to use the app

* npm install, npm run build, npm start

* At first, you should login to the application. the username can not be "dog" and only be numbers and letters of length 2-8.
* Log in as a normal user (with a username of length 2-8 containing only numbers and letters)/guset user (use "Guest" to log in), enter the corresponding text in the ITEM box and the AMOUNT box, click ADD RECORD to add records to your user history, fix the mouse to the label record you want to delete in your history, and click on DELETE to delete the record as shown in the display. Click on the home and privacy buttons to view different pages, and click on the refresh logout button to refresh and logout.
* Log in as a admin user(use "Admin" to log in), you can addtionally delete the records of the logged-in users in the family history. 



                         
