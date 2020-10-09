import React from 'react';
import PropTypes from 'prop-types';
import Record from '../Record';
import './RecordList.css';

const propsDefinition = {
  records: PropTypes.array,
  artists: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

function RecordList(props) {
  const {
    records = [],
    artists = [],
    onDelete = () => {},
    onEdit = () => {},
  } = props;

  const getArtistName = (artistId) => {
    let artistName = 'Not specified';
    const matches = artists.filter((item) => item.artistId === artistId);
    if (matches.length > 0) {
      artistName = matches[0].artistName;
    }
    return artistName;
  };

  return (
    <div className="record-list">
      {records.length > 0 &&
        records.map((item) => {
          const artistName = getArtistName(item.artistId);
          return (
            <Record
              key={item.albumId}
              artistName={artistName}
              albumId={item.albumId}
              albumTitle={item.albumTitle}
              albumYear={item.albumYear}
              albumCondition={item.albumCondition}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
    </div>
  );
}

RecordList.propTypes = propsDefinition;

export default RecordList;
