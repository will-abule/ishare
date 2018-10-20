$(document).ready(function () {
  "use strict";

  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;


  $(".fullscreen").css("height", window_height)
  $(".fitscreen").css("height", fitscreen);


  // -------   Active Mobile Menu-----//

  $(".menu-bar").on('click', function (e) {
    e.preventDefault();
    $("nav").toggleClass('hide');
    $("span", this).toggleClass("lnr-menu lnr-cross");
    $(".main-menu").addClass('mobile-menu');
  });

  // $('select').niceSelect();
  // $('.img-pop-up').magnificPopup({
  //     type: 'image',
  //     gallery:{
  //     enabled:true
  //     }
  // });

  // $('.active-bottle-carousel').owlCarousel({
  //     items:1,
  //     loop:true,
  //     nav: false,
  //     autoplay: true,
  //     autoplayTimeout:3000,
  //     autoplayHoverPause:true
  // });

  // $('.play-btn').magnificPopup({
  //     disableOn: 700,
  //     type: 'iframe',
  //     mainClass: 'mfp-fade',
  //     removalDelay: 160,
  //     preloader: false,
  //     fixedContentPos: false
  // });


  // $(document).ready(function() {
  //     $('#mc_embed_signup').find('form').ajaxChimp();
  // });      
  // // -------   Mail Send ajax

});
$(document).ready(function () {

  // Gets the video src from the data-src on each button

  var $videoSrc;
  $('.video-btn').click(function () {
    $videoSrc = $(this).data("src");
  });
  // console.log($videoSrc);



  // when the modal is opened autoplay it  
  $('#myModal').on('shown.bs.modal', function (e) {

    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    $("#video").attr('src', $videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1");
  })


  // stop playing the youtube video when I close the modal
  $('#myModal').on('hide.bs.modal', function (e) {
    // a poor man's stop video
    $("#video").attr('src', $videoSrc);
  })






  // document ready  
});

/*! pace 1.0.0 */
(function () {
  var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X = [].slice,
    Y = {}.hasOwnProperty,
    Z = function (a, b) {
      function c() {
        this.constructor = a
      }
      for (var d in b) Y.call(b, d) && (a[d] = b[d]);
      return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
    },
    $ = [].indexOf || function (a) {
      for (var b = 0, c = this.length; c > b; b++)
        if (b in this && this[b] === a) return b;
      return -1
    };
  for (u = {
      catchupTime: 100,
      initialRate: .03,
      minTime: 250,
      ghostTime: 100,
      maxProgressPerFrame: 20,
      easeFactor: 1.25,
      startOnPageLoad: !0,
      restartOnPushState: !0,
      restartOnRequestAfter: 500,
      target: "body",
      elements: {
        checkInterval: 100,
        selectors: ["body"]
      },
      eventLag: {
        minSamples: 10,
        sampleCount: 3,
        lagThreshold: 3
      },
      ajax: {
        trackMethods: ["GET"],
        trackWebSockets: !0,
        ignoreURLs: []
      }
    }, C = function () {
      var a;
      return null != (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? a : +new Date
    }, E = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == E && (E = function (a) {
      return setTimeout(a, 50)
    }, t = function (a) {
      return clearTimeout(a)
    }), G = function (a) {
      var b, c;
      return b = C(), (c = function () {
        var d;
        return d = C() - b, d >= 33 ? (b = C(), a(d, function () {
          return E(c)
        })) : setTimeout(c, 33 - d)
      })()
    }, F = function () {
      var a, b, c;
      return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? X.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b]
    }, v = function () {
      var a, b, c, d, e, f, g;
      for (b = arguments[0], d = 2 <= arguments.length ? X.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++)
        if (c = d[f])
          for (a in c) Y.call(c, a) && (e = c[a], null != b[a] && "object" == typeof b[a] && null != e && "object" == typeof e ? v(b[a], e) : b[a] = e);
      return b
    }, q = function (a) {
      var b, c, d, e, f;
      for (c = b = 0, e = 0, f = a.length; f > e; e++) d = a[e], c += Math.abs(d), b++;
      return c / b
    }, x = function (a, b) {
      var c, d, e;
      if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
        if (c = e.getAttribute("data-pace-" + a), !b) return c;
        try {
          return JSON.parse(c)
        } catch (f) {
          return d = f, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0
        }
      }
    }, g = function () {
      function a() {}
      return a.prototype.on = function (a, b, c, d) {
        var e;
        return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({
          handler: b,
          ctx: c,
          once: d
        })
      }, a.prototype.once = function (a, b, c) {
        return this.on(a, b, c, !0)
      }, a.prototype.off = function (a, b) {
        var c, d, e;
        if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
          if (null == b) return delete this.bindings[a];
          for (c = 0, e = []; c < this.bindings[a].length;) e.push(this.bindings[a][c].handler === b ? this.bindings[a].splice(c, 1) : c++);
          return e
        }
      }, a.prototype.trigger = function () {
        var a, b, c, d, e, f, g, h, i;
        if (c = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
          for (e = 0, i = []; e < this.bindings[c].length;) h = this.bindings[c][e], d = h.handler, b = h.ctx, f = h.once, d.apply(null != b ? b : this, a), i.push(f ? this.bindings[c].splice(e, 1) : e++);
          return i
        }
      }, a
    }(), j = window.Pace || {}, window.Pace = j, v(j, g.prototype), D = j.options = v({}, u, window.paceOptions, x()), U = ["ajax", "document", "eventLag", "elements"], Q = 0, S = U.length; S > Q; Q++) K = U[Q], D[K] === !0 && (D[K] = u[K]);
  i = function (a) {
    function b() {
      return V = b.__super__.constructor.apply(this, arguments)
    }
    return Z(b, a), b
  }(Error), b = function () {
    function a() {
      this.progress = 0
    }
    return a.prototype.getElement = function () {
      var a;
      if (null == this.el) {
        if (a = document.querySelector(D.target), !a) throw new i;
        this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el)
      }
      return this.el
    }, a.prototype.finish = function () {
      var a;
      return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
    }, a.prototype.update = function (a) {
      return this.progress = a, this.render()
    }, a.prototype.destroy = function () {
      try {
        this.getElement().parentNode.removeChild(this.getElement())
      } catch (a) {
        i = a
      }
      return this.el = void 0
    }, a.prototype.render = function () {
      var a, b, c, d, e, f, g;
      if (null == document.querySelector(D.target)) return !1;
      for (a = this.getElement(), d = "translate3d(" + this.progress + "%, 0, 0)", g = ["webkitTransform", "msTransform", "transform"], e = 0, f = g.length; f > e; e++) b = g[e], a.children[0].style[b] = d;
      return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? c = "99" : (c = this.progress < 10 ? "0" : "", c += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + c)), this.lastRenderedProgress = this.progress
    }, a.prototype.done = function () {
      return this.progress >= 100
    }, a
  }(), h = function () {
    function a() {
      this.bindings = {}
    }
    return a.prototype.trigger = function (a, b) {
      var c, d, e, f, g;
      if (null != this.bindings[a]) {
        for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++) c = f[d], g.push(c.call(this, b));
        return g
      }
    }, a.prototype.on = function (a, b) {
      var c;
      return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b)
    }, a
  }(), P = window.XMLHttpRequest, O = window.XDomainRequest, N = window.WebSocket, w = function (a, b) {
    var c, d, e, f;
    f = [];
    for (d in b.prototype) try {
      e = b.prototype[d], f.push(null == a[d] && "function" != typeof e ? a[d] = e : void 0)
    } catch (g) {
      c = g
    }
    return f
  }, A = [], j.ignore = function () {
    var a, b, c;
    return b = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], A.unshift("ignore"), c = b.apply(null, a), A.shift(), c
  }, j.track = function () {
    var a, b, c;
    return b = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], A.unshift("track"), c = b.apply(null, a), A.shift(), c
  }, J = function (a) {
    var b;
    if (null == a && (a = "GET"), "track" === A[0]) return "force";
    if (!A.length && D.ajax) {
      if ("socket" === a && D.ajax.trackWebSockets) return !0;
      if (b = a.toUpperCase(), $.call(D.ajax.trackMethods, b) >= 0) return !0
    }
    return !1
  }, k = function (a) {
    function b() {
      var a, c = this;
      b.__super__.constructor.apply(this, arguments), a = function (a) {
        var b;
        return b = a.open, a.open = function (d, e) {
          return J(d) && c.trigger("request", {
            type: d,
            url: e,
            request: a
          }), b.apply(a, arguments)
        }
      }, window.XMLHttpRequest = function (b) {
        var c;
        return c = new P(b), a(c), c
      };
      try {
        w(window.XMLHttpRequest, P)
      } catch (d) {}
      if (null != O) {
        window.XDomainRequest = function () {
          var b;
          return b = new O, a(b), b
        };
        try {
          w(window.XDomainRequest, O)
        } catch (d) {}
      }
      if (null != N && D.ajax.trackWebSockets) {
        window.WebSocket = function (a, b) {
          var d;
          return d = null != b ? new N(a, b) : new N(a), J("socket") && c.trigger("request", {
            type: "socket",
            url: a,
            protocols: b,
            request: d
          }), d
        };
        try {
          w(window.WebSocket, N)
        } catch (d) {}
      }
    }
    return Z(b, a), b
  }(h), R = null, y = function () {
    return null == R && (R = new k), R
  }, I = function (a) {
    var b, c, d, e;
    for (e = D.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++)
      if (b = e[c], "string" == typeof b) {
        if (-1 !== a.indexOf(b)) return !0
      } else if (b.test(a)) return !0;
    return !1
  }, y().on("request", function (b) {
    var c, d, e, f, g;
    return f = b.type, e = b.request, g = b.url, I(g) ? void 0 : j.running || D.restartOnRequestAfter === !1 && "force" !== J(f) ? void 0 : (d = arguments, c = D.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function () {
      var b, c, g, h, i, k;
      if (b = "socket" === f ? e.readyState < 2 : 0 < (h = e.readyState) && 4 > h) {
        for (j.restart(), i = j.sources, k = [], c = 0, g = i.length; g > c; c++) {
          if (K = i[c], K instanceof a) {
            K.watch.apply(K, d);
            break
          }
          k.push(void 0)
        }
        return k
      }
    }, c))
  }), a = function () {
    function a() {
      var a = this;
      this.elements = [], y().on("request", function () {
        return a.watch.apply(a, arguments)
      })
    }
    return a.prototype.watch = function (a) {
      var b, c, d, e;
      return d = a.type, b = a.request, e = a.url, I(e) ? void 0 : (c = "socket" === d ? new n(b) : new o(b), this.elements.push(c))
    }, a
  }(), o = function () {
    function a(a) {
      var b, c, d, e, f, g, h = this;
      if (this.progress = 0, null != window.ProgressEvent)
        for (c = null, a.addEventListener("progress", function (a) {
            return h.progress = a.lengthComputable ? 100 * a.loaded / a.total : h.progress + (100 - h.progress) / 2
          }, !1), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++) b = g[d], a.addEventListener(b, function () {
          return h.progress = 100
        }, !1);
      else f = a.onreadystatechange, a.onreadystatechange = function () {
        var b;
        return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50), "function" == typeof f ? f.apply(null, arguments) : void 0
      }
    }
    return a
  }(), n = function () {
    function a(a) {
      var b, c, d, e, f = this;
      for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++) b = e[c], a.addEventListener(b, function () {
        return f.progress = 100
      }, !1)
    }
    return a
  }(), d = function () {
    function a(a) {
      var b, c, d, f;
      for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++) b = f[c], this.elements.push(new e(b))
    }
    return a
  }(), e = function () {
    function a(a) {
      this.selector = a, this.progress = 0, this.check()
    }
    return a.prototype.check = function () {
      var a = this;
      return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
        return a.check()
      }, D.elements.checkInterval)
    }, a.prototype.done = function () {
      return this.progress = 100
    }, a
  }(), c = function () {
    function a() {
      var a, b, c = this;
      this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function () {
        return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0
      }
    }
    return a.prototype.states = {
      loading: 0,
      interactive: 50,
      complete: 100
    }, a
  }(), f = function () {
    function a() {
      var a, b, c, d, e, f = this;
      this.progress = 0, a = 0, e = [], d = 0, c = C(), b = setInterval(function () {
        var g;
        return g = C() - c - 50, c = C(), e.push(g), e.length > D.eventLag.sampleCount && e.shift(), a = q(e), ++d >= D.eventLag.minSamples && a < D.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3))
      }, 50)
    }
    return a
  }(), m = function () {
    function a(a) {
      this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = D.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = F(this.source, "progress"))
    }
    return a.prototype.tick = function (a, b) {
      var c;
      return null == b && (b = F(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / D.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, D.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + D.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
    }, a
  }(), L = null, H = null, r = null, M = null, p = null, s = null, j.running = !1, z = function () {
    return D.restartOnPushState ? j.restart() : void 0
  }, null != window.history.pushState && (T = window.history.pushState, window.history.pushState = function () {
    return z(), T.apply(window.history, arguments)
  }), null != window.history.replaceState && (W = window.history.replaceState, window.history.replaceState = function () {
    return z(), W.apply(window.history, arguments)
  }), l = {
    ajax: a,
    elements: d,
    document: c,
    eventLag: f
  }, (B = function () {
    var a, c, d, e, f, g, h, i;
    for (j.sources = L = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++) a = g[c], D[a] !== !1 && L.push(new l[a](D[a]));
    for (i = null != (h = D.extraSources) ? h : [], d = 0, f = i.length; f > d; d++) K = i[d], L.push(new K(D));
    return j.bar = r = new b, H = [], M = new m
  })(), j.stop = function () {
    return j.trigger("stop"), j.running = !1, r.destroy(), s = !0, null != p && ("function" == typeof t && t(p), p = null), B()
  }, j.restart = function () {
    return j.trigger("restart"), j.stop(), j.start()
  }, j.go = function () {
    var a;
    return j.running = !0, r.render(), a = C(), s = !1, p = G(function (b, c) {
      var d, e, f, g, h, i, k, l, n, o, p, q, t, u, v, w;
      for (l = 100 - r.progress, e = p = 0, f = !0, i = q = 0, u = L.length; u > q; i = ++q)
        for (K = L[i], o = null != H[i] ? H[i] : H[i] = [], h = null != (w = K.elements) ? w : [K], k = t = 0, v = h.length; v > t; k = ++t) g = h[k], n = null != o[k] ? o[k] : o[k] = new m(g), f &= n.done, n.done || (e++, p += n.tick(b));
      return d = p / e, r.update(M.tick(b, d)), r.done() || f || s ? (r.update(100), j.trigger("done"), setTimeout(function () {
        return r.finish(), j.running = !1, j.trigger("hide")
      }, Math.max(D.ghostTime, Math.max(D.minTime - (C() - a), 0)))) : c()
    })
  }, j.start = function (a) {
    v(D, a), j.running = !0;
    try {
      r.render()
    } catch (b) {
      i = b
    }
    return document.querySelector(".pace") ? (j.trigger("start"), j.go()) : setTimeout(j.start, 50)
  }, "function" == typeof define && define.amd ? define(function () {
    return j
  }) : "object" == typeof exports ? module.exports = j : D.startOnPageLoad && j.start()
}).call(this);


