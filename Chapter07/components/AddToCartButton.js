import { useMutation, gql } from '@apollo/client';
import Button from './Button';
import { GET_CART_TOTAL } from './CartButton';

const ADD_TO_CART = gql`
  mutation addToCart($productId: Int!) {
    addToCart(productId: $productId) {
      count
      products {
        id
        title
        price
      }
    }
  }
`;

function AddToCartButton({ productId }) {
  const [addToCart, { data }] = useMutation(ADD_TO_CART);

  return (
    <Button
      onClick={() =>
        !data &&
        addToCart({
          variables: { productId },
          refetchQueries: [{ query: GET_CART_TOTAL }],
        })
      }
    >
      {data ? 'Added to cart!' : 'Add to cart'}
    </Button>
  );
}

export default AddToCartButton;
