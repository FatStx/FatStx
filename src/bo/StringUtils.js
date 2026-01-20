export function bytesToAscii(buffer) {
  let ret = '';
  const end = buffer.length;

  for (let i = 0; i < end; ++i) {
    if (buffer[i] > 0) {
      ret += String.fromCharCode(buffer[i] & 0x7f);
    }
  }
  return ret;
}

export function hexToBytes(hex) {
  if (typeof hex !== 'string')
    throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
  if (hex.length % 2)
    throw new Error(`hexToBytes: received invalid unpadded hex, got: ${hex.length}`);
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    array[i] = Number.parseInt(hex.slice(j, j + 2), 16);
  }
  return array;
}

export function hexToAscii(hexString) {
  return bytesToAscii(hexToBytes(hexString));
}
