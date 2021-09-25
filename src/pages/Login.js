// lib
import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';

// material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import Container from "@material-ui/core/Container";

// components
import background from '../images/background.jpeg';
import { AuthContext } from '../AuthService';
import firebase from '../config/firebase';

export const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('メールアドレスまたはパスワードが間違っています。');
      });
  };

  const user = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <SContainer>
      <Box
        sx={{
          paddingTop: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 300,
            marginBottom: 15,
          }}
        >
          <TextField
            margin="normal"
            required
            fullwidth="true"
            variant="outlined"
            label="E-mail"
            name="e-mail"
            autoComplete="e-mail"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <TextField
            type="password"
            margin="normal"
            required
            fullwidth="true"
            variant="outlined"
            label="Password"
            name="password"
            autoComplete="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Link style={{ fontSize: '18px' }} to="/resetpassword">
            パスワードをお忘れですか？
          </Link>
          <br />
          <br />
          <Button
            type="submit"
            fullwidth="true"
            variant="contained"
            color="primary"
            size="large"
          >
            ログイン
          </Button>
        </Box>
        <br />
        <br />
        <p>
          アカウントをお持ちでないですか？&nbsp;
          <Link to="/signup">新規登録</Link>
        </p>
        <br />
        <br />
        <Link to="/resetpassword">パスワードを忘れましたか？</Link>
        <Button
          fullwidth="true"
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
        >
          ユーザー登録画面へ</Button>
        <Link to="/MapBox">Map</Link>
      </Box>
    </SContainer>
  );
};
const SContainer = styled.div`
  background-image: url(${background});
  max-width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
`;
