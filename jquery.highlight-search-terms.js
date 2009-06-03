/**
 * jquery.highlight-search-terms.js - version 0.1
 * Highlight search terms in referrer URL from Google, Yahoo!, Bing and custom site.
 *
 * Copyright (c) 2009 Kyo Nagashima <kyo@hail2u.net>
 * This library licensed under MIT license:
 * http://opensource.org/licenses/mit-license.php
 */
(function($) {
  $.fn.highlightSearchTerms = function (options) {
    var o = $.extend({}, $.fn.highlightSearchTerms.defaults, options);
    $.merge(o.referrerPatterns, $.fn.highlightSearchTerms.builtinReferrerPatterns);
    var ref = document.referrer;

    if (ref) {
      var words = $.fn.highlightSearchTerms.extractWordsFromReferrer(ref, o);

      // Highlight words
      this.find(":not(iframe)").contents().each(function () {
        if (this.nodeType === 3) {
          var s = this.nodeValue.replace(words, "<em class=\"" + o.className + "\">$1</em>");
          $(this).replaceWith(s);
        }
      });
    }

    return this;
  };

  // Extract words from referrer
  $.fn.highlightSearchTerms.extractWordsFromReferrer = function (ref, o) {
    var words;

    $.each(o.referrerPatterns, function () {
      var pattern = new RegExp(this, "i");

      if (pattern.exec(ref)) {
        var unsafe = new RegExp(o.unsafeChars, "g");
        var query = decodeURIComponent(RegExp.$1).replace(unsafe, "+").replace(/^\+*(.*?)\+*$/, "$1").replace(/\++/g, "|");
        words = new RegExp("(" + query + ")", "gi");
        return false; // break $.each
      }
    });

    return words;
  };

  $.fn.highlightSearchTerms.defaults = {
    className: "highlight",
    referrerPatterns: [],
    unsafeChars: "[!-*,-/:-@[-`{-~]"
  };

  $.fn.highlightSearchTerms.builtinReferrerPatterns = [
    "^http://www\.google\.com.+[&?]q=([^&]+).*$",
    "^http://www\.google\.co\.jp.+[&?]q=([^&]+).*$",
    "^http://search\.yahoo\.com.+[&?]p=([^&]+).*$",
    "^http://search\.yahoo\.co\.jp.+[&?]p=([^&]+).*$",
    "^http://www\.bing\.com.+[&?]q=([^&]+).*$"
  ];
})(jQuery);
