import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';

import HotelsContext from '../context/HotelsContext';
import ReviewsContext from '../context/ReviewsContext';
import HotelItem from '../components/HotelItem/HotelItem';
import ReviewItem from '../components/ReviewItem/ReviewItem';

const ReviewsItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const HotelDetail = () => {
  let history = useHistory();
  const { hotelId } = useParams();

  const { loading, error, hotel, fetchHotel } = useContext(HotelsContext);
  const { reviews, fetchReviews } = useContext(ReviewsContext);

  useEffect(() => {
    hotelId && !hotel && fetchHotel(hotelId);
  }, [hotelId]);

  useEffect(() => {
    hotelId && !reviews.length && fetchReviews(hotelId);
  }, [hotelId]);

  return (
    <>
      {history && (
        <NavBar
          goBack={() => history.goBack()}
          openForm={() => history.push(`./${hotelId}/new`)}
          title={hotel && hotel.title}
        />
      )}
      {hotel && <HotelItem data={hotel} />}
      <ReviewsItemWrapper>
        {loading || error ? (
          <span>{error || 'Loading...'}</span>
        ) : (
          reviews.map((review) => <ReviewItem key={review.id} data={review} />)
        )}
      </ReviewsItemWrapper>
    </>
  );
};

export default HotelDetail;
