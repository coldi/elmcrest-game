/**
 * Performs a simple arithmetic operation.
 * @param {number} prop
 * @param {string} operator
 * @param {number} value
 * @returns {number}
 */
export default function operate(prop, operator, value) {
    switch (operator.charAt(0)) {
        case '+':
            return prop + value;
        case '-':
            return prop - value;
        case '*':
            return prop * value;
        case '/':
            return prop / value;
        default:
            return prop;
    }
}
