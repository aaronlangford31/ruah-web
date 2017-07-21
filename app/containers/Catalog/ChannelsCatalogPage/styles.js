export default function getStyles() {
  return {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      padding: '0 12px 12px 12px',
      margin: '10px 5px 5px 5px',
    },
    imageColumn: { width: 75 },
    productNameColumn: { width: 300 },
    tinyId: {
      fontSize: '10px',
      color: 'grey',
    },
    number: { textAlign: 'right' },
  };
}
