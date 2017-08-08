import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import MailIcon from 'material-ui/svg-icons/communication/email';
import PublicIcon from 'material-ui/svg-icons/social/public';
import OrderIcon from 'material-ui/svg-icons/maps/local-offer';

const Sidebar = (props) => {
  const { storeImageUri, currView, unfulfilledOrders } = props;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '5px' }}>
      <Avatar src={storeImageUri} size={50} />
      <IconButton style={{ margin: '10px 0' }} tooltip={'Feed'}>
        <PublicIcon color={currView && currView.startsWith('/feed') ? '#04BFBF' : '#616161'} />
      </IconButton>
      <IconButton
        style={{ margin: '10px 0' }}
        tooltip={'Messages'}
      >
        <MailIcon color={currView && currView.startsWith('/conversations') ? '#04BFBF' : '#616161'} />
      </IconButton>
      <div>
        <IconButton style={{ margin: '10px 0' }} tooltip={'Orders'}>
          <OrderIcon color={currView && currView.startsWith('/fulfillment') ? '#04BFBF' : '#616161'} />
        </IconButton>
        {unfulfilledOrders > 0 &&
          <span style={{ borderRadius: '20px', backgroundColor: 'red', color: '#FFFFFF', padding: '1px 4px', fontSize: '12px', position: 'absolute', left: '30px', marginTop: '30px' }}>
            &nbsp;{unfulfilledOrders}&nbsp;
          </span>
        }
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  storeImageUri: React.PropTypes.string,
  currView: React.PropTypes.string,
  unfulfilledOrders: React.PropTypes.number,
};

export default Sidebar;
