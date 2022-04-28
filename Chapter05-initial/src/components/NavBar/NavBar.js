import styled from 'styled-components';
import Button from '../Button/Button';

const NavBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: navajowhite;
`;

const Title = styled.h2`
  text-align: center;
  flex-basis: 60%;
  &:first-child {
    margin-left: 20%;
  }
  &:last-child {
    margin-right: 20%;
  }
`;

const NavBarButton = styled(Button)`
  margin: 10px 5%;
`;

function NavBar({ goBack, title, openForm = false }) {
  return (
    <NavBarWrapper>
      {goBack && <NavBarButton onClick={goBack}>{`< Go Back`}</NavBarButton>}
      <Title>{title}</Title>
      {openForm && (
        <NavBarButton onClick={openForm}>{`+ Add Item`}</NavBarButton>
      )}
    </NavBarWrapper>
  );
}

export default NavBar;
