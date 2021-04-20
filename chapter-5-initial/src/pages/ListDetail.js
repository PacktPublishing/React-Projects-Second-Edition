import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import useDataFetching from '../hooks/useDataFetching';
import NavBar from '../components/NavBar/NavBar';
import ListItem from '../components/ListItem/ListItem';

const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const ListDetail = () => {
  let history = useHistory();
  const { listId } = useParams();

  const [loading, error, data] = useDataFetching(
    'https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Editon/items/',
  );

  const [items, setItems] = useState([]);

  useEffect(() => {
    data &&
      listId &&
      setItems(data.filter((item) => item.listId === parseInt(listId)));
  }, [data, listId]);

  return (
    <>
      {history && (
        <NavBar
          goBack={() => history.goBack()}
          openForm={() => history.push(`./new`)}
        />
      )}
      <ListItemWrapper>
        {loading || error ? (
          <span>{error || 'Loading...'}</span>
        ) : (
          items.map((item) => <ListItem key={item.id} data={item} />)
        )}
      </ListItemWrapper>
    </>
  );
};

export default ListDetail;
