import React, { useState } from 'react';
import { Button, Input, Tabs } from 'antd';
import { SearchOutlined, SoundOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css';
import ArtistForm from './components/ArtistForm';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';
import ArtistList from './components/ArtistList';
import { generateId } from './utils';

const { TabPane } = Tabs;

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

  const handleSearchInputChange = (event) => {
    console.log(event.target.value);
  };

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

        <div className="app-action-items-wrapper">
          <div className="app-action-item">
            <Button
              key="addRecord"
              type="primary"
              size="large"
              icon={<SoundOutlined />}
            >
              Add Record
            </Button>
          </div>
          <div className="app-action-item">
            <Button
              key="addArtist"
              type="secondary"
              size="large"
              icon={<UserOutlined />}
            >
              Add Artist
            </Button>
          </div>
        </div>
        <div className="app-search-wrapper">
          <Input
            placeholder="Search records and artists"
            size="large"
            onChange={handleSearchInputChange}
            suffix={<SearchOutlined />}
            style={{ width: '100%', maxWidth: 500 }}
          />
        </div>

        <Tabs type="card">
          <TabPane tab="Records" key="recordsTab">
            <RecordList records={records} artists={artists} />
          </TabPane>
          <TabPane tab="Artists" key="artistsTab">
            <ArtistList artists={artists} />
          </TabPane>
        </Tabs>
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