/*
 Copyright (C) Federico Zivolo 2018
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
})(this, function () {
  'use strict';

  function e(e) {
    return e && '[object Function]' === {}.toString.call(e)
  }

  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = getComputedStyle(e, null);
    return t ? o[t] : o
  }

  function o(e) {
    return 'HTML' === e.nodeName ? e : e.parentNode || e.host
  }

  function n(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case 'HTML':
      case 'BODY':
        return e.ownerDocument.body;
      case '#document':
        return e.body;
    }
    var i = t(e),
      r = i.overflow,
      p = i.overflowX,
      s = i.overflowY;
    return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e))
  }

  function r(e) {
    if (!e) return document.documentElement;
    for (var o = ie(10) ? document.body : null, n = e.offsetParent; n === o && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
    var i = n && n.nodeName;
    return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(n.nodeName) && 'static' === t(n, 'position') ? r(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
  }

  function p(e) {
    var t = e.nodeName;
    return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e)
  }

  function s(e) {
    return null === e.parentNode ? e : s(e.parentNode)
  }

  function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      n = o ? e : t,
      i = o ? t : e,
      a = document.createRange();
    a.setStart(n, 0), a.setEnd(i, 0);
    var l = a.commonAncestorContainer;
    if (e !== l && t !== l || n.contains(i)) return p(l) ? l : r(l);
    var f = s(e);
    return f.host ? d(f.host, t) : d(e, s(t).host)
  }

  function a(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
      o = 'top' === t ? 'scrollTop' : 'scrollLeft',
      n = e.nodeName;
    if ('BODY' === n || 'HTML' === n) {
      var i = e.ownerDocument.documentElement,
        r = e.ownerDocument.scrollingElement || i;
      return r[o]
    }
    return e[o]
  }

  function l(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      n = a(t, 'top'),
      i = a(t, 'left'),
      r = o ? -1 : 1;
    return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e
  }

  function f(e, t) {
    var o = 'x' === t ? 'Left' : 'Top',
      n = 'Left' == o ? 'Right' : 'Bottom';
    return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + n + 'Width'], 10)
  }

  function m(e, t, o, n) {
    return Q(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], ie(10) ? o['offset' + e] + n['margin' + ('Height' === e ? 'Top' : 'Left')] + n['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0)
  }

  function h() {
    var e = document.body,
      t = document.documentElement,
      o = ie(10) && getComputedStyle(t);
    return {
      height: m('Height', e, t, o),
      width: m('Width', e, t, o)
    }
  }

  function c(e) {
    return de({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    })
  }

  function g(e) {
    var o = {};
    try {
      if (ie(10)) {
        o = e.getBoundingClientRect();
        var n = a(e, 'top'),
          i = a(e, 'left');
        o.top += n, o.left += i, o.bottom += n, o.right += i
      } else o = e.getBoundingClientRect()
    } catch (t) {}
    var r = {
        left: o.left,
        top: o.top,
        width: o.right - o.left,
        height: o.bottom - o.top
      },
      p = 'HTML' === e.nodeName ? h() : {},
      s = p.width || e.clientWidth || r.right - r.left,
      d = p.height || e.clientHeight || r.bottom - r.top,
      l = e.offsetWidth - s,
      m = e.offsetHeight - d;
    if (l || m) {
      var g = t(e);
      l -= f(g, 'x'), m -= f(g, 'y'), r.width -= l, r.height -= m
    }
    return c(r)
  }

  function u(e, o) {
    var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      r = ie(10),
      p = 'HTML' === o.nodeName,
      s = g(e),
      d = g(o),
      a = n(e),
      f = t(o),
      m = parseFloat(f.borderTopWidth, 10),
      h = parseFloat(f.borderLeftWidth, 10);
    i && 'HTML' === o.nodeName && (d.top = Q(d.top, 0), d.left = Q(d.left, 0));
    var u = c({
      top: s.top - d.top - m,
      left: s.left - d.left - h,
      width: s.width,
      height: s.height
    });
    if (u.marginTop = 0, u.marginLeft = 0, !r && p) {
      var b = parseFloat(f.marginTop, 10),
        y = parseFloat(f.marginLeft, 10);
      u.top -= m - b, u.bottom -= m - b, u.left -= h - y, u.right -= h - y, u.marginTop = b, u.marginLeft = y
    }
    return (r && !i ? o.contains(a) : o === a && 'BODY' !== a.nodeName) && (u = l(u, o)), u
  }

  function b(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = e.ownerDocument.documentElement,
      n = u(e, o),
      i = Q(o.clientWidth, window.innerWidth || 0),
      r = Q(o.clientHeight, window.innerHeight || 0),
      p = t ? 0 : a(o),
      s = t ? 0 : a(o, 'left'),
      d = {
        top: p - n.top + n.marginTop,
        left: s - n.left + n.marginLeft,
        width: i,
        height: r
      };
    return c(d)
  }

  function y(e) {
    var n = e.nodeName;
    return 'BODY' === n || 'HTML' === n ? !1 : 'fixed' === t(e, 'position') || y(o(e))
  }

  function w(e) {
    if (!e || !e.parentElement || ie()) return document.documentElement;
    for (var o = e.parentElement; o && 'none' === t(o, 'transform');) o = o.parentElement;
    return o || document.documentElement
  }

  function E(e, t, i, r) {
    var p = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
      s = {
        top: 0,
        left: 0
      },
      a = p ? w(e) : d(e, t);
    if ('viewport' === r) s = b(a, p);
    else {
      var l;
      'scrollParent' === r ? (l = n(o(t)), 'BODY' === l.nodeName && (l = e.ownerDocument.documentElement)) : 'window' === r ? l = e.ownerDocument.documentElement : l = r;
      var f = u(l, a, p);
      if ('HTML' === l.nodeName && !y(a)) {
        var m = h(),
          c = m.height,
          g = m.width;
        s.top += f.top - f.marginTop, s.bottom = c + f.top, s.left += f.left - f.marginLeft, s.right = g + f.left
      } else s = f
    }
    return s.left += i, s.top += i, s.right -= i, s.bottom -= i, s
  }

  function v(e) {
    var t = e.width,
      o = e.height;
    return t * o
  }

  function x(e, t, o, n, i) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf('auto')) return e;
    var p = E(o, n, r, i),
      s = {
        top: {
          width: p.width,
          height: t.top - p.top
        },
        right: {
          width: p.right - t.right,
          height: p.height
        },
        bottom: {
          width: p.width,
          height: p.bottom - t.bottom
        },
        left: {
          width: t.left - p.left,
          height: p.height
        }
      },
      d = Object.keys(s).map(function (e) {
        return de({
          key: e
        }, s[e], {
          area: v(s[e])
        })
      }).sort(function (e, t) {
        return t.area - e.area
      }),
      a = d.filter(function (e) {
        var t = e.width,
          n = e.height;
        return t >= o.clientWidth && n >= o.clientHeight
      }),
      l = 0 < a.length ? a[0].key : d[0].key,
      f = e.split('-')[1];
    return l + (f ? '-' + f : '')
  }

  function O(e, t, o) {
    var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
      i = n ? w(t) : d(t, o);
    return u(o, i, n)
  }

  function L(e) {
    var t = getComputedStyle(e),
      o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
      n = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
      i = {
        width: e.offsetWidth + n,
        height: e.offsetHeight + o
      };
    return i
  }

  function S(e) {
    var t = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e]
    })
  }

  function T(e, t, o) {
    o = o.split('-')[0];
    var n = L(e),
      i = {
        width: n.width,
        height: n.height
      },
      r = -1 !== ['right', 'left'].indexOf(o),
      p = r ? 'top' : 'left',
      s = r ? 'left' : 'top',
      d = r ? 'height' : 'width',
      a = r ? 'width' : 'height';
    return i[p] = t[p] + t[d] / 2 - n[d] / 2, i[s] = o === s ? t[s] - n[a] : t[S(s)], i
  }

  function D(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0]
  }

  function C(e, t, o) {
    if (Array.prototype.findIndex) return e.findIndex(function (e) {
      return e[t] === o
    });
    var n = D(e, function (e) {
      return e[t] === o
    });
    return e.indexOf(n)
  }

  function N(t, o, n) {
    var i = void 0 === n ? t : t.slice(0, C(t, 'name', n));
    return i.forEach(function (t) {
      t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      var n = t['function'] || t.fn;
      t.enabled && e(n) && (o.offsets.popper = c(o.offsets.popper), o.offsets.reference = c(o.offsets.reference), o = n(o, t))
    }), o
  }

  function k() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = O(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = x(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = T(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = N(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
    }
  }

  function P(e, t) {
    return e.some(function (e) {
      var o = e.name,
        n = e.enabled;
      return n && o === t
    })
  }

  function W(e) {
    for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
      var i = t[n],
        r = i ? '' + i + o : e;
      if ('undefined' != typeof document.body.style[r]) return r
    }
    return null
  }

  function B() {
    return this.state.isDestroyed = !0, P(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[W('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
  }

  function H(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window
  }

  function A(e, t, o, i) {
    var r = 'BODY' === e.nodeName,
      p = r ? e.ownerDocument.defaultView : e;
    p.addEventListener(t, o, {
      passive: !0
    }), r || A(n(p.parentNode), t, o, i), i.push(p)
  }

  function I(e, t, o, i) {
    o.updateBound = i, H(e).addEventListener('resize', o.updateBound, {
      passive: !0
    });
    var r = n(e);
    return A(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
  }

  function M() {
    this.state.eventsEnabled || (this.state = I(this.reference, this.options, this.state, this.scheduleUpdate))
  }

  function F(e, t) {
    return H(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
      e.removeEventListener('scroll', t.updateBound)
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
  }

  function R() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = F(this.reference, this.state))
  }

  function U(e) {
    return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
  }

  function Y(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && U(t[o]) && (n = 'px'), e.style[o] = t[o] + n
    })
  }

  function j(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = t[o];
      !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o])
    })
  }

  function q(e, t, o) {
    var n = D(e, function (e) {
        var o = e.name;
        return o === t
      }),
      i = !!n && e.some(function (e) {
        return e.name === o && e.enabled && e.order < n.order
      });
    if (!i) {
      var r = '`' + t + '`';
      console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
    }
    return i
  }

  function K(e) {
    return 'end' === e ? 'start' : 'start' === e ? 'end' : e
  }

  function V(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = le.indexOf(e),
      n = le.slice(o + 1).concat(le.slice(0, o));
    return t ? n.reverse() : n
  }

  function z(e, t, o, n) {
    var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      r = +i[1],
      p = i[2];
    if (!r) return e;
    if (0 === p.indexOf('%')) {
      var s;
      switch (p) {
        case '%p':
          s = o;
          break;
        case '%':
        case '%r':
        default:
          s = n;
      }
      var d = c(s);
      return d[t] / 100 * r
    }
    if ('vh' === p || 'vw' === p) {
      var a;
      return a = 'vh' === p ? Q(document.documentElement.clientHeight, window.innerHeight || 0) : Q(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r
    }
    return r
  }

  function G(e, t, o, n) {
    var i = [0, 0],
      r = -1 !== ['right', 'left'].indexOf(n),
      p = e.split(/(\+|\-)/).map(function (e) {
        return e.trim()
      }),
      s = p.indexOf(D(p, function (e) {
        return -1 !== e.search(/,|\s/)
      }));
    p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    var d = /\s*,\s*|\s+/,
      a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
    return a = a.map(function (e, n) {
      var i = (1 === n ? !r : r) ? 'height' : 'width',
        p = !1;
      return e.reduce(function (e, t) {
        return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)
      }, []).map(function (e) {
        return z(e, i, t, o)
      })
    }), a.forEach(function (e, t) {
      e.forEach(function (o, n) {
        U(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1))
      })
    }), i
  }

  function _(e, t) {
    var o, n = t.offset,
      i = e.placement,
      r = e.offsets,
      p = r.popper,
      s = r.reference,
      d = i.split('-')[0];
    return o = U(+n) ? [+n, 0] : G(n, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e
  }
  for (var X = Math.min, J = Math.floor, Q = Math.max, Z = 'undefined' != typeof window && 'undefined' != typeof document, $ = ['Edge', 'Trident', 'Firefox'], ee = 0, te = 0; te < $.length; te += 1)
    if (Z && 0 <= navigator.userAgent.indexOf($[te])) {
      ee = 1;
      break
    } var i = Z && window.Promise,
    oe = i ? function (e) {
      var t = !1;
      return function () {
        t || (t = !0, window.Promise.resolve().then(function () {
          t = !1, e()
        }))
      }
    } : function (e) {
      var t = !1;
      return function () {
        t || (t = !0, setTimeout(function () {
          t = !1, e()
        }, ee))
      }
    },
    ne = {},
    ie = function () {
      var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 'all';
      return (e = e.toString(), ne.hasOwnProperty(e)) ? ne[e] : ('11' === e ? ne[e] = -1 !== navigator.userAgent.indexOf('Trident') : '10' === e ? ne[e] = -1 !== navigator.appVersion.indexOf('MSIE 10') : 'all' === e ? ne[e] = -1 !== navigator.userAgent.indexOf('Trident') || -1 !== navigator.userAgent.indexOf('MSIE') : void 0, ne.all = ne.all || Object.keys(ne).some(function (e) {
        return ne[e]
      }), ne[e])
    },
    re = function (e, t) {
      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
    },
    pe = function () {
      function e(e, t) {
        for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
      return function (t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t
      }
    }(),
    se = function (e, t, o) {
      return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = o, e
    },
    de = Object.assign || function (e) {
      for (var t, o = 1; o < arguments.length; o++)
        for (var n in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e
    },
    ae = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
    le = ae.slice(3),
    fe = {
      FLIP: 'flip',
      CLOCKWISE: 'clockwise',
      COUNTERCLOCKWISE: 'counterclockwise'
    },
    me = function () {
      function t(o, n) {
        var i = this,
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        re(this, t), this.scheduleUpdate = function () {
          return requestAnimationFrame(i.update)
        }, this.update = oe(this.update.bind(this)), this.options = de({}, t.Defaults, r), this.state = {
          isDestroyed: !1,
          isCreated: !1,
          scrollParents: []
        }, this.reference = o && o.jquery ? o[0] : o, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(de({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
          i.options.modifiers[e] = de({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
        }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
          return de({
            name: e
          }, i.options.modifiers[e])
        }).sort(function (e, t) {
          return e.order - t.order
        }), this.modifiers.forEach(function (t) {
          t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
        }), this.update();
        var p = this.options.eventsEnabled;
        p && this.enableEventListeners(), this.state.eventsEnabled = p
      }
      return pe(t, [{
        key: 'update',
        value: function () {
          return k.call(this)
        }
      }, {
        key: 'destroy',
        value: function () {
          return B.call(this)
        }
      }, {
        key: 'enableEventListeners',
        value: function () {
          return M.call(this)
        }
      }, {
        key: 'disableEventListeners',
        value: function () {
          return R.call(this)
        }
      }]), t
    }();
  return me.Utils = ('undefined' == typeof window ? global : window).PopperUtils, me.placements = ae, me.Defaults = {
    placement: 'bottom',
    positionFixed: !1,
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function () {},
    onUpdate: function () {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function (e) {
          var t = e.placement,
            o = t.split('-')[0],
            n = t.split('-')[1];
          if (n) {
            var i = e.offsets,
              r = i.reference,
              p = i.popper,
              s = -1 !== ['bottom', 'top'].indexOf(o),
              d = s ? 'left' : 'top',
              a = s ? 'width' : 'height',
              l = {
                start: se({}, d, r[d]),
                end: se({}, d, r[d] + r[a] - p[a])
              };
            e.offsets.popper = de({}, p, l[n])
          }
          return e
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: _,
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function (e, t) {
          var o = t.boundariesElement || r(e.instance.popper);
          e.instance.reference === o && (o = r(o));
          var n = E(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
          t.boundaries = n;
          var i = t.priority,
            p = e.offsets.popper,
            s = {
              primary: function (e) {
                var o = p[e];
                return p[e] < n[e] && !t.escapeWithReference && (o = Q(p[e], n[e])), se({}, e, o)
              },
              secondary: function (e) {
                var o = 'right' === e ? 'left' : 'top',
                  i = p[o];
                return p[e] > n[e] && !t.escapeWithReference && (i = X(p[o], n[e] - ('right' === e ? p.width : p.height))), se({}, o, i)
              }
            };
          return i.forEach(function (e) {
            var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
            p = de({}, p, s[t](e))
          }), e.offsets.popper = p, e
        },
        priority: ['left', 'right', 'top', 'bottom'],
        padding: 5,
        boundariesElement: 'scrollParent'
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function (e) {
          var t = e.offsets,
            o = t.popper,
            n = t.reference,
            i = e.placement.split('-')[0],
            r = J,
            p = -1 !== ['top', 'bottom'].indexOf(i),
            s = p ? 'right' : 'bottom',
            d = p ? 'left' : 'top',
            a = p ? 'width' : 'height';
          return o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]), o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])), e
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function (e, o) {
          var n;
          if (!q(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
          var i = o.element;
          if ('string' == typeof i) {
            if (i = e.instance.popper.querySelector(i), !i) return e;
          } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
          var r = e.placement.split('-')[0],
            p = e.offsets,
            s = p.popper,
            d = p.reference,
            a = -1 !== ['left', 'right'].indexOf(r),
            l = a ? 'height' : 'width',
            f = a ? 'Top' : 'Left',
            m = f.toLowerCase(),
            h = a ? 'left' : 'top',
            g = a ? 'bottom' : 'right',
            u = L(i)[l];
          d[g] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[g] - u)), d[m] + u > s[g] && (e.offsets.popper[m] += d[m] + u - s[g]), e.offsets.popper = c(e.offsets.popper);
          var b = d[m] + d[l] / 2 - u / 2,
            y = t(e.instance.popper),
            w = parseFloat(y['margin' + f], 10),
            E = parseFloat(y['border' + f + 'Width'], 10),
            v = b - e.offsets.popper[m] - w - E;
          return v = Q(X(s[l] - u, v), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, se(n, m, Math.round(v)), se(n, h, ''), n), e
        },
        element: '[x-arrow]'
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function (e, t) {
          if (P(e.instance.modifiers, 'inner')) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          var o = E(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
            n = e.placement.split('-')[0],
            i = S(n),
            r = e.placement.split('-')[1] || '',
            p = [];
          switch (t.behavior) {
            case fe.FLIP:
              p = [n, i];
              break;
            case fe.CLOCKWISE:
              p = V(n);
              break;
            case fe.COUNTERCLOCKWISE:
              p = V(n, !0);
              break;
            default:
              p = t.behavior;
          }
          return p.forEach(function (s, d) {
            if (n !== s || p.length === d + 1) return e;
            n = e.placement.split('-')[0], i = S(n);
            var a = e.offsets.popper,
              l = e.offsets.reference,
              f = J,
              m = 'left' === n && f(a.right) > f(l.left) || 'right' === n && f(a.left) < f(l.right) || 'top' === n && f(a.bottom) > f(l.top) || 'bottom' === n && f(a.top) < f(l.bottom),
              h = f(a.left) < f(o.left),
              c = f(a.right) > f(o.right),
              g = f(a.top) < f(o.top),
              u = f(a.bottom) > f(o.bottom),
              b = 'left' === n && h || 'right' === n && c || 'top' === n && g || 'bottom' === n && u,
              y = -1 !== ['top', 'bottom'].indexOf(n),
              w = !!t.flipVariations && (y && 'start' === r && h || y && 'end' === r && c || !y && 'start' === r && g || !y && 'end' === r && u);
            (m || b || w) && (e.flipped = !0, (m || b) && (n = p[d + 1]), w && (r = K(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = de({}, e.offsets.popper, T(e.instance.popper, e.offsets.reference, e.placement)), e = N(e.instance.modifiers, e, 'flip'))
          }), e
        },
        behavior: 'flip',
        padding: 5,
        boundariesElement: 'viewport'
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function (e) {
          var t = e.placement,
            o = t.split('-')[0],
            n = e.offsets,
            i = n.popper,
            r = n.reference,
            p = -1 !== ['left', 'right'].indexOf(o),
            s = -1 === ['top', 'left'].indexOf(o);
          return i[p ? 'left' : 'top'] = r[o] - (s ? i[p ? 'width' : 'height'] : 0), e.placement = S(t), e.offsets.popper = c(i), e
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function (e) {
          if (!q(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
          var t = e.offsets.reference,
            o = D(e.instance.modifiers, function (e) {
              return 'preventOverflow' === e.name
            }).boundaries;
          if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
            if (!0 === e.hide) return e;
            e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
          } else {
            if (!1 === e.hide) return e;
            e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
          }
          return e
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function (e, t) {
          var o = t.x,
            n = t.y,
            i = e.offsets.popper,
            p = D(e.instance.modifiers, function (e) {
              return 'applyStyle' === e.name
            }).gpuAcceleration;
          void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
          var s, d, a = void 0 === p ? t.gpuAcceleration : p,
            l = r(e.instance.popper),
            f = g(l),
            m = {
              position: i.position
            },
            h = {
              left: J(i.left),
              top: J(i.top),
              bottom: J(i.bottom),
              right: J(i.right)
            },
            c = 'bottom' === o ? 'top' : 'bottom',
            u = 'right' === n ? 'left' : 'right',
            b = W('transform');
          if (d = 'bottom' == c ? -f.height + h.bottom : h.top, s = 'right' == u ? -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[u] = 0, m.willChange = 'transform';
          else {
            var y = 'bottom' == c ? -1 : 1,
              w = 'right' == u ? -1 : 1;
            m[c] = d * y, m[u] = s * w, m.willChange = c + ', ' + u
          }
          var E = {
            "x-placement": e.placement
          };
          return e.attributes = de({}, E, e.attributes), e.styles = de({}, m, e.styles), e.arrowStyles = de({}, e.offsets.arrow, e.arrowStyles), e
        },
        gpuAcceleration: !0,
        x: 'bottom',
        y: 'right'
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function (e) {
          return Y(e.instance.popper, e.styles), j(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && Y(e.arrowElement, e.arrowStyles), e
        },
        onLoad: function (e, t, o, n, i) {
          var r = O(i, t, e, o.positionFixed),
            p = x(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
          return t.setAttribute('x-placement', p), Y(t, {
            position: o.positionFixed ? 'fixed' : 'absolute'
          }), o
        },
        gpuAcceleration: void 0
      }
    }
  }, me
});
//# sourceMappingURL=popper.min.js.map
