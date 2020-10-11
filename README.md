# Coding Challenge

Completed by Anthony Albertyn on 11 October 2020

## Brief

- "Greg" has a record collection that he keeps track of in Json format
- "Greg" needs a web application to manage his record collection
- Build a frontend app that is used to manage "Greg's" record/album collection
- The app must be able to fetch data for "Greg's" records
- Greg cataloged his records in json format available at
  https://gist.github.com/seanders/df38a92ffc4e8c56962e51b6e96e188f [Gregs records](https://gist.github.com/seanders/df38a92ffc4e8c56962e51b6e96e188f)
- Records must be displayed in a paginated way in the frontend app
- The frontend app must display this data for each album
  Artist Name, Album Title, Year, and Record Condition
- A user must be able to edit and update all fields of an album
- Data changes do not need to be persisted
- A user must also be able to update an artist's name
- When an artist's name is updated, it should be updated for all records
  associated with the artist
- A user should also be able to filter records by search query
- Search results should update as the user types
- Design your own user interface
- Implement in any frontend technology you feel comfortable with

## Solution

### API

- Dummy API to serve artists and records data
- `cd api` then `yarn install` then `yarn run`
- API runs at http://localhost:4000
- Records endpoint: http://localhost:4000/records
- Artists endpoint: http://localhost:4000:/artists
- The API must be running for the app to work
- Start the API first and then the Frontend app

### Frontend app

- Frontent app with React, bootstraped with create-react-app
- `cd log` then `yarn install` then `yarn run`
- App runs at http://localhost:3000

### Frontend app tests

- I did not write any tests as I am out of time on this task, and focused more on the user interface, user experience and on the React and JavaScript code to demonstrate my app building skills
- Testing is very important though and to see some examples of my testing skills, see tests in another similar coding challenge that I recently completed: https://github.com/anthonyalbertyn/sen

#### Functionality

- On load, the app imports records and artists from the API
- A spinner is displayed while data is loading
- All records and artists are listed if the search field has no text
- If the search field has text, the records and artists will be filtered
- Record fltering happens on 'albumTitle' and artists filtering happens on 'artistName'
- There records and artists data are listed under two tabs (one for records and one for artists)
- Records as well as artists cards display 10 results maximim per paginated item
- There are buttons at the top of the page to add a record or add an artist
- A user can also edit and delete artists and records
- A user can rate the condition of the record using 5 stars: 1. poor, 2. fair, 3. good, 4. very good and 5. mint
- Hover over a star to see it's meaning
- To access edit and delete buttons on records or artists, hover over the icon at the bottom of
  each record or artist card
- See screenshots folder for a quick view of the user interface

## Considerations around data fetching and data structure

I decided not use use Greg's endpoints within the frontend app itself
as the data was not very well-structured and I assumed Greg is not a developer
so his data and server might not be reliable. The strategy was to get Greg's data
outside of the frontend application, then clean the data and reformat the data to make
it more scalable and to make the app use a new api where the data can be fetched from
and that the app (in the future) will use to persist data.

The main changes I made to the data format was to split the data into artists and records
and to assign uuid's as 'artistId' for artists and 'albumId' records. In the new data structure, the records
reference only the artistId.

I decided to make the frontend app decide how it wants to pagenate data, and not have this dictated by the endpoints
as the frontend app displays data in ascending order or albumTitle for records and ascending order of artistName for artists and when search is applied the data will change. Greg's endpoints could not perform search queries, so the way he structured his unsorted Json files into paginated endpoints was not useful.

I considered using Redux for state management, but because this is a very small app, I decided go with state on App to manage records and artists state. Using Redux though would have resulted in less clutter within App.js would have been useful if the scope of this task was to implement data persitance.

### The old data structure looked like this:

`"results": [ { "album_title": "Cardigan Letterpress Scenester", "year": 1967, "condition": "poor", "artist": { "name": "Sex Pistols", "id": 0 } }, { "album_title": "Sriracha Vinegar Disrupt", "year": 1964, "condition": "poor", "artist": { "name": "Derek and the Dominos", "id": 1 } }, ],`

### The new data structure looks like this:

`{ "artists": [ { "artistId": "ca0787f5-f2b8-4e8f-a0d7-2915bd7e49dc", "artistName": "Sex Pistols" } ] }`

`{ "records": [ { "albumId": "aadb9c4c-7833-4e2f-b240-9fc848171da5", "albumTitle": "Cardigan Letterpress Scenester", "albumYear": 1967, "albumCondition": 1, "artistId": "ca0787f5-f2b8-4e8f-a0d7-2915bd7e49dc" }]`

### User interface considerations

I assumed it would be confusing for a user to edit an artist name within a record/album and to know that editing the artist name would change the artist name everywhere it is used, and not just on that specific record. I decided that a user should only be able to select an existing artist's from the record form, and would need to go to an artists card directly and then edit the artist from there. That would make it much clearer to the user what the consequences of their actions are.

### Things I would do if I had more time

- Break the React components down to even smaller reusable components
- Make the code in App.js more DRY, for example: notifications code is repeated
- Re-implemented state managemnt for records and artists using Redux with actions and disspatchers
- Write unit tests with Jest and React Testing Library!
- Add a button on the record/album form to add a new artist inline if it does not exist in the artist select list
