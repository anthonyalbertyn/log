This project was bootstrapped with [json-server](https://github.com/typicode/json-server).

## Overview

This is an API to provide artists and record data

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs json-server

### `yarn start`

Runs the API in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

Alternatively you can run this command: json-server --watch db.json

## End-points (GET)

### http://localhost/artists

Response in Json format

`{[{ "artistId": "ca0787f5-f2b8-4e8f-a0d7-2915bd7e49dc", "artistName": "Artist Name Here" }]}`

### http://localhost/records

Response in Json format

`{ [{ "albumId": "aadb9c4c-7833-4e2f-b240-9fc848171da5", "albumTitle": "Album Title Here", "albumYear": 1967, "albumCondition": 1, "artistId": "ca0787f5-f2b8-4e8f-a0d7-2915bd7e49dc" }]}`

Album condition: 1. Poor, 2. Fair, 3. Good, 4. Very Good, 5. Mint

## Documentation for json-server

See README at https://github.com/typicode/json-server [json-server](https://github.com/typicode/json-server)
