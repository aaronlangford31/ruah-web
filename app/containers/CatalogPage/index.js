/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import { getProducts } from './actions';
import { selectProducts } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
} from 'material-ui/Table';

class CatalogPage extends Component {

  componentDidMount() {
    if (this.props.products.length === 0) {
      this.props.getProducts();
    }
  }

  renderProducts = () => {
    const { products } = this.props;
    return _.map(products, (product, i) => (
      <TableRow key={i}>
        <TableRowColumn><Link to={`/product/${product.Id}`}>{product.Name}</Link></TableRowColumn>
        <TableRowColumn>
          <div
            style={{
              backgroundImage: `url(${product.MainImageUri})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: 50,
              width: 50,
            }}
          />
        </TableRowColumn>
        <TableRowColumn>{product.SKU}</TableRowColumn>
        <TableRowColumn>TBD</TableRowColumn>
        <TableRowColumn>{product.Price}</TableRowColumn>
        <TableRowColumn>{product.ShippingFee}</TableRowColumn>
        <TableRowColumn><Link to={`/product/${product.Id}`}>Edit This Product</Link></TableRowColumn>
      </TableRow>
    ));
  };

  render() {
    return (
      <article>
        <Helmet
          title="Catalog"
          meta={[
            { name: 'description', content: 'Catalog Page' },
          ]}
        />
        <H2>Catalog</H2>
        <Body>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <Link to={'product/create'}>
              <RaisedButton>
                Create
              </RaisedButton>
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Product Name</TableHeaderColumn>
                <TableHeaderColumn>Image</TableHeaderColumn>
                <TableHeaderColumn>SKU</TableHeaderColumn>
                <TableHeaderColumn>Inventory Available</TableHeaderColumn>
                <TableHeaderColumn>Retail Price</TableHeaderColumn>
                <TableHeaderColumn>Shipping Price</TableHeaderColumn>
                <TableHeaderColumn> </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.renderProducts()}
            </TableBody>
          </Table>
        </Body>
      </article>
    );
  }
}

CatalogPage.propTypes = {
  products: PropTypes.array,
  getProducts: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => {
      dispatch(getProducts());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
