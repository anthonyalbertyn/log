import React from 'react';
import PropTypes from 'prop-types';
import Artist from '../Artist';
import './ArtistList.css';

const propsDefinition = {
  artists: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

function ArtistList(props) {
  const { artists = [], onDelete = () => {}, onEdit = () => {} } = props;

  return (
    <div className="record-list">
      {artists.length > 0 &&
        artists.map((item) => (
          <Artist
            key={item.artistId}
            artistId={item.artistId}
            artistName={item.artistName}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </div>
  );
}

ArtistList.propTypes = propsDefinition;

export default ArtistList;
