import React, { useEffect, useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import './Artist.css';

const propsDefinition = {
  artistName: PropTypes.string,
  artistId: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function Artist(props) {
  const {
    artistName,
    artistId,
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
    onDelete(artistId, artistName);
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
        <div onClick={() => onEdit(artistId)}>Edit</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={requestDelete}>Delete</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="artist">
      <div className="artist-heading">{artistName}</div>
      <div className="artist-actions">
        {!hasRequestedDelete && (
          <Dropdown overlay={actionsMenu} placement="topLeft">
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        )}
        {hasRequestedDelete && (
          <div className="artist-delete-action-message">
            <div className="artist-message-item">Delete artist?</div>
            <div className="artist-message-item">
              <Button size="small" onClick={confirmDeleteRequest}>
                Yes
              </Button>
            </div>
            <div className="artist-message-item">
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

Artist.propTypes = propsDefinition;

export default Artist;
