import { createContext, useCallback, useReducer } from 'react';

export const ItemsContext = createContext();

const initialState = {
  items: [],
  loading: true,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case 'GET_ITEMS_ERROR':
      return {
        ...state,
        items: [],
        loading: false,
        error: action.payload,
      };
    case 'ADD_ITEM_SUCCESS':
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };

    default:
      return state;
  }
};

export const ItemsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItems = useCallback(async (listId) => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists/${listId}/items`,
      );
      const result = await data.json();

      if (result) {
        dispatch({ type: 'GET_ITEMS_SUCCESS', payload: result });
      }
    } catch (e) {
      dispatch({ type: 'GET_ITEMS_ERROR', payload: e.message });
    }
  }, []);

  const addItem = useCallback(async ({ listId, title, quantity, price }) => {
    const itemId = Math.floor(Math.random() * 100);

    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/items`,
        {
          method: 'POST',
          body: JSON.stringify({
            id: itemId,
            listId,
            title,
            quantity,
            price,
          }),
        },
      );
      const result = await data.json();

      if (result) {
        dispatch({
          type: 'ADD_ITEM_SUCCESS',
          payload: {
            id: itemId,
            listId,
            title,
            quantity,
            price,
          },
        });
      }
    } catch {}
  }, [])

  return (
    <ItemsContext.Provider value={{ ...state, fetchItems, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
