# ToDoApp-JS

## Made With

<img align="left" alt="HTML5" width="35px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png"/>

<img align="left" alt="SASS SCSS" width="35px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/sass/sass.png"/>

<img align="left" alt="JavaScript" width="35px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"/>

<img align="left" alt="Webpack" width="35px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/webpack/webpack.png"/>

<img align="left" alt="Babel" width="32px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/babel/babel.png"/>

<img alt="Node.js" width="35px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png"/>

## Prerequisites

This project requires NodeJS and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
8.11.0
v16.15.1
```

## Table of contents

- [ToDoApp-JS](#todoapp-js)
  - [Made With](#made-with)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Building a distribution version](#building-a-distribution-version)
    - [Building a development version](#building-a-development-version)
    - [Running client in the development mode](#running-client-in-the-development-mode)
    - [Serving the app](#serving-the-app)
    - [Running server in the development mode](#running-server-in-the-development-mode)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/Oleksandr073/ToDoApp-JS.git
$ cd ToDoApp-JS
```

To install and set up the packages, run:

```sh
$ cd client
$ npm i
$ cd ../server
$ npm i
$ cd ..
```

To create `.env`, run:

```sh
$ cd server
$ cp example.env .env
$ cd ..
```

This task will copy `example.env` as `.env` inside your local `server` folder

## Usage

### Building a distribution version

```sh
$ cd client
$ npm run build
```

This task will create a distribution version of the project
inside your local `client/public/` folder

### Building a development version

```sh
$ cd client
$ npm run dev 
```

This task will create a development version of the project
inside your local `client/public/` folder

### Running client in the development mode

```sh
$ cd client
$ npm run watch
```

This task will create a development version of the project
inside your local `client/public/` folder whenever you change the code in the `client` folder

### Serving the app

```sh
$ cd server
$ npm start
```

This task will start the server

*Note* this requires
[Building a distribution or development version](#building-a-distribution-version) first

### Running server in the development mode

```sh
$ cd server
$ npm run dev
```

This task will restart the server whenever you change the code in the `server` folder

*Note* this requires
[Building a distribution or development version](#building-a-distribution-version) first