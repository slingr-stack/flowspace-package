/**
 * 
 * @param {String} body 
 * @param {*} signature 
 * @returns 
 */
exports.verifySignature = function (body, signature) {
    let secret = config.get('remoteSecret');
    if (typeof secret !== 'string' || ! sys.utils.crypto.verifySignatureWithHmac(body, signature, secret, 'HmacSHA256')) {
        sys.logs.error('Invalid signature or body');
        return false;
    }
    return true;
};