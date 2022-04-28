import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import SubHeader from '../../components/SubHeader';
import ProductItem from '../../components/ProductItem';

const ProductItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 2% 5%;
`;

const GET_PRODUCTS = gql`
  query getProducts {
    products {
      id
      title
      price
      thumbnail
    }
  }
`;

function Products() {
  const { loading, data } = useQuery(GET_PRODUCTS);

  return (
    <>
      <SubHeader title='Available products' goToCart />

      {loading ? (
        <span>Loading...</span>
      ) : (
        <ProductItemsWrapper>
          {data &&
            data.products &&
            data.products.map((product) => (
              <ProductItem key={product.id} data={product} addToCart />
            ))}
        </ProductItemsWrapper>
      )}
    </>
  );
}

export default Products;
