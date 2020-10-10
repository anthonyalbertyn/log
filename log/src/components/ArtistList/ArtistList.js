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

  const maximumItemsPerPage = 10;

  useEffect(() => {
    // Sanity check page numbers for when a user deletes
    // the last remaining item on a page
    const numberItems = artists.length;
    if (numberItems === 0 && currentPage !== 1) {
      setCurrentPage(1);
      return;
    } else if (numberItems > 0) {
      const largestPageNumber = Math.ceil(numberItems / maximumItemsPerPage);
      if (currentPage > largestPageNumber) {
        setCurrentPage(largestPageNumber);
        return;
      }
    }
    // Filter list so we only have items that should be ion the current page
    if (currentPage === 1) {
      setDisplayList(artists.slice(0, maximumItemsPerPage));
    } else {
      // array slice does not care if endIndex is larger than array length
      const startIndex =
        currentPage * maximumItemsPerPage - maximumItemsPerPage;
      const endIndex = currentPage * maximumItemsPerPage;
      setDisplayList(artists.slice(startIndex, endIndex));
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
