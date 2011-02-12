TITLE
=====

jQuery Plugin: Highlight Search Terms - version 0.3


DESCRIPTION
===========

Highlight search terms in referrer URL from Google, Yahoo!, Bing and custom site.


Usage
=====

Highlight all contents of body element:

    $("body").highlightSearchTerms();

Highlight with custom tag name:

    $("body").highlightSearchTerms({
      tagName: "span"
    });

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

Copyright (c) 2009 Kyo Nagashima <kyo@hail2u.net>  
This library licensed under MIT license:  
http://opensource.org/licenses/mit-license.php
