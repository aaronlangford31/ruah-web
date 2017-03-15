import React, { PropTypes } from 'react';
import ShippedIcon from 'material-ui/svg-icons/maps/local-shipping';
import NewIcon from 'material-ui/svg-icons/av/new-releases';
import ProcessingIcon from 'material-ui/svg-icons/action/update';

function OrderPhase({ phase }) {
  switch (phase) {
    case 0:
      return (
        <div style={{ textAlign: 'center', width: '50px', fontSize: '12px' }}>
          <NewIcon color="#04BFBF" />
          <p style={{ margin: 0 }}>New</p>
        </div>
      );
    case 1:
      return (
        <div style={{ textAlign: 'center', width: '50px', fontSize: '12px' }}>
          <ProcessingIcon color="#F7E967" />
          <p style={{ margin: 0 }}>Processing</p>
        </div>
      );
    case 2:
      return (
        <div style={{ textAlign: 'center', width: '60px', fontSize: '12px' }}>
          <ShippedIcon color="#A9CF54" />
          <p style={{ margin: 0 }}>Shipped</p>
        </div>
      );
    default:
      return (
        <div>Error</div>
      );
  }
}

OrderPhase.propTypes = {
  phase: PropTypes.number,
};

export default OrderPhase;
