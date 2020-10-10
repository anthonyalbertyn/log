import React, { useState } from 'react';
import { Button, Input, Modal, notification, Tabs } from 'antd';
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
  const [activeTabKey, setActiveTabKey] = useState('recordsTab');

  // available notification types are:
  // success, info, warning, error
  const openNotificationWithIcon = (
    notificationType,
    notificationTitle,
    notificationMessage,
  ) => {
    notification[notificationType]({
      message: notificationTitle,
      description: notificationMessage,
    });
  };

  const activeTabShouldBe = (tabKey) => {
    if (activeTabKey !== tabKey) {
      setActiveTabKey(tabKey);
    }
  };

  const addNewRecord = (albumTitle, albumYear, albumCondition, artistId) => {
    activeTabShouldBe('recordsTab');
    if (!albumTitle || !albumYear || !albumCondition || !artistId) {
      openNotificationWithIcon(
        'error',
        'Record not added',
        'Some data was missing',
      );
    }
    const newRecord = {
      albumId: generateId(),
      albumTitle,
      albumYear: parseInt(albumYear, 10),
      albumCondition: parseInt(albumCondition, 10),
      artistId,
    };
    setRecords([...records, newRecord]);
    openNotificationWithIcon('success', 'Record added', albumTitle);
  };

  const addNewArtist = (artistName) => {
    activeTabShouldBe('artistsTab');
    if (!artistName) {
      openNotificationWithIcon(
        'error',
        'Artist not added',
        'Some data was missing',
      );
      return;
    }
    const newArtist = {
      artistId: generateId(),
      artistName,
    };
    setArtists([...artists, newArtist]);
    openNotificationWithIcon('success', 'Artist added', artistName);
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

  const editRecord = (
    albumId,
    albumTitle,
    albumYear,
    albumCondition,
    artistId,
  ) => {
    activeTabShouldBe('recordsTab');
    if (!albumId || !albumTitle || !albumYear || !albumCondition || !artistId) {
      openNotificationWithIcon(
        'error',
        'Record not updated',
        'Some data was missing',
      );
      return;
    }
    const filteredRecords = records.filter((item) => item.albumId !== albumId);
    const updatedRecord = {
      albumId,
      albumTitle,
      albumYear: parseInt(albumYear, 10),
      albumCondition: parseInt(albumCondition, 10),
      artistId,
    };
    setRecords([...filteredRecords, updatedRecord]);
    openNotificationWithIcon('success', 'Record updated', albumTitle);
  };

  const editArtist = (artistId, artistName) => {
    activeTabShouldBe('artistsTab');
    if (!artistId || !artistName) {
      openNotificationWithIcon(
        'error',
        'Artist not updated',
        'Some data was missing',
      );
      return;
    }
    const filteredArtists = artists.filter(
      (item) => item.artistId !== artistId,
    );
    const updatedArtist = {
      artistId,
      artistName,
    };
    setArtists([...filteredArtists, updatedArtist]);
    openNotificationWithIcon('success', 'Artist updated', artistName);
  };

  const deleteRecord = (albumId) => {
    if (!albumId) {
      return;
    }
    const filteredRecords = records.filter((item) => item.albumId !== albumId);
    setRecords(filteredRecords);
  };

  const deleteArtist = (artistId, artistName) => {
    if (!artistId || !artistName) {
      openNotificationWithIcon(
        'error',
        'Artist not deleted',
        'Some data was missing',
      );
      return;
    }
    const filteredRecords = records.filter(
      (item) => item.artistId === artistId,
    );
    if (filteredRecords.length > 0) {
      openNotificationWithIcon(
        'warning',
        'Artist could not be deleted',
        `${artistName} is used by ${filteredRecords.length} albums`,
      );
    } else {
      const filteredArtists = artists.filter(
        (item) => item.artistId !== artistId,
      );
      setArtists(filteredArtists);
      openNotificationWithIcon('success', 'Artist deleted', artistName);
    }
  };

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

  const handleAddRecordClick = () => {
    setIsAddRecordActive(true);
  };

  const handleAddArtistClick = () => {
    setIsAddArtistActive(true);
  };

  const handleEditRecordClick = (albumId) => {
    // get the data
    setIsEditRecordActive(true);
  };

  const handleEditArtistClick = (artistId) => {
    // get the data
    setIsEditArtistActive(true);
  };

  const handleSearchInputChange = (event) => {
    console.log(event.target.value);
  };

  const handleTabChange = (tabKey) => {
    setActiveTabKey(tabKey);
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
              onClick={handleAddRecordClick}
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
              onClick={handleAddArtistClick}
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
        <Tabs type="card" activeKey={activeTabKey} onChange={handleTabChange}>
          <TabPane tab="Records" key="recordsTab">
            <RecordList
              records={records}
              artists={artists}
              onEdit={handleEditRecordClick}
              onDelete={deleteRecord}
            />
          </TabPane>
          <TabPane tab="Artists" key="artistsTab">
            <ArtistList
              artists={artists}
              onEdit={handleEditArtistClick}
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
