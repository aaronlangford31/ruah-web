import styled from 'styled-components';

const BasicForm = styled.form`
  ${(props) => !props.plain && `
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.85);

  > .button {
    margin-top: 10px;
  }`}
`;

export default BasicForm;
