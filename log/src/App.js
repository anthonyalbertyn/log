import React, { useState } from 'react';
import { Button, Input, Modal, Tabs } from 'antd';
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
  const [isAddRecordActive, setIsAddRecordActive] = useState(false);
  const [isEditRecordActive, setIsEditRecordActive] = useState(false);
  const [isAddArtistActive, setIsAddArtistActive] = useState(false);
  const [isEditArtistActive, setIsEditArtistActive] = useState(false);

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

  const getRecord = (albumId) => {
    let record;
    const matches = records.filter((item) => item.albumId === albumId);
    if (matches.length > 0) {
      record = matches[0];
    }
    return record;
  };

  const getArtist = (artistId) => {
    let artist;
    const matches = artists.filter((item) => item.artistId === artistId);
    if (matches.length > 0) {
      artist = matches[0];
    }
    return artist;
  };

  const editRecord = (albumId) => {
    setIsEditRecordActive(true);
  };
  const editArtist = (artistId) => {
    setIsEditArtistActive(true);
  };

  const deleteRecord = (albumId) => {};

  const deleteArtist = (artistId) => {};

  const cancelAddRecord = () => {
    setIsAddRecordActive(false);
  };

  const cancelEditRecord = () => {
    setIsEditRecordActive(false);
  };

  const cancelAddArtist = () => {
    setIsAddArtistActive(false);
  };

  const cancelEditArtist = () => {
    setIsEditArtistActive(false);
  };

  const handleSearchInputChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Record Collection</h1>
        <div className="app-action-items-wrapper">
          <div className="app-action-item">
            <Button
              key="addRecord"
              type="primary"
              size="large"
              icon={<SoundOutlined />}
              onClick={() => setIsAddRecordActive(true)}
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
              onClick={() => setIsAddArtistActive(true)}
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
      </header>
      <div className="main">
        <Tabs type="card">
          <TabPane tab="Records" key="recordsTab">
            <RecordList
              records={records}
              artists={artists}
              onEdit={editRecord}
              onDelete={deleteRecord}
            />
          </TabPane>
          <TabPane tab="Artists" key="artistsTab">
            <ArtistList
              artists={artists}
              onEdit={editArtist}
              onDelete={deleteArtist}
            />
          </TabPane>
        </Tabs>
        {isAddRecordActive && (
          <Modal
            title="Add Record"
            visible={isAddRecordActive}
            onCancel={cancelAddRecord}
            footer={null}
          >
            <RecordForm
              artists={artists}
              onSave={addNewRecord}
              onCancel={cancelAddRecord}
            />
          </Modal>
        )}
        {isEditRecordActive && (
          <Modal
            title="Edit Record"
            visible={isEditRecordActive}
            onCancel={cancelEditRecord}
            footer={null}
          >
            <RecordForm
              artists={artists}
              onSave={editRecord}
              onCancel={cancelEditRecord}
            />
          </Modal>
        )}
        {isAddArtistActive && (
          <Modal
            title="Add Artist"
            visible={isAddArtistActive}
            onCancel={cancelAddArtist}
            footer={null}
          >
            <ArtistForm onSave={addNewArtist} onCancel={cancelAddArtist} />
          </Modal>
        )}
        {isEditArtistActive && (
          <Modal
            title="Edit Artist"
            visible={isEditArtistActive}
            onCancel={cancelEditArtist}
            footer={null}
          >
            <ArtistForm onSave={editArtist} onCancel={cancelEditArtist} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App;
