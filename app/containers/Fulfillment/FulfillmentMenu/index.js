import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';

const receivedPath = '/fulfillment/received';
const sentPath = '/fulfillment/sent';

const linkStyle = {
  width: '100%',
  height: '30px',
  color: 'black',
  textDecoration: 'none',
  padding: '2px 5px 2px 5px',
};

const currentLinkStyle = {
  backgroundColor: '#CAFCD8',
};

export default function FulfillmentMenu({ location }) {
  return (
    <Paper style={{ padding: '15px', width: '225px', height: '700px', display: 'flex', flexDirection: 'column' }}>
      <Link to={receivedPath} style={location === receivedPath ? Object.assign({}, linkStyle, currentLinkStyle) : linkStyle}>
        <DownloadIcon color={'#757575'} /> Received Orders
      </Link>
      <Link to={sentPath} style={location === sentPath ? Object.assign({}, linkStyle, currentLinkStyle) : linkStyle}>
        <UploadIcon color={'#757575'} /> Sent Orders
      </Link>
    </Paper>
  );
}

FulfillmentMenu.propTypes = {
  location: PropTypes.string,
};
