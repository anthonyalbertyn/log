import React, { useState, useEffect } from 'react';
import { Button, Input, Rate, Select } from 'antd';
import PropTypes from 'prop-types';
import './RecordForm.css';

const { Option } = Select;

const propsDefinition = {
  artistId: PropTypes.number,
  albumTitle: PropTypes.string,
  albumYear: PropTypes.number,
  albumCondition: PropTypes.number,
  artists: PropTypes.array.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

function RecordForm(props) {
  const {
    artistId = '',
    albumTitle = '',
    albumYear = '',
    albumCondition = 0,
    artists = [],
    onClickSave = () => {},
    onClickCancel = () => {},
  } = props;

  const [albumTitleField, setAlbumTitleField] = useState(albumTitle);
  const [albumYearField, setAlbumYearField] = useState(albumYear);
  const [artistIdField, setArtistIdField] = useState(artistId);
  const [albumConditionField, setAlbumConditionField] = useState(
    albumCondition,
  );

  const [albumTitleError, setAlbumTitleError] = useState('');
  const [albumYearError, setAlbumYearError] = useState('');
  const [artistIdError, setArtistIdError] = useState('');
  const [albumConditionError, setAlbumConditionError] = useState('');

  const initialSaveDisabledValue = albumTitle ? false : true;
  const [isSaveDisabled, setIsSaveDisabled] = useState(
    initialSaveDisabledValue,
  );
  const [hasUserInteractedWithForm, setHasUserInteractedWithForm] = useState(
    false,
  );

  const handleAlbumTitleFieldChange = (event) => {
    setAlbumTitleField(event.target.value);
  };

  const handleAlbumYearFieldChange = (event) => {
    // validate must be a number
    setAlbumYearField(event.target.value);
  };

  const handleArtistIdFieldChange = (value) => {
    setArtistIdField(value);
  };

  const handleAlbumConditionFieldChange = (value) => {
    setAlbumConditionField(value);
  };

  useEffect(() => {
    const validationSuccess = {
      requiredAlbumTitle: false,
      requiredAlbumYear: false,
      formatAlbumYear: false,
      requiredArtistId: false,
      requiredAlbumCondition: false,
    };

    const validYear = /^\d{4}$/;

    // Validate - Album Title
    if (albumTitleField) {
      validationSuccess.requiredAlbumTitle = true;
    }
    // Validate - Album Year
    if (albumYearField) {
      validationSuccess.requiredAlbumYear = true;
      if (validYear.test(albumYearField)) {
        validationSuccess.formatAlbumYear = true;
      }
    }
    // Validate - Artist Name
    if (artistIdField) {
      validationSuccess.requiredArtistId = true;
    }
    // Validate - Album Condition
    if (albumConditionField) {
      validationSuccess.requiredAlbumCondition = true;
    }

    if (!validationSuccess.requiredAlbumTitle) {
      setAlbumTitleError('Please add an Album Title');
    } else if (albumTitleError) {
      setAlbumTitleError('');
    }

    if (!validationSuccess.requiredAlbumYear) {
      setAlbumYearError('Please add an Album Year');
    } else if (!validationSuccess.formatAlbumYear) {
      setAlbumYearError('Please add a valid 4-digit year');
    } else if (albumYearError) {
      setAlbumYearError('');
    }

    if (!validationSuccess.requiredArtistId) {
      setArtistIdError('Please select an Artist Name');
    } else if (artistIdError) {
      setArtistIdError('');
    }

    if (!validationSuccess.requiredAlbumCondition) {
      setAlbumConditionError('Please rate the album condition');
    } else if (albumConditionError) {
      setAlbumConditionError('');
    }

    // Enabling and disabling Save button
    const hasAnyValidationFailed = Object.keys(validationSuccess).some(
      (key) => !validationSuccess[key],
    );
    if (hasAnyValidationFailed && !isSaveDisabled) {
      setIsSaveDisabled(true);
    } else if (!hasAnyValidationFailed && isSaveDisabled) {
      setIsSaveDisabled(false);
    }
  }, [albumTitleField, albumYearField, artistIdField, albumConditionField]);

  const recordFormHeading = albumTitle ? 'Edit record' : 'Add new record';

  return (
    <div className="record-form">
      <div className="record-form-heading">{recordFormHeading}</div>
      <div className="record-form-field">
        <Input
          placeholder="Album Title"
          onChange={handleAlbumTitleFieldChange}
          onBlur={() => setHasUserInteractedWithForm(true)}
          value={albumTitleField}
        />
        {albumTitleError && hasUserInteractedWithForm && (
          <div className="error">{albumTitleError}</div>
        )}
      </div>
      <div className="record-form-field">
        <Input
          placeholder="Year"
          onChange={handleAlbumYearFieldChange}
          onBlur={() => setHasUserInteractedWithForm(true)}
          value={albumYearField}
        />
        {albumYearError && hasUserInteractedWithForm && (
          <div className="error">{albumYearError}</div>
        )}
      </div>
      <div className="record-form-field">
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select an artist"
          optionFilterProp="children"
          onChange={handleArtistIdFieldChange}
          onFocus={() => {}}
          onBlur={() => setHasUserInteractedWithForm(true)}
          onSearch={() => {}}
          value={artistIdField}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {artists.length > 0 && (
            <>
              {artists.map((item) => (
                <Option value={item.artistId}>{item.artistName}</Option>
              ))}
            </>
          )}
        </Select>
        {artistIdError && hasUserInteractedWithForm && (
          <div className="error">{artistIdError}</div>
        )}
      </div>
      <div className="record-form-field">
        <div>Condition</div>
        <Rate
          onChange={handleAlbumConditionFieldChange}
          onBlur={() => setHasUserInteractedWithForm(true)}
          value={albumConditionField}
          tooltips={['Poor', 'Fair', 'Good', 'Very Good', 'Mint']}
        />
        {albumConditionError && hasUserInteractedWithForm && (
          <div className="error">{albumConditionError}</div>
        )}
      </div>
      <div className="record-form-actions-wrapper">
        <div className="record-form-action-item">
          <Button key="recordFormCancel" onClick={onClickCancel}>
            Cancel
          </Button>
        </div>
        <div className="record-form-action-item">
          <Button
            key="recordFormSave"
            type="primary"
            disabled={isSaveDisabled}
            onClick={() => onClickSave(artistIdField)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

RecordForm.propTypes = propsDefinition;

export default RecordForm;
