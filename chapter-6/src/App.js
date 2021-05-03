import styled, { createGlobalStyle } from 'styled-components';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import { HotelsContextProvider } from './context/HotelsContext';
import { ReviewsContextProvider } from './context/ReviewsContext';

import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import ReviewForm from './pages/ReviewForm';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const App = () => (
  <>
    <GlobalStyle />
    <AppWrapper>
      <Router>
        <Header />
        <HotelsContextProvider>
          <ReviewsContextProvider>
            <Switch>
              <Route exact path='/'>
                <Hotels />
              </Route>
              <Route path='/hotel/:hotelId/new'>
                <ReviewForm />
              </Route>
              <Route path='/hotel/:hotelId'>
                <HotelDetail />
              </Route>
            </Switch>
          </ReviewsContextProvider>
        </HotelsContextProvider>
      </Router>
    </AppWrapper>
  </>
);

export default App;
