import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import Artist from '../Artist';
import './ArtistList.css';

const propsDefinition = {
  artists: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

function ArtistList(props) {
  const { artists = [], onDelete = () => {}, onEdit = () => {} } = props;

  const [displayList, setDisplayList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const maximumItemsPerPage = 5;

  useEffect(() => {
    if (currentPage === 1) {
      setDisplayList(artists.slice(0, maximumItemsPerPage));
    } else {
      // endIndex could end up being larger than array length if less items
      // on a page than maximumItemsPerPage, but array slice does not care
      // as it will just use array.length if that happens
      const startIndex =
        currentPage * maximumItemsPerPage - maximumItemsPerPage;
      const endIndex = currentPage * maximumItemsPerPage;
      setDisplayList(artists.slice(startIndex, endIndex));
    }
    // sanity check first and last page numbers for when
    // a user deletes items
    const numberItems = artists.length;
    const largestPageNumber = Math.ceil(numberItems / maximumItemsPerPage);
    if (numberItems <= maximumItemsPerPage && currentPage !== 1) {
      setCurrentPage(1);
    } else if (currentPage > largestPageNumber) {
      setCurrentPage(largestPageNumber);
    }
  }, [currentPage, artists, maximumItemsPerPage]);

  const handlePaginationChange = (pageNumber, _) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="artist-list">
      <>
        {displayList.length > 0 &&
          displayList.map((item) => (
            <Artist
              key={item.artistId}
              artistId={item.artistId}
              artistName={item.artistName}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        {artists.length > 0 && (
          <div className="artist-list-pagination-wrapper">
            <Pagination
              defaultCurrent={1}
              total={artists.length}
              pageSize={maximumItemsPerPage}
              onChange={handlePaginationChange}
              current={currentPage}
            />
          </div>
        )}
      </>
    </div>
  );
}

ArtistList.propTypes = propsDefinition;

export default ArtistList;
