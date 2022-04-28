import { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import FormItem from '../components/FormItem/FormItem';
import Button from '../components/Button/Button';
import ReviewsContext from '../context/ReviewsContext';

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const SubmitButton = styled(Button)`
  background: blue;
  margin: 2% 0;
`;

function ReviewForm() {
  let navigate = useNavigate();
  const { hotelId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const { addReview } = useContext(ReviewsContext);

  function onSubmit(e) {
    e.preventDefault();

    if (title && description && rating) {
      addReview({
        title,
        description,
        rating,
        hotelId,
      });
    }

    navigate(`/hotel/${hotelId}`);
  }

  return (
    <>
      {navigate && <NavBar goBack={() => navigate(-1)} title={`Add Review`} />}
      <FormWrapper>
        <form onSubmit={onSubmit}>
          <FormItem
            id='title'
            label='Title'
            placeholder='Insert title'
            value={title}
            handleOnChange={(e) => setTitle(e.currentTarget.value)}
          />
          <FormItem
            id='description'
            label='description'
            placeholder='Insert description'
            value={description}
            handleOnChange={(e) => setDescription(e.currentTarget.value)}
          />
          <FormItem
            id='rating'
            label='rating'
            type='number'
            placeholder='0'
            value={rating}
            handleOnChange={(e) => setRating(e.currentTarget.value)}
          />
          <SubmitButton>Add Review</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
}

export default ReviewForm;
