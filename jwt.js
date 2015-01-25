
///
///  Token contains of
///  
///

var crypto = require('crypto');
var HASH_ALGORITHM = 'HS256';

function _encode(payload, secret){
	var header = {
		typ: 'JWT',
		alg: HASH_ALGORITHM
	};

	var jwt = [
	_base64Encode(JSON.stringify(header)),
	_base64Encode(JSON.stringify(payload)),
	_sign(jwt, secret)
	].join('.');

	return jwt;
};

function _decode(token, secret){
	var segments = token.split('.');

	if (segments.length !== 3) {
		throw new Error('JWT: Token structure incorrect');
	}

	var header = JSON.parse(_base64Decode(segments[0]));
	var payload = JSON.parse(_base64Decode(segments[1]));

	var rawSignature = segments[0] + '.' + segments[1];

	if(!_verify(rawSignature, secret, segments[2])){
		throw new Error('JWT: Verification failed');
	}

	return payload;
};

function _sign(str, key){
	return crypto.createHmac('sha256', key).update(str).digest('base64');
};

function _base64Encode(str){
	return new Buffer(str).toString('base64');
};

function _base64Decode(str){
	return new Buffer(str, 'base64').toString();
};

function _verify(rawSignature, secret, signature){
	return signature === _sign(rawSignature, secret);
};

module.exports = {
	encode: _encode
};