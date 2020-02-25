# Burger Builder
A simple Burger Builder App built with React and Redux

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

1. Node JS : version >= 10.10.0 - [Installation](https://nodejs.org/en/download/package-manager/)
2. Firebase API Key : To enable authentication, add Firebase API key to REACT_APP_FB_KEY in **.env** file.


## Installation

### Clone

Clone this repo into your local machine using `https://github.com/samagyani/react-burger-app.git`

### Setup

Extract the cloned repo, open a new terminal in the project folder and run the following command to install node packages

```language
npm install
```

After installing node packages. In the same terminal, run the following command to start the App

```language
npm run
```

### How to get Firebase API Key ?

1. Go to [Firebase Console](https://console.firebase.google.com/).

2. Create a New Project by clicking on **Add Project** and go to the project.

3. Click on **Gear Icon** on right to **Project Summary** and select **Project Settings**

4. In **General** tab, you can find **Web API Key**

5. Copy **Web API Key**, Open **.env** file and replace **REACT_APP_FB_KEY** with copied **Web API Key**

## Built with

- [React](https://reactjs.org/) - UI Library by Facebook
- [Redux](https://react-redux.js.org/) - State Management
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Redux Middleware

## Author
Sama Gyaneshwar Reddy - [LinkedIn](https://www.linkedin.com/in/sama-gyaneshwar-reddy-934351105)