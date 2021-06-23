import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import FormItem from '../../components/FormItem';
import SubHeader from '../../components/SubHeader';

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <SubHeader title='Login' />
      <FormWrapper>
        <form>
          <FormItem
            id='username'
            label='Username'
            placeholder='Your username'
            value={username}
            handleOnChange={(e) => setUsername(e.currentTarget.value)}
          />
          <FormItem
            id='password'
            label='Password'
            placeholder='Your password'
            value={password}
            handleOnChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button backgroundColor='royalBlue'>Login</Button>
        </form>
      </FormWrapper>
    </>
  );
}

export default Login;
