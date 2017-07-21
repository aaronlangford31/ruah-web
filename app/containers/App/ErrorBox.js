import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const ErrorBox = ({ error, show, close }) => (
  <Dialog
    actions={[
      <FlatButton
        label="Close"
        primary
        onClick={close}
      />,
    ]}
    modal={false}
    open={show}
    onRequestClose={close}
  >
    {error}
  </Dialog>
);

ErrorBox.propTypes = {
  error: PropTypes.string,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default ErrorBox;
