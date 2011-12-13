TITLE
=====

jQuery Plugin: Highlight Search Terms - version 0.4


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
        "^http://example\\.com.+[&?]query=([^&]+).*$"
      ]
    });


LICENSE
=======

MIT: http://hail2u.mit-license.org/2009
