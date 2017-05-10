export default function getStyles() {
  return {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      padding: '0 12px 12px 12px',
      borderStyle: 'solid',
      borderColor: 'grey',
      borderWidth: '1px',
      borderRadius: '1px 1px 1px 1px',
      borderLeft: 'none',
      borderRight: 'none',
    },
    horizontalDiv: {
      display: 'flex',
    },
    imageColumn: { width: 150 },
    tinyId: {
      fontSize: '14px',
      color: 'grey',
    },
    number: { textAlign: 'right' },
    productImage: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: 125,
      width: 125,
    },
    productImageEmpty: {
      background: 'repeating-linear-gradient(45deg,transparent,transparent 10px,#ccc 10px,#ccc 20px)',
      height: '100%',
    },
  };
}
