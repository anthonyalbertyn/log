import React, { useEffect, useState } from 'react';
import { Button, Menu, Rate, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import './Record.css';

const propsDefinition = {
  artistName: PropTypes.string,
  albumId: PropTypes.string,
  albumTitle: PropTypes.string,
  albumYear: PropTypes.number,
  albumCondition: PropTypes.number,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function Record(props) {
  const {
    artistName,
    albumId,
    albumTitle,
    albumYear,
    albumCondition,
    onEdit = () => {},
    onDelete = () => {},
  } = props;

  const [hasRequestedDelete, setHasRequestedDelete] = useState(false);

  const requestDelete = () => {
    setHasRequestedDelete(true);
  };
  const cancelDeleteRequest = () => {
    setHasRequestedDelete(false);
  };
  const confirmDeleteRequest = () => {
    setHasRequestedDelete(false);
    onDelete(albumId, albumTitle);
  };

  useEffect(() => {
    let hideActionMessageTimer;
    if (hasRequestedDelete) {
      hideActionMessageTimer = setTimeout(
        () => setHasRequestedDelete(false),
        5000,
      );
    }
    return () => clearTimeout(hideActionMessageTimer);
  }, [hasRequestedDelete]);

  const actionsMenu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => onEdit(albumId)}>Edit</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={requestDelete}>Delete</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="record">
      <div className="record-heading">{albumTitle}</div>
      <div className="record-subheading">
        {artistName} - {albumYear}
      </div>

      <div className="record-condition">
        <Rate
          value={albumCondition}
          tooltips={['Poor', 'Fair', 'Good', 'Very Good', 'Mint']}
          disabled
        />
      </div>
      <div className="record-actions">
        {!hasRequestedDelete && (
          <Dropdown overlay={actionsMenu} placement="topLeft">
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        )}
        {hasRequestedDelete && (
          <div className="record-delete-action-message">
            <div className="record-message-item">Delete record?</div>
            <div className="record-message-item">
              <Button size="small" onClick={confirmDeleteRequest}>
                Yes
              </Button>
            </div>
            <div className="record-message-item">
              <Button size="small" onClick={cancelDeleteRequest}>
                No
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Record.propTypes = propsDefinition;

export default Record;
