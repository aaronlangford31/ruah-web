import styled from 'styled-components';

const CatalogTable = styled.table`
  thead {
    font-weight: bold;
    text-align: center;
  }
  tr {
    display: flex;
  }
  td {
    flex-basis: calc(100% / 7);
  }
  .image {
    padding-top: calc(100% / 1);
    background-size: contain;
    background-position: center;
  }
`;

export default CatalogTable;
