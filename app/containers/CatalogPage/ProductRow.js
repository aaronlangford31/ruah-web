import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { TableRow, TableRowColumn } from 'material-ui/Table';

const ProductRow = (props) => {
  const { product, styles } = props;
  return (
    <TableRow key={product.get('Id')}>
      <TableRowColumn style={styles.imageColumn}>
        <div
          style={product.get('MainImageUri') ? {
            ...styles.productImage,
            backgroundImage: `url(${product.get('MainImageUri')})`,
          } : styles.productImageEmpty}
        />
      </TableRowColumn>
      <TableRowColumn style={styles.productNameColumn}>
        <Link to={`/product/${product.get('Id')}`}>
          {product.get('ProductName')}
        </Link>
        <div style={styles.tinyId}>
          SKU: {product.get('SKU')}
        </div>
        <div style={styles.tinyId}>
          RUAH-ID: {product.get('RuahId')}
        </div>
      </TableRowColumn>
      <TableRowColumn style={styles.number}>{product.get('Inventory')}</TableRowColumn>
      <TableRowColumn style={styles.number}>${product.get('WholesalePrice').toFixed(2)}</TableRowColumn>
      <TableRowColumn style={styles.number}>${product.get('ShippingFee').toFixed(2)}</TableRowColumn>
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
