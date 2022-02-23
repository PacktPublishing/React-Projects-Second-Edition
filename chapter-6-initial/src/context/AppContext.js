import { HotelsContextProvider } from './HotelsContext';
import { ReviewsContextProvider } from './ReviewsContext';

const AppContext = ({ children }) => {
  return (
    <HotelsContextProvider>
      <ReviewsContextProvider>{children}</ReviewsContextProvider>
    </HotelsContextProvider>
  );
};

export default AppContext;
