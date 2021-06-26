import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background-color: orange;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Title = styled.h1`
  pointer-events: none;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Title>Personal Shopping List</Title>
    </HeaderWrapper>
  );
}

export default Header;
