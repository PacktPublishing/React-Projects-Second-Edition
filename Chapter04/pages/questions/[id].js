import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import Card from '../../components/Card';

const QuestionDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

function QuestionDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://api.stackexchange.com/2.2/questions/${id}?site=stackoverflow`,
      );

      const result = await data.json();

      if (result) {
        setQuestion(result.items[0]);
        setLoading(false);
      }
    }

    id && fetchData();
  }, [id]);

  return (
    <QuestionDetailContainer>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <Head>
            <title>{question.title}</title>
          </Head>

          <Card
            title={question.title}
            views={question.view_count}
            answers={question.answers_count}
          />
        </>
      )}
    </QuestionDetailContainer>
  );
}

export default QuestionDetail;
