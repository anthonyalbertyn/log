import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
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

  const [displayList, setDisplayList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const maximumItemsPerPage = 3;

  useEffect(() => {
    // Sanity check page numbers for when a user deletes
    // the last remaining item on a page
    const numberItems = records.length;
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
      setDisplayList(records.slice(0, maximumItemsPerPage));
    } else {
      // array slice does not care if endIndex is larger than array length
      const startIndex =
        currentPage * maximumItemsPerPage - maximumItemsPerPage;
      const endIndex = currentPage * maximumItemsPerPage;
      setDisplayList(records.slice(startIndex, endIndex));
    }
  }, [currentPage, records, maximumItemsPerPage]);

  const handlePaginationChange = (pageNumber, _) => {
    setCurrentPage(pageNumber);
  };

  const getArtistName = (artistId) => {
    let artistName = 'Artist not specified';
    const matches = artists.filter((item) => item.artistId === artistId);
    if (matches.length > 0) {
      artistName = matches[0].artistName;
    }
    return artistName;
  };

  return (
    <div className="record-list">
      <>
        {displayList.length > 0 &&
          displayList.map((item) => {
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
        {records.length > 0 && (
          <div className="record-list-pagination-wrapper">
            <Pagination
              defaultCurrent={1}
              total={records.length}
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

RecordList.propTypes = propsDefinition;

export default RecordList;
