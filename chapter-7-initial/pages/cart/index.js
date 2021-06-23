import styled from 'styled-components';
import SubHeader from '../../components/SubHeader';
import ProductItem from '../../components/ProductItem';
import Button from '../../components/Button';

const CartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
  margin: 2% 5%;
`;

const CartItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`;

function Cart() {
  return (
    <>
      <SubHeader title='Cart' />

      <CartWrapper>
        <CartItemsWrapper></CartItemsWrapper>
      </CartWrapper>
    </>
  );
};

export default Cart;
