const crypto = require('crypto');

function generateUniqueId() {
    return crypto.randomBytes(6).toString('HEX');
}

module.exports = generateUniqueId;