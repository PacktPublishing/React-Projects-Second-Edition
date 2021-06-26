import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import ListItem from '../components/ListItem/ListItem';
import ItemsContext from '../context/ItemsContext';
import ListsContext from '../context/ListsContext';

const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

function ListDetail() {
  let history = useHistory();
  const { listId } = useParams();

  const { loading, error, items, fetchItems } = useContext(ItemsContext);
  const { list, fetchList } = useContext(ListsContext);

  useEffect(() => {
    listId && !items.length && fetchItems(listId);
  }, [listId]);

  useEffect(() => {
    listId && fetchList(listId);
  }, [listId]);

  return (
    <>
      {history && (
        <NavBar
          goBack={() => history.goBack()}
          openForm={() => history.push(`./${listId}/new`)}
          title={list && list.title}
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
}

export default ListDetail;
