zeroFill = require "zero-fill"

maybeEncodeValue = (value) ->
	if /[^ -~]/.exec(value) # Matches any Unicode and non-printable characters.
		encoded = encodeURIComponent(value)
		return "uri(#{encoded})"
	else
		return value

module.exports = (metadata) ->
	headers = {}

	for key, values of metadata
		# It's easier to just always operate on an array, even if there's only a single value.
		if not Array.isArray values
			values = [values]

		# Per RFC 822, we cannot have underscores in the header names. The IA S3 API will automatically convert double hyphens to an underscore, so we do the inverse.
		key = key.replace("_", "--")

		itemCount = values.length

		if itemCount == 0
			continue
		else if itemCount == 1
			headers["x-archive-meta-#{key}"] = maybeEncodeValue(values[0])
		else
			numberWidth = itemCount.toString().length

			for value, i in values
				headerName = "x-archive-meta#{zeroFill(numberWidth, i + 1)}-#{key}"
				headers[headerName] = maybeEncodeValue(value)

	return headers
