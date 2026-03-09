/**
 * Standalone UTM attribution tracking (vanilla JS).
 * Drop into any static HTML page via <script src="/js/attribution.js"></script>
 *
 * Captures UTMs, click IDs, referrer, and landing page on first visit.
 * Stores first-touch + last-touch in a 30-day cookie.
 * Forms read the cookie and send attribution with each lead.
 */
(function () {
  var COOKIE_NAME = "pcs_attribution";
  var COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
  var OWN_DOMAINS = ["procourtsurfaces.com", "www.procourtsurfaces.com", "localhost"];
  var SEARCH_ENGINES = ["google.", "bing.", "yahoo.", "duckduckgo.", "baidu."];
  var SOCIAL_PLATFORMS = ["facebook.com", "instagram.com", "linkedin.com", "twitter.com", "t.co", "tiktok.com"];
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var CLICK_IDS = ["fbclid", "gclid", "ttclid"];

  function classifyChannel(source, medium, clickIdType, referrerDomain) {
    if (medium) {
      var m = medium.toLowerCase();
      if (m === "paid" || m === "cpc" || m === "ppc") return "paid";
      if (m === "email") return "email";
      if (m === "social") return "organic_social";
    }
    if (clickIdType) return "paid";
    if (referrerDomain) {
      if (SEARCH_ENGINES.some(function (se) { return referrerDomain.includes(se); })) return "organic_search";
      if (SOCIAL_PLATFORMS.some(function (sp) { return referrerDomain.includes(sp); })) return "organic_social";
      return "referral";
    }
    return "direct";
  }

  function inferSource(clickIdType) {
    if (clickIdType === "fbclid") return "facebook";
    if (clickIdType === "gclid") return "google";
    if (clickIdType === "ttclid") return "tiktok";
    return "unknown";
  }

  function parseReferrer(referrer) {
    if (!referrer) return null;
    try {
      var hostname = new URL(referrer).hostname;
      if (OWN_DOMAINS.some(function (d) { return hostname === d || hostname.endsWith("." + d); })) return null;
      return hostname;
    } catch (e) {
      return null;
    }
  }

  function readCookie() {
    try {
      var match = document.cookie.match(new RegExp("(?:^|; )" + COOKIE_NAME + "=([^;]*)"));
      if (!match) return null;
      return JSON.parse(decodeURIComponent(match[1]));
    } catch (e) {
      return null;
    }
  }

  function writeCookie(data) {
    var value = encodeURIComponent(JSON.stringify(data));
    var secure = window.location.protocol === "https:" ? ";Secure" : "";
    document.cookie = COOKIE_NAME + "=" + value + ";path=/;max-age=" + COOKIE_MAX_AGE + ";SameSite=Lax" + secure;
  }

  function capture() {
    var params = new URLSearchParams(window.location.search);
    var source = params.get("utm_source");
    var medium = params.get("utm_medium");
    var campaign = params.get("utm_campaign");
    var content = params.get("utm_content");
    var term = params.get("utm_term");

    var clickId = null, clickIdType = null;
    for (var i = 0; i < CLICK_IDS.length; i++) {
      var val = params.get(CLICK_IDS[i]);
      if (val) { clickId = val; clickIdType = CLICK_IDS[i]; break; }
    }

    var referrerDomain = parseReferrer(document.referrer);
    var hasNew = UTM_KEYS.some(function (k) { return params.has(k); }) || clickId !== null || referrerDomain !== null;

    if (!hasNew) {
      var existing = readCookie();
      if (!existing) {
        var t = { source: null, medium: null, campaign: null, content: null, term: null, channel: "direct", referrer: null, landing_page: window.location.pathname, click_id: null, click_id_type: null, timestamp: new Date().toISOString() };
        writeCookie({ ft: t, lt: t });
      }
      return;
    }

    var effectiveSource = source || (clickIdType ? inferSource(clickIdType) : null);
    var channel = classifyChannel(effectiveSource, medium, clickIdType, referrerDomain);
    var touch = { source: effectiveSource, medium: medium, campaign: campaign, content: content, term: term, channel: channel, referrer: referrerDomain, landing_page: window.location.pathname, click_id: clickId, click_id_type: clickIdType, timestamp: new Date().toISOString() };

    var existing = readCookie();
    if (!existing) {
      writeCookie({ ft: touch, lt: touch });
    } else {
      writeCookie({ ft: existing.ft, lt: touch });
    }
  }

  function getAttribution() {
    var data = readCookie();
    if (!data) return null;
    return {
      ft_source: data.ft.source, ft_medium: data.ft.medium, ft_campaign: data.ft.campaign, ft_content: data.ft.content, ft_term: data.ft.term, ft_channel: data.ft.channel, ft_referrer: data.ft.referrer, ft_landing_page: data.ft.landing_page, ft_click_id: data.ft.click_id, ft_click_id_type: data.ft.click_id_type, ft_timestamp: data.ft.timestamp,
      lt_source: data.lt.source, lt_medium: data.lt.medium, lt_campaign: data.lt.campaign, lt_content: data.lt.content, lt_term: data.lt.term, lt_channel: data.lt.channel, lt_referrer: data.lt.referrer, lt_landing_page: data.lt.landing_page, lt_click_id: data.lt.click_id, lt_click_id_type: data.lt.click_id_type, lt_timestamp: data.lt.timestamp
    };
  }

  // Auto-capture on load
  capture();

  // Expose globally for form use
  window.PCSAttribution = { getAttribution: getAttribution };
})();
