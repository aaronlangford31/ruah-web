export default function getStyles() {
  return {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      padding: '0 12px 12px 12px',
      borderStyle: 'solid',
      borderColor: '#BDBDBD',
      borderWidth: '1px',
      borderRadius: '5px 5px 1px 1px',
      backgroundColor: '#F5F5F5',
    },
    imageColumn: { width: 75 },
    productNameColumn: { width: 300 },
    tinyId: {
      fontSize: '10px',
      color: 'grey',
    },
    number: { textAlign: 'right' },
    productImage: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: 50,
      width: 50,
    },
    productImageEmpty: {
      background: 'repeating-linear-gradient(45deg,transparent,transparent 10px,#ccc 10px,#ccc 20px)',
      height: '100%',
    },
  };
}
