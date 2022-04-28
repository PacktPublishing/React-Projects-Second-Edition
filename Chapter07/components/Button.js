import styled from 'styled-components';

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.backgroundColor || 'transparent' };
  color: white;
  padding: 10px;
  line-height: 2;
  border-radius: 5px;
  font-weight: bold;
  border: ${(props) => `4px solid ${props.backgroundColor || 'white'}`};
  font-size: inherit;
  cursor: pointer;
`;

function Button({ children, onClick, ...props }) {
  return <ButtonWrapper onClick={onClick} {...props}>{children}</ButtonWrapper>;
}

export default Button;
