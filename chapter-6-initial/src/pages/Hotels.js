import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavBar from '../Header/NavBar';
import HotelItem from '../components/HotelItem/HotelItem';
import { useHotelsContext } from './HotelsContext';

const HotelItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const HotelLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Hotels = ({ history }) => {
  const { loading, error, hotels, getHotels } = useHotelsContext();

  useEffect(() => {
    (!hotels || !hotels.length) && getHotels();
  }, [getHotels, hotels]);

  return (
    <>
      {history && <NavBar title='Your Lists' />}
      <HotelItemsWrapper>
        {loading || error ? (
          <span>{error || 'Loading...'}</span>
        ) : (
          hotels &&
          hotels.map((hotel) => (
            <HotelLink key={hotel.id} to={`hotel/${hotel.id}`} hotel={hotel}>
              <HotelItem data={hotel} />
            </HotelLink>
          ))
        )}
      </HotelItemsWrapper>
    </>
  );
};

export default Hotels;
