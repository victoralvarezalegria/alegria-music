/* First-party tracker for Victor's funnel (alegriamusic.net). No dependencies,
   nothing to block. Ported from the Creator Conservatory kit, TRACKING.md.
   It answers one question the Meta pixel cannot: which ad brought the human who
   paid, weeks later, on a different device, after Safari deleted every cookie
   Meta set. The visitor id is issued by our own server on our own domain, and
   every page, video milestone and CTA click hangs off it.
   Never throws into the page: every entry point is wrapped. */
(function () {
  'use strict';
  var EP = '/api/t/', LS = 'tv', started = Date.now(), maxScroll = 0, vid = null, ready = null;

  function cookie(n) {
    var m = (' ' + document.cookie).match(new RegExp('[; ]' + n + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function uuid() {
    try { if (crypto && crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : ((r & 3) | 8)).toString(16);
    });
  }
  var isUuid = function (v) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v || ''); };
  function q(n) { try { return new URLSearchParams(location.search).get(n) || ''; } catch (e) { return ''; } }

  /* Resolve the visitor id once, then reuse it for the life of the page.
     The localStorage mirror matters on iOS: Safari can evict the cookie after
     7 days from someone who is still the same person on the same laptop, and
     sending the old id back lets the server re-issue it instead of minting a
     stranger. */
  function getVid() {
    if (ready) return ready;
    var c = cookie(LS);
    if (isUuid(c)) { vid = c; store(LS, c); ready = Promise.resolve(c); return ready; }
    var prev = load(LS);
    ready = fetch(EP + 'init', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vid: isUuid(prev) ? prev : null, fbclid: q('fbclid') || null })
    }).then(function (r) { return r.json(); }).then(function (d) {
      vid = (d && d.vid) || (isUuid(prev) ? prev : uuid());
      store(LS, vid);
      return vid;
    }).catch(function () {
      vid = isUuid(prev) ? prev : uuid();
      store(LS, vid);
      return vid;
    });
    return ready;
  }

  function send(type, extra, beacon) {
    return getVid().then(function (id) {
      var b = { vid: id, event_uuid: uuid(), type: type, url: location.href };
      for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) b[k] = extra[k];
      var json = JSON.stringify(b);
      /* pagehide is the only moment the browser will not wait for a fetch, so the
         close event goes out as a beacon. Everything else uses keepalive. */
      if (beacon && navigator.sendBeacon) {
        try { if (navigator.sendBeacon(EP + 'event', new Blob([json], { type: 'application/json' }))) return; } catch (e) {}
      }
      try {
        fetch(EP + 'event', {
          method: 'POST', keepalive: true,
          headers: { 'Content-Type': 'application/json' }, body: json
        }).catch(function () {});
      } catch (e) {}
    });
  }

  function pageView() {
    var s = screen || {}, d = document.documentElement;
    send('page_view', {
      path: location.pathname,
      title: (document.title || '').slice(0, 300),
      referrer: document.referrer || '',
      utm_source: q('utm_source'), utm_medium: q('utm_medium'), utm_campaign: q('utm_campaign'),
      utm_term: q('utm_term'), utm_content: q('utm_content'),
      fbclid: q('fbclid'), gclid: q('gclid'), gbraid: q('gbraid'), wbraid: q('wbraid'),
      ttclid: q('ttclid'), msclkid: q('msclkid'), ac: q('ac'),
      /* tl=<slug> is appended by /go/<slug>, so the session can be tied to the
         tracking link that sent it. */
      tl: q('tl'),
      /* tl is the tracking link slug appended by /go/<slug>. */
      tl: q('tl'),
      screen: (s.width || 0) + 'x' + (s.height || 0),
      viewport: (d.clientWidth || 0) + 'x' + (d.clientHeight || 0),
      tz: (function () { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { return ''; } })(),
      lang: navigator.language || '',
      mobile: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent),
      /* Meta's own cookies, forwarded so the server event can match the browser
         event. The server stores them on the session and hands them to the CAPI. */
      fbp: cookie('_fbp'), fbc: cookie('_fbc')
    });
  }

  function trackScroll() {
    var d = document.documentElement, b = document.body;
    var h = Math.max(d.scrollHeight, b ? b.scrollHeight : 0) - d.clientHeight;
    var p = h > 0 ? Math.round(((window.pageYOffset || d.scrollTop) / h) * 100) : 100;
    if (p > maxScroll) maxScroll = Math.min(100, Math.max(0, p));
  }

  /* Video milestones. Only real <video> elements: a YouTube or Vimeo iframe needs
     that vendor's own player API, and guessing at it would report progress that
     never happened. Skipped silently by design. */
  var MARKS = [25, 50, 75, 100];
  function watchVideos() {
    var vids = document.querySelectorAll('video');
    for (var i = 0; i < vids.length; i++) (function (v) {
      if (v.__tw) return;
      v.__tw = 1;
      var name = v.getAttribute('data-video-id') ||
        ((v.currentSrc || v.src || (v.querySelector('source') || {}).src || 'video').split('/').pop().split('?')[0]);
      var hit = {};
      v.addEventListener('play', function () {
        if (hit.play) return;
        hit.play = 1;
        send('video', { video_id: name, action: 'play' });
      });
      v.addEventListener('timeupdate', function () {
        if (!v.duration || !isFinite(v.duration)) return;
        var pct = (v.currentTime / v.duration) * 100;
        for (var j = 0; j < MARKS.length; j++) {
          var m = MARKS[j];
          if (pct >= m && !hit[m]) { hit[m] = 1; send('video', { video_id: name, action: 'milestone', percent: m }); }
        }
      });
      v.addEventListener('ended', function () {
        if (hit[100]) return;
        hit[100] = 1;
        send('video', { video_id: name, action: 'milestone', percent: 100 });
      });
    })(vids[i]);
  }

  document.addEventListener('click', function (e) {
    try {
      var el = e.target && e.target.closest ? e.target.closest('[data-t]') : null;
      if (!el) return;
      send('cta_click', { name: el.getAttribute('data-t') || '', href: el.getAttribute('href') || '' });
    } catch (err) {}
  }, true);

  window.addEventListener('scroll', trackScroll, { passive: true });
  window.addEventListener('pagehide', function () {
    trackScroll();
    send('page_close', { max_scroll: maxScroll, time_on_page_ms: Date.now() - started }, true);
  });

  window.__t = {
    vid: getVid,
    event: function (type, payload) { return send(type, payload || {}); }
  };

  try {
    getVid();
    pageView();
    watchVideos();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watchVideos);
    window.addEventListener('load', watchVideos);
  } catch (e) {}
})();
