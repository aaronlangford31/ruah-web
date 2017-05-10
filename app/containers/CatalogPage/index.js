import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import { selectProductGroups } from './selectors';
import getStyles from './styles';
import ProductRow from './ProductRow';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import Menu from '../../components/partials/Menu';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
} from 'material-ui/Table';

class CatalogPage extends PureComponent {

  static propTypes = {
    productGroups: PropTypes.object,
    getProducts: PropTypes.func,
    filterProducts: PropTypes.func,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.productGroups.size === 0) {
      this.props.getProducts();
    }
  }

  filterProducts = ({ target: { value } }) => {
    this.props.filterProducts(value);
  };

  renderHeader = () => {
    const styles = getStyles();
    return (
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}
      >
        <TableRow>
          <TableHeaderColumn style={styles.imageColumn}>Image</TableHeaderColumn>
          <TableHeaderColumn style={styles.productNameColumn}>Product Identifiers</TableHeaderColumn>
          <TableHeaderColumn style={styles.number}>Inventory Available</TableHeaderColumn>
          <TableHeaderColumn style={styles.number}>Wholesale Price</TableHeaderColumn>
          <TableHeaderColumn style={styles.number}>Shipping Price</TableHeaderColumn>
          <TableHeaderColumn>Variation Group</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }

  renderProductGroups = () => {
    const { productGroups } = this.props;
    const styles = getStyles();
    return productGroups.entrySeq().map(([groupName, products]) => ([ // eslint-disable-line no-unused-vars
      this.renderProducts(products, styles),
    ]));
  };

  renderProducts = (products, styles) => (products.map((product) => (
    <ProductRow product={product} styles={styles} />
  )));

  render() {
    const styles = getStyles();
    return (
      <article>
        <Helmet
          title="Catalog"
          meta={[
            { name: 'description', content: 'Catalog Page' },
          ]}
        />
        <Body style={{ display: 'flex' }}>
          <div style={{ flex: 2, marginRight: 24 }}>
            <Menu />
          </div>
          <div style={{ flex: 10 }}>
            <H2>Catalog</H2>
            <div style={styles.header}>
              <div>
                <TextField onChange={this.filterProducts} floatingLabelText="Filter" />
              </div>
              <Link to={'product/import'}>
                <FlatButton label="Import" icon={<FileUploadIcon />} labelPosition="before" />
              </Link>
            </div>
            <Table selectable={false} wrapperStyle={{ overflow: 'visible' }}>
              {this.renderHeader()}
              <TableBody displayRowCheckbox={false}>
                {this.renderProductGroups()}
              </TableBody>
            </Table>
          </div>
        </Body>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    filterProducts: (filter) => {
      dispatch(Actions.filterProducts(filter));
    },
    getProducts: () => {
      dispatch(Actions.getProducts());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  productGroups: selectProductGroups(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
