const crypto = require('crypto');

// Generate a random string
const generateSecret = (length = 32) => {
  return crypto.randomBytes(length).toString('base64');
};

// Generate all required secrets
const secrets = {
  APP_KEYS: `${generateSecret()},${generateSecret()}`,
  API_TOKEN_SALT: generateSecret(),
  ADMIN_JWT_SECRET: generateSecret(),
  TRANSFER_TOKEN_SALT: generateSecret(),
  JWT_SECRET: generateSecret(),
};

// Print the secrets
console.log('\nGenerated Secrets:\n');
Object.entries(secrets).forEach(([key, value]) => {
  console.log(`${key}=${value}`);
}); 