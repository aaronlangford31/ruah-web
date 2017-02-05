import styled from 'styled-components';

const BasicForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.75);
  
  > .button {
    margin-top: 10px;
  }
`;

export default BasicForm;
