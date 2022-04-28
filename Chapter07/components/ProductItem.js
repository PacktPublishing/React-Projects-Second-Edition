import styled from 'styled-components';
import { usePrice } from '../utils/hooks';
import AddToCartButton from './AddToCartButton';

const ProductItemWrapper = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  padding: 1%;
  background: lightGray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2%;
  text-decoration: none;
`;

const Title = styled.h3`
  margin-left: 2%;
`;

const Price = styled.h3`
  margin-left: 2%;
  font-weight: bold;
  color: green;
`;

const Thumbnail = styled.img`
  border-radius: 5px;
`;

function ProductItem({ data, addToCart = false }) {
  const price = usePrice(data.price);

  return (
    <ProductItemWrapper>
      {data.thumbnail && <Thumbnail src={data.thumbnail} width={200} />}
      <Title>{data.title}</Title>
      <Price>{price}</Price>
      {addToCart && <AddToCartButton productId={data.id} />}
    </ProductItemWrapper>
  );
}

export default ProductItem;
