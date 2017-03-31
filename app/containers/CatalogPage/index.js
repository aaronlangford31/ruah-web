import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { getProducts } from './actions';
import { selectProducts, selectProductGroups } from './selectors';
import getStyles from './styles';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import FlatButton from 'material-ui/FlatButton';
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

  static propTypes = {
    products: PropTypes.array,
    productGroups: PropTypes.object,
    getProducts: PropTypes.func,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.products.length === 0) {
      this.props.getProducts();
    }
  }

  renderHeader = () => (
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}
    >
      <TableRow>
        <TableHeaderColumn>Product Name</TableHeaderColumn>
        <TableHeaderColumn>Image</TableHeaderColumn>
        <TableHeaderColumn>SKU</TableHeaderColumn>
        <TableHeaderColumn>Ruah Id</TableHeaderColumn>
        <TableHeaderColumn>Inventory Available</TableHeaderColumn>
        <TableHeaderColumn>Wholesale Price</TableHeaderColumn>
        <TableHeaderColumn>Shipping Price</TableHeaderColumn>
        <TableHeaderColumn>Variation Group</TableHeaderColumn>
      </TableRow>
    </TableHeader>
  );

  renderProductGroups = () => {
    const { productGroups } = this.props;
    return productGroups.entrySeq().map(([groupName, products]) => ([
      this.renderProductGroupHeader(groupName),
      this.renderProducts(products),
    ]));
  };

  renderProductGroupHeader = (groupName) => {
    const styles = getStyles(this.props, this.context.theme);
    return (
      <TableRow>
        <TableRowColumn colSpan={8} style={styles.productGroupHeader}>
          {groupName}
        </TableRowColumn>
      </TableRow>
    );
  };

  renderProducts = (products) => (products.map((product, i) => {
    const styles = getStyles(this.props, this.context.theme);
    return (
      <TableRow key={i}>
        <TableRowColumn><Link to={`/product/${product.get('Id')}`}>{product.get('ProductName')}</Link></TableRowColumn>
        <TableRowColumn>
          <div
            style={product.get('MainImageUri') ? {
              ...styles.productImage,
              backgroundImage: `url(${product.get('MainImageUri')})`,
            } : styles.productImageEmpty}
          />
        </TableRowColumn>
        <TableRowColumn>{product.get('SKU')}</TableRowColumn>
        <TableRowColumn>{product.get('RuahId')}</TableRowColumn>
        <TableRowColumn>{product.get('Inventory')}</TableRowColumn>
        <TableRowColumn>${product.get('WholesalePrice')}</TableRowColumn>
        <TableRowColumn>${product.get('ShippingFee')}</TableRowColumn>
        <TableRowColumn>{product.get('VariationGroupId')}</TableRowColumn>
      </TableRow>
    );
  }));

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
                <Link to={'product/import'}>
                  <FlatButton label="Import" icon={<FileUploadIcon />} labelPosition="before" />
                </Link>
              </div>
              <Table selectable={false}>
                {this.renderHeader()}
                <TableBody displayRowCheckbox={false}>
                  {this.renderProductGroups()}
                </TableBody>
              </Table>
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => {
      dispatch(getProducts());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
  productGroups: selectProductGroups(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
