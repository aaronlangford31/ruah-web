import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import _ from 'underscore';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { selectStore } from '../../../containers/App/selectors';
import MailIcon from 'material-ui/svg-icons/communication/email';
import PublicIcon from 'material-ui/svg-icons/social/public';
import OrderIcon from 'material-ui/svg-icons/maps/local-offer';
import InvoiceIcon from 'material-ui/svg-icons/action/receipt';

const Sidebar = (props) => {
  const storeImageUri = props.currStore.ProfilePicUri;
  const unfulfilledOrders = _.reduce(props.currStore.MsgChannels, (memo, item) => (item.UnfulfilledOrderIds ? item.UnfulfilledOrderIds.length : 0) + memo, 0);
  const unpaidInvoices = _.reduce(props.currStore.MsgChannels, (memo, item) => (item.UnpaidInvoiceIds ? item.UnpaidInvoiceIds.length : 0) + memo, 0);
  const currView = window.location.pathname;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '5px' }}>
      <Link to={'/mystore'} >
        <Avatar src={storeImageUri} size={50} />
      </Link>
      <Link to={'/feed'}>
        <IconButton style={{ margin: '10px 0' }} tooltip={'Feed'}>
          <PublicIcon color={currView && currView.startsWith('/feed') ? '#04BFBF' : '#616161'} />
        </IconButton>
      </Link>
      <Link to={'/conversations'}>
        <IconButton
          style={{ margin: '10px 0' }}
          tooltip={'Messages'}
        >
          <MailIcon color={currView && currView.startsWith('/conversations') ? '#04BFBF' : '#616161'} />
        </IconButton>
      </Link>
      <div>
        <Link to={'/fulfillment/received'}>
          <IconButton style={{ margin: '10px 0' }} tooltip={'Orders'}>
            <OrderIcon color={currView && currView.startsWith('/fulfillment') ? '#04BFBF' : '#616161'} />
          </IconButton>
        </Link>
        {unfulfilledOrders > 0 &&
          <span style={{ borderRadius: '20px', backgroundColor: 'red', color: '#FFFFFF', padding: '1px 4px', fontSize: '12px', position: 'absolute', left: '30px', marginTop: '30px' }}>
            &nbsp;{unfulfilledOrders}&nbsp;
          </span>
        }
      </div>
      <div>
        <Link to={'/billing/received'}>
          <IconButton
            style={{ margin: '10px 0' }}
            tooltip={'Invoices'}
          >
            <InvoiceIcon color={currView && currView.startsWith('/billing') ? '#04BFBF' : '#616161'} />
          </IconButton>
        </Link>
        {unpaidInvoices > 0 &&
          <span style={{ borderRadius: '20px', backgroundColor: 'red', color: '#FFFFFF', padding: '1px 4px', fontSize: '12px', position: 'absolute', left: '30px', marginTop: '30px' }}>
            &nbsp;{unpaidInvoices}&nbsp;
          </span>
        }
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  currStore: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currStore: selectStore(),
});

export default connect(mapStateToProps)(Sidebar);
