import { Suspense, lazy } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import { ListsContextProvider } from './context/ListsContext';
import { ItemsContextProvider } from './context/ItemsContext';

const Lists = lazy(() => import(/* webpackChunkName: "Lists" */ './pages/Lists'));
const ListDetail = lazy(() => import(/* webpackChunkName: "ListDetail" */ './pages/ListDetail'));
const ListForm = lazy(() => import(/* webpackChunkName: "ListForm" */ './pages/ListForm'));

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
        <Suspense fallback={<div>Loading...</div>}>
          <ListsContextProvider>
            <ItemsContextProvider>
              <Switch>
                <Route exact path='/'>
                  <Lists />
                </Route>
                <Route path='/list/:listId/new'>
                  <ListForm />
                </Route>
                <Route path='/list/:listId'>
                  <ListDetail />
                </Route>
              </Switch>
            </ItemsContextProvider>
          </ListsContextProvider>
        </Suspense>
      </Router>
    </AppWrapper>
  </>
);

export default App;
