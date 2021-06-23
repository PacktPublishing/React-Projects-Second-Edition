import JsonWebToken from 'jsonwebtoken';
import Bcrypt from 'bcryptjs';

const user = {
  username: 'test',
  password: '$2b$10$5dwsS5snIRlKu8ka5r7z0eoRyQVAsOtAZHkPJuSx.agOWjchXhSum',
};

const jwtSecret = '34%%##@#FGFKFL';

export function loginUser(username, password) {
  if (user.username === username) {
    const isValid = Bcrypt.compareSync(password, user.password);
    if (isValid) {
      return {
        username: user.username,
        token: JsonWebToken.sign({ user: user.username }, jwtSecret, {
          expiresIn: 3600,
        }),
      };
    } else {
      return new Error('Something went wrong');
    }
  } else {
    return new Error('Something went wrong');
  }
}

export function isTokenValid(bearerToken) {
  if (bearerToken) {
    return JsonWebToken.verify(bearerToken[1], jwtSecret, (error) => {
      if (!error) {
        return true;
      } else {
        return new Error('Something went wrong');
      }
    });
  } else {
    return new Error('Something went wrong');
  }
}
