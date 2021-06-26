import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import HotelItem from '../components/HotelItem/HotelItem';
import HotelsContext from '../context/HotelsContext';

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

function Hotels() {
  const { loading, error, hotels, fetchHotels } = useContext(HotelsContext);

  useEffect(() => {
    (!hotels || !hotels.length) && fetchHotels();
  }, [fetchHotels, hotels]);

  return (
    <>
      <NavBar title='Hotels' />
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
}

export default Hotels;
