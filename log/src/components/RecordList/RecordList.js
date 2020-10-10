import React from 'react';
import PropTypes from 'prop-types';
import Record from '../Record';
import './RecordList.css';
import { sortObjectListByStringKey } from '../../utils';

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
    let artistName = 'Artist not specified';
    const matches = artists.filter((item) => item.artistId === artistId);
    if (matches.length > 0) {
      artistName = matches[0].artistName;
    }
    return artistName;
  };

  const list = sortObjectListByStringKey(
    [...records],
    'albumTitle',
    'ascending',
  );

  return (
    <div className="record-list">
      {list.length > 0 &&
        list.map((item) => {
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
