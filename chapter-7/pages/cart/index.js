import styled from 'styled-components';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
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

const GET_CART = gql`
  query getCart {
    cart {
      products {
        id
        title
        price
        thumbnail
      }
    }
  }
`;

const COMPLETE_CART = gql`
  mutation completeCart {
    completeCart {
      complete
    }
  }
`;

function Cart() {
  const { loading, data } = useQuery(GET_CART);
  const [completeCard] = useMutation(COMPLETE_CART);
  const route = useRouter();

  return (
    <>
      <SubHeader title='Cart' />
      {loading ? (
        <span>Loading...</span>
      ) : (
        <CartWrapper>
          <CartItemsWrapper>
            {data &&
              data.cart.products &&
              data.cart.products.map((product) => (
                <ProductItem key={product.id} data={product} />
              ))}
          </CartItemsWrapper>
          {data &&
            data.cart.products.length > 0 &&
            sessionStorage.getItem('token') && (
              <Button
                backgroundColor='royalBlue'
                onClick={() => {
                  const isAuthenticated = sessionStorage.getItem('token');

                  if (isAuthenticated) {
                    completeCard();
                    alert('Thanks! Cart is emptied');
                    route.push('/');
                  }
                }}
              >
                Checkout
              </Button>
            )}
        </CartWrapper>
      )}
    </>
  );
}

export default Cart;
