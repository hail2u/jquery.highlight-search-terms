/*!
 * jQuery Plugin: Highlight Search Terms - version 0.2
 * http://github.com/hail2u/jquery.highlight-search-terms
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
    var ref = o.referrer || document.referrer;

    if (ref) {
      var terms = extractSearchTerms(ref, o);

      // Highlight terms
      if (terms !== "") {
        terms = new RegExp("(" + terms + ")", "gi");
        var highlighted = "<em class=\"" + encodeEntities(o.className) + "\">$1</em>";
        this.find(":not(iframe, option, script, textarea)").contents().each(function () {
          if (this.nodeType === 3) {
            var s = encodeEntities(this.nodeValue).replace(terms, highlighted);
            $(this).replaceWith(s);
          }
        });
      }
    }

    return this;
  };

  // Private: Extract terms from referrer
  extractSearchTerms = function (ref, o) {
    var terms = "";

    $.each(o.referrerPatterns, function () {
      var pattern = new RegExp(this, "i");

      if (pattern.exec(ref)) {
        var unsafe = new RegExp(o.unsafeChars, "g");
        terms = decodeURIComponent(RegExp.$1).replace(unsafe, "+").replace(/^\+*(.*?)\+*$/, "$1").replace(/\++/g, "|");
        return false; // break $.each
      }
    });

    return terms;
  };

  // Private: Encode entities
  encodeEntities = function (s) {
    return $("<u/>").text(s).html(); // jQuery magic
  };

  // Public: default options
  $.fn.highlightSearchTerms.defaults = {
    className: "highlight",
    referrerPatterns: [],
    unsafeChars: "[!-*,-/:-@[-`{-~]"
  };

  // Public: built-in referrer patterns for Google(com|co.jp), Yahoo!(com|co.jp), Bing.
  $.fn.highlightSearchTerms.builtinReferrerPatterns = [
    "^http://www\.google\.com.+[&?]q=([^&]+).*$",
    "^http://www\.google\.co\.jp.+[&?]q=([^&]+).*$",
    "^http://search\.yahoo\.com.+[&?]p=([^&]+).*$",
    "^http://search\.yahoo\.co\.jp.+[&?]p=([^&]+).*$",
    "^http://www\.bing\.com.+[&?]q=([^&]+).*$"
  ];
})(jQuery);
