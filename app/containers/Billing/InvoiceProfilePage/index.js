/*
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import {
  selectCurrentOrder,
  selectCurrentOrderId,
  selectCurrentOrderLoaded,
  selectShippingFromModalOpen,
} from './selectors';
import {
  selectStoreId,
  selectStore,
} from '../../App/selectors';
import Body from '../../../components/styled/Body';
import Sidebar from '../../../components/partials/Sidebar';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import Dialog from 'material-ui/Dialog';
import MailIcon from 'material-ui/svg-icons/communication/contact-mail';
import ShippedIcon from 'material-ui/svg-icons/maps/local-shipping';
import PersonIcon from 'material-ui/svg-icons/social/person';
import ProductIcon from 'material-ui/svg-icons/action/work';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

class InvoiceProfilePage extends Component {

}

InvoiceProfilePage.propTypes = {
  currentStoreId: PropTypes.string,
  currStore: PropTypes.object,
  invoice: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {

}

const mapStateToProps = createStructuredSelector({
  currentStoreId: selectStoreId(),
  currStore: selectStore(),
  order: selectCurrentOrder(),
  orderId: selectCurrentOrderId(),
  orderLoaded: selectCurrentOrderLoaded(),
  shippingFormModalOpen: selectShippingFromModalOpen(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(OrderProfilePage);*/
