import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import ReviewForm from './pages/ReviewForm';
import AppContext from './context/AppContext';

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

function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <BrowserRouter>
          <Header />
          <AppContext>
              <Routes>
                <Route path='/' element={<Hotels />} />
                <Route path='/hotel/:hotelId' element={<HotelDetail />} />
                <Route path='/hotel/:hotelId/new' element={<ReviewForm />} />
              </Routes>
            </AppContext>
        </BrowserRouter>
      </AppWrapper>
    </>
  );
}

export default App;
