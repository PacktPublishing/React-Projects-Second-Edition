import { createContext, useCallback, useReducer } from 'react';

export const HotelsContext = createContext();

const initialState = {
  hotels: [],
  hotel: {},
  loading: true,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_HOTELS_SUCCESS':
      return {
        ...state,
        hotels: action.payload,
        loading: false,
      };
    case 'GET_HOTELS_ERROR':
      return {
        ...state,
        hotels: [],
        loading: false,
        error: action.payload,
      };
    case 'GET_HOTEL_SUCCESS':
      return {
        ...state,
        hotel: action.payload,
        loading: false,
      };
    case 'GET_HOTEL_ERROR':
      return {
        ...state,
        hotel: {},
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const HotelsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchHotels = useCallback(async () => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/hotels`,
      );
      const result = await data.json();

      if (result) {
        dispatch({ type: 'GET_HOTELS_SUCCESS', payload: result });
      }
    } catch (e) {
      dispatch({ type: 'GET_HOTELS_ERROR', payload: e.message });
    }
  }, []);

  const fetchHotel = useCallback(async (hotelId) => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/hotels/${hotelId}`,
      );
      const result = await data.json();

      if (result) {
        dispatch({ type: 'GET_HOTEL_SUCCESS', payload: result });
      }
    } catch (e) {
      dispatch({ type: 'GET_HOTEL_ERROR', payload: e.message });
    }
  }, []);

  return (
    <HotelsContext.Provider value={{ ...state, fetchHotels, fetchHotel }}>
      {children}
    </HotelsContext.Provider>
  );
};

export default HotelsContext;
