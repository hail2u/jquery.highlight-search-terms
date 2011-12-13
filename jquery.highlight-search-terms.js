/**
 * @preserve jQuery Plugin: Highlight Search Terms - version 0.4
 *
 * LICENSE: http://hail2u.mit-license.org/2009
 */

/*jslint indent: 2, browser: true, regexp: true */
/*global jQuery, $ */

(function ($) {
  "use strict";

  // Private: Extract terms from referrer
  function extractSearchTerms(ref, o) {
    var terms = "";

    $.each(o.referrerPatterns, function () {
      var pattern = new RegExp(this, "i"),
        unsafe;

      if (pattern.exec(ref)) {
        unsafe = new RegExp(o.unsafeChars, "g");
        terms = decodeURIComponent(RegExp.$1).replace(unsafe, "+").replace(/^\+*(.*?)\+*$/, "$1").replace(/\++/g, "|");

        return false; // break $.each
      }
    });

    return terms;
  }

  // Private: Encode entities
  function encodeEntities(s) {
    return $("<u/>").text(s).html(); // jQuery magic
  }

  $.fn.highlightSearchTerms = function (options) {
    var o = $.extend({}, $.fn.highlightSearchTerms.defaults, options),
      ref,
      terms,
      t,
      c,
      highlighted;
    $.merge(o.referrerPatterns, $.fn.highlightSearchTerms.builtinReferrerPatterns);
    ref = o.referrer || document.referrer;

    if (ref) {
      terms = extractSearchTerms(ref, o);

      // Highlight terms
      if (terms !== "") {
        terms = new RegExp("(" + terms + ")", "gi");
        t = encodeEntities(o.tagName);
        c = encodeEntities(o.className);
        highlighted = "<" + t + " class=\"" + c + "\">$1</" + t + ">";
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

  // Public: default options
  $.fn.highlightSearchTerms.defaults = {
    tagName:          "em",
    className:        "highlight",
    referrerPatterns: [],
    unsafeChars:      "[!-*,-/:-@[-`{-~]"
  };

  // Public: built-in referrer patterns for Google(com|co.jp), Yahoo!(com|co.jp), Bing.
  $.fn.highlightSearchTerms.builtinReferrerPatterns = [
    "^http://www\\.google\\.com.+[&?]q=([^&]+).*$",
    "^http://www\\.google\\.co\\.jp.+[&?]q=([^&]+).*$",
    "^http://search\\.yahoo\\.com.+[&?]p=([^&]+).*$",
    "^http://search\\.yahoo\\.co\\.jp.+[&?]p=([^&]+).*$",
    "^http://www\\.bing\\.com.+[&?]q=([^&]+).*$"
  ];
}(jQuery));
