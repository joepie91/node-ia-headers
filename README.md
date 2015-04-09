# ia-headers

This module converts an object containing metadata into valid HTTP headers for the [Internet Archive](https://archive.org/) S3 API.

This is not a full-blown API client - it simply generates the metadata headers. You can use a module like [bhttp](https://www.npmjs.com/package/bhttp) to interact with the API. The documentation for the Internet Archive S3 API can be found [here](https://archive.org/help/abouts3.txt). API keys can be obtained [here](http://archive.org/account/s3.php).

`ia-header` supports multiple values for a metadata field - simply pass them in as an array (see also the Usage example below). Underscores are translated into double dashes, as per the IA S3 documentation.

## License

[WTFPL](http://www.wtfpl.net/txt/copying/) or [CC0](https://creativecommons.org/publicdomain/zero/1.0/), whichever you prefer. A donation and/or attribution are appreciated, but not required.

## Donate

My income consists entirely of donations for my projects. If this module is useful to you, consider [making a donation](http://cryto.net/~joepie91/donate.html)!

You can donate using Bitcoin, PayPal, Gratipay, Flattr, cash-in-mail, SEPA transfers, and pretty much anything else.

## Contributing

Pull requests welcome. Please make sure your modifications are in line with the overall code style, and ensure that you're editing the `.coffee` files, not the `.js` files.

Build tool of choice is `gulp`; simply run `gulp` while developing, and it will watch for changes.

Be aware that by making a pull request, you agree to release your modifications under the licenses stated above.

## Caveats

* Metadata keys (not values!) may only be ASCII. The Internet Archive does not currently support non-ASCII metadata keys.
* All non-ASCII and non-printable characters in metadata values are URL-encoded - this could cause potentially significant header size increases. In most cases, this won't matter.

## Usage

```javascript
var iaHeaders = require("ia-headers");

var metadata = {
	subject: ["mirror", "pdf.yt"],
	mediatype: "texts",
	collection: "pdfymirrors",
	date: "2014-03-01",
	title: "Some Document (PDFy mirror)",
	description: "This is a document from PDFy.<br>It's a mirror."
}

var metadataHeaders = iaHeaders(metadata);
console.log(metadataHeaders);

/* Result:
{ 'x-archive-meta1-subject': 'mirror',
  'x-archive-meta2-subject': 'pdf.yt',
  'x-archive-meta-mediatype': 'texts',
  'x-archive-meta-collection': 'pdfymirrors',
  'x-archive-meta-date': '2014-03-01',
  'x-archive-meta-title': 'Some Document (PDFy mirror)',
  'x-archive-meta-description': 'This is a document from PDFy.<br>It\'s a mirror.' }
*/
```
