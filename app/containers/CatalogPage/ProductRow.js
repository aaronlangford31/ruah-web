import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { TableRow, TableRowColumn } from 'material-ui/Table';

const ProductRow = (props) => {
  const { product, styles } = props;
  return (
    <TableRow key={product.get('Id')}>
      <TableRowColumn style={styles.productNameColumn}>
        <Link to={`/product/${product.get('Id')}`}>
          {product.get('ProductName')}
        </Link>
      </TableRowColumn>
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
};

ProductRow.propTypes = {
  product: PropTypes.object,
  styles: PropTypes.object,
};

ProductRow.contextTypes = {
  theme: PropTypes.object,
};

export default ProductRow;
