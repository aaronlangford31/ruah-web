import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSKUAutocomplete } from './selectors';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class CatalogFilters extends PureComponent {
  static propTypes = {
    SKU_autocomplete: PropTypes.array,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  setSKUFilter = (SKU_filter) => {
    this.props.setSKUFilter(SKU_filter.toLowerCase());
  };

  filterProducts = () => {
    this.props.filterProducts();
  };

  render() {
    return (
        <Paper>
            <h3>Product Filters</h3>
            {/* SKU Filter */}
            <TextField floatingLabelText="Filter by SKU" onChange={(e, SKU_filter) => this.setSKUFilter(SKU_filter)} />
            
            {/* Submit button */}
            <RaisedButton label="Go" primary={true} onTouchTap={(event) => this.filterProducts()} />
        </Paper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    setSKUFilter: (SKU_filter) => {
      dispatch(Actions.setSKUFilter(SKU_filter));
    },
    filterProducts: () => {
      dispatch(Actions.filterProducts());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  SKU_autocomplete: selectSKUAutocomplete(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
