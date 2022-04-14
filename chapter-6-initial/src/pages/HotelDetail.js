import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
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

function HotelDetail() {
  let navigate = useNavigate();
  const { hotelId } = useParams();

  const { loading, error, hotel, fetchHotel } = useContext(HotelsContext);
  const { reviews, fetchReviews } = useContext(ReviewsContext);

  useEffect(() => {
    hotelId && !hotel.id && fetchHotel(hotelId);
  }, [fetchHotel, hotel.id, hotelId]);

  useEffect(() => {
    hotelId && !reviews.length && fetchReviews(hotelId);
  }, [fetchReviews, hotelId, reviews.length]);

  return (
    <>
      {navigate && (
        <NavBar
          goBack={() => navigate(-1)}
          openForm={() => navigate(`/hotel/${hotelId}/new`)}
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
}

export default HotelDetail;
