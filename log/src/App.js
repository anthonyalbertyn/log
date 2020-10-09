import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import ArtistForm from './components/ArtistForm';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';

import { generateId } from './utils';

function App() {
  const [records, setRecords] = useState([]);
  const [artists, setArtists] = useState([]);

  const addNewRecord = (albumTitle, albumYear, albumCondition, artistId) => {
    if (!albumTitle || !albumYear || !albumCondition || !artistId) {
      return;
    }
    const newRecord = {
      albumId: generateId(),
      albumTitle,
      albumYear: parseInt(albumYear, 10),
      albumCondition: parseInt(albumCondition, 10),
      artistId,
    };
    setRecords([
      ...records,
      {
        ...newRecord,
      },
    ]);
  };

  const addNewArtist = (artistName) => {
    if (!artistName) {
      return;
    }
    const newArtist = {
      artistId: generateId(),
      artistName,
    };
    setArtists([
      ...artists,
      {
        ...newArtist,
      },
    ]);
  };

  const cancelRecordForm = () => {};
  const cancelArtistForm = () => {};

  return (
    <div className="app">
      <header className="app-header">
        <h1>Record Collection</h1>
      </header>
      <div className="main">
        <RecordForm
          artists={artists}
          onSave={addNewRecord}
          onCancel={cancelRecordForm}
        />
        <ArtistForm onSave={addNewArtist} onCancel={cancelArtistForm} />
        <RecordList records={records} artists={artists} />
      </div>
    </div>
  );
}

export default App;

/*
  artists={artists}
  artistId={4}
  albumTitle="Hello there"
  albumYear={1986}
  albumCondition={2}
*/
