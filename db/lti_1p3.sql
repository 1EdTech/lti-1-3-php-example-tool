CREATE TABLE lti_key_set (
  id UUID NOT NULL,

  CONSTRAINT pk_lti_key_set_id PRIMARY KEY (id)
);

CREATE TABLE lti_key
(
    id          UUID NOT NULL,
    key_set_id  UUID NOT NULL REFERENCES lti_key_set(id),
    private_key TEXT NOT NULL,
    alg         TEXT NOT NULL,

    CONSTRAINT pk_lti_key_id PRIMARY KEY (id)
);

CREATE TABLE lti_registration (
    id                             UUID NOT NULL,
    issuer                         TEXT NOT NULL,
    client_id                      TEXT NOT NULL,
    platform_login_auth_endpoint   TEXT NOT NULL,
    platform_service_auth_endpoint TEXT NOT NULL,
    platform_jwks_endpoint         TEXT NOT NULL,
    platform_auth_provider         TEXT,
    key_set_id                     UUID NOT NULL REFERENCES lti_key_set(id),

    CONSTRAINT pk_lti_registration_id PRIMARY KEY (id),
    UNIQUE (issuer, client_id)
);

CREATE TABLE lti_deployment (
  deployment_id TEXT NOT NULL,
  registration_id UUID NOT NULL REFERENCES lti_registration(id),
  customer_id TEXT NOT NULL,

  CONSTRAINT pk_deployment_id PRIMARY KEY (registration_id, deployment_id)
);

/* Insert dummy data */

INSERT INTO lti_key_set VALUES('d48a53de-021f-46f7-a0a4-7134812c2235');

INSERT INTO lti_key VALUES(
    '1e3f0512-2066-4f8a-8916-2d278bf49524',
    'd48a53de-021f-46f7-a0a4-7134812c2235',
    '-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA8osiSa75nmqmakwNNocLA2N2huWM9At/tjSZOFX1r4+PDclS
zxhMw+ZcgHH+E/05Ec6Vcfd75i8Z+Bxu4ctbYk2FNIvRMN5UgWqxZ5Pf70n8UFxj
GqdwhUA7/n5KOFoUd9F6wLKa6Oh3OzE6v9+O3y6qL40XhZxNrJjCqxSEkLkOK3xJ
0J2npuZ59kipDEDZkRTWz3al09wQ0nvAgCc96DGH+jCgy0msA0OZQ9SmDE9CCMbD
T86ogLugPFCvo5g5zqBBX9Ak3czsuLS6Ni9Wco8ZSxoaCIsPXK0RJpt6Jvbjclqb
4imsobifxy5LsAV0l/weNWmU2DpzJsLgeK6VVwIDAQABAoIBAQC2R1RUdfjJUrOQ
rWk8so7XVBfO15NwEXhAkhUYnpmPAF/tZ4EhfMysaWLZcVIW6bbLKCtuRCVMX9ev
fIbkkLU0ErhqPi3QATcXL/z1r8+bAUprhpNAg9fvfM/ZukXDRged6MPNMC11nseE
p8HUU4oHNwXVyL6FvmstrHyYoEnkjIiMk34O2MFjAavoIJhM0gkoXVnxRP5MNi1n
GPVhK+TfZyRri20x1Rh3CsIq36PUyxCICWkD7jftLGqVdQBfuii600LP5v7nuHz9
LDsCeY7xRJu0eLdDk7/9ukb8fuq6/+3VYMYChYWvpw4DaH8qDHxZfWzMyaI489ma
l27lhgdxAoGBAPkxH6WuZM/GOowjySuruRjAVyJ4stfe9l/x8MrqnFA2Q8stqK69
60Y9LDrSaAx7QutvzZ64br2WMlvnGdJw868z4/JmvoAqW3IHUXzqRAHgOk/8Y3ze
Sjd7t3R0O3v6qAbQjyRYYgfAMZo7PzXW8FKNGsakAedEKW0b94HYndKpAoGBAPkr
grtARp2nnd1WGuxgQMjX++HjT0p9x7fTMCtfvYhZguU9AlCx53VHFeGc6fqsDkUm
BFv0dqMnw0TPzEQqLElBIh87TGS4JSXmcbQcejIx+ry2kMFuyMZIPuvZCnLfB/d7
Qu2DU6mdeIBME/8AX5kBqn1ekddioESdSkHkkif/AoGAaPCeAjjZ7YHuP/wGCOUN
UvYU+8hWkIAtwyPxIpMAdusTS6oTwlrqjK7QRIk9FhyGhv2TWwcSY7avyHIfNrco
eBzjHr7T9MdhsTiRwYgqUZvrEqoX/4rhOFJaZKlaL5DUV+JWlZi+18LBYNEYgoTc
ufcAUqzYvFrBE1jWt5DQjdkCgYATs6sMn1J2GNDUtYA/fITi3KEgBVc5rqRiFqLS
aymTZHCDK8XJF6gTj+FdC4k8tuoR8aWal8Phtr0r7bpbEXKbADlwesHZnO3jB0uq
UC4hVe5biZv8j4P0mbXP9ENtPdFlciuimCW/XaIvktRp71+fu4/9hcLGYxgFFOLQ
PwCHhQKBgGMCxIcueUkLnI9r0KkjtXap9mIgdgERwQPN0Cm9Tx35ZEzRp95kf4C6
MPsVOwZk5gNvvQngx4iaw9fNYG+PF2yNuDZ+EFwI0vpmGCKRQEke9/VCOFucMsjg
jMhbU+jrqRIJKisP7MCE1NRhymCPpQf/stEPl0nS5rj+mZJHQEGq
-----END RSA PRIVATE KEY-----',
    'RS256'
);

INSERT INTO lti_registration VALUES(
    'ed514650-df77-403a-a3af-65d0ba44c51f',
    'http://localhost:9001',
    'd42df408-70f5-4b60-8274-6c98d3b9468d',
    'http://localhost:9001/platform/login.php',
    'http://localhost/platform/token.php',
    'http://localhost/platform/jwks.php',
    NULL,
    'd48a53de-021f-46f7-a0a4-7134812c2235'
);

INSERT INTO lti_deployment VALUES(
    '8c49a5fa-f955-405e-865f-3d7e959e809f',
    'ed514650-df77-403a-a3af-65d0ba44c51f',
    'customer_1'
);
