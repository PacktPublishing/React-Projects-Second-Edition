import { useQuery, gql } from '@apollo/client';
import Button from './Button';

export const GET_CART_TOTAL = gql`
  query getCart {
    cart {
      count
    }
  }
`;

function CartButton({ ...props }) {
  const { loading, data } = useQuery(GET_CART_TOTAL);

  return (
    <Button {...props}>{loading ? 'Cart' : `Cart (${data.cart.count})`}</Button>
  );
}

export default CartButton;
