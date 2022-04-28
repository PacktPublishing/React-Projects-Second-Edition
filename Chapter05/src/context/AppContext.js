import { ListsContextProvider } from './ListsContext';
import { ItemsContextProvider } from './ItemsContext';

const AppContext = ({ children }) => {
  return (
    <ListsContextProvider>
      <ItemsContextProvider>{children}</ItemsContextProvider>
    </ListsContextProvider>
  );
};

export default AppContext;
