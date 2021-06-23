import styled from 'styled-components';
import SubHeader from '../../components/SubHeader';
import ProductItem from '../../components/ProductItem';

const ProductItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 2% 5%;
`;

function Products() {
  return (
    <>
      <SubHeader title='Available products' goToCart />

      <ProductItemsWrapper></ProductItemsWrapper>
    </>
  );
}

export default Products;
