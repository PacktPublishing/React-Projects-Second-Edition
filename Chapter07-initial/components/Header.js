import styled from 'styled-components';
import Head from 'next/head';

const HeaderWrapper = styled.div`
  background-color: royalBlue;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px 2vmin);
  color: white;
`;

const Title = styled.h1`
  height: 64px;
  pointer-events: none;
`;

function Header() {
  return (
    <>
      <Head>
        <title>E-Commerce Store</title>
        <meta
          name='description'
          content='This is a E-Commerce Store build with React'
        />
      </Head>
      <HeaderWrapper>
        <Title>E-Commerce Store</Title>
      </HeaderWrapper>
    </>
  );
}

export default Header;
