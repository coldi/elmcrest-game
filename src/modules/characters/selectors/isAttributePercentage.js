/**
 * Tests if a given attribute name should contain a floating percentage value (e.g. 0.25)
 * @param {string} attribute
 * @returns {boolean}
 */
const isAttributePercentage = (attribute) => (
    (/rating|chance/i).test(attribute)
);

export default isAttributePercentage;
