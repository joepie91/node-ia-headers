var maybeEncodeValue, zeroFill;

zeroFill = require("zero-fill");

maybeEncodeValue = function(value) {
  var encoded;
  if (/[^ -~]/.exec(value)) {
    encoded = encodeURIComponent(value);
    return "uri(" + encoded + ")";
  } else {
    return value;
  }
};

module.exports = function(metadata) {
  var headerName, headers, i, itemCount, key, numberWidth, value, values, _i, _len;
  headers = {};
  for (key in metadata) {
    values = metadata[key];
    if (!Array.isArray(values)) {
      values = [values];
    }
    key = key.replace("_", "--");
    itemCount = values.length;
    if (itemCount === 0) {
      continue;
    } else if (itemCount === 1) {
      headers["x-archive-meta-" + key] = maybeEncodeValue(values[0]);
    } else {
      numberWidth = itemCount.toString().length;
      for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
        value = values[i];
        headerName = "x-archive-meta" + (zeroFill(numberWidth, i + 1)) + "-" + key;
        headers[headerName] = maybeEncodeValue(value);
      }
    }
  }
  return headers;
};
