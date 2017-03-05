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
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import Menu from '../../components/partials/Menu';
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
            style={product.MainImageUri ? {
              backgroundImage: `url(${product.MainImageUri})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: 50,
              width: 50,
            } : {
              background: 'repeating-linear-gradient(45deg,transparent,transparent 10px,#ccc 10px,#ccc 20px)',
              height: '100%',
            }}
          />
        </TableRowColumn>
        <TableRowColumn>{product.SKU}</TableRowColumn>
        <TableRowColumn>{product.Inventory}</TableRowColumn>
        <TableRowColumn>{product.Price || '--'}</TableRowColumn>
        <TableRowColumn>{product.ShippingFee || 'FREE'}</TableRowColumn>
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
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 3, marginRight: 24 }}>
              <Menu />
            </div>
            <div style={{ flex: 9 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <Link to={'product/create'}>
                  <FlatButton label="Create" icon={<AddIcon />} labelPosition="before" />
                </Link>
                <Link to={'product/import'}>
                  <FlatButton label="Import" icon={<FileUploadIcon />} labelPosition="before" />
                </Link>
              </div>
              <Table selectable={false}>
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  enableSelectAll={false}
                >
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
                <TableBody displayRowCheckbox={false}>
                  {this.renderProducts()}
                </TableBody>
              </Table>
            </div>

          </div>
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
