/* eslint-disable  no-bitwise */

export const hex2rgb = (hex = 0x0) => {
    const match = hex.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
        return [0, 0, 0];
    }

    let colorString = match[0];

    if (match[0].length === 3) {
        colorString = colorString
            .split('')
            .map(char => char + char)
            .join('');
    }

    const integer = parseInt(colorString, 16);
    const r = (integer >> 16) & 0xff;
    const g = (integer >> 8) & 0xff;
    const b = integer & 0xff;

    return [r, g, b];
};

export const rgb2hex = ([r = 0, g = 0, b = 0]) =>
    ((Math.round(r) & 0xff) << 16) +
    ((Math.round(g) & 0xff) << 8) +
    (Math.round(b) & 0xff);

export default { hex2rgb, rgb2hex };
