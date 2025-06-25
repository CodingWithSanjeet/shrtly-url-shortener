/**
 * Ensures the given URL has a protocol (http or https).
 * If missing, prepends 'http://' to the URL.
 *
 * @param {string} originalUrl - The URL to transform.
 * @returns {string} The URL with a protocol.
 *
 * @example
 * // returns 'http://example.com'
 * transforURL('example.com');
 *
 * @example
 * // returns 'https://secure.com'
 * transforURL('https://secure.com');
 */
const transforURL = (originalUrl) => {
  let finalUrl = originalUrl;
  if (!/^https?:\/\//i.test(originalUrl)) {
    finalUrl = `http://${originalUrl}`;
  }
  return finalUrl;
};

module.exports = { transforURL };
