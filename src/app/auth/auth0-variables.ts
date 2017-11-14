interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'Fq9ZNTv3UqnH6nI03kW4d3McxIYWEQRE',
  CLIENT_DOMAIN: 'bkrebs.auth0.com',
  AUDIENCE: 'http://localhost:8080/ws/',
  REDIRECT: 'http://localhost:4200/callback',
  SCOPE: 'openid profile'
};
