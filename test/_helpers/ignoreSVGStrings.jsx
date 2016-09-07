require.extensions['.svg'] = (obj) => {
  obj.exports = () => (
    <svg>SVG_TEST_STUB</svg>
  );
};
