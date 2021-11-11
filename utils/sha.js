import sjcl from 'sjcl'

/**
 * @description Calcula la cadena sha256 de un string
 * @param {*} message 
 * @returns string
 */
export default function sha(message) {
	const myBitArray = sjcl.hash.sha256.hash(message)
	const myHash = sjcl.codec.hex.fromBits(myBitArray)
	return myHash.toUpperCase()
}