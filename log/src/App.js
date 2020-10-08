import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import ArtistForm from './components/ArtistForm';
import RecordForm from './components/RecordForm';

function App() {
  const [records, setRecords] = useState([]);
  const [artists, setArtists] = useState([
    {
      artistId: 1,
      artistName: 'Lynn Henderson',
    },
    {
      artistId: 2,
      artistName: 'Anthony Albertyn',
    },
    {
      artistId: 3,
      artistName: 'Bobby Brown',
    },
    {
      artistId: 4,
      artistName: 'Pinky Drinky',
    },
  ]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Record Collection</h1>
      </header>
      <div className="main">
        <RecordForm
          artists={artists}
          artistId={4}
          albumTitle="Hello there"
          albumYear={1986}
          albumCondition={2}
        />
      </div>
    </div>
  );
}

export default App;

// <ArtistForm />

/*

  artistId: PropTypes.number,
  albumTitle: PropTypes.string,
  albumYear: PropTypes.number,
  albumCondition: PropTypes.number,

*/
