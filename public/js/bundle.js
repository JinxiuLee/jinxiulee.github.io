(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-77773115-1', 'auto');
ga('send', 'pageview');

},{}],2:[function(require,module,exports){
"use strict";

},{}],3:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Layzr.js 1.4.2 - A small, fast, modern, and dependency-free library for lazy loading.
 * Copyright (c) 2015 Michael Cavalea - http://callmecavs.github.io/layzr.js/
 * License: MIT
 */
!function (t, i) {
  "function" == typeof define && define.amd ? define([], i) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = i() : t.Layzr = i();
}(undefined, function () {
  "use strict";
  function t(t) {
    this._lastScroll = 0, this._ticking = !1, t = t || {}, this._optionsContainer = document.querySelector(t.container) || window, this._optionsSelector = t.selector || "[data-layzr]", this._optionsAttr = t.attr || "data-layzr", this._optionsAttrRetina = t.retinaAttr || "data-layzr-retina", this._optionsAttrBg = t.bgAttr || "data-layzr-bg", this._optionsAttrHidden = t.hiddenAttr || "data-layzr-hidden", this._optionsThreshold = t.threshold || 0, this._optionsCallback = t.callback || null, this._retina = window.devicePixelRatio > 1, this._srcAttr = this._retina ? this._optionsAttrRetina : this._optionsAttr, this._nodes = document.querySelectorAll(this._optionsSelector), this._handlerBind = this._requestScroll.bind(this), this._create();
  }return t.prototype._requestScroll = function () {
    this._lastScroll = this._optionsContainer === window ? window.pageYOffset : this._optionsContainer.scrollTop + this._getOffset(this._optionsContainer), this._requestTick();
  }, t.prototype._requestTick = function () {
    this._ticking || (requestAnimationFrame(this.update.bind(this)), this._ticking = !0);
  }, t.prototype._getOffset = function (t) {
    return t.getBoundingClientRect().top + window.pageYOffset;
  }, t.prototype._getContainerHeight = function () {
    return this._optionsContainer.innerHeight || this._optionsContainer.offsetHeight;
  }, t.prototype._create = function () {
    this._handlerBind(), this._optionsContainer.addEventListener("scroll", this._handlerBind, !1), this._optionsContainer.addEventListener("resize", this._handlerBind, !1);
  }, t.prototype._destroy = function () {
    this._optionsContainer.removeEventListener("scroll", this._handlerBind, !1), this._optionsContainer.removeEventListener("resize", this._handlerBind, !1);
  }, t.prototype._inViewport = function (t) {
    var i = this._lastScroll,
        e = i + this._getContainerHeight(),
        o = this._getOffset(t),
        n = o + this._getContainerHeight(),
        s = this._optionsThreshold / 100 * window.innerHeight;return n >= i - s && e + s >= o && !t.hasAttribute(this._optionsAttrHidden);
  }, t.prototype._reveal = function (t) {
    var i = t.getAttribute(this._srcAttr) || t.getAttribute(this._optionsAttr);t.hasAttribute(this._optionsAttrBg) ? t.style.backgroundImage = "url(" + i + ")" : t.setAttribute("src", i), "function" == typeof this._optionsCallback && this._optionsCallback.call(t), t.removeAttribute(this._optionsAttr), t.removeAttribute(this._optionsAttrRetina), t.removeAttribute(this._optionsAttrBg), t.removeAttribute(this._optionsAttrHidden);
  }, t.prototype.updateSelector = function () {
    this._nodes = document.querySelectorAll(this._optionsSelector);
  }, t.prototype.update = function () {
    for (var t = this._nodes.length, i = 0; t > i; i++) {
      var e = this._nodes[i];e.hasAttribute(this._optionsAttr) && this._inViewport(e) && this._reveal(e);
    }this._ticking = !1;
  }, t;
});

},{}],4:[function(require,module,exports){
'use strict';

var _layzr = require('./layzr.min');

var _layzr2 = _interopRequireDefault(_layzr);

var _ga = require('./ga');

var _ga2 = _interopRequireDefault(_ga);

var _initProjectList = require('./init-project-list');

var _initProjectList2 = _interopRequireDefault(_initProjectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Lazyload
var layzr = new _layzr2.default({
  threshold: 600
});

// Dynamic Year
document.querySelector('.year').innerText = new Date().getFullYear();

},{"./ga":1,"./init-project-list":2,"./layzr.min":3}]},{},[4])

//# sourceMappingURL=bundle.js.map
