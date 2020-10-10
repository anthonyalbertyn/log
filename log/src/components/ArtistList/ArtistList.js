import React from 'react';
import PropTypes from 'prop-types';
import Artist from '../Artist';
import './ArtistList.css';
import { sortObjectListByStringKey } from '../../utils';

const propsDefinition = {
  artists: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

function ArtistList(props) {
  const { artists = [], onDelete = () => {}, onEdit = () => {} } = props;

  const list = sortObjectListByStringKey(
    [...artists],
    'artistName',
    'ascending',
  );

  return (
    <div className="record-list">
      {list.length > 0 &&
        list.map((item) => (
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
