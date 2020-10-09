import React from 'react';
import PropTypes from 'prop-types';
import Artist from '../Artist';
import './ArtistList.css';

const propsDefinition = {
  artists: PropTypes.array,
};

function ArtistList(props) {
  const { artists = [] } = props;

  return (
    <div className="record-list">
      {artists.length > 0 &&
        artists.map((item) => (
          <Artist key={item.artistId} artistName={item.artistName} />
        ))}
    </div>
  );
}

ArtistList.propTypes = propsDefinition;

export default ArtistList;
