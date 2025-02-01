const dns = require('dns').promises;

export function VerifyEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regex_test = emailRegex.test(email);

  return dns.resolve(email.split('@')[1], 'MX')
    .then(() => regex_test)
    .catch(() => false);

}
