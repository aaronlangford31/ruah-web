import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSKUAutocomplete } from './selectors';
import * as Actions from './actions';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CatalogFilters extends PureComponent {
  static propTypes = {
    setSKUFilter: PropTypes.func,
    filterProducts: PropTypes.func,
  };

  setSKUFilter = (skuFilter) => {
    this.props.setSKUFilter(skuFilter.toLowerCase());
  };

  filterProducts = () => {
    this.props.filterProducts();
  };

  render() {
    return (
      <Paper>
        <h3>Product Filters</h3>
        {/* SKU Filter */}
        <TextField floatingLabelText="Filter by SKU" onChange={(e, skuFilter) => this.setSKUFilter(skuFilter)} />

        {/* Submit button */}
        <RaisedButton label="Go" onTouchTap={this.filterProducts()} />
      </Paper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    setSKUFilter: (skuFilter) => {
      dispatch(Actions.setSKUFilter(skuFilter));
    },
    filterProducts: () => {
      dispatch(Actions.filterProducts());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  SKU_autocomplete: selectSKUAutocomplete(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogFilters);
