import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import './ArtistForm.css';

const propsDefinition = {
  artistName: PropTypes.string,
  onClickSave: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

function ArtistForm(props) {
  const {
    artistName,
    onClickSave = () => {},
    onClickCancel = () => {},
  } = props;

  const defaultArtistNameField = artistName || '';
  const defaultSaveDisabled = artistName ? false : true;
  const [artistNameField, setArtistNameField] = useState(
    defaultArtistNameField,
  );
  const [isSaveDisabled, setIsSaveDisabled] = useState(defaultSaveDisabled);
  const [
    artistNameFieldErrorMessage,
    setArtistNameFieldErrorMessage,
  ] = useState('');
  const [hasUserInteractedWithForm, setHasUserInteractedWithForm] = useState(
    false,
  );

  const handleArtistNameFieldChange = (event) => {
    setArtistNameField(event.target.value.trim());
  };

  useEffect(() => {
    if (artistNameField && isSaveDisabled) {
      setIsSaveDisabled(false);
    } else if (!artistNameField && !isSaveDisabled) {
      setIsSaveDisabled(true);
    }
    if (artistNameField && artistNameFieldErrorMessage) {
      setArtistNameFieldErrorMessage('');
    } else if (!artistNameField && !artistNameFieldErrorMessage) {
      setArtistNameFieldErrorMessage('Please add an artist name');
    }
  }, [artistNameField]);

  const artistFormHeading = artistName ? 'Edit artist' : 'Add new artist';

  return (
    <div className="artist-form">
      <div className="artist-form-heading">{artistFormHeading}</div>
      <div className="artist-form-field">
        <Input
          placeholder="Artist Name"
          onChange={handleArtistNameFieldChange}
          onBlur={() => setHasUserInteractedWithForm(true)}
          value={artistNameField}
        />
        {artistNameFieldErrorMessage && hasUserInteractedWithForm && (
          <div className="error">{artistNameFieldErrorMessage}</div>
        )}
      </div>
      <div className="artist-form-actions-wrapper">
        <div className="artist-form-action-item">
          <Button key="artistFormCancel" onClick={onClickCancel}>
            Cancel
          </Button>
        </div>
        <div className="artist-form-action-item">
          <Button
            key="artistFormSave"
            type="primary"
            disabled={isSaveDisabled}
            onClick={() => onClickSave(artistNameField)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

ArtistForm.propTypes = propsDefinition;

export default ArtistForm;
