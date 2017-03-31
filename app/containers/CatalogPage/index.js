import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import { selectOpenGroups, selectProductGroups } from './selectors';
import getStyles from './styles';
import ProductRow from './ProductRow';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import FlatButton from 'material-ui/FlatButton';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import RightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Menu from '../../components/partials/Menu';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
} from 'material-ui/Table';

class CatalogPage extends PureComponent {

  static propTypes = {
    openGroups: PropTypes.object,
    productGroups: PropTypes.object,
    getProducts: PropTypes.func,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.productGroups.size === 0) {
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
    const styles = getStyles(this.props, this.context.theme);
    return productGroups.entrySeq().map(([groupName, products]) => ([
      this.renderProductGroupHeader(groupName, styles),
      this.renderProducts(products, styles),
    ]));
  };

  renderProductGroupHeader = (groupId, styles) => {
    const onClick = this.props.openGroups.includes(groupId) ? 'closeGroup' : 'openGroup';
    return (
      <TableRow onMouseDown={() => this.props[onClick](groupId)}>
        <TableRowColumn colSpan={8} style={styles.productGroupHeader}>
          {onClick === 'openGroup' ? <RightIcon /> : <DownIcon />}
          {groupId || 'Group Name Not Set'}
        </TableRowColumn>
      </TableRow>
    );
  };

  renderProducts = (products, styles) => (products.map((product) => {
    if (this.props.openGroups.includes(product.get('VariationGroupId'))) {
      return (
        <ProductRow product={product} styles={styles} />
      );
    }
    return null;
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
      dispatch(Actions.getProducts());
    },
    openGroup: (groupId) => {
      dispatch(Actions.openGroup(groupId));
    },
    closeGroup: (groupId) => {
      dispatch(Actions.closeGroup(groupId));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  openGroups: selectOpenGroups(),
  productGroups: selectProductGroups(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
