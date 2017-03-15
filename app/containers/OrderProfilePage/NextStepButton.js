import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const NextStepButton = ({ phase, onAcknowledge, onFulfill }) => {
  switch (phase) {
    case 0:
      return (
        <RaisedButton
          label="Acknowledge Now"
          onTouchTap={onAcknowledge}
        />
      );
    case 1:
      return (
        <RaisedButton
          label="Submit Fulfillment Info Now"
          onTouchTap={onFulfill}
        />
      );
    case 2:
      return (
        <div>Order has been fulfilled!</div>
      );
    default:
      return (
        <div>Error</div>
      );
  }
};

NextStepButton.propTypes = {
  phase: PropTypes.number,
  onAcknowledge: PropTypes.func,
  onFulfill: PropTypes.func,
};

export default NextStepButton;
