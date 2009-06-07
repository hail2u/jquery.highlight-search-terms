TITLE
=====

jQuery Plugin: Highlight Search Terms - version 0.1

DESCRIPTION
===========

Highlight search terms in referrer URL from Google, Yahoo!, Bing and custom site.

Usage
=====

Highlight all contents of body element:

    $("body").highlightSearchTerms();

Highlight with custom class name:

    $("body").highlightSearchTerms({
      className: "keyword"
    });

Support custom referrer pattern:

    $("body").highlightSearchTerms({
      referrerPatterns: [
        "^http://example\.com.+[&?]query=([^&]+).*$"
      ]
    });

LICENSE
=======

Copyright (c) 2009 Kyo Nagashima <kyo@hail2u.net><br />
This library licensed under MIT license:<br />
http://opensource.org/licenses/mit-license.php<br />
