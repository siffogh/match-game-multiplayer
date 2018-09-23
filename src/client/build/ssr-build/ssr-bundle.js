module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+1g+":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var url = __webpack_require__("ECAZ");
var parser = __webpack_require__("EDhw");
var Manager = __webpack_require__("Di21");
var debug = __webpack_require__("xlf4")('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup(uri, opts) {
  if (typeof uri === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = __webpack_require__("Di21");
exports.Socket = __webpack_require__("wT76");

/***/ }),

/***/ "+Zip":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var safeBuffer = __webpack_require__("38Wu");

var Buffer = safeBuffer.Buffer;

/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
var concat = function concat(list, totalLength) {
  var target = Buffer.allocUnsafe(totalLength);
  var offset = 0;

  for (var i = 0; i < list.length; i++) {
    var buf = list[i];
    buf.copy(target, offset);
    offset += buf.length;
  }

  return target;
};

try {
  var bufferUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"bufferutil\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  module.exports = _extends({ concat: concat }, bufferUtil.BufferUtil || bufferUtil);
} catch (e) /* istanbul ignore next */{
  /**
   * Masks a buffer using the given mask.
   *
   * @param {Buffer} source The buffer to mask
   * @param {Buffer} mask The mask to use
   * @param {Buffer} output The buffer where to store the result
   * @param {Number} offset The offset at which to start writing
   * @param {Number} length The number of bytes to mask.
   * @public
   */
  var mask = function mask(source, _mask, output, offset, length) {
    for (var i = 0; i < length; i++) {
      output[offset + i] = source[i] ^ _mask[i & 3];
    }
  };

  /**
   * Unmasks a buffer using the given mask.
   *
   * @param {Buffer} buffer The buffer to unmask
   * @param {Buffer} mask The mask to use
   * @public
   */
  var unmask = function unmask(buffer, mask) {
    // Required until https://github.com/nodejs/node/issues/9006 is resolved.
    var length = buffer.length;
    for (var i = 0; i < length; i++) {
      buffer[i] ^= mask[i & 3];
    }
  };

  module.exports = { concat: concat, mask: mask, unmask: unmask };
}

/***/ }),

/***/ "+eY/":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"button":"button__jQNF7"};

/***/ }),

/***/ "/E6E":
/***/ (function(module, exports, __webpack_require__) {

/* global Blob File */

/*
 * Module requirements.
 */

var isArray = __webpack_require__("OPnv");

var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' || typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]';
var withNativeFile = typeof File === 'function' || typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if (typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj) || typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}

/***/ }),

/***/ "1TXn":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"loader":"loader__e0qHJ"};

/***/ }),

/***/ "2S04":
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__("6IAg");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy() {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),

/***/ "38Wu":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__("fy20");
var Buffer = buffer.Buffer;

// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer(arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length);
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number');
  }
  return Buffer(arg, encodingOrOffset, length);
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }
  var buf = Buffer(size);
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }
  return buf;
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }
  return Buffer(size);
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }
  return buffer.SlowBuffer(size);
};

/***/ }),

/***/ "3TAv":
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "6IAg":
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

/***/ }),

/***/ "6weq":
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
 *
 * This can be used with JS designed for browsers to improve reuse of code and
 * allow the use of existing libraries.
 *
 * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
 *
 * @author Dan DeFelippi <dan@driverdan.com>
 * @contributor David Ellis <d.f.ellis@ieee.org>
 * @license MIT
 */

var fs = __webpack_require__("vHs2");
var Url = __webpack_require__("Vy1O");
var spawn = __webpack_require__("a90S").spawn;

/**
 * Module exports.
 */

module.exports = XMLHttpRequest;

// backwards-compat
XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;

/**
 * `XMLHttpRequest` constructor.
 *
 * Supported options for the `opts` object are:
 *
 *  - `agent`: An http.Agent instance; http.globalAgent may be used; if 'undefined', agent usage is disabled
 *
 * @param {Object} opts optional "options" object
 */

function XMLHttpRequest(opts) {
  "use strict";

  opts = opts || {};

  /**
   * Private variables
   */
  var self = this;
  var http = __webpack_require__("gHkb");
  var https = __webpack_require__("XgVs");

  // Holds http.js objects
  var request;
  var response;

  // Request settings
  var settings = {};

  // Disable header blacklist.
  // Not part of XHR specs.
  var disableHeaderCheck = false;

  // Set some default headers
  var defaultHeaders = {
    "User-Agent": "node-XMLHttpRequest",
    "Accept": "*/*"
  };

  var headers = _extends({}, defaultHeaders);

  // These headers are not user setable.
  // The following are allowed but banned in the spec:
  // * user-agent
  var forbiddenRequestHeaders = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "content-transfer-encoding", "cookie", "cookie2", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"];

  // These request methods are not allowed
  var forbiddenRequestMethods = ["TRACE", "TRACK", "CONNECT"];

  // Send flag
  var sendFlag = false;
  // Error flag, used when errors occur or abort is called
  var errorFlag = false;

  // Event listeners
  var listeners = {};

  /**
   * Constants
   */

  this.UNSENT = 0;
  this.OPENED = 1;
  this.HEADERS_RECEIVED = 2;
  this.LOADING = 3;
  this.DONE = 4;

  /**
   * Public vars
   */

  // Current state
  this.readyState = this.UNSENT;

  // default ready state change handler in case one is not set or is set late
  this.onreadystatechange = null;

  // Result & response
  this.responseText = "";
  this.responseXML = "";
  this.status = null;
  this.statusText = null;

  /**
   * Private methods
   */

  /**
   * Check if the specified header is allowed.
   *
   * @param string header Header to validate
   * @return boolean False if not allowed, otherwise true
   */
  var isAllowedHttpHeader = function isAllowedHttpHeader(header) {
    return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1;
  };

  /**
   * Check if the specified method is allowed.
   *
   * @param string method Request method to validate
   * @return boolean False if not allowed, otherwise true
   */
  var isAllowedHttpMethod = function isAllowedHttpMethod(method) {
    return method && forbiddenRequestMethods.indexOf(method) === -1;
  };

  /**
   * Public methods
   */

  /**
   * Open the connection. Currently supports local server requests.
   *
   * @param string method Connection method (eg GET, POST)
   * @param string url URL for the connection.
   * @param boolean async Asynchronous connection. Default is true.
   * @param string user Username for basic authentication (optional)
   * @param string password Password for basic authentication (optional)
   */
  this.open = function (method, url, async, user, password) {
    this.abort();
    errorFlag = false;

    // Check for valid request method
    if (!isAllowedHttpMethod(method)) {
      throw "SecurityError: Request method not allowed";
    }

    settings = {
      "method": method,
      "url": url.toString(),
      "async": typeof async !== "boolean" ? true : async,
      "user": user || null,
      "password": password || null
    };

    setState(this.OPENED);
  };

  /**
   * Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
   * This does not conform to the W3C spec.
   *
   * @param boolean state Enable or disable header checking.
   */
  this.setDisableHeaderCheck = function (state) {
    disableHeaderCheck = state;
  };

  /**
   * Sets a header for the request.
   *
   * @param string header Header name
   * @param string value Header value
   * @return boolean Header added
   */
  this.setRequestHeader = function (header, value) {
    if (this.readyState != this.OPENED) {
      throw "INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN";
      return false;
    }
    if (!isAllowedHttpHeader(header)) {
      console.warn('Refused to set unsafe header "' + header + '"');
      return false;
    }
    if (sendFlag) {
      throw "INVALID_STATE_ERR: send flag is true";
      return false;
    }
    headers[header] = value;
    return true;
  };

  /**
   * Gets a header from the server response.
   *
   * @param string header Name of header to get.
   * @return string Text of the header or null if it doesn't exist.
   */
  this.getResponseHeader = function (header) {
    if (typeof header === "string" && this.readyState > this.OPENED && response.headers[header.toLowerCase()] && !errorFlag) {
      return response.headers[header.toLowerCase()];
    }

    return null;
  };

  /**
   * Gets all the response headers.
   *
   * @return string A string with all response headers separated by CR+LF
   */
  this.getAllResponseHeaders = function () {
    if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
      return "";
    }
    var result = "";

    for (var i in response.headers) {
      // Cookie headers are excluded
      if (i !== "set-cookie" && i !== "set-cookie2") {
        result += i + ": " + response.headers[i] + "\r\n";
      }
    }
    return result.substr(0, result.length - 2);
  };

  /**
   * Gets a request header
   *
   * @param string name Name of header to get
   * @return string Returns the request header or empty string if not set
   */
  this.getRequestHeader = function (name) {
    // @TODO Make this case insensitive
    if (typeof name === "string" && headers[name]) {
      return headers[name];
    }

    return "";
  };

  /**
   * Sends the request to the server.
   *
   * @param string data Optional data to send as request body.
   */
  this.send = function (data) {
    if (this.readyState != this.OPENED) {
      throw "INVALID_STATE_ERR: connection must be opened before send() is called";
    }

    if (sendFlag) {
      throw "INVALID_STATE_ERR: send has already been called";
    }

    var ssl = false,
        local = false;
    var url = Url.parse(settings.url);
    var host;
    // Determine the server
    switch (url.protocol) {
      case 'https:':
        ssl = true;
      // SSL & non-SSL both need host, no break here.
      case 'http:':
        host = url.hostname;
        break;

      case 'file:':
        local = true;
        break;

      case undefined:
      case '':
        host = "localhost";
        break;

      default:
        throw "Protocol not supported.";
    }

    // Load files off the local filesystem (file://)
    if (local) {
      if (settings.method !== "GET") {
        throw "XMLHttpRequest: Only GET method is supported";
      }

      if (settings.async) {
        fs.readFile(url.pathname, 'utf8', function (error, data) {
          if (error) {
            self.handleError(error);
          } else {
            self.status = 200;
            self.responseText = data;
            setState(self.DONE);
          }
        });
      } else {
        try {
          this.responseText = fs.readFileSync(url.pathname, 'utf8');
          this.status = 200;
          setState(self.DONE);
        } catch (e) {
          this.handleError(e);
        }
      }

      return;
    }

    // Default to port 80. If accessing localhost on another port be sure
    // to use http://localhost:port/path
    var port = url.port || (ssl ? 443 : 80);
    // Add query string if one is used
    var uri = url.pathname + (url.search ? url.search : '');

    // Set the Host header or the server may reject the request
    headers["Host"] = host;
    if (!(ssl && port === 443 || port === 80)) {
      headers["Host"] += ':' + url.port;
    }

    // Set Basic Auth if necessary
    if (settings.user) {
      if (typeof settings.password == "undefined") {
        settings.password = "";
      }
      var authBuf = new Buffer(settings.user + ":" + settings.password);
      headers["Authorization"] = "Basic " + authBuf.toString("base64");
    }

    // Set content length header
    if (settings.method === "GET" || settings.method === "HEAD") {
      data = null;
    } else if (data) {
      headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);

      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "text/plain;charset=UTF-8";
      }
    } else if (settings.method === "POST") {
      // For a post with no data set Content-Length: 0.
      // This is required by buggy servers that don't meet the specs.
      headers["Content-Length"] = 0;
    }

    var agent = opts.agent || false;
    var options = {
      host: host,
      port: port,
      path: uri,
      method: settings.method,
      headers: headers,
      agent: agent
    };

    if (ssl) {
      options.pfx = opts.pfx;
      options.key = opts.key;
      options.passphrase = opts.passphrase;
      options.cert = opts.cert;
      options.ca = opts.ca;
      options.ciphers = opts.ciphers;
      options.rejectUnauthorized = opts.rejectUnauthorized;
    }

    // Reset error flag
    errorFlag = false;

    // Handle async requests
    if (settings.async) {
      // Use the proper protocol
      var doRequest = ssl ? https.request : http.request;

      // Request is being sent, set send flag
      sendFlag = true;

      // As per spec, this is called here for historical reasons.
      self.dispatchEvent("readystatechange");

      // Handler for the response
      var responseHandler = function responseHandler(resp) {
        // Set response var to the response we got back
        // This is so it remains accessable outside this scope
        response = resp;
        // Check for redirect
        // @TODO Prevent looped redirects
        if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
          // Change URL to the redirect location
          settings.url = response.headers.location;
          var url = Url.parse(settings.url);
          // Set host var in case it's used later
          host = url.hostname;
          // Options for the new request
          var newOptions = {
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            method: response.statusCode === 303 ? 'GET' : settings.method,
            headers: headers
          };

          if (ssl) {
            newOptions.pfx = opts.pfx;
            newOptions.key = opts.key;
            newOptions.passphrase = opts.passphrase;
            newOptions.cert = opts.cert;
            newOptions.ca = opts.ca;
            newOptions.ciphers = opts.ciphers;
            newOptions.rejectUnauthorized = opts.rejectUnauthorized;
          }

          // Issue the new request
          request = doRequest(newOptions, responseHandler).on('error', errorHandler);
          request.end();
          // @TODO Check if an XHR event needs to be fired here
          return;
        }

        if (response && response.setEncoding) {
          response.setEncoding("utf8");
        }

        setState(self.HEADERS_RECEIVED);
        self.status = response.statusCode;

        response.on('data', function (chunk) {
          // Make sure there's some data
          if (chunk) {
            self.responseText += chunk;
          }
          // Don't emit state changes if the connection has been aborted.
          if (sendFlag) {
            setState(self.LOADING);
          }
        });

        response.on('end', function () {
          if (sendFlag) {
            // The sendFlag needs to be set before setState is called.  Otherwise if we are chaining callbacks
            // there can be a timing issue (the callback is called and a new call is made before the flag is reset).
            sendFlag = false;
            // Discard the 'end' event if the connection has been aborted
            setState(self.DONE);
          }
        });

        response.on('error', function (error) {
          self.handleError(error);
        });
      };

      // Error handler for the request
      var errorHandler = function errorHandler(error) {
        self.handleError(error);
      };

      // Create the request
      request = doRequest(options, responseHandler).on('error', errorHandler);

      // Node 0.4 and later won't accept empty data. Make sure it's needed.
      if (data) {
        request.write(data);
      }

      request.end();

      self.dispatchEvent("loadstart");
    } else {
      // Synchronous
      // Create a temporary file for communication with the other Node process
      var contentFile = ".node-xmlhttprequest-content-" + process.pid;
      var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
      fs.writeFileSync(syncFile, "", "utf8");
      // The async request the other Node process executes
      var execString = "var http = require('http'), https = require('https'), fs = require('fs');" + "var doRequest = http" + (ssl ? "s" : "") + ".request;" + "var options = " + JSON.stringify(options) + ";" + "var responseText = '';" + "var req = doRequest(options, function(response) {" + "response.setEncoding('utf8');" + "response.on('data', function(chunk) {" + "  responseText += chunk;" + "});" + "response.on('end', function() {" + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-STATUS:' + response.statusCode + ',' + responseText, 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + "response.on('error', function(error) {" + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + "}).on('error', function(error) {" + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + (data ? "req.write('" + data.replace(/'/g, "\\'") + "');" : "") + "req.end();";
      // Start the other Node Process, executing this string
      var syncProc = spawn(process.argv[0], ["-e", execString]);
      var statusText;
      while (fs.existsSync(syncFile)) {
        // Wait while the sync file is empty
      }
      self.responseText = fs.readFileSync(contentFile, 'utf8');
      // Kill the child process once the file has data
      syncProc.stdin.end();
      // Remove the temporary file
      fs.unlinkSync(contentFile);
      if (self.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)) {
        // If the file returned an error, handle it
        var errorObj = self.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/, "");
        self.handleError(errorObj);
      } else {
        // If the file returned okay, parse its data and move to the DONE state
        self.status = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/, "$1");
        self.responseText = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/, "$1");
        setState(self.DONE);
      }
    }
  };

  /**
   * Called when an error is encountered to deal with it.
   */
  this.handleError = function (error) {
    this.status = 503;
    this.statusText = error;
    this.responseText = error.stack;
    errorFlag = true;
    setState(this.DONE);
  };

  /**
   * Aborts a request.
   */
  this.abort = function () {
    if (request) {
      request.abort();
      request = null;
    }

    headers = _extends({}, defaultHeaders);
    this.responseText = "";
    this.responseXML = "";

    errorFlag = true;

    if (this.readyState !== this.UNSENT && (this.readyState !== this.OPENED || sendFlag) && this.readyState !== this.DONE) {
      sendFlag = false;
      setState(this.DONE);
    }
    this.readyState = this.UNSENT;
  };

  /**
   * Adds an event listener. Preferred method of binding to events.
   */
  this.addEventListener = function (event, callback) {
    if (!(event in listeners)) {
      listeners[event] = [];
    }
    // Currently allows duplicate callbacks. Should it?
    listeners[event].push(callback);
  };

  /**
   * Remove an event callback that has already been bound.
   * Only works on the matching funciton, cannot be a copy.
   */
  this.removeEventListener = function (event, callback) {
    if (event in listeners) {
      // Filter will return a new array with the callback removed
      listeners[event] = listeners[event].filter(function (ev) {
        return ev !== callback;
      });
    }
  };

  /**
   * Dispatch any events, including both "on" methods and events attached using addEventListener.
   */
  this.dispatchEvent = function (event) {
    if (typeof self["on" + event] === "function") {
      self["on" + event]();
    }
    if (event in listeners) {
      for (var i = 0, len = listeners[event].length; i < len; i++) {
        listeners[event][i].call(self);
      }
    }
  };

  /**
   * Changes readyState and calls onreadystatechange.
   *
   * @param int state New state
   */
  var setState = function setState(state) {
    if (self.readyState !== state) {
      self.readyState = state;

      if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
        self.dispatchEvent("readystatechange");
      }

      if (self.readyState === self.DONE && !errorFlag) {
        self.dispatchEvent("load");
        // @TODO figure out InspectorInstrumentation::didLoadXHR(cookie)
        self.dispatchEvent("loadend");
      }
    }
  };
};

/***/ }),

/***/ "7kg7":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__("Axko");
var util = __webpack_require__("Bcfi");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("2S04");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  var supportsColor = __webpack_require__("DYmO");
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (err) {}
// swallow - we only care if `supports-color` is available; it doesn't have to be.


/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return (/^debug_/i.test(key)
  );
}).reduce(function (obj, key) {
  // camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;else if (/^(no|off|false|disabled)$/i.test(val)) val = false;else if (val === 'null') val = null;else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).split('\n').map(function (str) {
    return str.trim();
  }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\x1B[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\x1B[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\x1B[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());

/***/ }),

/***/ "9PFW":
/***/ (function(module, exports) {

module.exports = toArray;

function toArray(list, index) {
    var array = [];

    index = index || 0;

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i];
    }

    return array;
}

/***/ }),

/***/ "A7Pu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Class representing an event.
 *
 * @private
 */

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event =
/**
 * Create a new `Event`.
 *
 * @param {String} type The name of the event
 * @param {Object} target A reference to the target to which the event was dispatched
 */
function Event(type, target) {
  _classCallCheck(this, Event);

  this.target = target;
  this.type = type;
};

/**
 * Class representing a message event.
 *
 * @extends Event
 * @private
 */


var MessageEvent = function (_Event) {
  _inherits(MessageEvent, _Event);

  /**
   * Create a new `MessageEvent`.
   *
   * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  function MessageEvent(data, target) {
    _classCallCheck(this, MessageEvent);

    var _this = _possibleConstructorReturn(this, _Event.call(this, 'message', target));

    _this.data = data;
    return _this;
  }

  return MessageEvent;
}(Event);

/**
 * Class representing a close event.
 *
 * @extends Event
 * @private
 */


var CloseEvent = function (_Event2) {
  _inherits(CloseEvent, _Event2);

  /**
   * Create a new `CloseEvent`.
   *
   * @param {Number} code The status code explaining why the connection is being closed
   * @param {String} reason A human-readable string explaining why the connection is closing
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  function CloseEvent(code, reason, target) {
    _classCallCheck(this, CloseEvent);

    var _this2 = _possibleConstructorReturn(this, _Event2.call(this, 'close', target));

    _this2.wasClean = target._closeFrameReceived && target._closeFrameSent;
    _this2.reason = reason;
    _this2.code = code;
    return _this2;
  }

  return CloseEvent;
}(Event);

/**
 * Class representing an open event.
 *
 * @extends Event
 * @private
 */


var OpenEvent = function (_Event3) {
  _inherits(OpenEvent, _Event3);

  /**
   * Create a new `OpenEvent`.
   *
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  function OpenEvent(target) {
    _classCallCheck(this, OpenEvent);

    return _possibleConstructorReturn(this, _Event3.call(this, 'open', target));
  }

  return OpenEvent;
}(Event);

/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */


var EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} method A string representing the event type to listen for
   * @param {Function} listener The listener to add
   * @public
   */
  addEventListener: function addEventListener(method, listener) {
    if (typeof listener !== 'function') return;

    function onMessage(data) {
      listener.call(this, new MessageEvent(data, this));
    }

    function onClose(code, message) {
      listener.call(this, new CloseEvent(code, message, this));
    }

    function onError(event) {
      event.type = 'error';
      event.target = this;
      listener.call(this, event);
    }

    function onOpen() {
      listener.call(this, new OpenEvent(this));
    }

    if (method === 'message') {
      onMessage._listener = listener;
      this.on(method, onMessage);
    } else if (method === 'close') {
      onClose._listener = listener;
      this.on(method, onClose);
    } else if (method === 'error') {
      onError._listener = listener;
      this.on(method, onError);
    } else if (method === 'open') {
      onOpen._listener = listener;
      this.on(method, onOpen);
    } else {
      this.on(method, listener);
    }
  },


  /**
   * Remove an event listener.
   *
   * @param {String} method A string representing the event type to remove
   * @param {Function} listener The listener to remove
   * @public
   */
  removeEventListener: function removeEventListener(method, listener) {
    var listeners = this.listeners(method);

    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener || listeners[i]._listener === listener) {
        this.removeListener(method, listeners[i]);
      }
    }
  }
};

module.exports = EventTarget;

/***/ }),

/***/ "APvO":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var transports = __webpack_require__("xQDS");
var Emitter = __webpack_require__("Wr69");
var debug = __webpack_require__("G8yc")('engine.io-client:socket');
var index = __webpack_require__("rcym");
var parser = __webpack_require__("fAXJ");
var parseuri = __webpack_require__("ime/");
var parseqs = __webpack_require__("vs2a");

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure : global.location && 'https:' === location.protocol;

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname || (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port ? location.port : this.secure ? 443 : 80);
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // other options for Node.js client
  var freeGlobal = typeof global === 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = __webpack_require__("HBl9");
Socket.transports = __webpack_require__("xQDS");
Socket.parser = __webpack_require__("fAXJ");

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void 0
  });

  return transport;
};

function clone(obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport.on('drain', function () {
    self.onDrain();
  }).on('packet', function (packet) {
    self.onPacket(packet);
  }).on('error', function (e) {
    self.onError(e);
  }).on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen() {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose() {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose() {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade(to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup() {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || self.pingInterval + self.pingTimeout);
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write = Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close() {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose() {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade() {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

/***/ }),

/***/ "An6L":
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__("6IAg");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy() {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),

/***/ "Axko":
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "BM2E":
/***/ (function(module, exports) {


/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function destroy() {
      obj.removeListener(ev, fn);
    }
  };
}

/***/ }),

/***/ "Bcfi":
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "BvYa":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__("bCvK");
} else {
  module.exports = __webpack_require__("7kg7");
}

/***/ }),

/***/ "DJEA":
/***/ (function(module, exports, __webpack_require__) {

/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = __webpack_require__("aJTU");
var isBuf = __webpack_require__("VOQX");
var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function (packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return { packet: pack, buffers: buffers };
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
    }
    return newData;
  }
  return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function (packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function (data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if (withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function () {
        // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        } else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if (! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) {
      // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) {
      // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

/***/ }),

/***/ "DYmO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var os = __webpack_require__("3TAv");
var hasFlag = __webpack_require__("IvCc");

var env = process.env;

var forceColor = void 0;
if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level: level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	var min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		var osRelease = os.release().split('.');
		if (Number(process.versions.node.split('.')[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function (sign) {
			return sign in env;
		}) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return (/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0
		);
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	var level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};

/***/ }),

/***/ "Di21":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var eio = __webpack_require__("h0uD");
var Socket = __webpack_require__("wT76");
var Emitter = __webpack_require__("Wr69");
var parser = __webpack_require__("EDhw");
var on = __webpack_require__("BM2E");
var bind = __webpack_require__("NpfF");
var debug = __webpack_require__("xlf4")('socket.io-client:manager');
var indexOf = __webpack_require__("rcym");
var Backoff = __webpack_require__("pAuI");

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : nsp + '#') + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open = Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function destroy() {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting() {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else {
    // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close = Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function destroy() {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

/***/ }),

/***/ "DnAD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var safeBuffer = __webpack_require__("38Wu");

var Buffer = safeBuffer.Buffer;

exports.BINARY_TYPES = ['nodebuffer', 'arraybuffer', 'fragments'];
exports.GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
exports.EMPTY_BUFFER = Buffer.alloc(0);
exports.NOOP = function () {};

/***/ }),

/***/ "ECAZ":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parseuri = __webpack_require__("ime/");
var debug = __webpack_require__("xlf4")('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : ':' + obj.port);

  return obj;
}

/***/ }),

/***/ "EDhw":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__("BvYa")('socket.io-parser');
var Emitter = __webpack_require__("Wr69");
var binary = __webpack_require__("DJEA");
var isArray = __webpack_require__("aJTU");
var isBuf = __webpack_require__("VOQX");

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK'];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

var ERROR_PACKET = exports.ERROR + '"encode error"';

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function (obj, callback) {
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  } else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    var payload = tryStringify(obj.data);
    if (payload !== false) {
      str += payload;
    } else {
      return ERROR_PACKET;
    }
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

function tryStringify(str) {
  try {
    return JSON.stringify(str);
  } catch (e) {
    return false;
  }
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function (obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) {
      // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else {
      // non-binary full packet
      this.emit('decoded', packet);
    }
  } else if (isBuf(obj) || obj.base64) {
    // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) {
        // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  } else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function () {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function (binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) {
    // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function () {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}

/***/ }),

/***/ "Ex/H":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__("HBl9");
var parser = __webpack_require__("fAXJ");
var parseqs = __webpack_require__("vs2a");
var inherit = __webpack_require__("X1xq");
var yeast = __webpack_require__("t9Jt");
var debug = __webpack_require__("G8yc")('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket;
if (typeof window === 'undefined') {
  try {
    NodeWebSocket = __webpack_require__("fY40");
  } catch (e) {}
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  WebSocket = NodeWebSocket;
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts) {
  var forceBase64 = opts && opts.forceBase64;
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  this.protocols = opts.protocols;
  if (!this.usingBrowserWebSocket) {
    WebSocket = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = this.protocols;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws = this.usingBrowserWebSocket ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done() {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && ('wss' === schema && Number(this.port) !== 443 || 'ws' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

/***/ }),

/***/ "FpCL":
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "G8yc":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__("Rs/2");
} else {
  module.exports = __webpack_require__("hc7C");
}

/***/ }),

/***/ "HBl9":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var parser = __webpack_require__("fAXJ");
var Emitter = __webpack_require__("Wr69");

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport(opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

/***/ }),

/***/ "HoW2":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"card":"card__2a8Ev","front":"front__3GGTx","back":"back__2hXv5","match":"match__3QyVS"};

/***/ }),

/***/ "IvCc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (flag, argv) {
	argv = argv || process.argv;
	var prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';
	var pos = argv.indexOf(prefix + flag);
	var terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// CONCATENATED MODULE: ../node_modules/preact-router/dist/preact-router.es.js


var EMPTY$1 = {};

function preact_router_es_assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var preact_router_es_Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					preact_router_es_assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(preact_min["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(preact_min["Component"]);

var preact_router_es_Link = function Link(props) {
	return Object(preact_min["h"])('a', preact_router_es_assign({ onClick: handleLinkClick }, props));
};

var preact_router_es_Route = function Route(props) {
	return Object(preact_min["h"])(props.component, props);
};

preact_router_es_Router.subscribers = subscribers;
preact_router_es_Router.getCurrentUrl = getCurrentUrl;
preact_router_es_Router.route = route;
preact_router_es_Router.Router = preact_router_es_Router;
preact_router_es_Router.Route = preact_router_es_Route;
preact_router_es_Router.Link = preact_router_es_Link;

/* harmony default export */ var preact_router_es = (preact_router_es_Router);
//# sourceMappingURL=preact-router.es.js.map
// CONCATENATED MODULE: ./request.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var BASE_URL = "";

function request(_ref) {
  return new Promise(function ($return, $error) {
    var url, method, body, query, headers, resourceUrl, response;
    url = _ref.url, method = _ref.method, body = _ref.body, query = _ref.query, headers = _ref.headers;

    resourceUrl = query ? BASE_URL + "/" + url + "?" + stringifyQuery(query) : BASE_URL + "/" + url;

    return Promise.resolve(fetch(resourceUrl, {
      method: method,
      credentials: "include",
      body: typeof body === "string" ? body : JSON.stringify(body),
      headers: _extends({
        "Content-Type": "application/json"
      }, headers),
      mode: "cors"
    })).then(function ($await_1) {
      try {
        response = $await_1;

        if (response.status >= 200 && response.status < 300) {
          return $return(response);
        }

        return $error(response);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}

function stringifyQuery(query) {
  return Object.keys(query).reduce(function (queryStr, key) {
    var value = query[key];

    if (queryStr === "") {
      return key + "=" + encodeURIComponent(value);
    }

    return queryStr + "&" + key + "=" + encodeURIComponent(value);
  }, "");
}

function get(url, query) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return request(_extends({
    url: url,
    query: query,
    method: "GET"
  }, options));
}

function post(url, body) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return request(_extends({
    url: url,
    body: body,
    method: "POST"
  }, options));
}

function put(url, body) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return request(_extends({
    url: url,
    body: body,
    method: "PUT"
  }, options));
}

function del(url, query) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return request(_extends({
    url: url,
    query: query,
    method: "DELETE"
  }, options));
}
// EXTERNAL MODULE: ./components/button/style.css
var button_style = __webpack_require__("+eY/");
var button_style_default = /*#__PURE__*/__webpack_require__.n(button_style);

// CONCATENATED MODULE: ./components/button/index.js
var button__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




function Button(props) {
	return Object(preact_min["h"])('button', button__extends({}, props, { 'class': button_style_default.a.button }));
}
// EXTERNAL MODULE: ./routes/home/style.css
var home_style = __webpack_require__("ZAL5");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// CONCATENATED MODULE: ./routes/home/index.js




var home__ref2 = Object(preact_min["h"])(
  "h2",
  null,
  "Match Game"
);

var home__ref3 = Object(preact_min["h"])("img", { src: "/assets/logo.png", alt: "match game logo", height: "50" });

function Home(_ref) {
  var feedback = _ref.feedback,
      startGame = _ref.startGame;

  // get the right content based on load status
  var homeContent = !feedback ? Object(preact_min["h"])(
    "div",
    { "class": home_style_default.a.head },
    home__ref2,
    home__ref3
  ) : Object(preact_min["h"])(
    "div",
    { "class": home_style_default.a.head },
    Object(preact_min["h"])(
      "div",
      { "class": "emoji" },
      feedback.emoji,
      " "
    ),
    Object(preact_min["h"])(
      "div",
      null,
      " ",
      feedback.message,
      " "
    )
  );

  return Object(preact_min["h"])(
    "div",
    { "class": home_style_default.a.home },
    homeContent,
    Object(preact_min["h"])(
      Button,
      { onClick: startGame },
      "New Game"
    )
  );
}
// EXTERNAL MODULE: ../node_modules/socket.io-client/lib/index.js
var lib = __webpack_require__("+1g+");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ../node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return _extendStatics(d, b);
};

function __extends(d, b) {
    _extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return _assign.apply(this, arguments);
};


function __rest(s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []),
        i,
        q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function (v) {
            return new Promise(function (a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function () {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function (v) {
            return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
        } : f;
    }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
        i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function (v) {
            return new Promise(function (resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function (v) {
            resolve({ value: v, done: d });
        }, reject);
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }result.default = mod;
    return result;
}

function __importDefault(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
}
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isFunction.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
    return typeof x === 'function';
}
//# sourceMappingURL=isFunction.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/config.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config_config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = /*@__PURE__*/new Error();
            /*@__PURE__*/console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            /*@__PURE__*/console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    }
};
//# sourceMappingURL=config.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/hostReportError.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
    setTimeout(function () {
        throw err;
    });
}
//# sourceMappingURL=hostReportError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/Observer.js
/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */


var empty = {
    closed: true,
    next: function next(value) {},
    error: function error(err) {
        if (config_config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        } else {
            hostReportError(err);
        }
    },
    complete: function complete() {}
};
//# sourceMappingURL=Observer.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isArray.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = Array.isArray || function (x) {
  return x && typeof x.length === 'number';
};
//# sourceMappingURL=isArray.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isObject.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
    return x != null && typeof x === 'object';
}
//# sourceMappingURL=isObject.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/errorObject.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/tryCatch.js
/** PURE_IMPORTS_START _errorObject PURE_IMPORTS_END */

var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    } catch (e) {
        errorObject.e = e;
        return errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
//# sourceMappingURL=tryCatch.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
        return i + 1 + ") " + err.toString();
    }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
}
UnsubscriptionErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
var UnsubscriptionError = UnsubscriptionErrorImpl;
//# sourceMappingURL=UnsubscriptionError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/Subscription.js
/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_tryCatch,_util_errorObject,_util_UnsubscriptionError PURE_IMPORTS_END */






var Subscription_Subscription = /*@__PURE__*/function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents,
            _unsubscribe = _a._unsubscribe,
            _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        while (_parent) {
            _parent.remove(this);
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction(_unsubscribe)) {
            var trial = tryCatch(_unsubscribe).call(this);
            if (trial === errorObject) {
                hasErrors = true;
                errors = errors || (errorObject.e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(errorObject.e.errors) : [errorObject.e]);
            }
        }
        if (isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject(sub)) {
                    var trial = tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject.e;
                        if (err instanceof UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        } else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        if (!teardown || teardown === Subscription.EMPTY) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                } else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                } else if (typeof subscription._addParent !== 'function') {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents;
        if (!_parent || _parent === parent) {
            this._parent = parent;
        } else if (!_parents) {
            this._parents = [parent];
        } else if (_parents.indexOf(parent) === -1) {
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription());
    return Subscription;
}();

function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) {
        return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
    }, []);
}
//# sourceMappingURL=Subscription.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var rxSubscriber = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? /*@__PURE__*/Symbol.for('rxSubscriber') : '@@rxSubscriber';
var $$rxSubscriber = rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/Subscriber.js
/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */







var Subscriber_Subscriber = /*@__PURE__*/function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        _this._parentSubscription = null;
        switch (arguments.length) {
            case 0:
                _this.destination = empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (isTrustedSubscriber(destinationOrNext)) {
                        var trustedSubscriber = destinationOrNext[rxSubscriber]();
                        _this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
                        _this.destination = trustedSubscriber;
                        trustedSubscriber._addParentTeardownLogic(_this);
                    } else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new Subscriber_SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new Subscriber_SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[rxSubscriber] = function () {
        return this;
    };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
            this._unsubscribeParentSubscription();
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
            this._unsubscribeParentSubscription();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._addParentTeardownLogic = function (parentTeardownLogic) {
        if (parentTeardownLogic !== this) {
            this._parentSubscription = this.add(parentTeardownLogic);
        }
    };
    Subscriber.prototype._unsubscribeParentSubscription = function () {
        if (this._parentSubscription !== null) {
            this._parentSubscription.unsubscribe();
        }
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        this._parentSubscription = null;
        return this;
    };
    return Subscriber;
}(Subscription_Subscription);

var Subscriber_SafeSubscriber = /*@__PURE__*/function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction(observerOrNext)) {
            next = observerOrNext;
        } else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== empty) {
                context = Object.create(observerOrNext);
                if (isFunction(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!config_config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config_config.useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                } else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            } else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                hostReportError(err);
            } else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                } else {
                    hostReportError(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function wrappedComplete() {
                    return _this._complete.call(_this._context);
                };
                if (!config_config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                } else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            } else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        } catch (err) {
            this.unsubscribe();
            if (config_config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            } else {
                hostReportError(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config_config.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        } catch (err) {
            if (config_config.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            } else {
                hostReportError(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber_Subscriber);

function isTrustedSubscriber(obj) {
    return obj instanceof Subscriber_Subscriber || '_addParentTeardownLogic' in obj && obj[rxSubscriber];
}
//# sourceMappingURL=Subscriber.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/toSubscriber.js
/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */



function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber]) {
            return nextOrObserver[rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_Subscriber(empty);
    }
    return new Subscriber_Subscriber(nextOrObserver, error, complete);
}
//# sourceMappingURL=toSubscriber.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/symbol/observable.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var observable_observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
//# sourceMappingURL=observable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/noop.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() {}
//# sourceMappingURL=noop.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/pipe.js
/** PURE_IMPORTS_START _noop PURE_IMPORTS_END */

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (!fns) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) {
            return fn(prev);
        }, input);
    };
}
//# sourceMappingURL=pipe.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/Observable.js
/** PURE_IMPORTS_START _util_toSubscriber,_internal_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */




var Observable_Observable = /*@__PURE__*/function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        } else {
            sink._addParentTeardownLogic(this.source || config_config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (config_config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        } catch (err) {
            if (config_config.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                } catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[observable_observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) {
                return value = x;
            }, function (err) {
                return reject(err);
            }, function () {
                return resolve(value);
            });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}();

function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = config_config.Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}
//# sourceMappingURL=Observable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function ObjectUnsubscribedErrorImpl() {
    Error.call(this);
    this.message = 'object unsubscribed';
    this.name = 'ObjectUnsubscribedError';
    return this;
}
ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;
//# sourceMappingURL=ObjectUnsubscribedError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/SubjectSubscription.js
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */


var SubjectSubscription_SubjectSubscription = /*@__PURE__*/function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        var _this = _super.call(this) || this;
        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_Subscription);

//# sourceMappingURL=SubjectSubscription.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/Subject.js
/** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */







var Subject_SubjectSubscriber = /*@__PURE__*/function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        return _this;
    }
    return SubjectSubscriber;
}(Subscriber_Subscriber);

var Subject_Subject = /*@__PURE__*/function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.observers = [];
        _this.closed = false;
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype[rxSubscriber] = function () {
        return new Subject_SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new Subject_AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        } else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        } else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_Subscription.EMPTY;
        } else if (this.isStopped) {
            subscriber.complete();
            return Subscription_Subscription.EMPTY;
        } else {
            this.observers.push(subscriber);
            return new SubjectSubscription_SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new Subject_AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_Observable);

var Subject_AnonymousSubject = /*@__PURE__*/function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        } else {
            return Subscription_Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject_Subject);

//# sourceMappingURL=Subject.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/refCount.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function refCount_refCount() {
    return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
    };
}
var RefCountOperator = /*@__PURE__*/function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new refCount_RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}();
var refCount_RefCountSubscriber = /*@__PURE__*/function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=refCount.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js
/** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */






var ConnectableObservable_ConnectableObservable = /*@__PURE__*/function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        _this._isComplete = false;
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new Subscription_Subscription();
            connection.add(this.source.subscribe(new ConnectableObservable_ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_Subscription.EMPTY;
            } else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount_refCount()(this);
    };
    return ConnectableObservable;
}(Observable_Observable);

var connectableProto = ConnectableObservable_ConnectableObservable.prototype;
var connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: { value: connectableProto._isComplete, writable: true },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
};
var ConnectableObservable_ConnectableSubscriber = /*@__PURE__*/function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(Subject_SubjectSubscriber);
var ConnectableObservable_RefCountOperator = /*@__PURE__*/function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new ConnectableObservable_RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}();
var ConnectableObservable_RefCountSubscriber = /*@__PURE__*/function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=ConnectableObservable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/groupBy.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */





function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return function (source) {
        return source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
    };
}
var GroupByOperator = /*@__PURE__*/function () {
    function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
    }
    GroupByOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new groupBy_GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
    };
    return GroupByOperator;
}();
var groupBy_GroupBySubscriber = /*@__PURE__*/function (_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.elementSelector = elementSelector;
        _this.durationSelector = durationSelector;
        _this.subjectSelector = subjectSelector;
        _this.groups = null;
        _this.attemptedToUnsubscribe = false;
        _this.count = 0;
        return _this;
    }
    GroupBySubscriber.prototype._next = function (value) {
        var key;
        try {
            key = this.keySelector(value);
        } catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function (value, key) {
        var groups = this.groups;
        if (!groups) {
            groups = this.groups = new Map();
        }
        var group = groups.get(key);
        var element;
        if (this.elementSelector) {
            try {
                element = this.elementSelector(value);
            } catch (err) {
                this.error(err);
            }
        } else {
            element = value;
        }
        if (!group) {
            group = this.subjectSelector ? this.subjectSelector() : new Subject_Subject();
            groups.set(key, group);
            var groupedObservable = new groupBy_GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
                var duration = void 0;
                try {
                    duration = this.durationSelector(new groupBy_GroupedObservable(key, group));
                } catch (err) {
                    this.error(err);
                    return;
                }
                this.add(duration.subscribe(new groupBy_GroupDurationSubscriber(key, group, this)));
            }
        }
        if (!group.closed) {
            group.next(element);
        }
    };
    GroupBySubscriber.prototype._error = function (err) {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                _super.prototype.unsubscribe.call(this);
            }
        }
    };
    return GroupBySubscriber;
}(Subscriber_Subscriber);
var groupBy_GroupDurationSubscriber = /*@__PURE__*/function (_super) {
    __extends(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
        var _this = _super.call(this, group) || this;
        _this.key = key;
        _this.group = group;
        _this.parent = parent;
        return _this;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
        this.complete();
    };
    GroupDurationSubscriber.prototype._unsubscribe = function () {
        var _a = this,
            parent = _a.parent,
            key = _a.key;
        this.key = this.parent = null;
        if (parent) {
            parent.removeGroup(key);
        }
    };
    return GroupDurationSubscriber;
}(Subscriber_Subscriber);
var groupBy_GroupedObservable = /*@__PURE__*/function (_super) {
    __extends(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.groupSubject = groupSubject;
        _this.refCountSubscription = refCountSubscription;
        return _this;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new Subscription_Subscription();
        var _a = this,
            refCountSubscription = _a.refCountSubscription,
            groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new groupBy_InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    };
    return GroupedObservable;
}(Observable_Observable);

var groupBy_InnerRefCountSubscription = /*@__PURE__*/function (_super) {
    __extends(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        parent.count++;
        return _this;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
        var parent = this.parent;
        if (!parent.closed && !this.closed) {
            _super.prototype.unsubscribe.call(this);
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    };
    return InnerRefCountSubscription;
}(Subscription_Subscription);
//# sourceMappingURL=groupBy.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/BehaviorSubject.js
/** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */



var BehaviorSubject_BehaviorSubject = /*@__PURE__*/function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function get() {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        } else if (this.closed) {
            throw new ObjectUnsubscribedError();
        } else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(Subject_Subject);

//# sourceMappingURL=BehaviorSubject.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/Action.js
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */


var Action_Action = /*@__PURE__*/function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return this;
    };
    return Action;
}(Subscription_Subscription);

//# sourceMappingURL=Action.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js
/** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */


var AsyncAction_AsyncAction = /*@__PURE__*/function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        clearInterval(id);
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        } else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        } catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action_Action);

//# sourceMappingURL=AsyncAction.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js
/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */


var QueueAction_QueueAction = /*@__PURE__*/function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_AsyncAction);

//# sourceMappingURL=QueueAction.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/Scheduler.js
var Scheduler = /*@__PURE__*/function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = Scheduler.now;
        }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = function () {
        return Date.now();
    };
    return Scheduler;
}();

//# sourceMappingURL=Scheduler.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js
/** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */


var AsyncScheduler_AsyncScheduler = /*@__PURE__*/function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = Scheduler.now;
        }
        var _this = _super.call(this, SchedulerAction, function () {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
                return AsyncScheduler.delegate.now();
            } else {
                return now();
            }
        }) || this;
        _this.actions = [];
        _this.active = false;
        _this.scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
            return AsyncScheduler.delegate.schedule(work, delay, state);
        } else {
            return _super.prototype.schedule.call(this, work, delay, state);
        }
    };
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift());
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler);

//# sourceMappingURL=AsyncScheduler.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */


var QueueScheduler_QueueScheduler = /*@__PURE__*/function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(AsyncScheduler_AsyncScheduler);

//# sourceMappingURL=QueueScheduler.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/queue.js
/** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */


var queue = /*@__PURE__*/new QueueScheduler_QueueScheduler(QueueAction_QueueAction);
//# sourceMappingURL=queue.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/empty.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

var empty_EMPTY = /*@__PURE__*/new Observable_Observable(function (subscriber) {
    return subscriber.complete();
});
function empty_empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : empty_EMPTY;
}
function emptyScheduled(scheduler) {
    return new Observable_Observable(function (subscriber) {
        return scheduler.schedule(function () {
            return subscriber.complete();
        });
    });
}
//# sourceMappingURL=empty.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isScheduler.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
//# sourceMappingURL=isScheduler.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/subscribeToArray.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var subscribeToArray = function subscribeToArray(array) {
    return function (subscriber) {
        for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        if (!subscriber.closed) {
            subscriber.complete();
        }
    };
};
//# sourceMappingURL=subscribeToArray.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/fromArray.js
/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToArray PURE_IMPORTS_END */



function fromArray(input, scheduler) {
    if (!scheduler) {
        return new Observable_Observable(subscribeToArray(input));
    } else {
        return new Observable_Observable(function (subscriber) {
            var sub = new Subscription_Subscription();
            var i = 0;
            sub.add(scheduler.schedule(function () {
                if (i === input.length) {
                    subscriber.complete();
                    return;
                }
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    sub.add(this.schedule());
                }
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromArray.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/scalar.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function scalar(value) {
    var result = new Observable_Observable(function (subscriber) {
        subscriber.next(value);
        subscriber.complete();
    });
    result._isScalar = true;
    result.value = value;
    return result;
}
//# sourceMappingURL=scalar.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/of.js
/** PURE_IMPORTS_START _util_isScheduler,_fromArray,_empty,_scalar PURE_IMPORTS_END */




function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args[args.length - 1];
    if (isScheduler(scheduler)) {
        args.pop();
    } else {
        scheduler = undefined;
    }
    switch (args.length) {
        case 0:
            return empty_empty(scheduler);
        case 1:
            return scheduler ? fromArray(args, scheduler) : scalar(args[0]);
        default:
            return fromArray(args, scheduler);
    }
}
//# sourceMappingURL=of.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/throwError.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function throwError(error, scheduler) {
    if (!scheduler) {
        return new Observable_Observable(function (subscriber) {
            return subscriber.error(error);
        });
    } else {
        return new Observable_Observable(function (subscriber) {
            return scheduler.schedule(dispatch, 0, { error: error, subscriber: subscriber });
        });
    }
}
function dispatch(_a) {
    var error = _a.error,
        subscriber = _a.subscriber;
    subscriber.error(error);
}
//# sourceMappingURL=throwError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/Notification.js
/** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */



var Notification_Notification = /*@__PURE__*/function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        } else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return of(this.value);
            case 'E':
                return throwError(this.error);
            case 'C':
                return empty_empty();
        }
        throw new Error('unexpected notification kind value');
    };
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}();

//# sourceMappingURL=Notification.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/observeOn.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */



function observeOn(scheduler, delay) {
    if (delay === void 0) {
        delay = 0;
    }
    return function observeOnOperatorFunction(source) {
        return source.lift(new ObserveOnOperator(scheduler, delay));
    };
}
var ObserveOnOperator = /*@__PURE__*/function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new observeOn_ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}();

var observeOn_ObserveOnSubscriber = /*@__PURE__*/function (_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        var _this = _super.call(this, destination) || this;
        _this.scheduler = scheduler;
        _this.delay = delay;
        return _this;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification,
            destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification_Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification_Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification_Notification.createComplete());
    };
    return ObserveOnSubscriber;
}(Subscriber_Subscriber);

var ObserveOnMessage = /*@__PURE__*/function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}();

//# sourceMappingURL=observeOn.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/ReplaySubject.js
/** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */







var ReplaySubject_ReplaySubject = /*@__PURE__*/function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) {
            bufferSize = Number.POSITIVE_INFINITY;
        }
        if (windowTime === void 0) {
            windowTime = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this) || this;
        _this.scheduler = scheduler;
        _this._events = [];
        _this._infiniteTimeWindow = false;
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;
        if (windowTime === Number.POSITIVE_INFINITY) {
            _this._infiniteTimeWindow = true;
            _this.next = _this.nextInfiniteTimeWindow;
        } else {
            _this.next = _this.nextTimeWindow;
        }
        return _this;
    }
    ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
        var _events = this._events;
        _events.push(value);
        if (_events.length > this._bufferSize) {
            _events.shift();
        }
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype.nextTimeWindow = function (value) {
        this._events.push(new ReplayEvent(this._getNow(), value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _infiniteTimeWindow = this._infiniteTimeWindow;
        var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var len = _events.length;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        } else if (this.isStopped || this.hasError) {
            subscription = Subscription_Subscription.EMPTY;
        } else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription_SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_ObserveOnSubscriber(subscriber, scheduler));
        }
        if (_infiniteTimeWindow) {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i]);
            }
        } else {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i].value);
            }
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        } else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        while (spliceCount < eventsCount) {
            if (now - _events[spliceCount].time < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject_Subject);

var ReplayEvent = /*@__PURE__*/function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}();
//# sourceMappingURL=ReplaySubject.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/AsyncSubject.js
/** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */



var AsyncSubject_AsyncSubject = /*@__PURE__*/function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        _this.hasNext = false;
        _this.hasCompleted = false;
        return _this;
    }
    AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_Subscription.EMPTY;
        } else if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
            subscriber.complete();
            return Subscription_Subscription.EMPTY;
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.hasCompleted) {
            this.value = value;
            this.hasNext = true;
        }
    };
    AsyncSubject.prototype.error = function (error) {
        if (!this.hasCompleted) {
            _super.prototype.error.call(this, error);
        }
    };
    AsyncSubject.prototype.complete = function () {
        this.hasCompleted = true;
        if (this.hasNext) {
            _super.prototype.next.call(this, this.value);
        }
        _super.prototype.complete.call(this);
    };
    return AsyncSubject;
}(Subject_Subject);

//# sourceMappingURL=AsyncSubject.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/Immediate.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var nextHandle = 1;
var tasksByHandle = {};
function runIfPresent(handle) {
    var cb = tasksByHandle[handle];
    if (cb) {
        cb();
    }
}
var Immediate = {
    setImmediate: function setImmediate(cb) {
        var handle = nextHandle++;
        tasksByHandle[handle] = cb;
        Promise.resolve().then(function () {
            return runIfPresent(handle);
        });
        return handle;
    },
    clearImmediate: function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }
};
//# sourceMappingURL=Immediate.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/AsapAction.js
/** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */



var AsapAction_AsapAction = /*@__PURE__*/function (_super) {
    __extends(AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            Immediate.clearImmediate(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AsapAction;
}(AsyncAction_AsyncAction);

//# sourceMappingURL=AsapAction.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/AsapScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */


var AsapScheduler_AsapScheduler = /*@__PURE__*/function (_super) {
    __extends(AsapScheduler, _super);
    function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(AsyncScheduler_AsyncScheduler);

//# sourceMappingURL=AsapScheduler.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/asap.js
/** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */


var asap = /*@__PURE__*/new AsapScheduler_AsapScheduler(AsapAction_AsapAction);
//# sourceMappingURL=asap.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/async.js
/** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */


var async_async = /*@__PURE__*/new AsyncScheduler_AsyncScheduler(AsyncAction_AsyncAction);
//# sourceMappingURL=async.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js
/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */


var AnimationFrameAction_AnimationFrameAction = /*@__PURE__*/function (_super) {
    __extends(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () {
            return scheduler.flush(null);
        }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            cancelAnimationFrame(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(AsyncAction_AsyncAction);

//# sourceMappingURL=AnimationFrameAction.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */


var AnimationFrameScheduler_AnimationFrameScheduler = /*@__PURE__*/function (_super) {
    __extends(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(AsyncScheduler_AsyncScheduler);

//# sourceMappingURL=AnimationFrameScheduler.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/animationFrame.js
/** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */


var animationFrame = /*@__PURE__*/new AnimationFrameScheduler_AnimationFrameScheduler(AnimationFrameAction_AnimationFrameAction);
//# sourceMappingURL=animationFrame.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/scheduler/VirtualTimeScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */



var VirtualTimeScheduler_VirtualTimeScheduler = /*@__PURE__*/function (_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        if (SchedulerAction === void 0) {
            SchedulerAction = VirtualTimeScheduler_VirtualAction;
        }
        if (maxFrames === void 0) {
            maxFrames = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, SchedulerAction, function () {
            return _this.frame;
        }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this,
            actions = _a.actions,
            maxFrames = _a.maxFrames;
        var error, action;
        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        }
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler_AsyncScheduler);

var VirtualTimeScheduler_VirtualAction = /*@__PURE__*/function (_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) {
            index = scheduler.index += 1;
        }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.active = false;
        var action = new VirtualAction(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            } else if (a.index > b.index) {
                return 1;
            } else {
                return -1;
            }
        } else if (a.delay > b.delay) {
            return 1;
        } else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction_AsyncAction);

//# sourceMappingURL=VirtualTimeScheduler.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/identity.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isObservable.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function isObservable(obj) {
    return !!obj && (obj instanceof Observable_Observable || typeof obj.lift === 'function' && typeof obj.subscribe === 'function');
}
//# sourceMappingURL=isObservable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function ArgumentOutOfRangeErrorImpl() {
    Error.call(this);
    this.message = 'argument out of range';
    this.name = 'ArgumentOutOfRangeError';
    return this;
}
ArgumentOutOfRangeErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;
//# sourceMappingURL=ArgumentOutOfRangeError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/EmptyError.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function EmptyErrorImpl() {
    Error.call(this);
    this.message = 'no elements in sequence';
    this.name = 'EmptyError';
    return this;
}
EmptyErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
var EmptyError = EmptyErrorImpl;
//# sourceMappingURL=EmptyError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/TimeoutError.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function TimeoutErrorImpl() {
    Error.call(this);
    this.message = 'Timeout has occurred';
    this.name = 'TimeoutError';
    return this;
}
TimeoutErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
var TimeoutError = TimeoutErrorImpl;
//# sourceMappingURL=TimeoutError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/map.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
var MapOperator = /*@__PURE__*/function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new map_MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}();

var map_MapSubscriber = /*@__PURE__*/function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=map.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/bindCallback.js
/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_isArray,_util_isScheduler PURE_IMPORTS_END */





function bindCallback(callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (isScheduler(resultSelector)) {
            scheduler = resultSelector;
        } else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map(function (args) {
                    return isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
                }));
            };
        }
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = this;
        var subject;
        var params = {
            context: context,
            subject: subject,
            callbackFunc: callbackFunc,
            scheduler: scheduler
        };
        return new Observable_Observable(function (subscriber) {
            if (!scheduler) {
                if (!subject) {
                    subject = new AsyncSubject_AsyncSubject();
                    var handler = function handler() {
                        var innerArgs = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            innerArgs[_i] = arguments[_i];
                        }
                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    };
                    try {
                        callbackFunc.apply(context, args.concat([handler]));
                    } catch (err) {
                        subject.error(err);
                    }
                }
                return subject.subscribe(subscriber);
            } else {
                var state = {
                    args: args, subscriber: subscriber, params: params
                };
                return scheduler.schedule(bindCallback_dispatch, 0, state);
            }
        });
    };
}
function bindCallback_dispatch(state) {
    var _this = this;
    var self = this;
    var args = state.args,
        subscriber = state.subscriber,
        params = state.params;
    var callbackFunc = params.callbackFunc,
        context = params.context,
        scheduler = params.scheduler;
    var subject = params.subject;
    if (!subject) {
        subject = params.subject = new AsyncSubject_AsyncSubject();
        var handler = function handler() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i] = arguments[_i];
            }
            var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
            _this.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
        };
        try {
            callbackFunc.apply(context, args.concat([handler]));
        } catch (err) {
            subject.error(err);
        }
    }
    this.add(subject.subscribe(subscriber));
}
function dispatchNext(state) {
    var value = state.value,
        subject = state.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(state) {
    var err = state.err,
        subject = state.subject;
    subject.error(err);
}
//# sourceMappingURL=bindCallback.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/bindNodeCallback.js
/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_isScheduler,_util_isArray PURE_IMPORTS_END */





function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (isScheduler(resultSelector)) {
            scheduler = resultSelector;
        } else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map(function (args) {
                    return isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
                }));
            };
        }
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = {
            subject: undefined,
            args: args,
            callbackFunc: callbackFunc,
            scheduler: scheduler,
            context: this
        };
        return new Observable_Observable(function (subscriber) {
            var context = params.context;
            var subject = params.subject;
            if (!scheduler) {
                if (!subject) {
                    subject = params.subject = new AsyncSubject_AsyncSubject();
                    var handler = function handler() {
                        var innerArgs = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            innerArgs[_i] = arguments[_i];
                        }
                        var err = innerArgs.shift();
                        if (err) {
                            subject.error(err);
                            return;
                        }
                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    };
                    try {
                        callbackFunc.apply(context, args.concat([handler]));
                    } catch (err) {
                        subject.error(err);
                    }
                }
                return subject.subscribe(subscriber);
            } else {
                return scheduler.schedule(bindNodeCallback_dispatch, 0, { params: params, subscriber: subscriber, context: context });
            }
        });
    };
}
function bindNodeCallback_dispatch(state) {
    var _this = this;
    var params = state.params,
        subscriber = state.subscriber,
        context = state.context;
    var callbackFunc = params.callbackFunc,
        args = params.args,
        scheduler = params.scheduler;
    var subject = params.subject;
    if (!subject) {
        subject = params.subject = new AsyncSubject_AsyncSubject();
        var handler = function handler() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i] = arguments[_i];
            }
            var err = innerArgs.shift();
            if (err) {
                _this.add(scheduler.schedule(bindNodeCallback_dispatchError, 0, { err: err, subject: subject }));
            } else {
                var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
                _this.add(scheduler.schedule(bindNodeCallback_dispatchNext, 0, { value: value, subject: subject }));
            }
        };
        try {
            callbackFunc.apply(context, args.concat([handler]));
        } catch (err) {
            this.add(scheduler.schedule(bindNodeCallback_dispatchError, 0, { err: err, subject: subject }));
        }
    }
    this.add(subject.subscribe(subscriber));
}
function bindNodeCallback_dispatchNext(arg) {
    var value = arg.value,
        subject = arg.subject;
    subject.next(value);
    subject.complete();
}
function bindNodeCallback_dispatchError(arg) {
    var err = arg.err,
        subject = arg.subject;
    subject.error(err);
}
//# sourceMappingURL=bindNodeCallback.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/OuterSubscriber.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


var OuterSubscriber_OuterSubscriber = /*@__PURE__*/function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_Subscriber);

//# sourceMappingURL=OuterSubscriber.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/InnerSubscriber.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


var InnerSubscriber_InnerSubscriber = /*@__PURE__*/function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_Subscriber);

//# sourceMappingURL=InnerSubscriber.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/subscribeToPromise.js
/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */

var subscribeToPromise_subscribeToPromise = function subscribeToPromise(promise) {
    return function (subscriber) {
        promise.then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) {
            return subscriber.error(err);
        }).then(null, hostReportError);
        return subscriber;
    };
};
//# sourceMappingURL=subscribeToPromise.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/symbol/iterator.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator_iterator = /*@__PURE__*/getSymbolIterator();
var $$iterator = iterator_iterator;
//# sourceMappingURL=iterator.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

var subscribeToIterable_subscribeToIterable = function subscribeToIterable(iterable) {
    return function (subscriber) {
        var iterator = iterable[iterator_iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                subscriber.complete();
                break;
            }
            subscriber.next(item.value);
            if (subscriber.closed) {
                break;
            }
        } while (true);
        if (typeof iterator.return === 'function') {
            subscriber.add(function () {
                if (iterator.return) {
                    iterator.return();
                }
            });
        }
        return subscriber;
    };
};
//# sourceMappingURL=subscribeToIterable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

var subscribeToObservable_subscribeToObservable = function subscribeToObservable(obj) {
    return function (subscriber) {
        var obs = obj[observable_observable]();
        if (typeof obs.subscribe !== 'function') {
            throw new TypeError('Provided object does not correctly implement Symbol.observable');
        } else {
            return obs.subscribe(subscriber);
        }
    };
};
//# sourceMappingURL=subscribeToObservable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isArrayLike.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = function isArrayLike(x) {
  return x && typeof x.length === 'number' && typeof x !== 'function';
};
//# sourceMappingURL=isArrayLike.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isPromise.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
//# sourceMappingURL=isPromise.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/subscribeTo.js
/** PURE_IMPORTS_START _Observable,_subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */










var subscribeTo_subscribeTo = function subscribeTo(result) {
    if (result instanceof Observable_Observable) {
        return function (subscriber) {
            if (result._isScalar) {
                subscriber.next(result.value);
                subscriber.complete();
                return undefined;
            } else {
                return result.subscribe(subscriber);
            }
        };
    } else if (result && typeof result[observable_observable] === 'function') {
        return subscribeToObservable_subscribeToObservable(result);
    } else if (isArrayLike(result)) {
        return subscribeToArray(result);
    } else if (isPromise(result)) {
        return subscribeToPromise_subscribeToPromise(result);
    } else if (result && typeof result[iterator_iterator] === 'function') {
        return subscribeToIterable_subscribeToIterable(result);
    } else {
        var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected." + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};
//# sourceMappingURL=subscribeTo.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/subscribeToResult.js
/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo PURE_IMPORTS_END */


function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
    if (destination === void 0) {
        destination = new InnerSubscriber_InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    }
    if (destination.closed) {
        return;
    }
    return subscribeTo_subscribeTo(result)(destination);
}
//# sourceMappingURL=subscribeToResult.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/combineLatest.js
/** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */






var NONE = {};
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var resultSelector = null;
    var scheduler = null;
    if (isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        resultSelector = observables.pop();
    }
    if (observables.length === 1 && isArray(observables[0])) {
        observables = observables[0];
    }
    return fromArray(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
}
var CombineLatestOperator = /*@__PURE__*/function () {
    function CombineLatestOperator(resultSelector) {
        this.resultSelector = resultSelector;
    }
    CombineLatestOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new combineLatest_CombineLatestSubscriber(subscriber, this.resultSelector));
    };
    return CombineLatestOperator;
}();

var combineLatest_CombineLatestSubscriber = /*@__PURE__*/function (_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, resultSelector) {
        var _this = _super.call(this, destination) || this;
        _this.resultSelector = resultSelector;
        _this.active = 0;
        _this.values = [];
        _this.observables = [];
        return _this;
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(NONE);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        } else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(subscribeToResult(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.resultSelector) {
                this._tryResultSelector(values);
            } else {
                this.destination.next(values.slice());
            }
        }
    };
    CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
        var result;
        try {
            result = this.resultSelector.apply(this, values);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(OuterSubscriber_OuterSubscriber);

//# sourceMappingURL=combineLatest.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isInteropObservable.js
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

function isInteropObservable(input) {
    return input && typeof input[observable_observable] === 'function';
}
//# sourceMappingURL=isInteropObservable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isIterable.js
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

function isIterable(input) {
    return input && typeof input[iterator_iterator] === 'function';
}
//# sourceMappingURL=isIterable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/fromPromise.js
/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToPromise PURE_IMPORTS_END */



function fromPromise(input, scheduler) {
    if (!scheduler) {
        return new Observable_Observable(subscribeToPromise_subscribeToPromise(input));
    } else {
        return new Observable_Observable(function (subscriber) {
            var sub = new Subscription_Subscription();
            sub.add(scheduler.schedule(function () {
                return input.then(function (value) {
                    sub.add(scheduler.schedule(function () {
                        subscriber.next(value);
                        sub.add(scheduler.schedule(function () {
                            return subscriber.complete();
                        }));
                    }));
                }, function (err) {
                    sub.add(scheduler.schedule(function () {
                        return subscriber.error(err);
                    }));
                });
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromPromise.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/fromIterable.js
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator,_util_subscribeToIterable PURE_IMPORTS_END */




function fromIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    if (!scheduler) {
        return new Observable_Observable(subscribeToIterable_subscribeToIterable(input));
    } else {
        return new Observable_Observable(function (subscriber) {
            var sub = new Subscription_Subscription();
            var iterator;
            sub.add(function () {
                if (iterator && typeof iterator.return === 'function') {
                    iterator.return();
                }
            });
            sub.add(scheduler.schedule(function () {
                iterator = input[iterator_iterator]();
                sub.add(scheduler.schedule(function () {
                    if (subscriber.closed) {
                        return;
                    }
                    var value;
                    var done;
                    try {
                        var result = iterator.next();
                        value = result.value;
                        done = result.done;
                    } catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (done) {
                        subscriber.complete();
                    } else {
                        subscriber.next(value);
                        this.schedule();
                    }
                }));
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromIterable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/fromObservable.js
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable,_util_subscribeToObservable PURE_IMPORTS_END */




function fromObservable(input, scheduler) {
    if (!scheduler) {
        return new Observable_Observable(subscribeToObservable_subscribeToObservable(input));
    } else {
        return new Observable_Observable(function (subscriber) {
            var sub = new Subscription_Subscription();
            sub.add(scheduler.schedule(function () {
                var observable = input[observable_observable]();
                sub.add(observable.subscribe({
                    next: function next(value) {
                        sub.add(scheduler.schedule(function () {
                            return subscriber.next(value);
                        }));
                    },
                    error: function error(err) {
                        sub.add(scheduler.schedule(function () {
                            return subscriber.error(err);
                        }));
                    },
                    complete: function complete() {
                        sub.add(scheduler.schedule(function () {
                            return subscriber.complete();
                        }));
                    }
                }));
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromObservable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/from.js
/** PURE_IMPORTS_START _Observable,_util_isPromise,_util_isArrayLike,_util_isInteropObservable,_util_isIterable,_fromArray,_fromPromise,_fromIterable,_fromObservable,_util_subscribeTo PURE_IMPORTS_END */










function from(input, scheduler) {
    if (!scheduler) {
        if (input instanceof Observable_Observable) {
            return input;
        }
        return new Observable_Observable(subscribeTo_subscribeTo(input));
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromObservable(input, scheduler);
        } else if (isPromise(input)) {
            return fromPromise(input, scheduler);
        } else if (isArrayLike(input)) {
            return fromArray(input, scheduler);
        } else if (isIterable(input) || typeof input === 'string') {
            return fromIterable(input, scheduler);
        }
    }
    throw new TypeError((input !== null && typeof input || input) + ' is not observable');
}
//# sourceMappingURL=from.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/mergeMap.js
/** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber,_map,_observable_from PURE_IMPORTS_END */






function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'function') {
        return function (source) {
            return source.pipe(mergeMap(function (a, i) {
                return from(project(a, i)).pipe(map(function (b, ii) {
                    return resultSelector(a, b, i, ii);
                }));
            }, concurrent));
        };
    } else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return function (source) {
        return source.lift(new MergeMapOperator(project, concurrent));
    };
}
var MergeMapOperator = /*@__PURE__*/function () {
    function MergeMapOperator(project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new mergeMap_MergeMapSubscriber(observer, this.project, this.concurrent));
    };
    return MergeMapOperator;
}();

var mergeMap_MergeMapSubscriber = /*@__PURE__*/function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        } else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        var innerSubscriber = new InnerSubscriber_InnerSubscriber(this, undefined, undefined);
        this.add(innerSubscriber);
        subscribeToResult(this, ish, value, index, innerSubscriber);
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber_OuterSubscriber);

//# sourceMappingURL=mergeMap.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/mergeAll.js
/** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */


function mergeAll(concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return mergeMap(identity, concurrent);
}
//# sourceMappingURL=mergeAll.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/concatAll.js
/** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

function concatAll() {
    return mergeAll(1);
}
//# sourceMappingURL=concatAll.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/concat.js
/** PURE_IMPORTS_START _util_isScheduler,_of,_from,_operators_concatAll PURE_IMPORTS_END */




function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    if (observables.length === 1 || observables.length === 2 && isScheduler(observables[1])) {
        return from(observables[0]);
    }
    return concatAll()(of.apply(void 0, observables));
}
//# sourceMappingURL=concat.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/defer.js
/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */



function defer(observableFactory) {
    return new Observable_Observable(function (subscriber) {
        var input;
        try {
            input = observableFactory();
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var source = input ? from(input) : empty_empty();
        return source.subscribe(subscriber);
    });
}
//# sourceMappingURL=defer.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/forkJoin.js
/** PURE_IMPORTS_START tslib,_Observable,_util_isArray,_empty,_util_subscribeToResult,_OuterSubscriber,_operators_map PURE_IMPORTS_END */







function forkJoin() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var resultSelector;
    if (typeof sources[sources.length - 1] === 'function') {
        resultSelector = sources.pop();
    }
    if (sources.length === 1 && isArray(sources[0])) {
        sources = sources[0];
    }
    if (sources.length === 0) {
        return empty_EMPTY;
    }
    if (resultSelector) {
        return forkJoin(sources).pipe(map(function (args) {
            return resultSelector.apply(void 0, args);
        }));
    }
    return new Observable_Observable(function (subscriber) {
        return new forkJoin_ForkJoinSubscriber(subscriber, sources);
    });
}
var forkJoin_ForkJoinSubscriber = /*@__PURE__*/function (_super) {
    __extends(ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources) {
        var _this = _super.call(this, destination) || this;
        _this.sources = sources;
        _this.completed = 0;
        _this.haveValues = 0;
        var len = sources.length;
        _this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = subscribeToResult(_this, source, null, i);
            if (innerSubscription) {
                _this.add(innerSubscription);
            }
        }
        return _this;
    }
    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
        var _a = this,
            destination = _a.destination,
            haveValues = _a.haveValues,
            values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            destination.next(values);
        }
        destination.complete();
    };
    return ForkJoinSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=forkJoin.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/fromEvent.js
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */




var fromEvent_toString = Object.prototype.toString;
function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(map(function (args) {
            return isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
    }
    return new Observable_Observable(function (subscriber) {
        function handler(e) {
            if (arguments.length > 1) {
                subscriber.next(Array.prototype.slice.call(arguments));
            } else {
                subscriber.next(e);
            }
        }
        setupSubscription(target, eventName, handler, subscriber, options);
    });
}
function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
    var unsubscribe;
    if (isEventTarget(sourceObj)) {
        var source_1 = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);
        unsubscribe = function unsubscribe() {
            return source_1.removeEventListener(eventName, handler, options);
        };
    } else if (isJQueryStyleEventEmitter(sourceObj)) {
        var source_2 = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = function unsubscribe() {
            return source_2.off(eventName, handler);
        };
    } else if (isNodeStyleEventEmitter(sourceObj)) {
        var source_3 = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = function unsubscribe() {
            return source_3.removeListener(eventName, handler);
        };
    } else if (sourceObj && sourceObj.length) {
        for (var i = 0, len = sourceObj.length; i < len; i++) {
            setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
    } else {
        throw new TypeError('Invalid event target');
    }
    subscriber.add(unsubscribe);
}
function isNodeStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isEventTarget(sourceObj) {
    return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
//# sourceMappingURL=fromEvent.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/fromEventPattern.js
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */




function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(map(function (args) {
            return isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
    }
    return new Observable_Observable(function (subscriber) {
        var handler = function handler() {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue;
        try {
            retValue = addHandler(handler);
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
        if (!isFunction(removeHandler)) {
            return undefined;
        }
        return function () {
            return removeHandler(handler, retValue);
        };
    });
}
//# sourceMappingURL=fromEventPattern.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/generate.js
/** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */



function generate(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
    var resultSelector;
    var initialState;
    if (arguments.length == 1) {
        var options = initialStateOrOptions;
        initialState = options.initialState;
        condition = options.condition;
        iterate = options.iterate;
        resultSelector = options.resultSelector || identity;
        scheduler = options.scheduler;
    } else if (resultSelectorOrObservable === undefined || isScheduler(resultSelectorOrObservable)) {
        initialState = initialStateOrOptions;
        resultSelector = identity;
        scheduler = resultSelectorOrObservable;
    } else {
        initialState = initialStateOrOptions;
        resultSelector = resultSelectorOrObservable;
    }
    return new Observable_Observable(function (subscriber) {
        var state = initialState;
        if (scheduler) {
            return scheduler.schedule(generate_dispatch, 0, {
                subscriber: subscriber,
                iterate: iterate,
                condition: condition,
                resultSelector: resultSelector,
                state: state
            });
        }
        do {
            if (condition) {
                var conditionResult = void 0;
                try {
                    conditionResult = condition(state);
                } catch (err) {
                    subscriber.error(err);
                    return undefined;
                }
                if (!conditionResult) {
                    subscriber.complete();
                    break;
                }
            }
            var value = void 0;
            try {
                value = resultSelector(state);
            } catch (err) {
                subscriber.error(err);
                return undefined;
            }
            subscriber.next(value);
            if (subscriber.closed) {
                break;
            }
            try {
                state = iterate(state);
            } catch (err) {
                subscriber.error(err);
                return undefined;
            }
        } while (true);
        return undefined;
    });
}
function generate_dispatch(state) {
    var subscriber = state.subscriber,
        condition = state.condition;
    if (subscriber.closed) {
        return undefined;
    }
    if (state.needIterate) {
        try {
            state.state = state.iterate(state.state);
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
    } else {
        state.needIterate = true;
    }
    if (condition) {
        var conditionResult = void 0;
        try {
            conditionResult = condition(state.state);
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
        if (!conditionResult) {
            subscriber.complete();
            return undefined;
        }
        if (subscriber.closed) {
            return undefined;
        }
    }
    var value;
    try {
        value = state.resultSelector(state.state);
    } catch (err) {
        subscriber.error(err);
        return undefined;
    }
    if (subscriber.closed) {
        return undefined;
    }
    subscriber.next(value);
    if (subscriber.closed) {
        return undefined;
    }
    return this.schedule(state);
}
//# sourceMappingURL=generate.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/iif.js
/** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */


function iif(condition, trueResult, falseResult) {
    if (trueResult === void 0) {
        trueResult = empty_EMPTY;
    }
    if (falseResult === void 0) {
        falseResult = empty_EMPTY;
    }
    return defer(function () {
        return condition() ? trueResult : falseResult;
    });
}
//# sourceMappingURL=iif.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isNumeric.js
/** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */

function isNumeric(val) {
    return !isArray(val) && val - parseFloat(val) + 1 >= 0;
}
//# sourceMappingURL=isNumeric.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/interval.js
/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */



function interval(period, scheduler) {
    if (period === void 0) {
        period = 0;
    }
    if (scheduler === void 0) {
        scheduler = async_async;
    }
    if (!isNumeric(period) || period < 0) {
        period = 0;
    }
    if (!scheduler || typeof scheduler.schedule !== 'function') {
        scheduler = async_async;
    }
    return new Observable_Observable(function (subscriber) {
        subscriber.add(scheduler.schedule(interval_dispatch, period, { subscriber: subscriber, counter: 0, period: period }));
        return subscriber;
    });
}
function interval_dispatch(state) {
    var subscriber = state.subscriber,
        counter = state.counter,
        period = state.period;
    subscriber.next(counter);
    this.schedule({ subscriber: subscriber, counter: counter + 1, period: period }, period);
}
//# sourceMappingURL=interval.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/merge.js
/** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */




function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    } else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_Observable) {
        return observables[0];
    }
    return mergeAll(concurrent)(fromArray(observables, scheduler));
}
//# sourceMappingURL=merge.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/never.js
/** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */


var NEVER = /*@__PURE__*/new Observable_Observable(noop);
function never() {
    return NEVER;
}
//# sourceMappingURL=never.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/onErrorResumeNext.js
/** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */




function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    if (sources.length === 0) {
        return empty_EMPTY;
    }
    var first = sources[0],
        remainder = sources.slice(1);
    if (sources.length === 1 && isArray(first)) {
        return onErrorResumeNext.apply(void 0, first);
    }
    return new Observable_Observable(function (subscriber) {
        var subNext = function subNext() {
            return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber));
        };
        return from(first).subscribe({
            next: function next(value) {
                subscriber.next(value);
            },
            error: subNext,
            complete: subNext
        });
    });
}
//# sourceMappingURL=onErrorResumeNext.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/pairs.js
/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */


function pairs(obj, scheduler) {
    if (!scheduler) {
        return new Observable_Observable(function (subscriber) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length && !subscriber.closed; i++) {
                var key = keys[i];
                if (obj.hasOwnProperty(key)) {
                    subscriber.next([key, obj[key]]);
                }
            }
            subscriber.complete();
        });
    } else {
        return new Observable_Observable(function (subscriber) {
            var keys = Object.keys(obj);
            var subscription = new Subscription_Subscription();
            subscription.add(scheduler.schedule(pairs_dispatch, 0, { keys: keys, index: 0, subscriber: subscriber, subscription: subscription, obj: obj }));
            return subscription;
        });
    }
}
function pairs_dispatch(state) {
    var keys = state.keys,
        index = state.index,
        subscriber = state.subscriber,
        subscription = state.subscription,
        obj = state.obj;
    if (!subscriber.closed) {
        if (index < keys.length) {
            var key = keys[index];
            subscriber.next([key, obj[key]]);
            subscription.add(this.schedule({ keys: keys, index: index + 1, subscriber: subscriber, subscription: subscription, obj: obj }));
        } else {
            subscriber.complete();
        }
    }
}
//# sourceMappingURL=pairs.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/race.js
/** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    if (observables.length === 1) {
        if (isArray(observables[0])) {
            observables = observables[0];
        } else {
            return observables[0];
        }
    }
    return fromArray(observables, undefined).lift(new RaceOperator());
}
var RaceOperator = /*@__PURE__*/function () {
    function RaceOperator() {}
    RaceOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new race_RaceSubscriber(subscriber));
    };
    return RaceOperator;
}();

var race_RaceSubscriber = /*@__PURE__*/function (_super) {
    __extends(RaceSubscriber, _super);
    function RaceSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasFirst = false;
        _this.observables = [];
        _this.subscriptions = [];
        return _this;
    }
    RaceSubscriber.prototype._next = function (observable) {
        this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        } else {
            for (var i = 0; i < len && !this.hasFirst; i++) {
                var observable = observables[i];
                var subscription = subscribeToResult(this, observable, observable, i);
                if (this.subscriptions) {
                    this.subscriptions.push(subscription);
                }
                this.add(subscription);
            }
            this.observables = null;
        }
    };
    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (var i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    var subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    };
    return RaceSubscriber;
}(OuterSubscriber_OuterSubscriber);

//# sourceMappingURL=race.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/range.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function range(start, count, scheduler) {
    if (start === void 0) {
        start = 0;
    }
    if (count === void 0) {
        count = 0;
    }
    return new Observable_Observable(function (subscriber) {
        var index = 0;
        var current = start;
        if (scheduler) {
            return scheduler.schedule(range_dispatch, 0, {
                index: index, count: count, start: start, subscriber: subscriber
            });
        } else {
            do {
                if (index++ >= count) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(current++);
                if (subscriber.closed) {
                    break;
                }
            } while (true);
        }
        return undefined;
    });
}
function range_dispatch(state) {
    var start = state.start,
        index = state.index,
        count = state.count,
        subscriber = state.subscriber;
    if (index >= count) {
        subscriber.complete();
        return;
    }
    subscriber.next(start);
    if (subscriber.closed) {
        return;
    }
    state.index = index + 1;
    state.start = start + 1;
    this.schedule(state);
}
//# sourceMappingURL=range.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/timer.js
/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */




function timer(dueTime, periodOrScheduler, scheduler) {
    if (dueTime === void 0) {
        dueTime = 0;
    }
    var period = -1;
    if (isNumeric(periodOrScheduler)) {
        period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
    } else if (isScheduler(periodOrScheduler)) {
        scheduler = periodOrScheduler;
    }
    if (!isScheduler(scheduler)) {
        scheduler = async_async;
    }
    return new Observable_Observable(function (subscriber) {
        var due = isNumeric(dueTime) ? dueTime : +dueTime - scheduler.now();
        return scheduler.schedule(timer_dispatch, due, {
            index: 0, period: period, subscriber: subscriber
        });
    });
}
function timer_dispatch(state) {
    var index = state.index,
        period = state.period,
        subscriber = state.subscriber;
    subscriber.next(index);
    if (subscriber.closed) {
        return;
    } else if (period === -1) {
        return subscriber.complete();
    }
    state.index = index + 1;
    this.schedule(state, period);
}
//# sourceMappingURL=timer.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/using.js
/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */



function using(resourceFactory, observableFactory) {
    return new Observable_Observable(function (subscriber) {
        var resource;
        try {
            resource = resourceFactory();
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var result;
        try {
            result = observableFactory(resource);
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var source = result ? from(result) : empty_EMPTY;
        var subscription = source.subscribe(subscriber);
        return function () {
            subscription.unsubscribe();
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
//# sourceMappingURL=using.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/zip.js
/** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_OuterSubscriber,_util_subscribeToResult,_.._internal_symbol_iterator PURE_IMPORTS_END */







function zip() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var resultSelector = observables[observables.length - 1];
    if (typeof resultSelector === 'function') {
        observables.pop();
    }
    return fromArray(observables, undefined).lift(new ZipOperator(resultSelector));
}
var ZipOperator = /*@__PURE__*/function () {
    function ZipOperator(resultSelector) {
        this.resultSelector = resultSelector;
    }
    ZipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new zip_ZipSubscriber(subscriber, this.resultSelector));
    };
    return ZipOperator;
}();

var zip_ZipSubscriber = /*@__PURE__*/function (_super) {
    __extends(ZipSubscriber, _super);
    function ZipSubscriber(destination, resultSelector, values) {
        if (values === void 0) {
            values = Object.create(null);
        }
        var _this = _super.call(this, destination) || this;
        _this.iterators = [];
        _this.active = 0;
        _this.resultSelector = typeof resultSelector === 'function' ? resultSelector : null;
        _this.values = values;
        return _this;
    }
    ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;
        if (isArray(value)) {
            iterators.push(new zip_StaticArrayIterator(value));
        } else if (typeof value[iterator_iterator] === 'function') {
            iterators.push(new StaticIterator(value[iterator_iterator]()));
        } else {
            iterators.push(new zip_ZipBufferIterator(this.destination, this, value));
        }
    };
    ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        if (len === 0) {
            this.destination.complete();
            return;
        }
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
                this.add(iterator.subscribe(iterator, i));
            } else {
                this.active--;
            }
        }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            var result = iterator.next();
            if (iterator.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        if (this.resultSelector) {
            this._tryresultSelector(args);
        } else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };
    ZipSubscriber.prototype._tryresultSelector = function (args) {
        var result;
        try {
            result = this.resultSelector.apply(this, args);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return ZipSubscriber;
}(Subscriber_Subscriber);

var StaticIterator = /*@__PURE__*/function () {
    function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
    }
    StaticIterator.prototype.hasValue = function () {
        return true;
    };
    StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };
    return StaticIterator;
}();
var zip_StaticArrayIterator = /*@__PURE__*/function () {
    function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    StaticArrayIterator.prototype[iterator_iterator] = function () {
        return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
    };
    StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
    };
    return StaticArrayIterator;
}();
var zip_ZipBufferIterator = /*@__PURE__*/function (_super) {
    __extends(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        _this.observable = observable;
        _this.stillUnsubscribed = true;
        _this.buffer = [];
        _this.isComplete = false;
        return _this;
    }
    ZipBufferIterator.prototype[iterator_iterator] = function () {
        return this;
    };
    ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { value: null, done: true };
        } else {
            return { value: buffer.shift(), done: false };
        }
    };
    ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        } else {
            this.destination.complete();
        }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
        return subscribeToResult(this, this.observable, this, index);
    };
    return ZipBufferIterator;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=zip.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/index.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */





















































//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/audit.js
/** PURE_IMPORTS_START tslib,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function audit(durationSelector) {
    return function auditOperatorFunction(source) {
        return source.lift(new AuditOperator(durationSelector));
    };
}
var AuditOperator = /*@__PURE__*/function () {
    function AuditOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    AuditOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new audit_AuditSubscriber(subscriber, this.durationSelector));
    };
    return AuditOperator;
}();
var audit_AuditSubscriber = /*@__PURE__*/function (_super) {
    __extends(AuditSubscriber, _super);
    function AuditSubscriber(destination, durationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        return _this;
    }
    AuditSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
            var duration = tryCatch(this.durationSelector)(value);
            if (duration === errorObject) {
                this.destination.error(errorObject.e);
            } else {
                var innerSubscription = subscribeToResult(this, duration);
                if (!innerSubscription || innerSubscription.closed) {
                    this.clearThrottle();
                } else {
                    this.add(this.throttled = innerSubscription);
                }
            }
        }
    };
    AuditSubscriber.prototype.clearThrottle = function () {
        var _a = this,
            value = _a.value,
            hasValue = _a.hasValue,
            throttled = _a.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
        if (hasValue) {
            this.value = null;
            this.hasValue = false;
            this.destination.next(value);
        }
    };
    AuditSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        this.clearThrottle();
    };
    AuditSubscriber.prototype.notifyComplete = function () {
        this.clearThrottle();
    };
    return AuditSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=audit.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/auditTime.js
/** PURE_IMPORTS_START _scheduler_async,_audit,_observable_timer PURE_IMPORTS_END */



function auditTime(duration, scheduler) {
    if (scheduler === void 0) {
        scheduler = async_async;
    }
    return audit(function () {
        return timer(duration, scheduler);
    });
}
//# sourceMappingURL=auditTime.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/buffer.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function buffer_buffer(closingNotifier) {
    return function bufferOperatorFunction(source) {
        return source.lift(new BufferOperator(closingNotifier));
    };
}
var BufferOperator = /*@__PURE__*/function () {
    function BufferOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
    }
    BufferOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new buffer_BufferSubscriber(subscriber, this.closingNotifier));
    };
    return BufferOperator;
}();
var buffer_BufferSubscriber = /*@__PURE__*/function (_super) {
    __extends(BufferSubscriber, _super);
    function BufferSubscriber(destination, closingNotifier) {
        var _this = _super.call(this, destination) || this;
        _this.buffer = [];
        _this.add(subscribeToResult(_this, closingNotifier));
        return _this;
    }
    BufferSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
    };
    return BufferSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=buffer.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/bufferCount.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) {
        startBufferEvery = null;
    }
    return function bufferCountOperatorFunction(source) {
        return source.lift(new BufferCountOperator(bufferSize, startBufferEvery));
    };
}
var BufferCountOperator = /*@__PURE__*/function () {
    function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        if (!startBufferEvery || bufferSize === startBufferEvery) {
            this.subscriberClass = bufferCount_BufferCountSubscriber;
        } else {
            this.subscriberClass = bufferCount_BufferSkipCountSubscriber;
        }
    }
    BufferCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
    };
    return BufferCountOperator;
}();
var bufferCount_BufferCountSubscriber = /*@__PURE__*/function (_super) {
    __extends(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.buffer = [];
        return _this;
    }
    BufferCountSubscriber.prototype._next = function (value) {
        var buffer = this.buffer;
        buffer.push(value);
        if (buffer.length == this.bufferSize) {
            this.destination.next(buffer);
            this.buffer = [];
        }
    };
    BufferCountSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer.length > 0) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    return BufferCountSubscriber;
}(Subscriber_Subscriber);
var bufferCount_BufferSkipCountSubscriber = /*@__PURE__*/function (_super) {
    __extends(BufferSkipCountSubscriber, _super);
    function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.startBufferEvery = startBufferEvery;
        _this.buffers = [];
        _this.count = 0;
        return _this;
    }
    BufferSkipCountSubscriber.prototype._next = function (value) {
        var _a = this,
            bufferSize = _a.bufferSize,
            startBufferEvery = _a.startBufferEvery,
            buffers = _a.buffers,
            count = _a.count;
        this.count++;
        if (count % startBufferEvery === 0) {
            buffers.push([]);
        }
        for (var i = buffers.length; i--;) {
            var buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                buffers.splice(i, 1);
                this.destination.next(buffer);
            }
        }
    };
    BufferSkipCountSubscriber.prototype._complete = function () {
        var _a = this,
            buffers = _a.buffers,
            destination = _a.destination;
        while (buffers.length > 0) {
            var buffer = buffers.shift();
            if (buffer.length > 0) {
                destination.next(buffer);
            }
        }
        _super.prototype._complete.call(this);
    };
    return BufferSkipCountSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=bufferCount.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/bufferTime.js
/** PURE_IMPORTS_START tslib,_scheduler_async,_Subscriber,_util_isScheduler PURE_IMPORTS_END */




function bufferTime(bufferTimeSpan) {
    var length = arguments.length;
    var scheduler = async_async;
    if (isScheduler(arguments[arguments.length - 1])) {
        scheduler = arguments[arguments.length - 1];
        length--;
    }
    var bufferCreationInterval = null;
    if (length >= 2) {
        bufferCreationInterval = arguments[1];
    }
    var maxBufferSize = Number.POSITIVE_INFINITY;
    if (length >= 3) {
        maxBufferSize = arguments[2];
    }
    return function bufferTimeOperatorFunction(source) {
        return source.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
    };
}
var BufferTimeOperator = /*@__PURE__*/function () {
    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.maxBufferSize = maxBufferSize;
        this.scheduler = scheduler;
    }
    BufferTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new bufferTime_BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
    };
    return BufferTimeOperator;
}();
var Context = /*@__PURE__*/function () {
    function Context() {
        this.buffer = [];
    }
    return Context;
}();
var bufferTime_BufferTimeSubscriber = /*@__PURE__*/function (_super) {
    __extends(BufferTimeSubscriber, _super);
    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.bufferTimeSpan = bufferTimeSpan;
        _this.bufferCreationInterval = bufferCreationInterval;
        _this.maxBufferSize = maxBufferSize;
        _this.scheduler = scheduler;
        _this.contexts = [];
        var context = _this.openContext();
        _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
        if (_this.timespanOnly) {
            var timeSpanOnlyState = { subscriber: _this, context: context, bufferTimeSpan: bufferTimeSpan };
            _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        } else {
            var closeState = { subscriber: _this, context: context };
            var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: _this, scheduler: scheduler };
            _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
            _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }
        return _this;
    }
    BufferTimeSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        var filledBufferContext;
        for (var i = 0; i < len; i++) {
            var context_1 = contexts[i];
            var buffer = context_1.buffer;
            buffer.push(value);
            if (buffer.length == this.maxBufferSize) {
                filledBufferContext = context_1;
            }
        }
        if (filledBufferContext) {
            this.onBufferFull(filledBufferContext);
        }
    };
    BufferTimeSubscriber.prototype._error = function (err) {
        this.contexts.length = 0;
        _super.prototype._error.call(this, err);
    };
    BufferTimeSubscriber.prototype._complete = function () {
        var _a = this,
            contexts = _a.contexts,
            destination = _a.destination;
        while (contexts.length > 0) {
            var context_2 = contexts.shift();
            destination.next(context_2.buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferTimeSubscriber.prototype._unsubscribe = function () {
        this.contexts = null;
    };
    BufferTimeSubscriber.prototype.onBufferFull = function (context) {
        this.closeContext(context);
        var closeAction = context.closeAction;
        closeAction.unsubscribe();
        this.remove(closeAction);
        if (!this.closed && this.timespanOnly) {
            context = this.openContext();
            var bufferTimeSpan = this.bufferTimeSpan;
            var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
            this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
    };
    BufferTimeSubscriber.prototype.openContext = function () {
        var context = new Context();
        this.contexts.push(context);
        return context;
    };
    BufferTimeSubscriber.prototype.closeContext = function (context) {
        this.destination.next(context.buffer);
        var contexts = this.contexts;
        var spliceIndex = contexts ? contexts.indexOf(context) : -1;
        if (spliceIndex >= 0) {
            contexts.splice(contexts.indexOf(context), 1);
        }
    };
    return BufferTimeSubscriber;
}(Subscriber_Subscriber);
function dispatchBufferTimeSpanOnly(state) {
    var subscriber = state.subscriber;
    var prevContext = state.context;
    if (prevContext) {
        subscriber.closeContext(prevContext);
    }
    if (!subscriber.closed) {
        state.context = subscriber.openContext();
        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
    }
}
function dispatchBufferCreation(state) {
    var bufferCreationInterval = state.bufferCreationInterval,
        bufferTimeSpan = state.bufferTimeSpan,
        subscriber = state.subscriber,
        scheduler = state.scheduler;
    var context = subscriber.openContext();
    var action = this;
    if (!subscriber.closed) {
        subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, context: context }));
        action.schedule(state, bufferCreationInterval);
    }
}
function dispatchBufferClose(arg) {
    var subscriber = arg.subscriber,
        context = arg.context;
    subscriber.closeContext(context);
}
//# sourceMappingURL=bufferTime.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/bufferToggle.js
/** PURE_IMPORTS_START tslib,_Subscription,_util_subscribeToResult,_OuterSubscriber PURE_IMPORTS_END */




function bufferToggle(openings, closingSelector) {
    return function bufferToggleOperatorFunction(source) {
        return source.lift(new BufferToggleOperator(openings, closingSelector));
    };
}
var BufferToggleOperator = /*@__PURE__*/function () {
    function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    BufferToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new bufferToggle_BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return BufferToggleOperator;
}();
var bufferToggle_BufferToggleSubscriber = /*@__PURE__*/function (_super) {
    __extends(BufferToggleSubscriber, _super);
    function BufferToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(subscribeToResult(_this, openings));
        return _this;
    }
    BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
        }
    };
    BufferToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context_1 = contexts.shift();
            context_1.subscription.unsubscribe();
            context_1.buffer = null;
            context_1.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
    };
    BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context_2 = contexts.shift();
            this.destination.next(context_2.buffer);
            context_2.subscription.unsubscribe();
            context_2.buffer = null;
            context_2.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
    };
    BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
    };
    BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
        this.closeBuffer(innerSub.context);
    };
    BufferToggleSubscriber.prototype.openBuffer = function (value) {
        try {
            var closingSelector = this.closingSelector;
            var closingNotifier = closingSelector.call(this, value);
            if (closingNotifier) {
                this.trySubscribe(closingNotifier);
            }
        } catch (err) {
            this._error(err);
        }
    };
    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;
        if (contexts && context) {
            var buffer = context.buffer,
                subscription = context.subscription;
            this.destination.next(buffer);
            contexts.splice(contexts.indexOf(context), 1);
            this.remove(subscription);
            subscription.unsubscribe();
        }
    };
    BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new Subscription_Subscription();
        var context = { buffer: buffer, subscription: subscription };
        contexts.push(context);
        var innerSubscription = subscribeToResult(this, closingNotifier, context);
        if (!innerSubscription || innerSubscription.closed) {
            this.closeBuffer(context);
        } else {
            innerSubscription.context = context;
            this.add(innerSubscription);
            subscription.add(innerSubscription);
        }
    };
    return BufferToggleSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=bufferToggle.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/bufferWhen.js
/** PURE_IMPORTS_START tslib,_Subscription,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */






function bufferWhen(closingSelector) {
    return function (source) {
        return source.lift(new BufferWhenOperator(closingSelector));
    };
}
var BufferWhenOperator = /*@__PURE__*/function () {
    function BufferWhenOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    BufferWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new bufferWhen_BufferWhenSubscriber(subscriber, this.closingSelector));
    };
    return BufferWhenOperator;
}();
var bufferWhen_BufferWhenSubscriber = /*@__PURE__*/function (_super) {
    __extends(BufferWhenSubscriber, _super);
    function BufferWhenSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.closingSelector = closingSelector;
        _this.subscribing = false;
        _this.openBuffer();
        return _this;
    }
    BufferWhenSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferWhenSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferWhenSubscriber.prototype._unsubscribe = function () {
        this.buffer = null;
        this.subscribing = false;
    };
    BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openBuffer();
    };
    BufferWhenSubscriber.prototype.notifyComplete = function () {
        if (this.subscribing) {
            this.complete();
        } else {
            this.openBuffer();
        }
    };
    BufferWhenSubscriber.prototype.openBuffer = function () {
        var closingSubscription = this.closingSubscription;
        if (closingSubscription) {
            this.remove(closingSubscription);
            closingSubscription.unsubscribe();
        }
        var buffer = this.buffer;
        if (this.buffer) {
            this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier = tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject) {
            this.error(errorObject.e);
        } else {
            closingSubscription = new Subscription_Subscription();
            this.closingSubscription = closingSubscription;
            this.add(closingSubscription);
            this.subscribing = true;
            closingSubscription.add(subscribeToResult(this, closingNotifier));
            this.subscribing = false;
        }
    };
    return BufferWhenSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=bufferWhen.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/catchError.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult PURE_IMPORTS_END */




function catchError(selector) {
    return function catchErrorOperatorFunction(source) {
        var operator = new CatchOperator(selector);
        var caught = source.lift(operator);
        return operator.caught = caught;
    };
}
var CatchOperator = /*@__PURE__*/function () {
    function CatchOperator(selector) {
        this.selector = selector;
    }
    CatchOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new catchError_CatchSubscriber(subscriber, this.selector, this.caught));
    };
    return CatchOperator;
}();
var catchError_CatchSubscriber = /*@__PURE__*/function (_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        var _this = _super.call(this, destination) || this;
        _this.selector = selector;
        _this.caught = caught;
        return _this;
    }
    CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var result = void 0;
            try {
                result = this.selector(err, this.caught);
            } catch (err2) {
                _super.prototype.error.call(this, err2);
                return;
            }
            this._unsubscribeAndRecycle();
            var innerSubscriber = new InnerSubscriber_InnerSubscriber(this, undefined, undefined);
            this.add(innerSubscriber);
            subscribeToResult(this, result, undefined, undefined, innerSubscriber);
        }
    };
    return CatchSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=catchError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/combineAll.js
/** PURE_IMPORTS_START _observable_combineLatest PURE_IMPORTS_END */

function combineAll(project) {
    return function (source) {
        return source.lift(new CombineLatestOperator(project));
    };
}
//# sourceMappingURL=combineAll.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/combineLatest.js
/** PURE_IMPORTS_START _util_isArray,_observable_combineLatest,_observable_from PURE_IMPORTS_END */



var none = {};
function combineLatest_combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    if (observables.length === 1 && isArray(observables[0])) {
        observables = observables[0].slice();
    }
    return function (source) {
        return source.lift.call(from([source].concat(observables)), new CombineLatestOperator(project));
    };
}
//# sourceMappingURL=combineLatest.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/concat.js
/** PURE_IMPORTS_START _observable_concat PURE_IMPORTS_END */

function concat_concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return function (source) {
        return source.lift.call(concat.apply(void 0, [source].concat(observables)));
    };
}
//# sourceMappingURL=concat.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/concatMap.js
/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

function concatMap(project, resultSelector) {
    return mergeMap(project, resultSelector, 1);
}
//# sourceMappingURL=concatMap.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/concatMapTo.js
/** PURE_IMPORTS_START _concatMap PURE_IMPORTS_END */

function concatMapTo(innerObservable, resultSelector) {
    return concatMap(function () {
        return innerObservable;
    }, resultSelector);
}
//# sourceMappingURL=concatMapTo.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/count.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function count_count(predicate) {
    return function (source) {
        return source.lift(new CountOperator(predicate, source));
    };
}
var CountOperator = /*@__PURE__*/function () {
    function CountOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    CountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new count_CountSubscriber(subscriber, this.predicate, this.source));
    };
    return CountOperator;
}();
var count_CountSubscriber = /*@__PURE__*/function (_super) {
    __extends(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.count = 0;
        _this.index = 0;
        return _this;
    }
    CountSubscriber.prototype._next = function (value) {
        if (this.predicate) {
            this._tryPredicate(value);
        } else {
            this.count++;
        }
    };
    CountSubscriber.prototype._tryPredicate = function (value) {
        var result;
        try {
            result = this.predicate(value, this.index++, this.source);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.count++;
        }
    };
    CountSubscriber.prototype._complete = function () {
        this.destination.next(this.count);
        this.destination.complete();
    };
    return CountSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=count.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/debounce.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function debounce(durationSelector) {
    return function (source) {
        return source.lift(new DebounceOperator(durationSelector));
    };
}
var DebounceOperator = /*@__PURE__*/function () {
    function DebounceOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    DebounceOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new debounce_DebounceSubscriber(subscriber, this.durationSelector));
    };
    return DebounceOperator;
}();
var debounce_DebounceSubscriber = /*@__PURE__*/function (_super) {
    __extends(DebounceSubscriber, _super);
    function DebounceSubscriber(destination, durationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        _this.durationSubscription = null;
        return _this;
    }
    DebounceSubscriber.prototype._next = function (value) {
        try {
            var result = this.durationSelector.call(this, value);
            if (result) {
                this._tryNext(value, result);
            }
        } catch (err) {
            this.destination.error(err);
        }
    };
    DebounceSubscriber.prototype._complete = function () {
        this.emitValue();
        this.destination.complete();
    };
    DebounceSubscriber.prototype._tryNext = function (value, duration) {
        var subscription = this.durationSubscription;
        this.value = value;
        this.hasValue = true;
        if (subscription) {
            subscription.unsubscribe();
            this.remove(subscription);
        }
        subscription = subscribeToResult(this, duration);
        if (subscription && !subscription.closed) {
            this.add(this.durationSubscription = subscription);
        }
    };
    DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    };
    DebounceSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
    };
    DebounceSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
            var value = this.value;
            var subscription = this.durationSubscription;
            if (subscription) {
                this.durationSubscription = null;
                subscription.unsubscribe();
                this.remove(subscription);
            }
            this.value = null;
            this.hasValue = false;
            _super.prototype._next.call(this, value);
        }
    };
    return DebounceSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=debounce.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/debounceTime.js
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */



function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) {
        scheduler = async_async;
    }
    return function (source) {
        return source.lift(new DebounceTimeOperator(dueTime, scheduler));
    };
}
var DebounceTimeOperator = /*@__PURE__*/function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new debounceTime_DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
}();
var debounceTime_DebounceTimeSubscriber = /*@__PURE__*/function (_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.dueTime = dueTime;
        _this.scheduler = scheduler;
        _this.debouncedSubscription = null;
        _this.lastValue = null;
        _this.hasValue = false;
        return _this;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(debounceTime_dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            var lastValue = this.lastValue;
            this.lastValue = null;
            this.hasValue = false;
            this.destination.next(lastValue);
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(Subscriber_Subscriber);
function debounceTime_dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
//# sourceMappingURL=debounceTime.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/defaultIfEmpty.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) {
        defaultValue = null;
    }
    return function (source) {
        return source.lift(new DefaultIfEmptyOperator(defaultValue));
    };
}
var DefaultIfEmptyOperator = /*@__PURE__*/function () {
    function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new defaultIfEmpty_DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    };
    return DefaultIfEmptyOperator;
}();
var defaultIfEmpty_DefaultIfEmptySubscriber = /*@__PURE__*/function (_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        var _this = _super.call(this, destination) || this;
        _this.defaultValue = defaultValue;
        _this.isEmpty = true;
        return _this;
    }
    DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=defaultIfEmpty.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/isDate.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
//# sourceMappingURL=isDate.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/delay.js
/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_Subscriber,_Notification PURE_IMPORTS_END */





function delay_delay(delay, scheduler) {
    if (scheduler === void 0) {
        scheduler = async_async;
    }
    var absoluteDelay = isDate(delay);
    var delayFor = absoluteDelay ? +delay - scheduler.now() : Math.abs(delay);
    return function (source) {
        return source.lift(new DelayOperator(delayFor, scheduler));
    };
}
var DelayOperator = /*@__PURE__*/function () {
    function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new delay_DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
}();
var delay_DelaySubscriber = /*@__PURE__*/function (_super) {
    __extends(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.delay = delay;
        _this.scheduler = scheduler;
        _this.queue = [];
        _this.active = false;
        _this.errored = false;
        return _this;
    }
    DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
        } else {
            this.unsubscribe();
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification_Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification_Notification.createComplete());
    };
    return DelaySubscriber;
}(Subscriber_Subscriber);
var DelayMessage = /*@__PURE__*/function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
}();
//# sourceMappingURL=delay.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/delayWhen.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return function (source) {
            return new delayWhen_SubscriptionDelayObservable(source, subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));
        };
    }
    return function (source) {
        return source.lift(new DelayWhenOperator(delayDurationSelector));
    };
}
var DelayWhenOperator = /*@__PURE__*/function () {
    function DelayWhenOperator(delayDurationSelector) {
        this.delayDurationSelector = delayDurationSelector;
    }
    DelayWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new delayWhen_DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    };
    return DelayWhenOperator;
}();
var delayWhen_DelayWhenSubscriber = /*@__PURE__*/function (_super) {
    __extends(DelayWhenSubscriber, _super);
    function DelayWhenSubscriber(destination, delayDurationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.delayDurationSelector = delayDurationSelector;
        _this.completed = false;
        _this.delayNotifierSubscriptions = [];
        _this.index = 0;
        return _this;
    }
    DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        var value = this.removeSubscription(innerSub);
        if (value) {
            this.destination.next(value);
        }
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype._next = function (value) {
        var index = this.index++;
        try {
            var delayNotifier = this.delayDurationSelector(value, index);
            if (delayNotifier) {
                this.tryDelay(delayNotifier, value);
            }
        } catch (err) {
            this.destination.error(err);
        }
    };
    DelayWhenSubscriber.prototype._complete = function () {
        this.completed = true;
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
        subscription.unsubscribe();
        var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
        if (subscriptionIdx !== -1) {
            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
        }
        return subscription.outerValue;
    };
    DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
        var notifierSubscription = subscribeToResult(this, delayNotifier, value);
        if (notifierSubscription && !notifierSubscription.closed) {
            this.add(notifierSubscription);
            this.delayNotifierSubscriptions.push(notifierSubscription);
        }
    };
    DelayWhenSubscriber.prototype.tryComplete = function () {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
            this.destination.complete();
        }
    };
    return DelayWhenSubscriber;
}(OuterSubscriber_OuterSubscriber);
var delayWhen_SubscriptionDelayObservable = /*@__PURE__*/function (_super) {
    __extends(SubscriptionDelayObservable, _super);
    function SubscriptionDelayObservable(source, subscriptionDelay) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subscriptionDelay = subscriptionDelay;
        return _this;
    }
    SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
        this.subscriptionDelay.subscribe(new delayWhen_SubscriptionDelaySubscriber(subscriber, this.source));
    };
    return SubscriptionDelayObservable;
}(Observable_Observable);
var delayWhen_SubscriptionDelaySubscriber = /*@__PURE__*/function (_super) {
    __extends(SubscriptionDelaySubscriber, _super);
    function SubscriptionDelaySubscriber(parent, source) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.source = source;
        _this.sourceSubscribed = false;
        return _this;
    }
    SubscriptionDelaySubscriber.prototype._next = function (unused) {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype._error = function (err) {
        this.unsubscribe();
        this.parent.error(err);
    };
    SubscriptionDelaySubscriber.prototype._complete = function () {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
        if (!this.sourceSubscribed) {
            this.sourceSubscribed = true;
            this.unsubscribe();
            this.source.subscribe(this.parent);
        }
    };
    return SubscriptionDelaySubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=delayWhen.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/dematerialize.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function dematerialize() {
    return function dematerializeOperatorFunction(source) {
        return source.lift(new DeMaterializeOperator());
    };
}
var DeMaterializeOperator = /*@__PURE__*/function () {
    function DeMaterializeOperator() {}
    DeMaterializeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new dematerialize_DeMaterializeSubscriber(subscriber));
    };
    return DeMaterializeOperator;
}();
var dematerialize_DeMaterializeSubscriber = /*@__PURE__*/function (_super) {
    __extends(DeMaterializeSubscriber, _super);
    function DeMaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    DeMaterializeSubscriber.prototype._next = function (value) {
        value.observe(this.destination);
    };
    return DeMaterializeSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=dematerialize.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/distinct.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function distinct(keySelector, flushes) {
    return function (source) {
        return source.lift(new DistinctOperator(keySelector, flushes));
    };
}
var DistinctOperator = /*@__PURE__*/function () {
    function DistinctOperator(keySelector, flushes) {
        this.keySelector = keySelector;
        this.flushes = flushes;
    }
    DistinctOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new distinct_DistinctSubscriber(subscriber, this.keySelector, this.flushes));
    };
    return DistinctOperator;
}();
var distinct_DistinctSubscriber = /*@__PURE__*/function (_super) {
    __extends(DistinctSubscriber, _super);
    function DistinctSubscriber(destination, keySelector, flushes) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.values = new Set();
        if (flushes) {
            _this.add(subscribeToResult(_this, flushes));
        }
        return _this;
    }
    DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values.clear();
    };
    DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DistinctSubscriber.prototype._next = function (value) {
        if (this.keySelector) {
            this._useKeySelector(value);
        } else {
            this._finalizeNext(value, value);
        }
    };
    DistinctSubscriber.prototype._useKeySelector = function (value) {
        var key;
        var destination = this.destination;
        try {
            key = this.keySelector(value);
        } catch (err) {
            destination.error(err);
            return;
        }
        this._finalizeNext(key, value);
    };
    DistinctSubscriber.prototype._finalizeNext = function (key, value) {
        var values = this.values;
        if (!values.has(key)) {
            values.add(key);
            this.destination.next(value);
        }
    };
    return DistinctSubscriber;
}(OuterSubscriber_OuterSubscriber);

//# sourceMappingURL=distinct.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/distinctUntilChanged.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_tryCatch,_util_errorObject PURE_IMPORTS_END */




function distinctUntilChanged(compare, keySelector) {
    return function (source) {
        return source.lift(new DistinctUntilChangedOperator(compare, keySelector));
    };
}
var DistinctUntilChangedOperator = /*@__PURE__*/function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new distinctUntilChanged_DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
}();
var distinctUntilChanged_DistinctUntilChangedSubscriber = /*@__PURE__*/function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.hasKey = false;
        if (typeof compare === 'function') {
            _this.compare = compare;
        }
        return _this;
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
            key = tryCatch(this.keySelector)(value);
            if (key === errorObject) {
                return this.destination.error(errorObject.e);
            }
        }
        var result = false;
        if (this.hasKey) {
            result = tryCatch(this.compare)(this.key, key);
            if (result === errorObject) {
                return this.destination.error(errorObject.e);
            }
        } else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=distinctUntilChanged.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/distinctUntilKeyChanged.js
/** PURE_IMPORTS_START _distinctUntilChanged PURE_IMPORTS_END */

function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged(function (x, y) {
        return compare ? compare(x[key], y[key]) : x[key] === y[key];
    });
}
//# sourceMappingURL=distinctUntilKeyChanged.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/filter.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var FilterOperator = /*@__PURE__*/function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new filter_FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}();
var filter_FilterSubscriber = /*@__PURE__*/function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
    }
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=filter.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/tap.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_noop,_util_isFunction PURE_IMPORTS_END */




function tap(nextOrObserver, error, complete) {
    return function tapOperatorFunction(source) {
        return source.lift(new DoOperator(nextOrObserver, error, complete));
    };
}
var DoOperator = /*@__PURE__*/function () {
    function DoOperator(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new tap_TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
}();
var tap_TapSubscriber = /*@__PURE__*/function (_super) {
    __extends(TapSubscriber, _super);
    function TapSubscriber(destination, observerOrNext, error, complete) {
        var _this = _super.call(this, destination) || this;
        _this._tapNext = noop;
        _this._tapError = noop;
        _this._tapComplete = noop;
        _this._tapError = error || noop;
        _this._tapComplete = complete || noop;
        if (isFunction(observerOrNext)) {
            _this._context = _this;
            _this._tapNext = observerOrNext;
        } else if (observerOrNext) {
            _this._context = observerOrNext;
            _this._tapNext = observerOrNext.next || noop;
            _this._tapError = observerOrNext.error || noop;
            _this._tapComplete = observerOrNext.complete || noop;
        }
        return _this;
    }
    TapSubscriber.prototype._next = function (value) {
        try {
            this._tapNext.call(this._context, value);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(value);
    };
    TapSubscriber.prototype._error = function (err) {
        try {
            this._tapError.call(this._context, err);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.error(err);
    };
    TapSubscriber.prototype._complete = function () {
        try {
            this._tapComplete.call(this._context);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        return this.destination.complete();
    };
    return TapSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=tap.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/throwIfEmpty.js
/** PURE_IMPORTS_START _tap,_util_EmptyError PURE_IMPORTS_END */


var throwIfEmpty_throwIfEmpty = function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) {
        errorFactory = defaultErrorFactory;
    }
    return tap({
        hasValue: false,
        next: function next() {
            this.hasValue = true;
        },
        complete: function complete() {
            if (!this.hasValue) {
                throw errorFactory();
            }
        }
    });
};
function defaultErrorFactory() {
    return new EmptyError();
}
//# sourceMappingURL=throwIfEmpty.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/take.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */




function take(count) {
    return function (source) {
        if (count === 0) {
            return empty_empty();
        } else {
            return source.lift(new take_TakeOperator(count));
        }
    };
}
var take_TakeOperator = /*@__PURE__*/function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError();
        }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new take_TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
}();
var take_TakeSubscriber = /*@__PURE__*/function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.count = 0;
        return _this;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        var count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=take.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/elementAt.js
/** PURE_IMPORTS_START _util_ArgumentOutOfRangeError,_filter,_throwIfEmpty,_defaultIfEmpty,_take PURE_IMPORTS_END */





function elementAt(index, defaultValue) {
    if (index < 0) {
        throw new ArgumentOutOfRangeError();
    }
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(filter(function (v, i) {
            return i === index;
        }), take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty_throwIfEmpty(function () {
            return new ArgumentOutOfRangeError();
        }));
    };
}
//# sourceMappingURL=elementAt.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/endWith.js
/** PURE_IMPORTS_START _observable_fromArray,_observable_scalar,_observable_empty,_observable_concat,_util_isScheduler PURE_IMPORTS_END */





function endWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i] = arguments[_i];
    }
    return function (source) {
        var scheduler = array[array.length - 1];
        if (isScheduler(scheduler)) {
            array.pop();
        } else {
            scheduler = null;
        }
        var len = array.length;
        if (len === 1 && !scheduler) {
            return concat(source, scalar(array[0]));
        } else if (len > 0) {
            return concat(source, fromArray(array, scheduler));
        } else {
            return concat(source, empty_empty(scheduler));
        }
    };
}
//# sourceMappingURL=endWith.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/every.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function every(predicate, thisArg) {
    return function (source) {
        return source.lift(new EveryOperator(predicate, thisArg, source));
    };
}
var EveryOperator = /*@__PURE__*/function () {
    function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    EveryOperator.prototype.call = function (observer, source) {
        return source.subscribe(new every_EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    };
    return EveryOperator;
}();
var every_EverySubscriber = /*@__PURE__*/function (_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.source = source;
        _this.index = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
        var result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    };
    EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return EverySubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=every.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/exhaust.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function exhaust() {
    return function (source) {
        return source.lift(new SwitchFirstOperator());
    };
}
var SwitchFirstOperator = /*@__PURE__*/function () {
    function SwitchFirstOperator() {}
    SwitchFirstOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new exhaust_SwitchFirstSubscriber(subscriber));
    };
    return SwitchFirstOperator;
}();
var exhaust_SwitchFirstSubscriber = /*@__PURE__*/function (_super) {
    __extends(SwitchFirstSubscriber, _super);
    function SwitchFirstSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasCompleted = false;
        _this.hasSubscription = false;
        return _this;
    }
    SwitchFirstSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            this.hasSubscription = true;
            this.add(subscribeToResult(this, value));
        }
    };
    SwitchFirstSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    };
    SwitchFirstSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return SwitchFirstSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=exhaust.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/exhaustMap.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult,_map,_observable_from PURE_IMPORTS_END */






function exhaustMap(project, resultSelector) {
    if (resultSelector) {
        return function (source) {
            return source.pipe(exhaustMap(function (a, i) {
                return from(project(a, i)).pipe(map(function (b, ii) {
                    return resultSelector(a, b, i, ii);
                }));
            }));
        };
    }
    return function (source) {
        return source.lift(new ExhauseMapOperator(project));
    };
}
var ExhauseMapOperator = /*@__PURE__*/function () {
    function ExhauseMapOperator(project) {
        this.project = project;
    }
    ExhauseMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new exhaustMap_ExhaustMapSubscriber(subscriber, this.project));
    };
    return ExhauseMapOperator;
}();
var exhaustMap_ExhaustMapSubscriber = /*@__PURE__*/function (_super) {
    __extends(ExhaustMapSubscriber, _super);
    function ExhaustMapSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.hasSubscription = false;
        _this.hasCompleted = false;
        _this.index = 0;
        return _this;
    }
    ExhaustMapSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            this.tryNext(value);
        }
    };
    ExhaustMapSubscriber.prototype.tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.hasSubscription = true;
        this._innerSub(result, value, index);
    };
    ExhaustMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscriber = new InnerSubscriber_InnerSubscriber(this, undefined, undefined);
        this.add(innerSubscriber);
        subscribeToResult(this, result, value, index, innerSubscriber);
    };
    ExhaustMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    };
    ExhaustMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    ExhaustMapSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    ExhaustMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return ExhaustMapSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=exhaustMap.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/expand.js
/** PURE_IMPORTS_START tslib,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    if (scheduler === void 0) {
        scheduler = undefined;
    }
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return function (source) {
        return source.lift(new ExpandOperator(project, concurrent, scheduler));
    };
}
var ExpandOperator = /*@__PURE__*/function () {
    function ExpandOperator(project, concurrent, scheduler) {
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
    }
    ExpandOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new expand_ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
    };
    return ExpandOperator;
}();

var expand_ExpandSubscriber = /*@__PURE__*/function (_super) {
    __extends(ExpandSubscriber, _super);
    function ExpandSubscriber(destination, project, concurrent, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.scheduler = scheduler;
        _this.index = 0;
        _this.active = 0;
        _this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            _this.buffer = [];
        }
        return _this;
    }
    ExpandSubscriber.dispatch = function (arg) {
        var subscriber = arg.subscriber,
            result = arg.result,
            value = arg.value,
            index = arg.index;
        subscriber.subscribeToProjection(result, value, index);
    };
    ExpandSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (destination.closed) {
            this._complete();
            return;
        }
        var index = this.index++;
        if (this.active < this.concurrent) {
            destination.next(value);
            var result = tryCatch(this.project)(value, index);
            if (result === errorObject) {
                destination.error(errorObject.e);
            } else if (!this.scheduler) {
                this.subscribeToProjection(result, value, index);
            } else {
                var state = { subscriber: this, result: result, value: value, index: index };
                this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
            }
        } else {
            this.buffer.push(value);
        }
    };
    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
        this.active++;
        this.add(subscribeToResult(this, result, value, index));
    };
    ExpandSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._next(innerValue);
    };
    ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    return ExpandSubscriber;
}(OuterSubscriber_OuterSubscriber);

//# sourceMappingURL=expand.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/finalize.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription PURE_IMPORTS_END */



function finalize(callback) {
    return function (source) {
        return source.lift(new FinallyOperator(callback));
    };
}
var FinallyOperator = /*@__PURE__*/function () {
    function FinallyOperator(callback) {
        this.callback = callback;
    }
    FinallyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new finalize_FinallySubscriber(subscriber, this.callback));
    };
    return FinallyOperator;
}();
var finalize_FinallySubscriber = /*@__PURE__*/function (_super) {
    __extends(FinallySubscriber, _super);
    function FinallySubscriber(destination, callback) {
        var _this = _super.call(this, destination) || this;
        _this.add(new Subscription_Subscription(callback));
        return _this;
    }
    return FinallySubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=finalize.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/find.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function find(predicate, thisArg) {
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate is not a function');
    }
    return function (source) {
        return source.lift(new FindValueOperator(predicate, source, false, thisArg));
    };
}
var FindValueOperator = /*@__PURE__*/function () {
    function FindValueOperator(predicate, source, yieldIndex, thisArg) {
        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
    }
    FindValueOperator.prototype.call = function (observer, source) {
        return source.subscribe(new find_FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
    };
    return FindValueOperator;
}();

var find_FindValueSubscriber = /*@__PURE__*/function (_super) {
    __extends(FindValueSubscriber, _super);
    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.yieldIndex = yieldIndex;
        _this.thisArg = thisArg;
        _this.index = 0;
        return _this;
    }
    FindValueSubscriber.prototype.notifyComplete = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
        this.unsubscribe();
    };
    FindValueSubscriber.prototype._next = function (value) {
        var _a = this,
            predicate = _a.predicate,
            thisArg = _a.thisArg;
        var index = this.index++;
        try {
            var result = predicate.call(thisArg || this, value, index, this.source);
            if (result) {
                this.notifyComplete(this.yieldIndex ? index : value);
            }
        } catch (err) {
            this.destination.error(err);
        }
    };
    FindValueSubscriber.prototype._complete = function () {
        this.notifyComplete(this.yieldIndex ? -1 : undefined);
    };
    return FindValueSubscriber;
}(Subscriber_Subscriber);

//# sourceMappingURL=find.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/findIndex.js
/** PURE_IMPORTS_START _operators_find PURE_IMPORTS_END */

function findIndex(predicate, thisArg) {
    return function (source) {
        return source.lift(new FindValueOperator(predicate, source, true, thisArg));
    };
}
//# sourceMappingURL=findIndex.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/first.js
/** PURE_IMPORTS_START _util_EmptyError,_filter,_take,_defaultIfEmpty,_throwIfEmpty,_util_identity PURE_IMPORTS_END */






function first_first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter(function (v, i) {
            return predicate(v, i, source);
        }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty_throwIfEmpty(function () {
            return new EmptyError();
        }));
    };
}
//# sourceMappingURL=first.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/ignoreElements.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function ignoreElements() {
    return function ignoreElementsOperatorFunction(source) {
        return source.lift(new IgnoreElementsOperator());
    };
}
var IgnoreElementsOperator = /*@__PURE__*/function () {
    function IgnoreElementsOperator() {}
    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ignoreElements_IgnoreElementsSubscriber(subscriber));
    };
    return IgnoreElementsOperator;
}();
var ignoreElements_IgnoreElementsSubscriber = /*@__PURE__*/function (_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IgnoreElementsSubscriber.prototype._next = function (unused) {};
    return IgnoreElementsSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=ignoreElements.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/isEmpty.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function isEmpty() {
    return function (source) {
        return source.lift(new IsEmptyOperator());
    };
}
var IsEmptyOperator = /*@__PURE__*/function () {
    function IsEmptyOperator() {}
    IsEmptyOperator.prototype.call = function (observer, source) {
        return source.subscribe(new isEmpty_IsEmptySubscriber(observer));
    };
    return IsEmptyOperator;
}();
var isEmpty_IsEmptySubscriber = /*@__PURE__*/function (_super) {
    __extends(IsEmptySubscriber, _super);
    function IsEmptySubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
        var destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
    };
    IsEmptySubscriber.prototype._next = function (value) {
        this.notifyComplete(false);
    };
    IsEmptySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return IsEmptySubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=isEmpty.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/takeLast.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */




function takeLast(count) {
    return function takeLastOperatorFunction(source) {
        if (count === 0) {
            return empty_empty();
        } else {
            return source.lift(new takeLast_TakeLastOperator(count));
        }
    };
}
var takeLast_TakeLastOperator = /*@__PURE__*/function () {
    function TakeLastOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError();
        }
    }
    TakeLastOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new takeLast_TakeLastSubscriber(subscriber, this.total));
    };
    return TakeLastOperator;
}();
var takeLast_TakeLastSubscriber = /*@__PURE__*/function (_super) {
    __extends(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.ring = new Array();
        _this.count = 0;
        return _this;
    }
    TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        } else {
            var index = count % total;
            ring[index] = value;
        }
    };
    TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
                var idx = count++ % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    };
    return TakeLastSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=takeLast.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/last.js
/** PURE_IMPORTS_START _util_EmptyError,_filter,_takeLast,_throwIfEmpty,_defaultIfEmpty,_util_identity PURE_IMPORTS_END */






function last_last(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter(function (v, i) {
            return predicate(v, i, source);
        }) : identity, takeLast(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty_throwIfEmpty(function () {
            return new EmptyError();
        }));
    };
}
//# sourceMappingURL=last.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/mapTo.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function mapTo(value) {
    return function (source) {
        return source.lift(new MapToOperator(value));
    };
}
var MapToOperator = /*@__PURE__*/function () {
    function MapToOperator(value) {
        this.value = value;
    }
    MapToOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new mapTo_MapToSubscriber(subscriber, this.value));
    };
    return MapToOperator;
}();
var mapTo_MapToSubscriber = /*@__PURE__*/function (_super) {
    __extends(MapToSubscriber, _super);
    function MapToSubscriber(destination, value) {
        var _this = _super.call(this, destination) || this;
        _this.value = value;
        return _this;
    }
    MapToSubscriber.prototype._next = function (x) {
        this.destination.next(this.value);
    };
    return MapToSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=mapTo.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/materialize.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */



function materialize() {
    return function materializeOperatorFunction(source) {
        return source.lift(new MaterializeOperator());
    };
}
var MaterializeOperator = /*@__PURE__*/function () {
    function MaterializeOperator() {}
    MaterializeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new materialize_MaterializeSubscriber(subscriber));
    };
    return MaterializeOperator;
}();
var materialize_MaterializeSubscriber = /*@__PURE__*/function (_super) {
    __extends(MaterializeSubscriber, _super);
    function MaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    MaterializeSubscriber.prototype._next = function (value) {
        this.destination.next(Notification_Notification.createNext(value));
    };
    MaterializeSubscriber.prototype._error = function (err) {
        var destination = this.destination;
        destination.next(Notification_Notification.createError(err));
        destination.complete();
    };
    MaterializeSubscriber.prototype._complete = function () {
        var destination = this.destination;
        destination.next(Notification_Notification.createComplete());
        destination.complete();
    };
    return MaterializeSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=materialize.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/scan.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function scan(accumulator, seed) {
    var hasSeed = false;
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return function scanOperatorFunction(source) {
        return source.lift(new ScanOperator(accumulator, seed, hasSeed));
    };
}
var ScanOperator = /*@__PURE__*/function () {
    function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) {
            hasSeed = false;
        }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new scan_ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
}();
var scan_ScanSubscriber = /*@__PURE__*/function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this._seed = _seed;
        _this.hasSeed = hasSeed;
        _this.index = 0;
        return _this;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function get() {
            return this._seed;
        },
        set: function set(value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        } else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        } catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=scan.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/reduce.js
/** PURE_IMPORTS_START _scan,_takeLast,_defaultIfEmpty,_util_pipe PURE_IMPORTS_END */




function reduce(accumulator, seed) {
    if (arguments.length >= 2) {
        return function reduceOperatorFunctionWithSeed(source) {
            return pipe(scan(accumulator, seed), takeLast(1), defaultIfEmpty(seed))(source);
        };
    }
    return function reduceOperatorFunction(source) {
        return pipe(scan(function (acc, value, index) {
            return accumulator(acc, value, index + 1);
        }), takeLast(1))(source);
    };
}
//# sourceMappingURL=reduce.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/max.js
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

function max_max(comparer) {
    var max = typeof comparer === 'function' ? function (x, y) {
        return comparer(x, y) > 0 ? x : y;
    } : function (x, y) {
        return x > y ? x : y;
    };
    return reduce(max);
}
//# sourceMappingURL=max.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/merge.js
/** PURE_IMPORTS_START _observable_merge PURE_IMPORTS_END */

function merge_merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return function (source) {
        return source.lift.call(merge.apply(void 0, [source].concat(observables)));
    };
}
//# sourceMappingURL=merge.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/mergeMapTo.js
/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'function') {
        return mergeMap(function () {
            return innerObservable;
        }, resultSelector, concurrent);
    }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return mergeMap(function () {
        return innerObservable;
    }, concurrent);
}
//# sourceMappingURL=mergeMapTo.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/mergeScan.js
/** PURE_IMPORTS_START tslib,_util_tryCatch,_util_errorObject,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber PURE_IMPORTS_END */






function mergeScan(accumulator, seed, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return function (source) {
        return source.lift(new MergeScanOperator(accumulator, seed, concurrent));
    };
}
var MergeScanOperator = /*@__PURE__*/function () {
    function MergeScanOperator(accumulator, seed, concurrent) {
        this.accumulator = accumulator;
        this.seed = seed;
        this.concurrent = concurrent;
    }
    MergeScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new mergeScan_MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
    };
    return MergeScanOperator;
}();

var mergeScan_MergeScanSubscriber = /*@__PURE__*/function (_super) {
    __extends(MergeScanSubscriber, _super);
    function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this.acc = acc;
        _this.concurrent = concurrent;
        _this.hasValue = false;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeScanSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            var index = this.index++;
            var ish = tryCatch(this.accumulator)(this.acc, value);
            var destination = this.destination;
            if (ish === errorObject) {
                destination.error(errorObject.e);
            } else {
                this.active++;
                this._innerSub(ish, value, index);
            }
        } else {
            this.buffer.push(value);
        }
    };
    MergeScanSubscriber.prototype._innerSub = function (ish, value, index) {
        var innerSubscriber = new InnerSubscriber_InnerSubscriber(this, undefined, undefined);
        this.add(innerSubscriber);
        subscribeToResult(this, ish, value, index, innerSubscriber);
    };
    MergeScanSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    };
    MergeScanSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var destination = this.destination;
        this.acc = innerValue;
        this.hasValue = true;
        destination.next(innerValue);
    };
    MergeScanSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    };
    return MergeScanSubscriber;
}(OuterSubscriber_OuterSubscriber);

//# sourceMappingURL=mergeScan.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/min.js
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

function min_min(comparer) {
    var min = typeof comparer === 'function' ? function (x, y) {
        return comparer(x, y) < 0 ? x : y;
    } : function (x, y) {
        return x < y ? x : y;
    };
    return reduce(min);
}
//# sourceMappingURL=min.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/multicast.js
/** PURE_IMPORTS_START _observable_ConnectableObservable PURE_IMPORTS_END */

function multicast(subjectOrSubjectFactory, selector) {
    return function multicastOperatorFunction(source) {
        var subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        } else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        if (typeof selector === 'function') {
            return source.lift(new MulticastOperator(subjectFactory, selector));
        }
        var connectable = Object.create(source, connectableObservableDescriptor);
        connectable.source = source;
        connectable.subjectFactory = subjectFactory;
        return connectable;
    };
}
var MulticastOperator = /*@__PURE__*/function () {
    function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    };
    return MulticastOperator;
}();

//# sourceMappingURL=multicast.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js
/** PURE_IMPORTS_START tslib,_observable_from,_util_isArray,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult PURE_IMPORTS_END */






function onErrorResumeNext_onErrorResumeNext() {
    var nextSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nextSources[_i] = arguments[_i];
    }
    if (nextSources.length === 1 && isArray(nextSources[0])) {
        nextSources = nextSources[0];
    }
    return function (source) {
        return source.lift(new OnErrorResumeNextOperator(nextSources));
    };
}
function onErrorResumeNextStatic() {
    var nextSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nextSources[_i] = arguments[_i];
    }
    var source = null;
    if (nextSources.length === 1 && isArray(nextSources[0])) {
        nextSources = nextSources[0];
    }
    source = nextSources.shift();
    return from(source, null).lift(new OnErrorResumeNextOperator(nextSources));
}
var OnErrorResumeNextOperator = /*@__PURE__*/function () {
    function OnErrorResumeNextOperator(nextSources) {
        this.nextSources = nextSources;
    }
    OnErrorResumeNextOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new onErrorResumeNext_OnErrorResumeNextSubscriber(subscriber, this.nextSources));
    };
    return OnErrorResumeNextOperator;
}();
var onErrorResumeNext_OnErrorResumeNextSubscriber = /*@__PURE__*/function (_super) {
    __extends(OnErrorResumeNextSubscriber, _super);
    function OnErrorResumeNextSubscriber(destination, nextSources) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.nextSources = nextSources;
        return _this;
    }
    OnErrorResumeNextSubscriber.prototype.notifyError = function (error, innerSub) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype.notifyComplete = function (innerSub) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype._error = function (err) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype._complete = function () {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
        var next = this.nextSources.shift();
        if (next) {
            var innerSubscriber = new InnerSubscriber_InnerSubscriber(this, undefined, undefined);
            this.add(innerSubscriber);
            subscribeToResult(this, next, undefined, undefined, innerSubscriber);
        } else {
            this.destination.complete();
        }
    };
    return OnErrorResumeNextSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=onErrorResumeNext.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/pairwise.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function pairwise() {
    return function (source) {
        return source.lift(new PairwiseOperator());
    };
}
var PairwiseOperator = /*@__PURE__*/function () {
    function PairwiseOperator() {}
    PairwiseOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new pairwise_PairwiseSubscriber(subscriber));
    };
    return PairwiseOperator;
}();
var pairwise_PairwiseSubscriber = /*@__PURE__*/function (_super) {
    __extends(PairwiseSubscriber, _super);
    function PairwiseSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasPrev = false;
        return _this;
    }
    PairwiseSubscriber.prototype._next = function (value) {
        if (this.hasPrev) {
            this.destination.next([this.prev, value]);
        } else {
            this.hasPrev = true;
        }
        this.prev = value;
    };
    return PairwiseSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=pairwise.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/util/not.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function not(pred, thisArg) {
    function notPred() {
        return !notPred.pred.apply(notPred.thisArg, arguments);
    }
    notPred.pred = pred;
    notPred.thisArg = thisArg;
    return notPred;
}
//# sourceMappingURL=not.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/partition.js
/** PURE_IMPORTS_START _util_not,_filter PURE_IMPORTS_END */


function partition(predicate, thisArg) {
    return function (source) {
        return [filter(predicate, thisArg)(source), filter(not(predicate, thisArg))(source)];
    };
}
//# sourceMappingURL=partition.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/pluck.js
/** PURE_IMPORTS_START _map PURE_IMPORTS_END */

function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return function (source) {
        return map(plucker(properties, length))(source);
    };
}
function plucker(props, length) {
    var mapper = function mapper(x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp[props[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            } else {
                return undefined;
            }
        }
        return currentProp;
    };
    return mapper;
}
//# sourceMappingURL=pluck.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/publish.js
/** PURE_IMPORTS_START _Subject,_multicast PURE_IMPORTS_END */


function publish(selector) {
    return selector ? multicast(function () {
        return new Subject_Subject();
    }, selector) : multicast(new Subject_Subject());
}
//# sourceMappingURL=publish.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/publishBehavior.js
/** PURE_IMPORTS_START _BehaviorSubject,_multicast PURE_IMPORTS_END */


function publishBehavior(value) {
    return function (source) {
        return multicast(new BehaviorSubject_BehaviorSubject(value))(source);
    };
}
//# sourceMappingURL=publishBehavior.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/publishLast.js
/** PURE_IMPORTS_START _AsyncSubject,_multicast PURE_IMPORTS_END */


function publishLast() {
    return function (source) {
        return multicast(new AsyncSubject_AsyncSubject())(source);
    };
}
//# sourceMappingURL=publishLast.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/publishReplay.js
/** PURE_IMPORTS_START _ReplaySubject,_multicast PURE_IMPORTS_END */


function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
    if (selectorOrScheduler && typeof selectorOrScheduler !== 'function') {
        scheduler = selectorOrScheduler;
    }
    var selector = typeof selectorOrScheduler === 'function' ? selectorOrScheduler : undefined;
    var subject = new ReplaySubject_ReplaySubject(bufferSize, windowTime, scheduler);
    return function (source) {
        return multicast(function () {
            return subject;
        }, selector)(source);
    };
}
//# sourceMappingURL=publishReplay.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/race.js
/** PURE_IMPORTS_START _util_isArray,_observable_race PURE_IMPORTS_END */


function race_race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return function raceOperatorFunction(source) {
        if (observables.length === 1 && isArray(observables[0])) {
            observables = observables[0];
        }
        return source.lift.call(race.apply(void 0, [source].concat(observables)));
    };
}
//# sourceMappingURL=race.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/repeat.js
/** PURE_IMPORTS_START tslib,_Subscriber,_observable_empty PURE_IMPORTS_END */



function repeat(count) {
    if (count === void 0) {
        count = -1;
    }
    return function (source) {
        if (count === 0) {
            return empty_empty();
        } else if (count < 0) {
            return source.lift(new RepeatOperator(-1, source));
        } else {
            return source.lift(new RepeatOperator(count - 1, source));
        }
    };
}
var RepeatOperator = /*@__PURE__*/function () {
    function RepeatOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RepeatOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new repeat_RepeatSubscriber(subscriber, this.count, this.source));
    };
    return RepeatOperator;
}();
var repeat_RepeatSubscriber = /*@__PURE__*/function (_super) {
    __extends(RepeatSubscriber, _super);
    function RepeatSubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;
        _this.count = count;
        _this.source = source;
        return _this;
    }
    RepeatSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _a = this,
                source = _a.source,
                count = _a.count;
            if (count === 0) {
                return _super.prototype.complete.call(this);
            } else if (count > -1) {
                this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
        }
    };
    return RepeatSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=repeat.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/repeatWhen.js
/** PURE_IMPORTS_START tslib,_Subject,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */






function repeatWhen(notifier) {
    return function (source) {
        return source.lift(new RepeatWhenOperator(notifier));
    };
}
var RepeatWhenOperator = /*@__PURE__*/function () {
    function RepeatWhenOperator(notifier) {
        this.notifier = notifier;
    }
    RepeatWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new repeatWhen_RepeatWhenSubscriber(subscriber, this.notifier, source));
    };
    return RepeatWhenOperator;
}();
var repeatWhen_RepeatWhenSubscriber = /*@__PURE__*/function (_super) {
    __extends(RepeatWhenSubscriber, _super);
    function RepeatWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;
        _this.notifier = notifier;
        _this.source = source;
        _this.sourceIsBeingSubscribedTo = true;
        return _this;
    }
    RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.sourceIsBeingSubscribedTo = true;
        this.source.subscribe(this);
    };
    RepeatWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        if (this.sourceIsBeingSubscribedTo === false) {
            return _super.prototype.complete.call(this);
        }
    };
    RepeatWhenSubscriber.prototype.complete = function () {
        this.sourceIsBeingSubscribedTo = false;
        if (!this.isStopped) {
            if (!this.retries) {
                this.subscribeToRetries();
            }
            if (!this.retriesSubscription || this.retriesSubscription.closed) {
                return _super.prototype.complete.call(this);
            }
            this._unsubscribeAndRecycle();
            this.notifications.next();
        }
    };
    RepeatWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this,
            notifications = _a.notifications,
            retriesSubscription = _a.retriesSubscription;
        if (notifications) {
            notifications.unsubscribe();
            this.notifications = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
        var _unsubscribe = this._unsubscribe;
        this._unsubscribe = null;
        _super.prototype._unsubscribeAndRecycle.call(this);
        this._unsubscribe = _unsubscribe;
        return this;
    };
    RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
        this.notifications = new Subject_Subject();
        var retries = tryCatch(this.notifier)(this.notifications);
        if (retries === errorObject) {
            return _super.prototype.complete.call(this);
        }
        this.retries = retries;
        this.retriesSubscription = subscribeToResult(this, retries);
    };
    return RepeatWhenSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=repeatWhen.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/retry.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function retry(count) {
    if (count === void 0) {
        count = -1;
    }
    return function (source) {
        return source.lift(new RetryOperator(count, source));
    };
}
var RetryOperator = /*@__PURE__*/function () {
    function RetryOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RetryOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new retry_RetrySubscriber(subscriber, this.count, this.source));
    };
    return RetryOperator;
}();
var retry_RetrySubscriber = /*@__PURE__*/function (_super) {
    __extends(RetrySubscriber, _super);
    function RetrySubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;
        _this.count = count;
        _this.source = source;
        return _this;
    }
    RetrySubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _a = this,
                source = _a.source,
                count = _a.count;
            if (count === 0) {
                return _super.prototype.error.call(this, err);
            } else if (count > -1) {
                this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
        }
    };
    return RetrySubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=retry.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/retryWhen.js
/** PURE_IMPORTS_START tslib,_Subject,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */






function retryWhen(notifier) {
    return function (source) {
        return source.lift(new RetryWhenOperator(notifier, source));
    };
}
var RetryWhenOperator = /*@__PURE__*/function () {
    function RetryWhenOperator(notifier, source) {
        this.notifier = notifier;
        this.source = source;
    }
    RetryWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new retryWhen_RetryWhenSubscriber(subscriber, this.notifier, this.source));
    };
    return RetryWhenOperator;
}();
var retryWhen_RetryWhenSubscriber = /*@__PURE__*/function (_super) {
    __extends(RetryWhenSubscriber, _super);
    function RetryWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;
        _this.notifier = notifier;
        _this.source = source;
        return _this;
    }
    RetryWhenSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var errors = this.errors;
            var retries = this.retries;
            var retriesSubscription = this.retriesSubscription;
            if (!retries) {
                errors = new Subject_Subject();
                retries = tryCatch(this.notifier)(errors);
                if (retries === errorObject) {
                    return _super.prototype.error.call(this, errorObject.e);
                }
                retriesSubscription = subscribeToResult(this, retries);
            } else {
                this.errors = null;
                this.retriesSubscription = null;
            }
            this._unsubscribeAndRecycle();
            this.errors = errors;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            errors.next(err);
        }
    };
    RetryWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this,
            errors = _a.errors,
            retriesSubscription = _a.retriesSubscription;
        if (errors) {
            errors.unsubscribe();
            this.errors = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _unsubscribe = this._unsubscribe;
        this._unsubscribe = null;
        this._unsubscribeAndRecycle();
        this._unsubscribe = _unsubscribe;
        this.source.subscribe(this);
    };
    return RetryWhenSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=retryWhen.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/sample.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function sample(notifier) {
    return function (source) {
        return source.lift(new sample_SampleOperator(notifier));
    };
}
var sample_SampleOperator = /*@__PURE__*/function () {
    function SampleOperator(notifier) {
        this.notifier = notifier;
    }
    SampleOperator.prototype.call = function (subscriber, source) {
        var sampleSubscriber = new sample_SampleSubscriber(subscriber);
        var subscription = source.subscribe(sampleSubscriber);
        subscription.add(subscribeToResult(sampleSubscriber, this.notifier));
        return subscription;
    };
    return SampleOperator;
}();
var sample_SampleSubscriber = /*@__PURE__*/function (_super) {
    __extends(SampleSubscriber, _super);
    function SampleSubscriber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasValue = false;
        return _this;
    }
    SampleSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
    };
    SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    };
    SampleSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
    };
    SampleSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.value);
        }
    };
    return SampleSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=sample.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/sampleTime.js
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */



function sampleTime(period, scheduler) {
    if (scheduler === void 0) {
        scheduler = async_async;
    }
    return function (source) {
        return source.lift(new SampleTimeOperator(period, scheduler));
    };
}
var SampleTimeOperator = /*@__PURE__*/function () {
    function SampleTimeOperator(period, scheduler) {
        this.period = period;
        this.scheduler = scheduler;
    }
    SampleTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new sampleTime_SampleTimeSubscriber(subscriber, this.period, this.scheduler));
    };
    return SampleTimeOperator;
}();
var sampleTime_SampleTimeSubscriber = /*@__PURE__*/function (_super) {
    __extends(SampleTimeSubscriber, _super);
    function SampleTimeSubscriber(destination, period, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.period = period;
        _this.scheduler = scheduler;
        _this.hasValue = false;
        _this.add(scheduler.schedule(dispatchNotification, period, { subscriber: _this, period: period }));
        return _this;
    }
    SampleTimeSubscriber.prototype._next = function (value) {
        this.lastValue = value;
        this.hasValue = true;
    };
    SampleTimeSubscriber.prototype.notifyNext = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.lastValue);
        }
    };
    return SampleTimeSubscriber;
}(Subscriber_Subscriber);
function dispatchNotification(state) {
    var subscriber = state.subscriber,
        period = state.period;
    subscriber.notifyNext();
    this.schedule(state, period);
}
//# sourceMappingURL=sampleTime.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/sequenceEqual.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_tryCatch,_util_errorObject PURE_IMPORTS_END */




function sequenceEqual(compareTo, comparor) {
    return function (source) {
        return source.lift(new SequenceEqualOperator(compareTo, comparor));
    };
}
var SequenceEqualOperator = /*@__PURE__*/function () {
    function SequenceEqualOperator(compareTo, comparor) {
        this.compareTo = compareTo;
        this.comparor = comparor;
    }
    SequenceEqualOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new sequenceEqual_SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
    };
    return SequenceEqualOperator;
}();

var sequenceEqual_SequenceEqualSubscriber = /*@__PURE__*/function (_super) {
    __extends(SequenceEqualSubscriber, _super);
    function SequenceEqualSubscriber(destination, compareTo, comparor) {
        var _this = _super.call(this, destination) || this;
        _this.compareTo = compareTo;
        _this.comparor = comparor;
        _this._a = [];
        _this._b = [];
        _this._oneComplete = false;
        _this.add(compareTo.subscribe(new sequenceEqual_SequenceEqualCompareToSubscriber(destination, _this)));
        return _this;
    }
    SequenceEqualSubscriber.prototype._next = function (value) {
        if (this._oneComplete && this._b.length === 0) {
            this.emit(false);
        } else {
            this._a.push(value);
            this.checkValues();
        }
    };
    SequenceEqualSubscriber.prototype._complete = function () {
        if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
        } else {
            this._oneComplete = true;
        }
    };
    SequenceEqualSubscriber.prototype.checkValues = function () {
        var _c = this,
            _a = _c._a,
            _b = _c._b,
            comparor = _c.comparor;
        while (_a.length > 0 && _b.length > 0) {
            var a = _a.shift();
            var b = _b.shift();
            var areEqual = false;
            if (comparor) {
                areEqual = tryCatch(comparor)(a, b);
                if (areEqual === errorObject) {
                    this.destination.error(errorObject.e);
                }
            } else {
                areEqual = a === b;
            }
            if (!areEqual) {
                this.emit(false);
            }
        }
    };
    SequenceEqualSubscriber.prototype.emit = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
    };
    SequenceEqualSubscriber.prototype.nextB = function (value) {
        if (this._oneComplete && this._a.length === 0) {
            this.emit(false);
        } else {
            this._b.push(value);
            this.checkValues();
        }
    };
    return SequenceEqualSubscriber;
}(Subscriber_Subscriber);

var sequenceEqual_SequenceEqualCompareToSubscriber = /*@__PURE__*/function (_super) {
    __extends(SequenceEqualCompareToSubscriber, _super);
    function SequenceEqualCompareToSubscriber(destination, parent) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        return _this;
    }
    SequenceEqualCompareToSubscriber.prototype._next = function (value) {
        this.parent.nextB(value);
    };
    SequenceEqualCompareToSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    SequenceEqualCompareToSubscriber.prototype._complete = function () {
        this.parent._complete();
    };
    return SequenceEqualCompareToSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=sequenceEqual.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/share.js
/** PURE_IMPORTS_START _multicast,_refCount,_Subject PURE_IMPORTS_END */



function shareSubjectFactory() {
    return new Subject_Subject();
}
function share() {
    return function (source) {
        return refCount_refCount()(multicast(shareSubjectFactory)(source));
    };
}
//# sourceMappingURL=share.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/shareReplay.js
/** PURE_IMPORTS_START _ReplaySubject PURE_IMPORTS_END */

function shareReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) {
        bufferSize = Number.POSITIVE_INFINITY;
    }
    if (windowTime === void 0) {
        windowTime = Number.MAX_VALUE;
    }
    return function (source) {
        return source.lift(shareReplayOperator(bufferSize, windowTime, scheduler));
    };
}
function shareReplayOperator(bufferSize, windowTime, scheduler) {
    var subject;
    var refCount = 0;
    var subscription;
    var hasError = false;
    var isComplete = false;
    return function shareReplayOperation(source) {
        refCount++;
        if (!subject || hasError) {
            hasError = false;
            subject = new ReplaySubject_ReplaySubject(bufferSize, windowTime, scheduler);
            subscription = source.subscribe({
                next: function next(value) {
                    subject.next(value);
                },
                error: function error(err) {
                    hasError = true;
                    subject.error(err);
                },
                complete: function complete() {
                    isComplete = true;
                    subject.complete();
                }
            });
        }
        var innerSub = subject.subscribe(this);
        return function () {
            refCount--;
            innerSub.unsubscribe();
            if (subscription && refCount === 0 && isComplete) {
                subscription.unsubscribe();
            }
        };
    };
}
//# sourceMappingURL=shareReplay.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/single.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_EmptyError PURE_IMPORTS_END */



function single(predicate) {
    return function (source) {
        return source.lift(new SingleOperator(predicate, source));
    };
}
var SingleOperator = /*@__PURE__*/function () {
    function SingleOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    SingleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new single_SingleSubscriber(subscriber, this.predicate, this.source));
    };
    return SingleOperator;
}();
var single_SingleSubscriber = /*@__PURE__*/function (_super) {
    __extends(SingleSubscriber, _super);
    function SingleSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.seenValue = false;
        _this.index = 0;
        return _this;
    }
    SingleSubscriber.prototype.applySingleValue = function (value) {
        if (this.seenValue) {
            this.destination.error('Sequence contains more than one element');
        } else {
            this.seenValue = true;
            this.singleValue = value;
        }
    };
    SingleSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this.tryNext(value, index);
        } else {
            this.applySingleValue(value);
        }
    };
    SingleSubscriber.prototype.tryNext = function (value, index) {
        try {
            if (this.predicate(value, index, this.source)) {
                this.applySingleValue(value);
            }
        } catch (err) {
            this.destination.error(err);
        }
    };
    SingleSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : undefined);
            destination.complete();
        } else {
            destination.error(new EmptyError());
        }
    };
    return SingleSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=single.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/skip.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function skip(count) {
    return function (source) {
        return source.lift(new SkipOperator(count));
    };
}
var SkipOperator = /*@__PURE__*/function () {
    function SkipOperator(total) {
        this.total = total;
    }
    SkipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new skip_SkipSubscriber(subscriber, this.total));
    };
    return SkipOperator;
}();
var skip_SkipSubscriber = /*@__PURE__*/function (_super) {
    __extends(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.count = 0;
        return _this;
    }
    SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };
    return SkipSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=skip.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/skipLast.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError PURE_IMPORTS_END */



function skipLast(count) {
    return function (source) {
        return source.lift(new skipLast_SkipLastOperator(count));
    };
}
var skipLast_SkipLastOperator = /*@__PURE__*/function () {
    function SkipLastOperator(_skipCount) {
        this._skipCount = _skipCount;
        if (this._skipCount < 0) {
            throw new ArgumentOutOfRangeError();
        }
    }
    SkipLastOperator.prototype.call = function (subscriber, source) {
        if (this._skipCount === 0) {
            return source.subscribe(new Subscriber_Subscriber(subscriber));
        } else {
            return source.subscribe(new skipLast_SkipLastSubscriber(subscriber, this._skipCount));
        }
    };
    return SkipLastOperator;
}();
var skipLast_SkipLastSubscriber = /*@__PURE__*/function (_super) {
    __extends(SkipLastSubscriber, _super);
    function SkipLastSubscriber(destination, _skipCount) {
        var _this = _super.call(this, destination) || this;
        _this._skipCount = _skipCount;
        _this._count = 0;
        _this._ring = new Array(_skipCount);
        return _this;
    }
    SkipLastSubscriber.prototype._next = function (value) {
        var skipCount = this._skipCount;
        var count = this._count++;
        if (count < skipCount) {
            this._ring[count] = value;
        } else {
            var currentIndex = count % skipCount;
            var ring = this._ring;
            var oldValue = ring[currentIndex];
            ring[currentIndex] = value;
            this.destination.next(oldValue);
        }
    };
    return SkipLastSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=skipLast.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/skipUntil.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult PURE_IMPORTS_END */




function skipUntil(notifier) {
    return function (source) {
        return source.lift(new SkipUntilOperator(notifier));
    };
}
var SkipUntilOperator = /*@__PURE__*/function () {
    function SkipUntilOperator(notifier) {
        this.notifier = notifier;
    }
    SkipUntilOperator.prototype.call = function (destination, source) {
        return source.subscribe(new skipUntil_SkipUntilSubscriber(destination, this.notifier));
    };
    return SkipUntilOperator;
}();
var skipUntil_SkipUntilSubscriber = /*@__PURE__*/function (_super) {
    __extends(SkipUntilSubscriber, _super);
    function SkipUntilSubscriber(destination, notifier) {
        var _this = _super.call(this, destination) || this;
        _this.hasValue = false;
        var innerSubscriber = new InnerSubscriber_InnerSubscriber(_this, undefined, undefined);
        _this.add(innerSubscriber);
        _this.innerSubscription = innerSubscriber;
        subscribeToResult(_this, notifier, undefined, undefined, innerSubscriber);
        return _this;
    }
    SkipUntilSubscriber.prototype._next = function (value) {
        if (this.hasValue) {
            _super.prototype._next.call(this, value);
        }
    };
    SkipUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.hasValue = true;
        if (this.innerSubscription) {
            this.innerSubscription.unsubscribe();
        }
    };
    SkipUntilSubscriber.prototype.notifyComplete = function () {};
    return SkipUntilSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=skipUntil.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/skipWhile.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function skipWhile(predicate) {
    return function (source) {
        return source.lift(new SkipWhileOperator(predicate));
    };
}
var SkipWhileOperator = /*@__PURE__*/function () {
    function SkipWhileOperator(predicate) {
        this.predicate = predicate;
    }
    SkipWhileOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new skipWhile_SkipWhileSubscriber(subscriber, this.predicate));
    };
    return SkipWhileOperator;
}();
var skipWhile_SkipWhileSubscriber = /*@__PURE__*/function (_super) {
    __extends(SkipWhileSubscriber, _super);
    function SkipWhileSubscriber(destination, predicate) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.skipping = true;
        _this.index = 0;
        return _this;
    }
    SkipWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (this.skipping) {
            this.tryCallPredicate(value);
        }
        if (!this.skipping) {
            destination.next(value);
        }
    };
    SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
        try {
            var result = this.predicate(value, this.index++);
            this.skipping = Boolean(result);
        } catch (err) {
            this.destination.error(err);
        }
    };
    return SkipWhileSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=skipWhile.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/startWith.js
/** PURE_IMPORTS_START _observable_fromArray,_observable_scalar,_observable_empty,_observable_concat,_util_isScheduler PURE_IMPORTS_END */





function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i] = arguments[_i];
    }
    return function (source) {
        var scheduler = array[array.length - 1];
        if (isScheduler(scheduler)) {
            array.pop();
        } else {
            scheduler = null;
        }
        var len = array.length;
        if (len === 1 && !scheduler) {
            return concat(scalar(array[0]), source);
        } else if (len > 0) {
            return concat(fromArray(array, scheduler), source);
        } else {
            return concat(empty_empty(scheduler), source);
        }
    };
}
//# sourceMappingURL=startWith.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/observable/SubscribeOnObservable.js
/** PURE_IMPORTS_START tslib,_Observable,_scheduler_asap,_util_isNumeric PURE_IMPORTS_END */




var SubscribeOnObservable_SubscribeOnObservable = /*@__PURE__*/function (_super) {
    __extends(SubscribeOnObservable, _super);
    function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) {
            delayTime = 0;
        }
        if (scheduler === void 0) {
            scheduler = asap;
        }
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.delayTime = delayTime;
        _this.scheduler = scheduler;
        if (!isNumeric(delayTime) || delayTime < 0) {
            _this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            _this.scheduler = asap;
        }
        return _this;
    }
    SubscribeOnObservable.create = function (source, delay, scheduler) {
        if (delay === void 0) {
            delay = 0;
        }
        if (scheduler === void 0) {
            scheduler = asap;
        }
        return new SubscribeOnObservable(source, delay, scheduler);
    };
    SubscribeOnObservable.dispatch = function (arg) {
        var source = arg.source,
            subscriber = arg.subscriber;
        return this.add(source.subscribe(subscriber));
    };
    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source: source, subscriber: subscriber
        });
    };
    return SubscribeOnObservable;
}(Observable_Observable);

//# sourceMappingURL=SubscribeOnObservable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/subscribeOn.js
/** PURE_IMPORTS_START _observable_SubscribeOnObservable PURE_IMPORTS_END */

function subscribeOn(scheduler, delay) {
    if (delay === void 0) {
        delay = 0;
    }
    return function subscribeOnOperatorFunction(source) {
        return source.lift(new subscribeOn_SubscribeOnOperator(scheduler, delay));
    };
}
var subscribeOn_SubscribeOnOperator = /*@__PURE__*/function () {
    function SubscribeOnOperator(scheduler, delay) {
        this.scheduler = scheduler;
        this.delay = delay;
    }
    SubscribeOnOperator.prototype.call = function (subscriber, source) {
        return new SubscribeOnObservable_SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
    };
    return SubscribeOnOperator;
}();
//# sourceMappingURL=subscribeOn.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/switchMap.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult,_map,_observable_from PURE_IMPORTS_END */






function switchMap(project, resultSelector) {
    if (typeof resultSelector === 'function') {
        return function (source) {
            return source.pipe(switchMap(function (a, i) {
                return from(project(a, i)).pipe(map(function (b, ii) {
                    return resultSelector(a, b, i, ii);
                }));
            }));
        };
    }
    return function (source) {
        return source.lift(new SwitchMapOperator(project));
    };
}
var SwitchMapOperator = /*@__PURE__*/function () {
    function SwitchMapOperator(project) {
        this.project = project;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new switchMap_SwitchMapSubscriber(subscriber, this.project));
    };
    return SwitchMapOperator;
}();
var switchMap_SwitchMapSubscriber = /*@__PURE__*/function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.index = 0;
        return _this;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        } catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        var innerSubscriber = new InnerSubscriber_InnerSubscriber(this, undefined, undefined);
        this.add(innerSubscriber);
        this.innerSubscription = subscribeToResult(this, result, value, index, innerSubscriber);
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=switchMap.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/switchAll.js
/** PURE_IMPORTS_START _switchMap,_util_identity PURE_IMPORTS_END */


function switchAll() {
    return switchMap(identity);
}
//# sourceMappingURL=switchAll.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/switchMapTo.js
/** PURE_IMPORTS_START _switchMap PURE_IMPORTS_END */

function switchMapTo(innerObservable, resultSelector) {
    return resultSelector ? switchMap(function () {
        return innerObservable;
    }, resultSelector) : switchMap(function () {
        return innerObservable;
    });
}
//# sourceMappingURL=switchMapTo.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/takeUntil.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function takeUntil(notifier) {
    return function (source) {
        return source.lift(new takeUntil_TakeUntilOperator(notifier));
    };
}
var takeUntil_TakeUntilOperator = /*@__PURE__*/function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        var takeUntilSubscriber = new takeUntil_TakeUntilSubscriber(subscriber);
        var notifierSubscription = subscribeToResult(takeUntilSubscriber, this.notifier);
        if (notifierSubscription && !takeUntilSubscriber.seenValue) {
            takeUntilSubscriber.add(notifierSubscription);
            return source.subscribe(takeUntilSubscriber);
        }
        return takeUntilSubscriber;
    };
    return TakeUntilOperator;
}();
var takeUntil_TakeUntilSubscriber = /*@__PURE__*/function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.seenValue = false;
        return _this;
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.seenValue = true;
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {};
    return TakeUntilSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=takeUntil.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/takeWhile.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function takeWhile(predicate) {
    return function (source) {
        return source.lift(new TakeWhileOperator(predicate));
    };
}
var TakeWhileOperator = /*@__PURE__*/function () {
    function TakeWhileOperator(predicate) {
        this.predicate = predicate;
    }
    TakeWhileOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new takeWhile_TakeWhileSubscriber(subscriber, this.predicate));
    };
    return TakeWhileOperator;
}();
var takeWhile_TakeWhileSubscriber = /*@__PURE__*/function (_super) {
    __extends(TakeWhileSubscriber, _super);
    function TakeWhileSubscriber(destination, predicate) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.index = 0;
        return _this;
    }
    TakeWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        var result;
        try {
            result = this.predicate(value, this.index++);
        } catch (err) {
            destination.error(err);
            return;
        }
        this.nextOrComplete(value, result);
    };
    TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
        var destination = this.destination;
        if (Boolean(predicateResult)) {
            destination.next(value);
        } else {
            destination.complete();
        }
    };
    return TakeWhileSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=takeWhile.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/throttle.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



var defaultThrottleConfig = {
    leading: true,
    trailing: false
};
function throttle(durationSelector, config) {
    if (config === void 0) {
        config = defaultThrottleConfig;
    }
    return function (source) {
        return source.lift(new ThrottleOperator(durationSelector, config.leading, config.trailing));
    };
}
var ThrottleOperator = /*@__PURE__*/function () {
    function ThrottleOperator(durationSelector, leading, trailing) {
        this.durationSelector = durationSelector;
        this.leading = leading;
        this.trailing = trailing;
    }
    ThrottleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new throttle_ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
    };
    return ThrottleOperator;
}();
var throttle_ThrottleSubscriber = /*@__PURE__*/function (_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.durationSelector = durationSelector;
        _this._leading = _leading;
        _this._trailing = _trailing;
        _this._hasValue = false;
        return _this;
    }
    ThrottleSubscriber.prototype._next = function (value) {
        this._hasValue = true;
        this._sendValue = value;
        if (!this._throttled) {
            if (this._leading) {
                this.send();
            } else {
                this.throttle(value);
            }
        }
    };
    ThrottleSubscriber.prototype.send = function () {
        var _a = this,
            _hasValue = _a._hasValue,
            _sendValue = _a._sendValue;
        if (_hasValue) {
            this.destination.next(_sendValue);
            this.throttle(_sendValue);
        }
        this._hasValue = false;
        this._sendValue = null;
    };
    ThrottleSubscriber.prototype.throttle = function (value) {
        var duration = this.tryDurationSelector(value);
        if (duration) {
            this.add(this._throttled = subscribeToResult(this, duration));
        }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
        try {
            return this.durationSelector(value);
        } catch (err) {
            this.destination.error(err);
            return null;
        }
    };
    ThrottleSubscriber.prototype.throttlingDone = function () {
        var _a = this,
            _throttled = _a._throttled,
            _trailing = _a._trailing;
        if (_throttled) {
            _throttled.unsubscribe();
        }
        this._throttled = null;
        if (_trailing) {
            this.send();
        }
    };
    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.throttlingDone();
    };
    ThrottleSubscriber.prototype.notifyComplete = function () {
        this.throttlingDone();
    };
    return ThrottleSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=throttle.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/throttleTime.js
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async,_throttle PURE_IMPORTS_END */




function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) {
        scheduler = async_async;
    }
    if (config === void 0) {
        config = defaultThrottleConfig;
    }
    return function (source) {
        return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing));
    };
}
var ThrottleTimeOperator = /*@__PURE__*/function () {
    function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
        this.duration = duration;
        this.scheduler = scheduler;
        this.leading = leading;
        this.trailing = trailing;
    }
    ThrottleTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new throttleTime_ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
    };
    return ThrottleTimeOperator;
}();
var throttleTime_ThrottleTimeSubscriber = /*@__PURE__*/function (_super) {
    __extends(ThrottleTimeSubscriber, _super);
    function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
        var _this = _super.call(this, destination) || this;
        _this.duration = duration;
        _this.scheduler = scheduler;
        _this.leading = leading;
        _this.trailing = trailing;
        _this._hasTrailingValue = false;
        _this._trailingValue = null;
        return _this;
    }
    ThrottleTimeSubscriber.prototype._next = function (value) {
        if (this.throttled) {
            if (this.trailing) {
                this._trailingValue = value;
                this._hasTrailingValue = true;
            }
        } else {
            this.add(this.throttled = this.scheduler.schedule(throttleTime_dispatchNext, this.duration, { subscriber: this }));
            if (this.leading) {
                this.destination.next(value);
            }
        }
    };
    ThrottleTimeSubscriber.prototype._complete = function () {
        if (this._hasTrailingValue) {
            this.destination.next(this._trailingValue);
            this.destination.complete();
        } else {
            this.destination.complete();
        }
    };
    ThrottleTimeSubscriber.prototype.clearThrottle = function () {
        var throttled = this.throttled;
        if (throttled) {
            if (this.trailing && this._hasTrailingValue) {
                this.destination.next(this._trailingValue);
                this._trailingValue = null;
                this._hasTrailingValue = false;
            }
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    };
    return ThrottleTimeSubscriber;
}(Subscriber_Subscriber);
function throttleTime_dispatchNext(arg) {
    var subscriber = arg.subscriber;
    subscriber.clearThrottle();
}
//# sourceMappingURL=throttleTime.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/timeInterval.js
/** PURE_IMPORTS_START _scheduler_async,_scan,_observable_defer,_map PURE_IMPORTS_END */




function timeInterval(scheduler) {
    if (scheduler === void 0) {
        scheduler = async_async;
    }
    return function (source) {
        return defer(function () {
            return source.pipe(scan(function (_a, value) {
                var current = _a.current;
                return { value: value, current: scheduler.now(), last: current };
            }, { current: scheduler.now(), value: undefined, last: undefined }), map(function (_a) {
                var current = _a.current,
                    last = _a.last,
                    value = _a.value;
                return new TimeInterval(value, current - last);
            }));
        });
    };
}
var TimeInterval = /*@__PURE__*/function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}();

//# sourceMappingURL=timeInterval.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/timeoutWith.js
/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function timeoutWith(due, withObservable, scheduler) {
    if (scheduler === void 0) {
        scheduler = async_async;
    }
    return function (source) {
        var absoluteTimeout = isDate(due);
        var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
        return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
    };
}
var TimeoutWithOperator = /*@__PURE__*/function () {
    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }
    TimeoutWithOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new timeoutWith_TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
    };
    return TimeoutWithOperator;
}();
var timeoutWith_TimeoutWithSubscriber = /*@__PURE__*/function (_super) {
    __extends(TimeoutWithSubscriber, _super);
    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.absoluteTimeout = absoluteTimeout;
        _this.waitFor = waitFor;
        _this.withObservable = withObservable;
        _this.scheduler = scheduler;
        _this.action = null;
        _this.scheduleTimeout();
        return _this;
    }
    TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
        var withObservable = subscriber.withObservable;
        subscriber._unsubscribeAndRecycle();
        subscriber.add(subscribeToResult(subscriber, withObservable));
    };
    TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
        var action = this.action;
        if (action) {
            this.action = action.schedule(this, this.waitFor);
        } else {
            this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
        }
    };
    TimeoutWithSubscriber.prototype._next = function (value) {
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
        _super.prototype._next.call(this, value);
    };
    TimeoutWithSubscriber.prototype._unsubscribe = function () {
        this.action = null;
        this.scheduler = null;
        this.withObservable = null;
    };
    return TimeoutWithSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=timeoutWith.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/timeout.js
/** PURE_IMPORTS_START _scheduler_async,_util_TimeoutError,_timeoutWith,_observable_throwError PURE_IMPORTS_END */




function timeout(due, scheduler) {
    if (scheduler === void 0) {
        scheduler = async_async;
    }
    return timeoutWith(due, throwError(new TimeoutError()), scheduler);
}
//# sourceMappingURL=timeout.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/timestamp.js
/** PURE_IMPORTS_START _scheduler_async,_map PURE_IMPORTS_END */


function timestamp(scheduler) {
    if (scheduler === void 0) {
        scheduler = async_async;
    }
    return map(function (value) {
        return new Timestamp(value, scheduler.now());
    });
}
var Timestamp = /*@__PURE__*/function () {
    function Timestamp(value, timestamp) {
        this.value = value;
        this.timestamp = timestamp;
    }
    return Timestamp;
}();

//# sourceMappingURL=timestamp.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/toArray.js
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

function toArrayReducer(arr, item, index) {
    if (index === 0) {
        return [item];
    }
    arr.push(item);
    return arr;
}
function toArray() {
    return reduce(toArrayReducer, []);
}
//# sourceMappingURL=toArray.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/window.js
/** PURE_IMPORTS_START tslib,_Subject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */




function window_window(windowBoundaries) {
    return function windowOperatorFunction(source) {
        return source.lift(new window_WindowOperator(windowBoundaries));
    };
}
var window_WindowOperator = /*@__PURE__*/function () {
    function WindowOperator(windowBoundaries) {
        this.windowBoundaries = windowBoundaries;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
        var windowSubscriber = new window_WindowSubscriber(subscriber);
        var sourceSubscription = source.subscribe(windowSubscriber);
        if (!sourceSubscription.closed) {
            windowSubscriber.add(subscribeToResult(windowSubscriber, this.windowBoundaries));
        }
        return sourceSubscription;
    };
    return WindowOperator;
}();
var window_WindowSubscriber = /*@__PURE__*/function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.window = new Subject_Subject();
        destination.next(_this.window);
        return _this;
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow();
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this._complete();
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
    };
    WindowSubscriber.prototype._unsubscribe = function () {
        this.window = null;
    };
    WindowSubscriber.prototype.openWindow = function () {
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var destination = this.destination;
        var newWindow = this.window = new Subject_Subject();
        destination.next(newWindow);
    };
    return WindowSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=window.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/windowCount.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Subject PURE_IMPORTS_END */



function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) {
        startWindowEvery = 0;
    }
    return function windowCountOperatorFunction(source) {
        return source.lift(new WindowCountOperator(windowSize, startWindowEvery));
    };
}
var WindowCountOperator = /*@__PURE__*/function () {
    function WindowCountOperator(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    WindowCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new windowCount_WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    };
    return WindowCountOperator;
}();
var windowCount_WindowCountSubscriber = /*@__PURE__*/function (_super) {
    __extends(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.windowSize = windowSize;
        _this.startWindowEvery = startWindowEvery;
        _this.windows = [new Subject_Subject()];
        _this.count = 0;
        destination.next(_this.windows[0]);
        return _this;
    }
    WindowCountSubscriber.prototype._next = function (value) {
        var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len && !this.closed; i++) {
            windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0 && !this.closed) {
            var window_1 = new Subject_Subject();
            windows.push(window_1);
            destination.next(window_1);
        }
    };
    WindowCountSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().error(err);
            }
        }
        this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function () {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().complete();
            }
        }
        this.destination.complete();
    };
    WindowCountSubscriber.prototype._unsubscribe = function () {
        this.count = 0;
        this.windows = null;
    };
    return WindowCountSubscriber;
}(Subscriber_Subscriber);
//# sourceMappingURL=windowCount.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/windowTime.js
/** PURE_IMPORTS_START tslib,_Subject,_scheduler_async,_Subscriber,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */






function windowTime_windowTime(windowTimeSpan) {
    var scheduler = async_async;
    var windowCreationInterval = null;
    var maxWindowSize = Number.POSITIVE_INFINITY;
    if (isScheduler(arguments[3])) {
        scheduler = arguments[3];
    }
    if (isScheduler(arguments[2])) {
        scheduler = arguments[2];
    } else if (isNumeric(arguments[2])) {
        maxWindowSize = arguments[2];
    }
    if (isScheduler(arguments[1])) {
        scheduler = arguments[1];
    } else if (isNumeric(arguments[1])) {
        windowCreationInterval = arguments[1];
    }
    return function windowTimeOperatorFunction(source) {
        return source.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
    };
}
var WindowTimeOperator = /*@__PURE__*/function () {
    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.maxWindowSize = maxWindowSize;
        this.scheduler = scheduler;
    }
    WindowTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new windowTime_WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
    };
    return WindowTimeOperator;
}();
var windowTime_CountedSubject = /*@__PURE__*/function (_super) {
    __extends(CountedSubject, _super);
    function CountedSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._numberOfNextedValues = 0;
        return _this;
    }
    CountedSubject.prototype.next = function (value) {
        this._numberOfNextedValues++;
        _super.prototype.next.call(this, value);
    };
    Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
        get: function get() {
            return this._numberOfNextedValues;
        },
        enumerable: true,
        configurable: true
    });
    return CountedSubject;
}(Subject_Subject);
var windowTime_WindowTimeSubscriber = /*@__PURE__*/function (_super) {
    __extends(WindowTimeSubscriber, _super);
    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.windowTimeSpan = windowTimeSpan;
        _this.windowCreationInterval = windowCreationInterval;
        _this.maxWindowSize = maxWindowSize;
        _this.scheduler = scheduler;
        _this.windows = [];
        var window = _this.openWindow();
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            var closeState = { subscriber: _this, window: window, context: null };
            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: _this, scheduler: scheduler };
            _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
            _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        } else {
            var timeSpanOnlyState = { subscriber: _this, window: window, windowTimeSpan: windowTimeSpan };
            _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
        return _this;
    }
    WindowTimeSubscriber.prototype._next = function (value) {
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
            var window_1 = windows[i];
            if (!window_1.closed) {
                window_1.next(value);
                if (window_1.numberOfNextedValues >= this.maxWindowSize) {
                    this.closeWindow(window_1);
                }
            }
        }
    };
    WindowTimeSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };
    WindowTimeSubscriber.prototype._complete = function () {
        var windows = this.windows;
        while (windows.length > 0) {
            var window_2 = windows.shift();
            if (!window_2.closed) {
                window_2.complete();
            }
        }
        this.destination.complete();
    };
    WindowTimeSubscriber.prototype.openWindow = function () {
        var window = new windowTime_CountedSubject();
        this.windows.push(window);
        var destination = this.destination;
        destination.next(window);
        return window;
    };
    WindowTimeSubscriber.prototype.closeWindow = function (window) {
        window.complete();
        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
    };
    return WindowTimeSubscriber;
}(Subscriber_Subscriber);
function dispatchWindowTimeSpanOnly(state) {
    var subscriber = state.subscriber,
        windowTimeSpan = state.windowTimeSpan,
        window = state.window;
    if (window) {
        subscriber.closeWindow(window);
    }
    state.window = subscriber.openWindow();
    this.schedule(state, windowTimeSpan);
}
function dispatchWindowCreation(state) {
    var windowTimeSpan = state.windowTimeSpan,
        subscriber = state.subscriber,
        scheduler = state.scheduler,
        windowCreationInterval = state.windowCreationInterval;
    var window = subscriber.openWindow();
    var action = this;
    var context = { action: action, subscription: null };
    var timeSpanState = { subscriber: subscriber, window: window, context: context };
    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
    action.add(context.subscription);
    action.schedule(state, windowCreationInterval);
}
function dispatchWindowClose(state) {
    var subscriber = state.subscriber,
        window = state.window,
        context = state.context;
    if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
    }
    subscriber.closeWindow(window);
}
//# sourceMappingURL=windowTime.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/windowToggle.js
/** PURE_IMPORTS_START tslib,_Subject,_Subscription,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */







function windowToggle(openings, closingSelector) {
    return function (source) {
        return source.lift(new WindowToggleOperator(openings, closingSelector));
    };
}
var WindowToggleOperator = /*@__PURE__*/function () {
    function WindowToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    WindowToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new windowToggle_WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return WindowToggleOperator;
}();
var windowToggle_WindowToggleSubscriber = /*@__PURE__*/function (_super) {
    __extends(WindowToggleSubscriber, _super);
    function WindowToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(_this.openSubscription = subscribeToResult(_this, openings, openings));
        return _this;
    }
    WindowToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        if (contexts) {
            var len = contexts.length;
            for (var i = 0; i < len; i++) {
                contexts[i].window.next(value);
            }
        }
    };
    WindowToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context_1 = contexts[index];
                context_1.window.error(err);
                context_1.subscription.unsubscribe();
            }
        }
        _super.prototype._error.call(this, err);
    };
    WindowToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context_2 = contexts[index];
                context_2.window.complete();
                context_2.subscription.unsubscribe();
            }
        }
        _super.prototype._complete.call(this);
    };
    WindowToggleSubscriber.prototype._unsubscribe = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context_3 = contexts[index];
                context_3.window.unsubscribe();
                context_3.subscription.unsubscribe();
            }
        }
    };
    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
            var closingSelector = this.closingSelector;
            var closingNotifier = tryCatch(closingSelector)(innerValue);
            if (closingNotifier === errorObject) {
                return this.error(errorObject.e);
            } else {
                var window_1 = new Subject_Subject();
                var subscription = new Subscription_Subscription();
                var context_4 = { window: window_1, subscription: subscription };
                this.contexts.push(context_4);
                var innerSubscription = subscribeToResult(this, closingNotifier, context_4);
                if (innerSubscription.closed) {
                    this.closeWindow(this.contexts.length - 1);
                } else {
                    innerSubscription.context = context_4;
                    subscription.add(innerSubscription);
                }
                this.destination.next(window_1);
            }
        } else {
            this.closeWindow(this.contexts.indexOf(outerValue));
        }
    };
    WindowToggleSubscriber.prototype.notifyError = function (err) {
        this.error(err);
    };
    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
        if (inner !== this.openSubscription) {
            this.closeWindow(this.contexts.indexOf(inner.context));
        }
    };
    WindowToggleSubscriber.prototype.closeWindow = function (index) {
        if (index === -1) {
            return;
        }
        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window,
            subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
    };
    return WindowToggleSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=windowToggle.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/windowWhen.js
/** PURE_IMPORTS_START tslib,_Subject,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */






function windowWhen(closingSelector) {
    return function windowWhenOperatorFunction(source) {
        return source.lift(new windowWhen_WindowOperator(closingSelector));
    };
}
var windowWhen_WindowOperator = /*@__PURE__*/function () {
    function WindowOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new windowWhen_WindowSubscriber(subscriber, this.closingSelector));
    };
    return WindowOperator;
}();
var windowWhen_WindowSubscriber = /*@__PURE__*/function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.closingSelector = closingSelector;
        _this.openWindow();
        return _this;
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
        if (this.closingNotification) {
            this.closingNotification.unsubscribe();
        }
    };
    WindowSubscriber.prototype.openWindow = function (innerSub) {
        if (innerSub === void 0) {
            innerSub = null;
        }
        if (innerSub) {
            this.remove(innerSub);
            innerSub.unsubscribe();
        }
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var window = this.window = new Subject_Subject();
        this.destination.next(window);
        var closingNotifier = tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject) {
            var err = errorObject.e;
            this.destination.error(err);
            this.window.error(err);
        } else {
            this.add(this.closingNotification = subscribeToResult(this, closingNotifier));
        }
    };
    return WindowSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=windowWhen.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/withLatestFrom.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (source) {
        var project;
        if (typeof args[args.length - 1] === 'function') {
            project = args.pop();
        }
        var observables = args;
        return source.lift(new WithLatestFromOperator(observables, project));
    };
}
var WithLatestFromOperator = /*@__PURE__*/function () {
    function WithLatestFromOperator(observables, project) {
        this.observables = observables;
        this.project = project;
    }
    WithLatestFromOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new withLatestFrom_WithLatestFromSubscriber(subscriber, this.observables, this.project));
    };
    return WithLatestFromOperator;
}();
var withLatestFrom_WithLatestFromSubscriber = /*@__PURE__*/function (_super) {
    __extends(WithLatestFromSubscriber, _super);
    function WithLatestFromSubscriber(destination, observables, project) {
        var _this = _super.call(this, destination) || this;
        _this.observables = observables;
        _this.project = project;
        _this.toRespond = [];
        var len = observables.length;
        _this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            _this.toRespond.push(i);
        }
        for (var i = 0; i < len; i++) {
            var observable = observables[i];
            _this.add(subscribeToResult(_this, observable, observable, i));
        }
        return _this;
    }
    WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
    };
    WithLatestFromSubscriber.prototype.notifyComplete = function () {};
    WithLatestFromSubscriber.prototype._next = function (value) {
        if (this.toRespond.length === 0) {
            var args = [value].concat(this.values);
            if (this.project) {
                this._tryProject(args);
            } else {
                this.destination.next(args);
            }
        }
    };
    WithLatestFromSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return WithLatestFromSubscriber;
}(OuterSubscriber_OuterSubscriber);
//# sourceMappingURL=withLatestFrom.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/zip.js
/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

function zip_zip() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return function zipOperatorFunction(source) {
        return source.lift.call(zip.apply(void 0, [source].concat(observables)));
    };
}
//# sourceMappingURL=zip.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/internal/operators/zipAll.js
/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

function zipAll(project) {
    return function (source) {
        return source.lift(new ZipOperator(project));
    };
}
//# sourceMappingURL=zipAll.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/_esm5/operators/index.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */








































































































//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./components/card/style.css
var card_style = __webpack_require__("HoW2");
var card_style_default = /*#__PURE__*/__webpack_require__.n(card_style);

// CONCATENATED MODULE: ./components/card/index.js



function Card(_ref) {
  var front = _ref.front,
      back = _ref.back,
      isFlipped = _ref.isFlipped,
      match = _ref.match,
      onClick = _ref.onClick,
      disabled = _ref.disabled;

  if (Boolean(match)) {
    return Object(preact_min["h"])(
      "div",
      { "class": card_style_default.a.card, "data-isFlipped": true },
      Object(preact_min["h"])("button", {
        "class": card_style_default.a.match,
        style: { background: match.color },
        disabled: true
      })
    );
  }

  return Object(preact_min["h"])(
    "div",
    { "class": card_style_default.a.card, "data-isFlipped": isFlipped },
    Object(preact_min["h"])(
      "button",
      { "class": card_style_default.a.front, onClick: onClick, disabled: disabled },
      front
    ),
    Object(preact_min["h"])(
      "div",
      { "class": card_style_default.a.back },
      back
    )
  );
}
// EXTERNAL MODULE: ./components/loader/style.css
var loader_style = __webpack_require__("1TXn");
var loader_style_default = /*#__PURE__*/__webpack_require__.n(loader_style);

// CONCATENATED MODULE: ./components/loader/loader.js



function Loader() {
  return Object(preact_min["h"])(
    "div",
    { "class": loader_style_default.a.loader },
    "Loading..."
  );
}
// CONCATENATED MODULE: ./components/loader/index.js

// EXTERNAL MODULE: ./routes/game/style.css
var game_style = __webpack_require__("R2VR");
var game_style_default = /*#__PURE__*/__webpack_require__.n(game_style);

// CONCATENATED MODULE: ./routes/game/index.js
var game__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint react/sort-comp: 0 */












var _require = __webpack_require__("jSu/"),
    GAME_END_TYPE = _require.GAME_END_TYPE,
    ERROR = _require.ERROR,
    EVENT = _require.EVENT,
    LOAD_STATUS = _require.LOAD_STATUS,
    MESSAGE = _require.MESSAGE;

var game__ref2 = Object(preact_min["h"])(Loader, null);

var game_Game = function (_Component) {
  _inherits(Game, _Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      flippedIndices: [],
      words: [],
      matches: {},
      load: {
        status: LOAD_STATUS.LOADING,
        message: null
      },
      countdown: 20,
      players: [],
      username: null
    };

    _this.loadGameData = function (token) {
      return new Promise(function ($return, $error) {
        var res, stats, error;
        var $Try_1_Post = function () {
          try {
            return $return();
          } catch ($boundEx) {
            return $error($boundEx);
          }
        };var $Try_1_Catch = function (e) {
          try {
            error = void 0;
            if (typeof e.json !== "function") {
              error = { message: MESSAGE.SERVER_ERROR };
              return $If_2.call(this);
            } else {
              return Promise.resolve(e.json()).then(function ($await_3) {
                try {
                  error = $await_3;
                  return $If_2.call(this);
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }.bind(this), $error);
            }

            function $If_2() {
              _this.props.onError(error.message);
              return $Try_1_Post();
            }
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this);
        try {
          return Promise.resolve(post("game-data", {
            token: token
          })).then(function ($await_4) {
            try {
              res = $await_4;
              return Promise.resolve(res.json()).then(function ($await_5) {
                try {
                  stats = $await_5;
                  _this.setState(game__extends({}, stats, {
                    load: {
                      status: LOAD_STATUS.LOADED
                    }
                  }), _this.initSocket);
                  return $Try_1_Post();
                } catch ($boundEx) {
                  return $Try_1_Catch($boundEx);
                }
              }, $Try_1_Catch);
            } catch ($boundEx) {
              return $Try_1_Catch($boundEx);
            }
          }, $Try_1_Catch);
        } catch (e) {
          $Try_1_Catch(e)
        }
      });
    };

    _this.initSocket = function () {
      _this.socket = lib_default()(BASE_URL + "?username=" + _this.state.username, {
        path: "/" + _this.props.token
      });

      fromEvent(_this.socket, EVENT.CARD_FLIPPED).subscribe(_this.handleCardFlip);

      fromEvent(_this.socket, EVENT.PLAYER_COUNTDOWN_UPDATED).subscribe(_this.handlePlayerCountdownUpdate);

      fromEvent(_this.socket, EVENT.PLAYERS_UPDATED).subscribe(_this.handlePlayersUpdate);

      fromEvent(_this.socket, EVENT.PLAYER_COUNTDOWN_EXPIRED).subscribe(_this.handlePlayerCountdownExpiry);

      fromEvent(_this.socket, EVENT.GAME_END).subscribe(_this.handleGameEnd);

      // fromEvent(this.socket, DISCONNECT).subscribe(this.handleDisconnect);
    };

    _this.handleCardFlip = function (newStats) {
      _this.setState(newStats);
    };

    _this.handlePlayerCountdownUpdate = function (countdown) {
      _this.setState({ countdown: countdown });
    };

    _this.handlePlayersUpdate = function (players) {
      _this.setState({ players: players });
    };

    _this.handlePlayerCountdownExpiry = function () {
      _this.socket.close();
      _this.props.removeGame(GAME_END_TYPE.PLAYER_TIMEOUT);
    };

    _this.handleGameEnd = function (message) {
      _this.socket.close();
      _this.props.removeGame(message);
    };

    _this.handleGameStart = function (token) {
      route("/game/" + token);
      _this.loadGameData(token);
    };

    _this.handleDisconnect = function () {
      _this.setState({
        load: {
          status: LOAD_STATUS.ERROR,
          message: ERROR.DISCONNECT
        }
      });
    };

    _this.flipCard = function (word) {
      _this.socket.emit(EVENT.CARD_FLIP, word);
    };

    _this.leaveGame = function () {
      _this.socket.close();
      _this.route("/");
    };

    _this.getMyPlayer = function () {
      return _this.state.players.find(function (player) {
        return player.username === _this.state.username;
      });
    };

    _this.getCurrentPlayer = function () {
      return _this.state.players.find(function (player) {
        return player.canPlay;
      });
    };

    _this.socket = null;
    _this.flipObservable = Observable_Observable.create(function (observer) {
      _this.flipNext = function (word) {
        return observer.next(word);
      };
    });
    _this.flipObservable.pipe(throttleTime(500)).subscribe(_this.flipCard);
    return _this;
  }

  Game.prototype.componentDidMount = function componentDidMount() {
    return new Promise(function ($return, $error) {
      this.loadGameData(this.props.token);
      return $return();
    }.bind(this));
  };

  Game.prototype.render = function render(_, _ref) {
    var _this2 = this;

    var load = _ref.load,
        words = _ref.words,
        flippedIndices = _ref.flippedIndices,
        matches = _ref.matches,
        countdown = _ref.countdown,
        players = _ref.players;

    if (load.status === LOAD_STATUS.LOADING) {
      return game__ref2;
    }

    var myPlayer = this.getMyPlayer();
    var currentPlayer = this.getCurrentPlayer();

    return Object(preact_min["h"])(
      "div",
      { "class": game_style_default.a.game },
      Object(preact_min["h"])(
        "div",
        { "class": game_style_default.a.header },
        players.map(function (_ref3) {
          var username = _ref3.username,
              score = _ref3.score,
              canPlay = _ref3.canPlay,
              color = _ref3.color;
          return Object(preact_min["h"])(
            "div",
            {
              "class": canPlay ? game_style_default.a.currentPlayer : game_style_default.a.otherPlayer,
              style: { borderColor: color, color: color }
            },
            username,
            ": ",
            score
          );
        })
      ),
      Object(preact_min["h"])(
        "main",
        { "class": game_style_default.a.body },
        Object(preact_min["h"])(
          "div",
          { "class": game_style_default.a.canPlay },
          !myPlayer.canPlay ? "Wait for your turn" : "Your turn"
        ),
        countdown > 10 ? null : Object(preact_min["h"])(
          "div",
          {
            "class": game_style_default.a.countdown,
            style: { backgroundColor: currentPlayer.color }
          },
          countdown
        ),
        Object(preact_min["h"])(
          "div",
          { "class": game_style_default.a.grid, "data-canPlay": myPlayer.canPlay },
          words.map(function (word) {
            return Object(preact_min["h"])(Card, {
              front: "?",
              back: word.value,
              isFlipped: flippedIndices.includes(word.key),
              match: matches[word.key],
              disabled: !myPlayer.canPlay,
              onClick: function onClick() {
                return _this2.flipNext(word);
              }
            });
          })
        )
      )
    );
  };

  return Game;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var app__require = __webpack_require__("jSu/"),
    app_GAME_END_TYPE = app__require.GAME_END_TYPE,
    app_MESSAGE = app__require.MESSAGE,
    EMOJI = app__require.EMOJI,
    app_LOAD_STATUS = app__require.LOAD_STATUS;

var app__ref3 = Object(preact_min["h"])(Loader, null);

var app_App = function (_Component) {
  app__inherits(App, _Component);

  function App() {
    var _temp, _this, _ret;

    app__classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      gameEnd: null,
      token: null,
      load: { status: app_LOAD_STATUS.LOADED, message: null }
    }, _this.handleRoute = function (e) {
      if (_this.state.token) {
        return preact_router_es.route("/game/" + _this.state.token);
      }
      _this.currentUrl = e.url;
    }, _this.startGame = function () {
      return new Promise(function ($return, $error) {
        _this.setState({ load: { status: app_LOAD_STATUS.LOADING, message: null } }, function () {
          return new Promise(function ($return, $error) {
            var res, _ref, token, error;

            var $Try_1_Post = function () {
              try {
                return $return();
              } catch ($boundEx) {
                return $error($boundEx);
              }
            };var $Try_1_Catch = function (e) {
              try {
                error = void 0;
                if (typeof e.json !== "function") {
                  error = { message: app_MESSAGE.SERVER_ERROR };
                  return $If_2.call(this);
                } else {
                  return Promise.resolve(e.json()).then(function ($await_3) {
                    try {
                      error = $await_3;
                      return $If_2.call(this);
                    } catch ($boundEx) {
                      return $error($boundEx);
                    }
                  }.bind(this), $error);
                }

                function $If_2() {
                  _this.setState({
                    load: { status: app_LOAD_STATUS.ERROR, message: error.message }
                  });
                  return $Try_1_Post();
                }
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this);
            try {
              return Promise.resolve(get("create-game")).then(function ($await_4) {
                try {
                  res = $await_4;
                  return Promise.resolve(res.json()).then(function ($await_5) {
                    try {
                      _ref = $await_5, token = _ref.token;

                      _this.setState({
                        load: { status: app_LOAD_STATUS.LOADED, message: null },
                        token: token
                      });
                      return $Try_1_Post();
                    } catch ($boundEx) {
                      return $Try_1_Catch($boundEx);
                    }
                  }, $Try_1_Catch);
                } catch ($boundEx) {
                  return $Try_1_Catch($boundEx);
                }
              }, $Try_1_Catch);
            } catch (e) {
              $Try_1_Catch(e)
            }
          });
        });
        return $return();
      });
    }, _this.handleError = function (error) {
      _this.setState({
        load: { status: app_LOAD_STATUS.ERROR, message: error, token: null }
      }, function () {
        preact_router_es.route("/");
      });
    }, _this.removeGame = function (gameEnd) {
      _this.setState({ gameEnd: gameEnd, token: null }, function () {
        preact_router_es.route("/");
      });
    }, _this.getFeedbackMessage = function () {
      var _this$state = _this.state,
          gameEnd = _this$state.gameEnd,
          load = _this$state.load;


      if (load.status === app_LOAD_STATUS.ERROR) {
        return { emoji: EMOJI.SAD, message: load.message };
      }

      if (gameEnd === app_GAME_END_TYPE.WON) {
        return { emoji: EMOJI.PARTY, message: app_MESSAGE.WON };
      }

      if (gameEnd === app_GAME_END_TYPE.TIE) {
        return { emoji: EMOJI.THUMBS_UP, message: app_MESSAGE.TIE };
      }

      if (gameEnd === app_GAME_END_TYPE.LOST) {
        return { emoji: EMOJI.SAD, message: app_MESSAGE.LOST };
      }

      if (gameEnd === app_GAME_END_TYPE.PLAYER_TIMEOUT) {
        return { emoji: EMOJI.SAD, message: app_MESSAGE.PLAYER_TIMEOUT };
      }

      return { emoji: EMOJI.SAD, message: app_MESSAGE.GAME_TIMEOUT };
    }, _temp), app__possibleConstructorReturn(_this, _ret);
  }

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */


  App.prototype.render = function render(_, _ref2) {
    var gameEnd = _ref2.gameEnd,
        load = _ref2.load,
        token = _ref2.token;

    if (load.status === app_LOAD_STATUS.LOADING) {
      return app__ref3;
    }

    var feedback = load.status === app_LOAD_STATUS.ERROR || gameEnd ? this.getFeedbackMessage() : null;

    return Object(preact_min["h"])(
      preact_router_es,
      { onChange: this.handleRoute },
      Object(preact_min["h"])(Home, {
        path: "/",
        startGame: this.startGame,
        feedback: feedback,
        onError: this.handleError
      }),
      Object(preact_min["h"])(game_Game, {
        path: "/game/:token",
        removeGame: this.removeGame,
        onError: this.handleError
      })
    );
  };

  return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index_0 = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "Jlql":
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__("6IAg");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy() {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = M;for (i = arguments.length; i-- > 2;) {
      T.push(arguments[i]);
    }t && null != t.children && (T.length || T.push(t.children), delete t.children);while (T.length) {
      if ((o = T.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        T.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === M ? l = [o] : l.push(o), n = r;
    }var a = new S();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== L.vnode && L.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function o(e) {
    !e.__d && (e.__d = !0) && 1 == D.push(e) && (L.debounceRendering || P)(r);
  }function r() {
    var e,
        t = D;D = [];while (e = t.pop()) {
      e.__d && C(e);
    }
  }function i(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && l(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function l(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function a(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function p(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function s(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function u(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === W.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, c, l) : e.removeEventListener(t, c, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) {
        try {
          e[t] = null == o ? "" : o;
        } catch (e) {}null != o && !1 !== o || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var a = r && t !== (t = t.replace(/^xlink:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function c(e) {
    return this.__l[e.type](L.event && L.event(e) || e);
  }function _() {
    var e;while (e = E.pop()) {
      L.afterMount && L.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    V++ || (A = null != r && void 0 !== r.ownerSVGElement, H = null != e && !("__preactattr_" in e));var l = f(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --V || (H = !1, i || _()), l;
  }function f(e, t, n, o, r) {
    var i = e,
        a = A;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), m(e, !0))), i.__preactattr_ = !0, i;var s = t.nodeName;if ("function" == typeof s) return x(e, t, n, o);if (A = "svg" === s || "foreignObject" !== s && A, s += "", (!e || !l(e, s)) && (i = p(s, A), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), m(e, !0);
    }var u = i.firstChild,
        c = i.__preactattr_,
        _ = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var d = i.attributes, f = d.length; f--;) {
        c[d[f].name] = d[f].value;
      }
    }return !H && _ && 1 === _.length && "string" == typeof _[0] && null != u && void 0 !== u.splitText && null == u.nextSibling ? u.nodeValue != _[0] && (u.nodeValue = _[0]) : (_ && _.length || null != u) && h(i, _, n, o, H || null != c.dangerouslySetInnerHTML), b(i, t.attributes, c), A = a, i;
  }function h(e, t, n, o, r) {
    var l,
        a,
        p,
        u,
        c,
        _ = e.childNodes,
        d = [],
        h = {},
        v = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (v++, h[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (d[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      u = t[C], c = null;var k = u.key;if (null != k) v && void 0 !== h[k] && (c = h[k], h[k] = void 0, v--);else if (b < g) for (l = b; l < g; l++) {
        if (void 0 !== d[l] && i(a = d[l], u, r)) {
          c = a, d[l] = void 0, l === g - 1 && g--, l === b && b++;break;
        }
      }c = f(c, u, n, o), p = _[C], c && c !== e && c !== p && (null == p ? e.appendChild(c) : c === p.nextSibling ? s(p) : e.insertBefore(c, p));
    }if (v) for (var C in h) {
      void 0 !== h[C] && m(h[C], !1);
    }while (b <= g) {
      void 0 !== (c = d[g--]) && m(c, !1);
    }
  }function m(e, t) {
    var n = e._component;n ? N(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || s(e), v(e));
  }function v(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;m(e, !0), e = t;
    }
  }function b(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || u(e, o, n[o], n[o] = void 0, A);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || u(e, o, n[o], n[o] = t[o], A);
    }
  }function y(e, t, n) {
    var o,
        r = B.length;e.prototype && e.prototype.render ? (o = new e(t, n), k.call(o, t, n)) : (o = new k(t, n), o.constructor = e, o.render = g);while (r--) {
      if (B[r].constructor === e) return o.__b = B[r].__b, B.splice(r, 1), o;
    }return o;
  }function g(e, t, n) {
    return this.constructor(e, n);
  }function w(e, t, n, r, i) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, r)), r && r !== e.context && (e.__c || (e.__c = e.context), e.context = r), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === L.syncComponentUpdates && e.base ? o(e) : C(e, 1, i)), e.__r && e.__r(e));
  }function C(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          p,
          s = e.props,
          u = e.state,
          c = e.context,
          f = e.__p || s,
          h = e.__s || u,
          v = e.__c || c,
          b = e.base,
          g = e.__b,
          x = b || g,
          k = e._component,
          U = !1,
          S = v;if (e.constructor.getDerivedStateFromProps && (u = t(t({}, u), e.constructor.getDerivedStateFromProps(s, u)), e.state = u), b && (e.props = f, e.state = h, e.context = v, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(s, u, c) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(s, u, c), e.props = s, e.state = u, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(s, u, c), e.getChildContext && (c = t(t({}, c), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(f, h));var T,
            M,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = a(i);l = k, l && l.constructor === P && W.key == l.__k ? w(l, W, 1, c, !1) : (T = l, e._component = l = y(P, W, c), l.__b = l.__b || g, l.__u = e, w(l, W, 0, c, !1), C(l, 1, o, !0)), M = l.base;
        } else p = x, T = k, T && (p = e._component = null), (x || 1 === n) && (p && (p._component = null), M = d(p, i, c, o || !b, x && x.parentNode, !0));if (x && M !== x && l !== k) {
          var D = x.parentNode;D && M !== D && (D.replaceChild(M, x), T || (x._component = null, m(x, !1)));
        }if (T && N(T), e.base = M, M && !r) {
          var A = e,
              H = e;while (H = H.__u) {
            (A = H).base = M;
          }M._component = A, M._componentConstructor = A.constructor;
        }
      }!b || o ? E.unshift(e) : U || (e.componentDidUpdate && e.componentDidUpdate(f, h, S), L.afterUpdate && L.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }V || r || _();
    }
  }function x(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        p = r && e._componentConstructor === t.nodeName,
        s = p,
        u = a(t);while (r && !s && (r = r.__u)) {
      s = r.constructor === t.nodeName;
    }return r && s && (!o || r._component) ? (w(r, u, 3, n, o), e = r.base) : (i && !p && (N(i), e = l = null), r = y(t.nodeName, u, n), e && !r.__b && (r.__b = e, l = null), w(r, u, 1, n, o), e = r.base, l && e !== l && (l._component = null, m(l, !1))), e;
  }function N(e) {
    L.beforeUnmount && L.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? N(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, s(t), B.push(e), v(t)), e.__r && e.__r(null);
  }function k(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function U(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }var S = function S() {},
      L = {},
      T = [],
      M = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      W = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      D = [],
      E = [],
      V = 0,
      A = !1,
      H = !1,
      B = [];t(k.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), o(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), C(this, 2);
    }, render: function render() {} });var F = { h: e, createElement: e, cloneElement: n, Component: k, render: U, rerender: r, options: L }; true ? module.exports = F : self.preact = F;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "LkqO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//

var tokenChars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];

/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */
function push(dest, name, elem) {
  if (Object.prototype.hasOwnProperty.call(dest, name)) dest[name].push(elem);else dest[name] = [elem];
}

/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */
function parse(header) {
  var offers = {};

  if (header === undefined || header === '') return offers;

  var params = {};
  var mustUnescape = false;
  var isEscaping = false;
  var inQuotes = false;
  var extensionName;
  var paramName;
  var start = -1;
  var end = -1;

  for (var i = 0; i < header.length; i++) {
    var code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 /* ' ' */ || code === 0x09 /* '\t' */) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
          if (start === -1) throw new Error('unexpected character at index ' + i);

          if (end === -1) end = i;
          var name = header.slice(start, end);
          if (code === 0x2c) {
            push(offers, name, params);
            params = {};
          } else {
            extensionName = name;
          }

          start = end = -1;
        } else {
        throw new Error('unexpected character at index ' + i);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) throw new Error('unexpected character at index ' + i);

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = {};
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new Error('unexpected character at index ' + i);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars[code] !== 1) {
          throw new Error('unexpected character at index ' + i);
        }
        if (start === -1) start = i;else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
            isEscaping = true;
          } else {
          throw new Error('unexpected character at index ' + i);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) throw new Error('unexpected character at index ' + i);

        if (end === -1) end = i;
        var value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = {};
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new Error('unexpected character at index ' + i);
      }
    }
  }

  if (start === -1 || inQuotes) throw new Error('unexpected end of input');

  if (end === -1) end = i;
  var token = header.slice(start, end);
  if (extensionName === undefined) {
    push(offers, token, {});
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }

  return offers;
}

/**
 * Serializes a parsed `Sec-WebSocket-Extensions` header to a string.
 *
 * @param {Object} value The object to format
 * @return {String} A string representing the given value
 * @public
 */
function format(value) {
  return Object.keys(value).map(function (token) {
    var paramsList = value[token];
    if (!Array.isArray(paramsList)) paramsList = [paramsList];
    return paramsList.map(function (params) {
      return [token].concat(Object.keys(params).map(function (k) {
        var p = params[k];
        if (!Array.isArray(p)) p = [p];
        return p.map(function (v) {
          return v === true ? k : k + '=' + v;
        }).join('; ');
      })).join('; ');
    }).join(', ');
  }).join(', ');
}

module.exports = { format: format, parse: parse };

/***/ }),

/***/ "NpfF":
/***/ (function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function (obj, fn) {
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function () {
    return fn.apply(obj, args.concat(slice.call(arguments)));
  };
};

/***/ }),

/***/ "OPnv":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ "R2VR":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"game":"game__3RIvy","header":"header__1IMnM","currentPlayer":"currentPlayer__ur2n3","otherPlayer":"otherPlayer__14coV","body":"body__2rl-7","grid":"grid__2kLtN","countdown":"countdown__1sY8Y","canPlay":"canPlay__2N0qp"};

/***/ }),

/***/ "Rs/2":
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("An6L");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/***/ }),

/***/ "TMkh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Queue(options) {
  if (!(this instanceof Queue)) {
    return new Queue(options);
  }

  options = options || {};
  this.concurrency = options.concurrency || Infinity;
  this.pending = 0;
  this.jobs = [];
  this.cbs = [];
  this._done = done.bind(this);
}

var arrayAddMethods = ['push', 'unshift', 'splice'];

arrayAddMethods.forEach(function (method) {
  Queue.prototype[method] = function () {
    var methodResult = Array.prototype[method].apply(this.jobs, arguments);
    this._run();
    return methodResult;
  };
});

Object.defineProperty(Queue.prototype, 'length', {
  get: function get() {
    return this.pending + this.jobs.length;
  }
});

Queue.prototype._run = function () {
  if (this.pending === this.concurrency) {
    return;
  }
  if (this.jobs.length) {
    var job = this.jobs.shift();
    this.pending++;
    job(this._done);
    this._run();
  }

  if (this.pending === 0) {
    while (this.cbs.length !== 0) {
      var cb = this.cbs.pop();
      process.nextTick(cb);
    }
  }
};

Queue.prototype.onDone = function (cb) {
  if (typeof cb === 'function') {
    this.cbs.push(cb);
    this._run();
  }
};

function done() {
  this.pending--;
  this._run();
}

module.exports = Queue;

/***/ }),

/***/ "Tn4q":
/***/ (function(module, exports) {


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys(obj) {
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

/***/ }),

/***/ "UOg/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



try {
  var isValidUTF8 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"utf-8-validate\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  module.exports = typeof isValidUTF8 === 'object' ? isValidUTF8.Validation.isValidUTF8 // utf-8-validate@<3.0.0
  : isValidUTF8;
} catch (e) /* istanbul ignore next */{
  module.exports = function () {
    return true;
  };
}

/***/ }),

/***/ "VOQX":
/***/ (function(module, exports) {


module.exports = isBuf;

var withNativeBuffer = typeof global.Buffer === 'function' && typeof global.Buffer.isBuffer === 'function';
var withNativeArrayBuffer = typeof global.ArrayBuffer === 'function';

var isView = function () {
  if (withNativeArrayBuffer && typeof global.ArrayBuffer.isView === 'function') {
    return global.ArrayBuffer.isView;
  } else {
    return function (obj) {
      return obj.buffer instanceof global.ArrayBuffer;
    };
  }
}();

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return withNativeBuffer && global.Buffer.isBuffer(obj) || withNativeArrayBuffer && (obj instanceof global.ArrayBuffer || isView(obj));
}

/***/ }),

/***/ "Vy1O":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "Wr69":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1),
      callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

/***/ }),

/***/ "Wu+Q":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var safeBuffer = __webpack_require__("38Wu");
var crypto = __webpack_require__("Wum3");

var PerMessageDeflate = __webpack_require__("bUnR");
var bufferUtil = __webpack_require__("+Zip");
var ErrorCodes = __webpack_require__("s08o");
var constants = __webpack_require__("DnAD");

var Buffer = safeBuffer.Buffer;

/**
 * HyBi Sender implementation.
 */

var Sender = function () {
  /**
   * Creates a Sender instance.
   *
   * @param {net.Socket} socket The connection socket
   * @param {Object} extensions An object containing the negotiated extensions
   */
  function Sender(socket, extensions) {
    _classCallCheck(this, Sender);

    this._extensions = extensions || {};
    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {Buffer} data The data to frame
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @return {Buffer[]} The framed data as a list of `Buffer` instances
   * @public
   */


  Sender.frame = function frame(data, options) {
    var merge = data.length < 1024 || options.mask && options.readOnly;
    var offset = options.mask ? 6 : 2;
    var payloadLength = data.length;

    if (data.length >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (data.length > 125) {
      offset += 2;
      payloadLength = 126;
    }

    var target = Buffer.allocUnsafe(merge ? data.length + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    if (payloadLength === 126) {
      target.writeUInt16BE(data.length, 2, true);
    } else if (payloadLength === 127) {
      target.writeUInt32BE(0, 2, true);
      target.writeUInt32BE(data.length, 6, true);
    }

    if (!options.mask) {
      target[1] = payloadLength;
      if (merge) {
        data.copy(target, offset);
        return [target];
      }

      return [target, data];
    }

    var mask = crypto.randomBytes(4);

    target[1] = payloadLength | 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (merge) {
      bufferUtil.mask(data, mask, target, offset, data.length);
      return [target];
    }

    bufferUtil.mask(data, mask, data, 0, data.length);
    return [target, data];
  };

  /**
   * Sends a close message to the other peer.
   *
   * @param {(Number|undefined)} code The status code component of the body
   * @param {String} data The message component of the body
   * @param {Boolean} mask Specifies whether or not to mask the message
   * @param {Function} cb Callback
   * @public
   */


  Sender.prototype.close = function close(code, data, mask, cb) {
    var buf;

    if (code === undefined) {
      code = 1000;
    } else if (typeof code !== 'number' || !ErrorCodes.isValidErrorCode(code)) {
      throw new Error('first argument must be a valid error code number');
    }

    if (data === undefined || data === '') {
      if (code === 1000) {
        buf = constants.EMPTY_BUFFER;
      } else {
        buf = Buffer.allocUnsafe(2);
        buf.writeUInt16BE(code, 0, true);
      }
    } else {
      buf = Buffer.allocUnsafe(2 + Buffer.byteLength(data));
      buf.writeUInt16BE(code, 0, true);
      buf.write(data, 2);
    }

    if (this._deflating) {
      this.enqueue([this.doClose, buf, mask, cb]);
    } else {
      this.doClose(buf, mask, cb);
    }
  };

  /**
   * Frames and sends a close message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @private
   */


  Sender.prototype.doClose = function doClose(data, mask, cb) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x08,
      mask: mask,
      readOnly: false
    }), cb);
  };

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @public
   */


  Sender.prototype.ping = function ping(data, mask) {
    var readOnly = true;

    if (!Buffer.isBuffer(data)) {
      if (data instanceof ArrayBuffer) {
        data = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        data = viewToBuffer(data);
      } else {
        data = Buffer.from(data);
        readOnly = false;
      }
    }

    if (this._deflating) {
      this.enqueue([this.doPing, data, mask, readOnly]);
    } else {
      this.doPing(data, mask, readOnly);
    }
  };

  /**
   * Frames and sends a ping message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Boolean} readOnly Specifies whether `data` can be modified
   * @private
   */


  Sender.prototype.doPing = function doPing(data, mask, readOnly) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x09,
      mask: mask,
      readOnly: readOnly
    }));
  };

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @public
   */


  Sender.prototype.pong = function pong(data, mask) {
    var readOnly = true;

    if (!Buffer.isBuffer(data)) {
      if (data instanceof ArrayBuffer) {
        data = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        data = viewToBuffer(data);
      } else {
        data = Buffer.from(data);
        readOnly = false;
      }
    }

    if (this._deflating) {
      this.enqueue([this.doPong, data, mask, readOnly]);
    } else {
      this.doPong(data, mask, readOnly);
    }
  };

  /**
   * Frames and sends a pong message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Boolean} readOnly Specifies whether `data` can be modified
   * @private
   */


  Sender.prototype.doPong = function doPong(data, mask, readOnly) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x0a,
      mask: mask,
      readOnly: readOnly
    }));
  };

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} options.compress Specifies whether or not to compress `data`
   * @param {Boolean} options.binary Specifies whether `data` is binary or text
   * @param {Boolean} options.fin Specifies whether the fragment is the last one
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */


  Sender.prototype.send = function send(data, options, cb) {
    var opcode = options.binary ? 2 : 1;
    var rsv1 = options.compress;
    var readOnly = true;

    if (!Buffer.isBuffer(data)) {
      if (data instanceof ArrayBuffer) {
        data = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        data = viewToBuffer(data);
      } else {
        data = Buffer.from(data);
        readOnly = false;
      }
    }

    var perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    if (this._firstFragment) {
      this._firstFragment = false;
      if (rsv1 && perMessageDeflate) {
        rsv1 = data.length >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      var opts = {
        fin: options.fin,
        rsv1: rsv1,
        opcode: opcode,
        mask: options.mask,
        readOnly: readOnly
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, data, this._compress, opts, cb]);
      } else {
        this.dispatch(data, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(Sender.frame(data, {
        fin: options.fin,
        rsv1: false,
        opcode: opcode,
        mask: options.mask,
        readOnly: readOnly
      }), cb);
    }
  };

  /**
   * Dispatches a data message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} compress Specifies whether or not to compress `data`
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @param {Function} cb Callback
   * @private
   */


  Sender.prototype.dispatch = function dispatch(data, compress, options, cb) {
    var _this = this;

    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    var perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, function (_, buf) {
      options.readOnly = false;
      _this.sendFrame(Sender.frame(buf, options), cb);
      _this._deflating = false;
      _this.dequeue();
    });
  };

  /**
   * Executes queued send operations.
   *
   * @private
   */


  Sender.prototype.dequeue = function dequeue() {
    while (!this._deflating && this._queue.length) {
      var params = this._queue.shift();

      this._bufferedBytes -= params[1].length;
      params[0].apply(this, params.slice(1));
    }
  };

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */


  Sender.prototype.enqueue = function enqueue(params) {
    this._bufferedBytes += params[1].length;
    this._queue.push(params);
  };

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} cb Callback
   * @private
   */


  Sender.prototype.sendFrame = function sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
    } else {
      this._socket.write(list[0], cb);
    }
  };

  return Sender;
}();

module.exports = Sender;

/**
 * Converts an `ArrayBuffer` view into a buffer.
 *
 * @param {(DataView|TypedArray)} view The view to convert
 * @return {Buffer} Converted view
 * @private
 */
function viewToBuffer(view) {
  var buf = Buffer.from(view.buffer);

  if (view.byteLength !== view.buffer.byteLength) {
    return buf.slice(view.byteOffset, view.byteOffset + view.byteLength);
  }

  return buf;
}

/***/ }),

/***/ "Wum3":
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "X1xq":
/***/ (function(module, exports) {


module.exports = function (a, b) {
  var fn = function fn() {};
  fn.prototype = b.prototype;
  a.prototype = new fn();
  a.prototype.constructor = a;
};

/***/ }),

/***/ "XgVs":
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__MseGd","head":"head__1eYZv"};

/***/ }),

/***/ "a90S":
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "aJTU":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ "bCvK":
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("2S04");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/***/ }),

/***/ "bUnR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var safeBuffer = __webpack_require__("38Wu");
var Limiter = __webpack_require__("TMkh");
var zlib = __webpack_require__("epkN");

var bufferUtil = __webpack_require__("+Zip");

var Buffer = safeBuffer.Buffer;

var TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
var EMPTY_BLOCK = Buffer.from([0x00]);

var kWriteInProgress = Symbol('write-in-progress');
var kPendingClose = Symbol('pending-close');
var kTotalLength = Symbol('total-length');
var kCallback = Symbol('callback');
var kBuffers = Symbol('buffers');
var kError = Symbol('error');
var kOwner = Symbol('owner');

//
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//
var zlibLimiter = void 0;

/**
 * permessage-deflate implementation.
 */

var PerMessageDeflate = function () {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} options Configuration options
   * @param {Boolean} options.serverNoContextTakeover Request/accept disabling
   *     of server context takeover
   * @param {Boolean} options.clientNoContextTakeover Advertise/acknowledge
   *     disabling of client context takeover
   * @param {(Boolean|Number)} options.serverMaxWindowBits Request/confirm the
   *     use of a custom server window size
   * @param {(Boolean|Number)} options.clientMaxWindowBits Advertise support
   *     for, or request, a custom client window size
   * @param {Number} options.level The value of zlib's `level` param
   * @param {Number} options.memLevel The value of zlib's `memLevel` param
   * @param {Number} options.threshold Size (in bytes) below which messages
   *     should not be compressed
   * @param {Number} options.concurrencyLimit The number of concurrent calls to
   *     zlib
   * @param {Boolean} isServer Create the instance in either server or client
   *     mode
   * @param {Number} maxPayload The maximum allowed message length
   */
  function PerMessageDeflate(options, isServer, maxPayload) {
    _classCallCheck(this, PerMessageDeflate);

    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold = this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;

    this.params = null;

    if (!zlibLimiter) {
      var concurrency = this._options.concurrencyLimit !== undefined ? this._options.concurrencyLimit : 10;
      zlibLimiter = new Limiter({ concurrency: concurrency });
    }
  }

  /**
   * @type {String}
   */


  /**
   * Create extension parameters offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  PerMessageDeflate.prototype.offer = function offer() {
    var params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }
    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  };

  /**
   * Accept extension offer.
   *
   * @param {Array} paramsList Extension parameters
   * @return {Object} Accepted configuration
   * @public
   */


  PerMessageDeflate.prototype.accept = function accept(paramsList) {
    paramsList = this.normalizeParams(paramsList);

    var params;
    if (this._isServer) {
      params = this.acceptAsServer(paramsList);
    } else {
      params = this.acceptAsClient(paramsList);
    }

    this.params = params;
    return params;
  };

  /**
   * Releases all resources used by the extension.
   *
   * @public
   */


  PerMessageDeflate.prototype.cleanup = function cleanup() {
    if (this._inflate) {
      if (this._inflate[kWriteInProgress]) {
        this._inflate[kPendingClose] = true;
      } else {
        this._inflate.close();
        this._inflate = null;
      }
    }
    if (this._deflate) {
      if (this._deflate[kWriteInProgress]) {
        this._deflate[kPendingClose] = true;
      } else {
        this._deflate.close();
        this._deflate = null;
      }
    }
  };

  /**
   * Accept extension offer from client.
   *
   * @param {Array} paramsList Extension parameters
   * @return {Object} Accepted configuration
   * @private
   */


  PerMessageDeflate.prototype.acceptAsServer = function acceptAsServer(paramsList) {
    var _this = this;

    var accepted = {};
    var result = paramsList.some(function (params) {
      if (_this._options.serverNoContextTakeover === false && params.server_no_context_takeover || _this._options.serverMaxWindowBits === false && params.server_max_window_bits || typeof _this._options.serverMaxWindowBits === 'number' && typeof params.server_max_window_bits === 'number' && _this._options.serverMaxWindowBits > params.server_max_window_bits || typeof _this._options.clientMaxWindowBits === 'number' && !params.client_max_window_bits) {
        return;
      }

      if (_this._options.serverNoContextTakeover || params.server_no_context_takeover) {
        accepted.server_no_context_takeover = true;
      }
      if (_this._options.clientNoContextTakeover || _this._options.clientNoContextTakeover !== false && params.client_no_context_takeover) {
        accepted.client_no_context_takeover = true;
      }
      if (typeof _this._options.serverMaxWindowBits === 'number') {
        accepted.server_max_window_bits = _this._options.serverMaxWindowBits;
      } else if (typeof params.server_max_window_bits === 'number') {
        accepted.server_max_window_bits = params.server_max_window_bits;
      }
      if (typeof _this._options.clientMaxWindowBits === 'number') {
        accepted.client_max_window_bits = _this._options.clientMaxWindowBits;
      } else if (_this._options.clientMaxWindowBits !== false && typeof params.client_max_window_bits === 'number') {
        accepted.client_max_window_bits = params.client_max_window_bits;
      }
      return true;
    });

    if (!result) throw new Error("Doesn't support the offered configuration");

    return accepted;
  };

  /**
   * Accept extension response from server.
   *
   * @param {Array} paramsList Extension parameters
   * @return {Object} Accepted configuration
   * @private
   */


  PerMessageDeflate.prototype.acceptAsClient = function acceptAsClient(paramsList) {
    var params = paramsList[0];

    if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
      throw new Error('Invalid value for "client_no_context_takeover"');
    }

    if (typeof this._options.clientMaxWindowBits === 'number' && (!params.client_max_window_bits || params.client_max_window_bits > this._options.clientMaxWindowBits) || this._options.clientMaxWindowBits === false && params.client_max_window_bits) {
      throw new Error('Invalid value for "client_max_window_bits"');
    }

    return params;
  };

  /**
   * Normalize extensions parameters.
   *
   * @param {Array} paramsList Extension parameters
   * @return {Array} Normalized extensions parameters
   * @private
   */


  PerMessageDeflate.prototype.normalizeParams = function normalizeParams(paramsList) {
    var _this2 = this;

    return paramsList.map(function (params) {
      Object.keys(params).forEach(function (key) {
        var value = params[key];
        if (value.length > 1) {
          throw new Error('Multiple extension parameters for ' + key);
        }

        value = value[0];

        switch (key) {
          case 'server_no_context_takeover':
          case 'client_no_context_takeover':
            if (value !== true) {
              throw new Error('invalid extension parameter value for ' + key + ' (' + value + ')');
            }
            params[key] = true;
            break;
          case 'server_max_window_bits':
          case 'client_max_window_bits':
            if (typeof value === 'string') {
              value = parseInt(value, 10);
              if (Number.isNaN(value) || value < zlib.Z_MIN_WINDOWBITS || value > zlib.Z_MAX_WINDOWBITS) {
                throw new Error('invalid extension parameter value for ' + key + ' (' + value + ')');
              }
            }
            if (!_this2._isServer && value === true) {
              throw new Error('Missing extension parameter value for ' + key);
            }
            params[key] = value;
            break;
          default:
            throw new Error('Not defined extension parameter (' + key + ')');
        }
      });
      return params;
    });
  };

  /**
   * Decompress data. Concurrency limited by async-limiter.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */


  PerMessageDeflate.prototype.decompress = function decompress(data, fin, callback) {
    var _this3 = this;

    zlibLimiter.push(function (done) {
      _this3._decompress(data, fin, function (err, result) {
        done();
        callback(err, result);
      });
    });
  };

  /**
   * Compress data. Concurrency limited by async-limiter.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */


  PerMessageDeflate.prototype.compress = function compress(data, fin, callback) {
    var _this4 = this;

    zlibLimiter.push(function (done) {
      _this4._compress(data, fin, function (err, result) {
        done();
        callback(err, result);
      });
    });
  };

  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */


  PerMessageDeflate.prototype._decompress = function _decompress(data, fin, callback) {
    var _this5 = this;

    var endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      var key = endpoint + '_max_window_bits';
      var windowBits = typeof this.params[key] !== 'number' ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];

      this._inflate = zlib.createInflateRaw({ windowBits: windowBits });
      this._inflate[kTotalLength] = 0;
      this._inflate[kBuffers] = [];
      this._inflate[kOwner] = this;
      this._inflate.on('error', inflateOnError);
      this._inflate.on('data', inflateOnData);
    }

    this._inflate[kCallback] = callback;
    this._inflate[kWriteInProgress] = true;

    this._inflate.write(data);
    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(function () {
      var err = _this5._inflate[kError];

      if (err) {
        _this5._inflate.close();
        _this5._inflate = null;
        callback(err);
        return;
      }

      var data = bufferUtil.concat(_this5._inflate[kBuffers], _this5._inflate[kTotalLength]);

      if (fin && _this5.params[endpoint + '_no_context_takeover'] || _this5._inflate[kPendingClose]) {
        _this5._inflate.close();
        _this5._inflate = null;
      } else {
        _this5._inflate[kWriteInProgress] = false;
        _this5._inflate[kTotalLength] = 0;
        _this5._inflate[kBuffers] = [];
      }

      callback(null, data);
    });
  };

  /**
   * Compress data.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */


  PerMessageDeflate.prototype._compress = function _compress(data, fin, callback) {
    var _this6 = this;

    if (!data || data.length === 0) {
      process.nextTick(callback, null, EMPTY_BLOCK);
      return;
    }

    var endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      var key = endpoint + '_max_window_bits';
      var windowBits = typeof this.params[key] !== 'number' ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];

      this._deflate = zlib.createDeflateRaw({
        memLevel: this._options.memLevel,
        level: this._options.level,
        flush: zlib.Z_SYNC_FLUSH,
        windowBits: windowBits
      });

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      //
      // `zlib.DeflateRaw` emits an `'error'` event only when an attempt to use
      // it is made after it has already been closed. This cannot happen here,
      // so we only add a listener for the `'data'` event.
      //
      this._deflate.on('data', deflateOnData);
    }

    this._deflate[kWriteInProgress] = true;

    this._deflate.write(data);
    this._deflate.flush(zlib.Z_SYNC_FLUSH, function () {
      var data = bufferUtil.concat(_this6._deflate[kBuffers], _this6._deflate[kTotalLength]);

      if (fin) data = data.slice(0, data.length - 4);

      if (fin && _this6.params[endpoint + '_no_context_takeover'] || _this6._deflate[kPendingClose]) {
        _this6._deflate.close();
        _this6._deflate = null;
      } else {
        _this6._deflate[kWriteInProgress] = false;
        _this6._deflate[kTotalLength] = 0;
        _this6._deflate[kBuffers] = [];
      }

      callback(null, data);
    });
  };

  _createClass(PerMessageDeflate, null, [{
    key: 'extensionName',
    get: function get() {
      return 'permessage-deflate';
    }
  }]);

  return PerMessageDeflate;
}();

module.exports = PerMessageDeflate;

/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}

/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (this[kOwner]._maxPayload < 1 || this[kTotalLength] <= this[kOwner]._maxPayload) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError] = new Error('max payload size exceeded');
  this[kError].closeCode = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}

/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */
function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kOwner]._inflate = null;
  this[kCallback](err);
}

/***/ }),

/***/ "c/GT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var safeBuffer = __webpack_require__("38Wu");
var EventEmitter = __webpack_require__("FpCL");
var crypto = __webpack_require__("Wum3");
var Ultron = __webpack_require__("hLY1");
var http = __webpack_require__("gHkb");
var url = __webpack_require__("Vy1O");

var PerMessageDeflate = __webpack_require__("bUnR");
var Extensions = __webpack_require__("LkqO");
var constants = __webpack_require__("DnAD");
var WebSocket = __webpack_require__("sDZw");

var Buffer = safeBuffer.Buffer;

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */

var WebSocketServer = function (_EventEmitter) {
  _inherits(WebSocketServer, _EventEmitter);

  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {String} options.host The hostname where to bind the server
   * @param {Number} options.port The port where to bind the server
   * @param {http.Server} options.server A pre-created HTTP/S server to use
   * @param {Function} options.verifyClient An hook to reject connections
   * @param {Function} options.handleProtocols An hook to handle protocols
   * @param {String} options.path Accept only connections matching this path
   * @param {Boolean} options.noServer Enable no server mode
   * @param {Boolean} options.clientTracking Specifies whether or not to track clients
   * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
   * @param {Number} options.maxPayload The maximum allowed message size
   * @param {Function} callback A listener for the `listening` event
   */
  function WebSocketServer(options, callback) {
    _classCallCheck(this, WebSocketServer);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    options = _extends({
      maxPayload: 100 * 1024 * 1024,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null
    }, options);

    if (options.port == null && !options.server && !options.noServer) {
      throw new TypeError('missing or invalid options');
    }

    if (options.port != null) {
      _this._server = http.createServer(function (req, res) {
        var body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      _this._server.listen(options.port, options.host, options.backlog, callback);
    } else if (options.server) {
      _this._server = options.server;
    }

    if (_this._server) {
      _this._ultron = new Ultron(_this._server);
      _this._ultron.on('listening', function () {
        return _this.emit('listening');
      });
      _this._ultron.on('error', function (err) {
        return _this.emit('error', err);
      });
      _this._ultron.on('upgrade', function (req, socket, head) {
        _this.handleUpgrade(req, socket, head, function (client) {
          _this.emit('connection', client, req);
        });
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) _this.clients = new Set();
    _this.options = options;
    return _this;
  }

  /**
   * Close the server.
   *
   * @param {Function} cb Callback
   * @public
   */


  WebSocketServer.prototype.close = function close(cb) {
    //
    // Terminate all associated clients.
    //
    if (this.clients) {
      for (var _iterator = this.clients, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var client = _ref;
        client.terminate();
      }
    }

    var server = this._server;

    if (server) {
      this._ultron.destroy();
      this._ultron = this._server = null;

      //
      // Close the http server if it was internally created.
      //
      if (this.options.port != null) return server.close(cb);
    }

    if (cb) cb();
  };

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */


  WebSocketServer.prototype.shouldHandle = function shouldHandle(req) {
    if (this.options.path && url.parse(req.url).pathname !== this.options.path) {
      return false;
    }

    return true;
  };

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */


  WebSocketServer.prototype.handleUpgrade = function handleUpgrade(req, socket, head, cb) {
    var _this2 = this;

    socket.on('error', socketError);

    var version = +req.headers['sec-websocket-version'];
    var extensions = {};

    if (req.method !== 'GET' || req.headers.upgrade.toLowerCase() !== 'websocket' || !req.headers['sec-websocket-key'] || version !== 8 && version !== 13 || !this.shouldHandle(req)) {
      return abortConnection(socket, 400);
    }

    if (this.options.perMessageDeflate) {
      var perMessageDeflate = new PerMessageDeflate(this.options.perMessageDeflate, true, this.options.maxPayload);

      try {
        var offers = Extensions.parse(req.headers['sec-websocket-extensions']);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        return abortConnection(socket, 400);
      }
    }

    var protocol = (req.headers['sec-websocket-protocol'] || '').split(/, */);

    //
    // Optionally call external protocol selection handler.
    //
    if (this.options.handleProtocols) {
      protocol = this.options.handleProtocols(protocol, req);
      if (protocol === false) return abortConnection(socket, 401);
    } else {
      protocol = protocol[0];
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      var info = {
        origin: req.headers['' + (version === 8 ? 'sec-websocket-origin' : 'origin')],
        secure: !!(req.connection.authorized || req.connection.encrypted),
        req: req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, function (verified, code, message) {
          if (!verified) return abortConnection(socket, code || 401, message);

          _this2.completeUpgrade(protocol, extensions, version, req, socket, head, cb);
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortConnection(socket, 401);
    }

    this.completeUpgrade(protocol, extensions, version, req, socket, head, cb);
  };

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {String} protocol The chosen subprotocol
   * @param {Object} extensions The accepted extensions
   * @param {Number} version The WebSocket protocol version
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @private
   */


  WebSocketServer.prototype.completeUpgrade = function completeUpgrade(protocol, extensions, version, req, socket, head, cb) {
    var _this3 = this;

    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    var key = crypto.createHash('sha1').update(req.headers['sec-websocket-key'] + constants.GUID, 'binary').digest('base64');

    var headers = ['HTTP/1.1 101 Switching Protocols', 'Upgrade: websocket', 'Connection: Upgrade', 'Sec-WebSocket-Accept: ' + key];

    if (protocol) headers.push('Sec-WebSocket-Protocol: ' + protocol);
    if (extensions[PerMessageDeflate.extensionName]) {
      var _Extensions$format;

      var params = extensions[PerMessageDeflate.extensionName].params;
      var value = Extensions.format((_Extensions$format = {}, _Extensions$format[PerMessageDeflate.extensionName] = [params], _Extensions$format));
      headers.push('Sec-WebSocket-Extensions: ' + value);
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));

    var client = new WebSocket([socket, head], null, {
      maxPayload: this.options.maxPayload,
      protocolVersion: version,
      extensions: extensions,
      protocol: protocol
    });

    if (this.clients) {
      this.clients.add(client);
      client.on('close', function () {
        return _this3.clients.delete(client);
      });
    }

    socket.removeListener('error', socketError);
    cb(client);
  };

  return WebSocketServer;
}(EventEmitter);

module.exports = WebSocketServer;

/**
 * Handle premature socket errors.
 *
 * @private
 */
function socketError() {
  this.destroy();
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {net.Socket} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @private
 */
function abortConnection(socket, code, message) {
  if (socket.writable) {
    message = message || http.STATUS_CODES[code];
    socket.write('HTTP/1.1 ' + code + ' ' + http.STATUS_CODES[code] + '\r\n' + 'Connection: close\r\n' + 'Content-type: text/html\r\n' + ('Content-Length: ' + Buffer.byteLength(message) + '\r\n') + '\r\n' + message);
  }

  socket.removeListener('error', socketError);
  socket.destroy();
}

/***/ }),

/***/ "epkN":
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),

/***/ "fAXJ":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var utf8 = __webpack_require__("s6hm");
var hasBinary = __webpack_require__("/E6E");
var after = __webpack_require__("ibc9");
var keys = __webpack_require__("Tn4q");

/**
 * Current protocol version.
 */
exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
  open: 0 // non-ws
  , close: 1 // non-ws
  , ping: 2,
  pong: 3,
  message: 4,
  upgrade: 5,
  noop: 6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  if (Buffer.isBuffer(packet.data)) {
    return encodeBuffer(packet, supportsBinary, callback);
  } else if (packet.data && (packet.data.buffer || packet.data) instanceof ArrayBuffer) {
    packet.data = arrayBufferToBuffer(packet.data);
    return encodeBuffer(packet, supportsBinary, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);
};

/**
 * Encode Buffer data
 */

function encodeBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var typeBuffer = new Buffer(1);
  typeBuffer[0] = packets[packet.type];
  return callback(Buffer.concat([typeBuffer, data]));
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function (packet, callback) {
  if (!Buffer.isBuffer(packet.data)) {
    packet.data = arrayBufferToBuffer(packet.data);
  }

  var message = 'b' + packets[packet.type];
  message += packet.data.toString('base64');
  return callback(message);
};

/**
 * Decodes a packet. Data also available as an ArrayBuffer if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }

  var type;

  // String data
  if (typeof data === 'string') {

    type = data.charAt(0);

    if (type === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  // Binary data
  if (binaryType === 'arraybuffer') {
    // wrap Buffer/ArrayBuffer data into an Uint8Array
    var intArray = new Uint8Array(data);
    type = intArray[0];
    return { type: packetslist[type], data: intArray.buffer.slice(1) };
  }

  if (data instanceof ArrayBuffer) {
    data = arrayBufferToBuffer(data);
  }
  type = data[0];
  return { type: packetslist[type], data: data.slice(1) };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string.
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function (msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  var data = new Buffer(msg.substr(1), 'base64');
  if (binaryType === 'arraybuffer') {
    var abv = new Uint8Array(data.length);
    for (var i = 0; i < abv.length; i++) {
      abv[i] = data[i];
    }
    data = abv.buffer;
  }
  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  if (supportsBinary && hasBinary(packets)) {
    return exports.encodePayloadAsBinary(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, supportsBinary, false, function (message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function (err, results) {
    return callback(results.join(''));
  });
};

function setLengthHeader(message) {
  return message.length + ':' + message;
}

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  for (var i = 0; i < ary.length; i++) {
    each(ary[i], function (error, msg) {
      result[i] = msg;
      next(error, result);
    });
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '',
      n,
      msg,
      packet;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || length != (n = Number(length))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var more = callback(packet, i + n, l);
      if (false === more) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }
};

/**
 *
 * Converts a buffer to a utf8.js encoded string
 *
 * @api private
 */

function bufferToString(buffer) {
  var str = '';
  for (var i = 0, l = buffer.length; i < l; i++) {
    str += String.fromCharCode(buffer[i]);
  }
  return str;
}

/**
 *
 * Converts a utf8.js encoded string to a buffer
 *
 * @api private
 */

function stringToBuffer(string) {
  var buf = new Buffer(string.length);
  for (var i = 0, l = string.length; i < l; i++) {
    buf.writeUInt8(string.charCodeAt(i), i);
  }
  return buf;
}

/**
 *
 * Converts an ArrayBuffer to a Buffer
 *
 * @api private
 */

function arrayBufferToBuffer(data) {
  // data is either an ArrayBuffer or ArrayBufferView.
  var array = new Uint8Array(data.buffer || data);
  var length = data.byteLength || data.length;
  var offset = data.byteOffset || 0;
  var buffer = new Buffer(length);

  for (var i = 0; i < length; i++) {
    buffer[i] = array[offset + i];
  }
  return buffer;
}

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {Buffer} encoded payload
 * @api private
 */

exports.encodePayloadAsBinary = function (packets, callback) {
  if (!packets.length) {
    return callback(new Buffer(0));
  }

  map(packets, encodeOneBinaryPacket, function (err, results) {
    return callback(Buffer.concat(results));
  });
};

function encodeOneBinaryPacket(p, doneCallback) {

  function onBinaryPacketEncode(packet) {

    var encodingLength = '' + packet.length;
    var sizeBuffer;

    if (typeof packet === 'string') {
      sizeBuffer = new Buffer(encodingLength.length + 2);
      sizeBuffer[0] = 0; // is a string (not true binary = 0)
      for (var i = 0; i < encodingLength.length; i++) {
        sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
      }
      sizeBuffer[sizeBuffer.length - 1] = 255;
      return doneCallback(null, Buffer.concat([sizeBuffer, stringToBuffer(packet)]));
    }

    sizeBuffer = new Buffer(encodingLength.length + 2);
    sizeBuffer[0] = 1; // is binary (true binary = 1)
    for (var i = 0; i < encodingLength.length; i++) {
      sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
    }
    sizeBuffer[sizeBuffer.length - 1] = 255;

    doneCallback(null, Buffer.concat([sizeBuffer, packet]));
  }

  exports.encodePacket(p, true, true, onBinaryPacketEncode);
}

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary

 * @param {Buffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];
  var i;

  while (bufferTail.length > 0) {
    var strLen = '';
    var isString = bufferTail[0] === 0;
    for (i = 1;; i++) {
      if (bufferTail[i] === 255) break;
      // 310 = char length of Number.MAX_VALUE
      if (strLen.length > 310) {
        return callback(err, 0, 1);
      }
      strLen += '' + bufferTail[i];
    }
    bufferTail = bufferTail.slice(strLen.length + 1);

    var msgLength = parseInt(strLen, 10);

    var msg = bufferTail.slice(1, msgLength + 1);
    if (isString) msg = bufferToString(msg);
    buffers.push(msg);
    bufferTail = bufferTail.slice(msgLength + 1);
  }

  var total = buffers.length;
  for (i = 0; i < total; i++) {
    var buffer = buffers[i];
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  }
};

/***/ }),

/***/ "fY40":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



var WebSocket = __webpack_require__("sDZw");

WebSocket.Server = __webpack_require__("c/GT");
WebSocket.Receiver = __webpack_require__("rC10");
WebSocket.Sender = __webpack_require__("Wu+Q");

module.exports = WebSocket;

/***/ }),

/***/ "fy20":
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "g98s":
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("Jlql");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/***/ }),

/***/ "gHkb":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "h0uD":
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__("APvO");

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = __webpack_require__("fAXJ");

/***/ }),

/***/ "hLY1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * An auto incrementing id which we can use to create "unique" Ultron instances
 * so we can track the event emitters that are added through the Ultron
 * interface.
 *
 * @type {Number}
 * @private
 */
var id = 0;

/**
 * Ultron is high-intelligence robot. It gathers intelligence so it can start improving
 * upon his rudimentary design. It will learn from your EventEmitting patterns
 * and exterminate them.
 *
 * @constructor
 * @param {EventEmitter} ee EventEmitter instance we need to wrap.
 * @api public
 */
function Ultron(ee) {
  if (!(this instanceof Ultron)) return new Ultron(ee);

  this.id = id++;
  this.ee = ee;
}

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @returns {Ultron}
 * @api public
 */
Ultron.prototype.on = function on(event, fn, context) {
  fn.__ultron = this.id;
  this.ee.on(event, fn, context);

  return this;
};
/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @returns {Ultron}
 * @api public
 */
Ultron.prototype.once = function once(event, fn, context) {
  fn.__ultron = this.id;
  this.ee.once(event, fn, context);

  return this;
};

/**
 * Remove the listeners we assigned for the given event.
 *
 * @returns {Ultron}
 * @api public
 */
Ultron.prototype.remove = function remove() {
  var args = arguments,
      ee = this.ee,
      event;

  //
  // When no event names are provided we assume that we need to clear all the
  // events that were assigned through us.
  //
  if (args.length === 1 && 'string' === typeof args[0]) {
    args = args[0].split(/[, ]+/);
  } else if (!args.length) {
    if (ee.eventNames) {
      args = ee.eventNames();
    } else if (ee._events) {
      args = [];

      for (event in ee._events) {
        if (has.call(ee._events, event)) args.push(event);
      }

      if (Object.getOwnPropertySymbols) {
        args = args.concat(Object.getOwnPropertySymbols(ee._events));
      }
    }
  }

  for (var i = 0; i < args.length; i++) {
    var listeners = ee.listeners(args[i]);

    for (var j = 0; j < listeners.length; j++) {
      event = listeners[j];

      //
      // Once listeners have a `listener` property that stores the real listener
      // in the EventEmitter that ships with Node.js.
      //
      if (event.listener) {
        if (event.listener.__ultron !== this.id) continue;
      } else if (event.__ultron !== this.id) {
        continue;
      }

      ee.removeListener(args[i], event);
    }
  }

  return this;
};

/**
 * Destroy the Ultron instance, remove all listeners and release all references.
 *
 * @returns {Boolean}
 * @api public
 */
Ultron.prototype.destroy = function destroy() {
  if (!this.ee) return false;

  this.remove();
  this.ee = null;

  return true;
};

//
// Expose the module.
//
module.exports = Ultron;

/***/ }),

/***/ "hc7C":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__("Axko");
var util = __webpack_require__("Bcfi");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("An6L");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  var supportsColor = __webpack_require__("DYmO");
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (err) {}
// swallow - we only care if `supports-color` is available; it doesn't have to be.


/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return (/^debug_/i.test(key)
  );
}).reduce(function (obj, key) {
  // camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;else if (/^(no|off|false|disabled)$/i.test(val)) val = false;else if (val === 'null') val = null;else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).split('\n').map(function (str) {
    return str.trim();
  }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\x1B[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\x1B[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\x1B[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());

/***/ }),

/***/ "hsm0":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__("HBl9");
var parseqs = __webpack_require__("vs2a");
var parser = __webpack_require__("fAXJ");
var inherit = __webpack_require__("X1xq");
var yeast = __webpack_require__("t9Jt");
var debug = __webpack_require__("G8yc")('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = function () {
  var XMLHttpRequest = __webpack_require__("6weq");
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
}();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts) {
  var forceBase64 = opts && opts.forceBase64;
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause() {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function callback(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close() {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function callbackfn() {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && ('https' === schema && Number(this.port) !== 443 || 'http' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/***/ }),

/***/ "ibc9":
/***/ (function(module, exports) {

module.exports = after;

function after(count, callback, err_cb) {
    var bail = false;
    err_cb = err_cb || noop;
    proxy.count = count;

    return count === 0 ? callback() : proxy;

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times');
        }
        --proxy.count;

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true;
            callback(err);
            // future error callbacks will go to error handler
            callback = err_cb;
        } else if (proxy.count === 0 && !bail) {
            callback(null, result);
        }
    }
}

function noop() {}

/***/ }),

/***/ "ime/":
/***/ (function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

/***/ }),

/***/ "jSu/":
/***/ (function(module, exports) {

module.exports = {
  EVENT: {
    CARD_FLIP: "CARD_FLIP",
    CARD_FLIPPED: "CARD_FLIPPED",
    CONNECTION: "connection",
    CURRENT_PLAYER_SWITCHED: "CURRENT_PLAYER_SWITCHED",
    DISCONNECT: "disconnect",
    GAME_COUNTDOWN_EXPIRED: "GAME_COUNTDOWN_EXPIRED",
    GAME_END: "GAME_END",
    PLAYER_COUNTDOWN_UPDATED: "PLAYER_COUNTDOWN_UPDATED",
    PLAYER_COUNTDOWN_EXPIRED: "PLAYER_COUNTDOWN_EXPIRED",
    PLAYERS_UPDATED: "PLAYERS_UPDATED"
  },
  MESSAGE: {
    SERVER_ERROR: "Sorry, there seems to be a connection problem with the server.",
    WON: "You won!",
    LOST: "You lost!",
    TIE: "Well Played! It's a tie.",
    GAME_TIMEOUT: "This game has been closed due to inactivity.",
    PLAYER_TIMEOUT: "You have been removed from the game due to inactivity. You can join again on the same link or create a new game."
  },
  EMOJI: {
    SAD: "😕",
    PARTY: "🎉",
    THUMBS_UP: "👍🏻"
  },
  GAME_END_TYPE: {
    WON: "WON",
    LOST: "LOST",
    TIE: "TIE",
    GAME_TIMEOUT: "TIMEOUT",
    PLAYER_TIMEOUT: "PLAYER_TIMEOUT"
  },
  LOAD_STATUS: {
    LOADED: "LOADED",
    LOADING: "LOADING",
    ERROR: "ERROR",
    GAME_END: "GAME_END",
    PLAYER_TIMEOUT: "PLAYER_TIMEOUT"
  }
};

/***/ }),

/***/ "l262":
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),

/***/ "pAuI":
/***/ (function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function () {
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function (min) {
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function (max) {
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};

/***/ }),

/***/ "qG0H":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__("Axko");
var util = __webpack_require__("Bcfi");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("Jlql");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  var supportsColor = __webpack_require__("DYmO");
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (err) {}
// swallow - we only care if `supports-color` is available; it doesn't have to be.


/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return (/^debug_/i.test(key)
  );
}).reduce(function (obj, key) {
  // camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;else if (/^(no|off|false|disabled)$/i.test(val)) val = false;else if (val === 'null') val = null;else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).split('\n').map(function (str) {
    return str.trim();
  }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\x1B[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\x1B[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\x1B[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());

/***/ }),

/***/ "rC10":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var safeBuffer = __webpack_require__("38Wu");

var PerMessageDeflate = __webpack_require__("bUnR");
var isValidUTF8 = __webpack_require__("UOg/");
var bufferUtil = __webpack_require__("+Zip");
var ErrorCodes = __webpack_require__("s08o");
var constants = __webpack_require__("DnAD");

var Buffer = safeBuffer.Buffer;

var GET_INFO = 0;
var GET_PAYLOAD_LENGTH_16 = 1;
var GET_PAYLOAD_LENGTH_64 = 2;
var GET_MASK = 3;
var GET_DATA = 4;
var INFLATING = 5;

/**
 * HyBi Receiver implementation.
 */

var Receiver = function () {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} extensions An object containing the negotiated extensions
   * @param {Number} maxPayload The maximum allowed message length
   * @param {String} binaryType The type for binary data
   */
  function Receiver(extensions, maxPayload, binaryType) {
    _classCallCheck(this, Receiver);

    this._binaryType = binaryType || constants.BINARY_TYPES[0];
    this._extensions = extensions || {};
    this._maxPayload = maxPayload | 0;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._mask = null;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._cleanupCallback = null;
    this._hadError = false;
    this._dead = false;
    this._loop = false;

    this.onmessage = null;
    this.onclose = null;
    this.onerror = null;
    this.onping = null;
    this.onpong = null;

    this._state = GET_INFO;
  }

  /**
   * Consumes bytes from the available buffered data.
   *
   * @param {Number} bytes The number of bytes to consume
   * @return {Buffer} Consumed bytes
   * @private
   */


  Receiver.prototype.readBuffer = function readBuffer(bytes) {
    var offset = 0;
    var dst;
    var l;

    this._bufferedBytes -= bytes;

    if (bytes === this._buffers[0].length) return this._buffers.shift();

    if (bytes < this._buffers[0].length) {
      dst = this._buffers[0].slice(0, bytes);
      this._buffers[0] = this._buffers[0].slice(bytes);
      return dst;
    }

    dst = Buffer.allocUnsafe(bytes);

    while (bytes > 0) {
      l = this._buffers[0].length;

      if (bytes >= l) {
        this._buffers[0].copy(dst, offset);
        offset += l;
        this._buffers.shift();
      } else {
        this._buffers[0].copy(dst, offset, 0, bytes);
        this._buffers[0] = this._buffers[0].slice(bytes);
      }

      bytes -= l;
    }

    return dst;
  };

  /**
   * Checks if the number of buffered bytes is bigger or equal than `n` and
   * calls `cleanup` if necessary.
   *
   * @param {Number} n The number of bytes to check against
   * @return {Boolean} `true` if `bufferedBytes >= n`, else `false`
   * @private
   */


  Receiver.prototype.hasBufferedBytes = function hasBufferedBytes(n) {
    if (this._bufferedBytes >= n) return true;

    this._loop = false;
    if (this._dead) this.cleanup(this._cleanupCallback);
    return false;
  };

  /**
   * Adds new data to the parser.
   *
   * @public
   */


  Receiver.prototype.add = function add(data) {
    if (this._dead) return;

    this._bufferedBytes += data.length;
    this._buffers.push(data);
    this.startLoop();
  };

  /**
   * Starts the parsing loop.
   *
   * @private
   */


  Receiver.prototype.startLoop = function startLoop() {
    this._loop = true;

    while (this._loop) {
      switch (this._state) {
        case GET_INFO:
          this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          this.getData();
          break;
        default:
          // `INFLATING`
          this._loop = false;
      }
    }
  };

  /**
   * Reads the first two bytes of a frame.
   *
   * @private
   */


  Receiver.prototype.getInfo = function getInfo() {
    if (!this.hasBufferedBytes(2)) return;

    var buf = this.readBuffer(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this.error(new Error('RSV2 and RSV3 must be clear'), 1002);
      return;
    }

    var compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
      this.error(new Error('RSV1 must be clear'), 1002);
      return;
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this.error(new Error('RSV1 must be clear'), 1002);
        return;
      }

      if (!this._fragmented) {
        this.error(new Error('invalid opcode: ' + this._opcode), 1002);
        return;
      } else {
        this._opcode = this._fragmented;
      }
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this.error(new Error('invalid opcode: ' + this._opcode), 1002);
        return;
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this.error(new Error('FIN must be set'), 1002);
        return;
      }

      if (compressed) {
        this.error(new Error('RSV1 must be clear'), 1002);
        return;
      }

      if (this._payloadLength > 0x7d) {
        this.error(new Error('invalid payload length'), 1002);
        return;
      }
    } else {
      this.error(new Error('invalid opcode: ' + this._opcode), 1002);
      return;
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;

    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;else this.haveLength();
  };

  /**
   * Gets extended payload length (7+16).
   *
   * @private
   */


  Receiver.prototype.getPayloadLength16 = function getPayloadLength16() {
    if (!this.hasBufferedBytes(2)) return;

    this._payloadLength = this.readBuffer(2).readUInt16BE(0, true);
    this.haveLength();
  };

  /**
   * Gets extended payload length (7+64).
   *
   * @private
   */


  Receiver.prototype.getPayloadLength64 = function getPayloadLength64() {
    if (!this.hasBufferedBytes(8)) return;

    var buf = this.readBuffer(8);
    var num = buf.readUInt32BE(0, true);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this.error(new Error('max payload size exceeded'), 1009);
      return;
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4, true);
    this.haveLength();
  };

  /**
   * Payload length has been read.
   *
   * @private
   */


  Receiver.prototype.haveLength = function haveLength() {
    if (this._opcode < 0x08 && this.maxPayloadExceeded(this._payloadLength)) {
      return;
    }

    if (this._masked) this._state = GET_MASK;else this._state = GET_DATA;
  };

  /**
   * Reads mask bytes.
   *
   * @private
   */


  Receiver.prototype.getMask = function getMask() {
    if (!this.hasBufferedBytes(4)) return;

    this._mask = this.readBuffer(4);
    this._state = GET_DATA;
  };

  /**
   * Reads data bytes.
   *
   * @private
   */


  Receiver.prototype.getData = function getData() {
    var data = constants.EMPTY_BUFFER;

    if (this._payloadLength) {
      if (!this.hasBufferedBytes(this._payloadLength)) return;

      data = this.readBuffer(this._payloadLength);
      if (this._masked) bufferUtil.unmask(data, this._mask);
    }

    if (this._opcode > 0x07) {
      this.controlMessage(data);
    } else if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data);
    } else if (this.pushFragment(data)) {
      this.dataMessage();
    }
  };

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @private
   */


  Receiver.prototype.decompress = function decompress(data) {
    var _this = this;

    var perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    perMessageDeflate.decompress(data, this._fin, function (err, buf) {
      if (err) {
        _this.error(err, err.closeCode === 1009 ? 1009 : 1007);
        return;
      }

      if (_this.pushFragment(buf)) _this.dataMessage();
      _this.startLoop();
    });
  };

  /**
   * Handles a data message.
   *
   * @private
   */


  Receiver.prototype.dataMessage = function dataMessage() {
    if (this._fin) {
      var messageLength = this._messageLength;
      var fragments = this._fragments;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        var data;

        if (this._binaryType === 'nodebuffer') {
          data = toBuffer(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(toBuffer(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.onmessage(data);
      } else {
        var buf = toBuffer(fragments, messageLength);

        if (!isValidUTF8(buf)) {
          this.error(new Error('invalid utf8 sequence'), 1007);
          return;
        }

        this.onmessage(buf.toString());
      }
    }

    this._state = GET_INFO;
  };

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @private
   */


  Receiver.prototype.controlMessage = function controlMessage(data) {
    if (this._opcode === 0x08) {
      if (data.length === 0) {
        this.onclose(1000, '');
        this._loop = false;
        this.cleanup(this._cleanupCallback);
      } else if (data.length === 1) {
        this.error(new Error('invalid payload length'), 1002);
      } else {
        var code = data.readUInt16BE(0, true);

        if (!ErrorCodes.isValidErrorCode(code)) {
          this.error(new Error('invalid status code: ' + code), 1002);
          return;
        }

        var buf = data.slice(2);

        if (!isValidUTF8(buf)) {
          this.error(new Error('invalid utf8 sequence'), 1007);
          return;
        }

        this.onclose(code, buf.toString());
        this._loop = false;
        this.cleanup(this._cleanupCallback);
      }

      return;
    }

    if (this._opcode === 0x09) this.onping(data);else this.onpong(data);

    this._state = GET_INFO;
  };

  /**
   * Handles an error.
   *
   * @param {Error} err The error
   * @param {Number} code Close code
   * @private
   */


  Receiver.prototype.error = function error(err, code) {
    this.onerror(err, code);
    this._hadError = true;
    this._loop = false;
    this.cleanup(this._cleanupCallback);
  };

  /**
   * Checks payload size, disconnects socket when it exceeds `maxPayload`.
   *
   * @param {Number} length Payload length
   * @private
   */


  Receiver.prototype.maxPayloadExceeded = function maxPayloadExceeded(length) {
    if (length === 0 || this._maxPayload < 1) return false;

    var fullLength = this._totalPayloadLength + length;

    if (fullLength <= this._maxPayload) {
      this._totalPayloadLength = fullLength;
      return false;
    }

    this.error(new Error('max payload size exceeded'), 1009);
    return true;
  };

  /**
   * Appends a fragment in the fragments array after checking that the sum of
   * fragment lengths does not exceed `maxPayload`.
   *
   * @param {Buffer} fragment The fragment to add
   * @return {Boolean} `true` if `maxPayload` is not exceeded, else `false`
   * @private
   */


  Receiver.prototype.pushFragment = function pushFragment(fragment) {
    if (fragment.length === 0) return true;

    var totalLength = this._messageLength + fragment.length;

    if (this._maxPayload < 1 || totalLength <= this._maxPayload) {
      this._messageLength = totalLength;
      this._fragments.push(fragment);
      return true;
    }

    this.error(new Error('max payload size exceeded'), 1009);
    return false;
  };

  /**
   * Releases resources used by the receiver.
   *
   * @param {Function} cb Callback
   * @public
   */


  Receiver.prototype.cleanup = function cleanup(cb) {
    this._dead = true;

    if (!this._hadError && (this._loop || this._state === INFLATING)) {
      this._cleanupCallback = cb;
    } else {
      this._extensions = null;
      this._fragments = null;
      this._buffers = null;
      this._mask = null;

      this._cleanupCallback = null;
      this.onmessage = null;
      this.onclose = null;
      this.onerror = null;
      this.onping = null;
      this.onpong = null;

      if (cb) cb();
    }
  };

  return Receiver;
}();

module.exports = Receiver;

/**
 * Makes a buffer from a list of fragments.
 *
 * @param {Buffer[]} fragments The list of fragments composing the message
 * @param {Number} messageLength The length of the message
 * @return {Buffer}
 * @private
 */
function toBuffer(fragments, messageLength) {
  if (fragments.length === 1) return fragments[0];
  if (fragments.length > 1) return bufferUtil.concat(fragments, messageLength);
  return constants.EMPTY_BUFFER;
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 */
function toArrayBuffer(buf) {
  if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

/***/ }),

/***/ "rcym":
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "ru/O":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module requirements.
 */

var Polling = __webpack_require__("hsm0");
var inherit = __webpack_require__("X1xq");

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty() {}

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling(opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete() {
    initIframe();
    fn();
  }

  function initIframe() {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

/***/ }),

/***/ "s08o":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



module.exports = {
  isValidErrorCode: function isValidErrorCode(code) {
    return code >= 1000 && code <= 1013 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3000 && code <= 4999;
  },
  1000: 'normal',
  1001: 'going away',
  1002: 'protocol error',
  1003: 'unsupported data',
  1004: 'reserved',
  1005: 'reserved for extensions',
  1006: 'reserved for extensions',
  1007: 'inconsistent or invalid data',
  1008: 'policy violation',
  1009: 'message too big',
  1010: 'extension handshake missing',
  1011: 'an unexpected condition prevented the request from being fulfilled',
  1012: 'service restart',
  1013: 'try again later'
};

/***/ }),

/***/ "s6hm":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function (root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module && module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) {
					// low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint, strict) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			if (strict) {
				throw Error('Lone surrogate U+' + codePoint.toString(16).toUpperCase() + ' is not a scalar value');
			}
			return false;
		}
		return true;
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
	}

	function encodeCodePoint(codePoint, strict) {
		if ((codePoint & 0xFFFFFF80) == 0) {
			// 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) {
			// 2-byte sequence
			symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
		} else if ((codePoint & 0xFFFF0000) == 0) {
			// 3-byte sequence
			if (!checkScalarValue(codePoint, strict)) {
				codePoint = 0xFFFD;
			}
			symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
			symbol += createByte(codePoint, 6);
		} else if ((codePoint & 0xFFE00000) == 0) {
			// 4-byte sequence
			symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
		return symbol;
	}

	function utf8encode(string, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint, strict);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol(strict) {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = (byte1 & 0x1F) << 6 | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;
			if (codePoint >= 0x0800) {
				return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = (byte1 & 0x07) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol(strict)) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.1.2',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return utf8;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) {
			// in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.utf8 = utf8;
	}
})(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("l262")(module)))

/***/ }),

/***/ "sDZw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = __webpack_require__("FpCL");
var crypto = __webpack_require__("Wum3");
var Ultron = __webpack_require__("hLY1");
var https = __webpack_require__("XgVs");
var http = __webpack_require__("gHkb");
var url = __webpack_require__("Vy1O");

var PerMessageDeflate = __webpack_require__("bUnR");
var EventTarget = __webpack_require__("A7Pu");
var Extensions = __webpack_require__("LkqO");
var constants = __webpack_require__("DnAD");
var Receiver = __webpack_require__("rC10");
var Sender = __webpack_require__("Wu+Q");

var protocolVersions = [8, 13];
var closeTimeout = 30 * 1000; // Allow 30 seconds to terminate the connection cleanly.

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */

var WebSocket = function (_EventEmitter) {
  _inherits(WebSocket, _EventEmitter);

  /**
   * Create a new `WebSocket`.
   *
   * @param {String} address The URL to which to connect
   * @param {(String|String[])} protocols The subprotocols
   * @param {Object} options Connection options
   */
  function WebSocket(address, protocols, options) {
    _classCallCheck(this, WebSocket);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    if (!protocols) {
      protocols = [];
    } else if (typeof protocols === 'string') {
      protocols = [protocols];
    } else if (!Array.isArray(protocols)) {
      options = protocols;
      protocols = [];
    }

    _this.readyState = WebSocket.CONNECTING;
    _this.bytesReceived = 0;
    _this.extensions = {};
    _this.protocol = '';

    _this._binaryType = constants.BINARY_TYPES[0];
    _this._finalize = _this.finalize.bind(_this);
    _this._closeFrameReceived = false;
    _this._closeFrameSent = false;
    _this._closeMessage = '';
    _this._closeTimer = null;
    _this._finalized = false;
    _this._closeCode = 1006;
    _this._receiver = null;
    _this._sender = null;
    _this._socket = null;
    _this._ultron = null;

    if (Array.isArray(address)) {
      initAsServerClient.call(_this, address[0], address[1], options);
    } else {
      initAsClient.call(_this, address, protocols, options);
    }
    return _this;
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @private
   */
  WebSocket.prototype.setSocket = function setSocket(socket, head) {
    var _this2 = this;

    socket.setTimeout(0);
    socket.setNoDelay();

    this._receiver = new Receiver(this.extensions, this._maxPayload, this.binaryType);
    this._sender = new Sender(socket, this.extensions);
    this._ultron = new Ultron(socket);
    this._socket = socket;

    this._ultron.on('close', this._finalize);
    this._ultron.on('error', this._finalize);
    this._ultron.on('end', this._finalize);

    if (head.length > 0) socket.unshift(head);

    this._ultron.on('data', function (data) {
      _this2.bytesReceived += data.length;
      _this2._receiver.add(data);
    });

    this._receiver.onmessage = function (data) {
      return _this2.emit('message', data);
    };
    this._receiver.onping = function (data) {
      _this2.pong(data, !_this2._isServer, true);
      _this2.emit('ping', data);
    };
    this._receiver.onpong = function (data) {
      return _this2.emit('pong', data);
    };
    this._receiver.onclose = function (code, reason) {
      _this2._closeFrameReceived = true;
      _this2._closeMessage = reason;
      _this2._closeCode = code;
      if (!_this2._finalized) _this2.close(code, reason);
    };
    this._receiver.onerror = function (error, code) {
      _this2._closeMessage = '';
      _this2._closeCode = code;

      //
      // Ensure that the error is emitted even if `WebSocket#finalize()` has
      // already been called.
      //
      _this2.readyState = WebSocket.CLOSING;
      _this2.emit('error', error);
      _this2.finalize(true);
    };

    this.readyState = WebSocket.OPEN;
    this.emit('open');
  };

  /**
   * Clean up and release internal resources.
   *
   * @param {(Boolean|Error)} error Indicates whether or not an error occurred
   * @private
   */


  WebSocket.prototype.finalize = function finalize(error) {
    var _this3 = this;

    if (this._finalized) return;

    this.readyState = WebSocket.CLOSING;
    this._finalized = true;

    if (typeof error === 'object') this.emit('error', error);
    if (!this._socket) return this.emitClose();

    clearTimeout(this._closeTimer);
    this._closeTimer = null;

    this._ultron.destroy();
    this._ultron = null;

    this._socket.on('error', constants.NOOP);

    if (!error) this._socket.end();else this._socket.destroy();

    this._socket = null;
    this._sender = null;

    this._receiver.cleanup(function () {
      return _this3.emitClose();
    });
    this._receiver = null;
  };

  /**
   * Emit the `close` event.
   *
   * @private
   */


  WebSocket.prototype.emitClose = function emitClose() {
    this.readyState = WebSocket.CLOSED;

    this.emit('close', this._closeCode, this._closeMessage);

    if (this.extensions[PerMessageDeflate.extensionName]) {
      this.extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this.extensions = null;

    this.removeAllListeners();
  };

  /**
   * Pause the socket stream.
   *
   * @public
   */


  WebSocket.prototype.pause = function pause() {
    if (this.readyState !== WebSocket.OPEN) throw new Error('not opened');

    this._socket.pause();
  };

  /**
   * Resume the socket stream
   *
   * @public
   */


  WebSocket.prototype.resume = function resume() {
    if (this.readyState !== WebSocket.OPEN) throw new Error('not opened');

    this._socket.resume();
  };

  /**
   * Start a closing handshake.
   *
   *            +----------+     +-----------+   +----------+
   *     + - - -|ws.close()|---->|close frame|-->|ws.close()|- - - -
   *            +----------+     +-----------+   +----------+       |
   *     |      +----------+     +-----------+         |
   *            |ws.close()|<----|close frame|<--------+            |
   *            +----------+     +-----------+         |
   *  CLOSING         |              +---+             |         CLOSING
   *                  |          +---|fin|<------------+
   *     |            |          |   +---+                          |
   *                  |          |   +---+      +-------------+
   *     |            +----------+-->|fin|----->|ws.finalize()| - - +
   *                             |   +---+      +-------------+
   *     |     +-------------+   |
   *      - - -|ws.finalize()|<--+
   *           +-------------+
   *
   * @param {Number} code Status code explaining why the connection is closing
   * @param {String} data A string explaining why the connection is closing
   * @public
   */


  WebSocket.prototype.close = function close(code, data) {
    var _this4 = this;

    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      this._req.abort();
      this.finalize(new Error('closed before the connection is established'));
      return;
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (this._closeFrameSent && this._closeFrameReceived) this._socket.end();
      return;
    }

    this.readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, function (err) {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      _this4._closeFrameSent = true;

      if (!_this4._finalized) {
        if (_this4._closeFrameReceived) _this4._socket.end();

        //
        // Ensure that the connection is cleaned up even when the closing
        // handshake fails.
        //
        _this4._closeTimer = setTimeout(_this4._finalize, closeTimeout, true);
      }
    });
  };

  /**
   * Send a ping message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Indicates whether or not to mask `data`
   * @param {Boolean} failSilently Indicates whether or not to throw if `readyState` isn't `OPEN`
   * @public
   */


  WebSocket.prototype.ping = function ping(data, mask, failSilently) {
    if (this.readyState !== WebSocket.OPEN) {
      if (failSilently) return;
      throw new Error('not opened');
    }

    if (typeof data === 'number') data = data.toString();
    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || constants.EMPTY_BUFFER, mask);
  };

  /**
   * Send a pong message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Indicates whether or not to mask `data`
   * @param {Boolean} failSilently Indicates whether or not to throw if `readyState` isn't `OPEN`
   * @public
   */


  WebSocket.prototype.pong = function pong(data, mask, failSilently) {
    if (this.readyState !== WebSocket.OPEN) {
      if (failSilently) return;
      throw new Error('not opened');
    }

    if (typeof data === 'number') data = data.toString();
    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || constants.EMPTY_BUFFER, mask);
  };

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} options.compress Specifies whether or not to compress `data`
   * @param {Boolean} options.binary Specifies whether `data` is binary or text
   * @param {Boolean} options.fin Specifies whether the fragment is the last one
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback which is executed when data is written out
   * @public
   */


  WebSocket.prototype.send = function send(data, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (this.readyState !== WebSocket.OPEN) {
      if (cb) cb(new Error('not opened'));else throw new Error('not opened');
      return;
    }

    if (typeof data === 'number') data = data.toString();

    var opts = _extends({
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true
    }, options);

    if (!this.extensions[PerMessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || constants.EMPTY_BUFFER, opts, cb);
  };

  /**
   * Forcibly close the connection.
   *
   * @public
   */


  WebSocket.prototype.terminate = function terminate() {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      this._req.abort();
      this.finalize(new Error('closed before the connection is established'));
      return;
    }

    this.finalize(true);
  };

  _createClass(WebSocket, [{
    key: 'CONNECTING',
    get: function get() {
      return WebSocket.CONNECTING;
    }
  }, {
    key: 'CLOSING',
    get: function get() {
      return WebSocket.CLOSING;
    }
  }, {
    key: 'CLOSED',
    get: function get() {
      return WebSocket.CLOSED;
    }
  }, {
    key: 'OPEN',
    get: function get() {
      return WebSocket.OPEN;
    }

    /**
     * @type {Number}
     */

  }, {
    key: 'bufferedAmount',
    get: function get() {
      var amount = 0;

      if (this._socket) {
        amount = this._socket.bufferSize + this._sender._bufferedBytes;
      }
      return amount;
    }

    /**
     * This deviates from the WHATWG interface since ws doesn't support the required
     * default "blob" type (instead we define a custom "nodebuffer" type).
     *
     * @type {String}
     */

  }, {
    key: 'binaryType',
    get: function get() {
      return this._binaryType;
    },
    set: function set(type) {
      if (constants.BINARY_TYPES.indexOf(type) < 0) return;

      this._binaryType = type;

      //
      // Allow to change `binaryType` on the fly.
      //
      if (this._receiver) this._receiver._binaryType = type;
    }
  }]);

  return WebSocket;
}(EventEmitter);

WebSocket.CONNECTING = 0;
WebSocket.OPEN = 1;
WebSocket.CLOSING = 2;
WebSocket.CLOSED = 3;

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach(function (method) {
  Object.defineProperty(WebSocket.prototype, 'on' + method, {
    /**
     * Return the listener of the event.
     *
     * @return {(Function|undefined)} The event listener or `undefined`
     * @public
     */
    get: function get() {
      var listeners = this.listeners(method);
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i]._listener) return listeners[i]._listener;
      }
    },

    /**
     * Add a listener for the event.
     *
     * @param {Function} listener The listener to add
     * @public
     */
    set: function set(listener) {
      var listeners = this.listeners(method);
      for (var i = 0; i < listeners.length; i++) {
        //
        // Remove only the listeners added via `addEventListener`.
        //
        if (listeners[i]._listener) this.removeListener(method, listeners[i]);
      }
      this.addEventListener(method, listener);
    }
  });
});

WebSocket.prototype.addEventListener = EventTarget.addEventListener;
WebSocket.prototype.removeEventListener = EventTarget.removeEventListener;

module.exports = WebSocket;

/**
 * Initialize a WebSocket server client.
 *
 * @param {http.IncomingMessage} req The request object
 * @param {net.Socket} socket The network socket between the server and client
 * @param {Buffer} head The first packet of the upgraded stream
 * @param {Object} options WebSocket attributes
 * @param {Number} options.protocolVersion The WebSocket protocol version
 * @param {Object} options.extensions The negotiated extensions
 * @param {Number} options.maxPayload The maximum allowed message size
 * @param {String} options.protocol The chosen subprotocol
 * @private
 */
function initAsServerClient(socket, head, options) {
  this.protocolVersion = options.protocolVersion;
  this._maxPayload = options.maxPayload;
  this.extensions = options.extensions;
  this.protocol = options.protocol;

  this._isServer = true;

  this.setSocket(socket, head);
}

/**
 * Initialize a WebSocket client.
 *
 * @param {String} address The URL to which to connect
 * @param {String[]} protocols The list of subprotocols
 * @param {Object} options Connection options
 * @param {String} options.protocol Value of the `Sec-WebSocket-Protocol` header
 * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
 * @param {Number} options.handshakeTimeout Timeout in milliseconds for the handshake request
 * @param {String} options.localAddress Local interface to bind for network connections
 * @param {Number} options.protocolVersion Value of the `Sec-WebSocket-Version` header
 * @param {Object} options.headers An object containing request headers
 * @param {String} options.origin Value of the `Origin` or `Sec-WebSocket-Origin` header
 * @param {http.Agent} options.agent Use the specified Agent
 * @param {String} options.host Value of the `Host` header
 * @param {Number} options.family IP address family to use during hostname lookup (4 or 6).
 * @param {Function} options.checkServerIdentity A function to validate the server hostname
 * @param {Boolean} options.rejectUnauthorized Verify or not the server certificate
 * @param {String} options.passphrase The passphrase for the private key or pfx
 * @param {String} options.ciphers The ciphers to use or exclude
 * @param {String} options.ecdhCurve The curves for ECDH key agreement to use or exclude
 * @param {(String|String[]|Buffer|Buffer[])} options.cert The certificate key
 * @param {(String|String[]|Buffer|Buffer[])} options.key The private key
 * @param {(String|Buffer)} options.pfx The private key, certificate, and CA certs
 * @param {(String|String[]|Buffer|Buffer[])} options.ca Trusted certificates
 * @private
 */
function initAsClient(address, protocols, options) {
  var _this5 = this;

  options = _extends({
    protocolVersion: protocolVersions[1],
    protocol: protocols.join(','),
    perMessageDeflate: true,
    handshakeTimeout: null,
    localAddress: null,
    headers: null,
    family: null,
    origin: null,
    agent: null,
    host: null,

    //
    // SSL options.
    //
    checkServerIdentity: null,
    rejectUnauthorized: null,
    passphrase: null,
    ciphers: null,
    ecdhCurve: null,
    cert: null,
    key: null,
    pfx: null,
    ca: null
  }, options);

  if (protocolVersions.indexOf(options.protocolVersion) === -1) {
    throw new Error('unsupported protocol version: ' + options.protocolVersion + ' ' + ('(supported versions: ' + protocolVersions.join(', ') + ')'));
  }

  this.protocolVersion = options.protocolVersion;
  this._isServer = false;
  this.url = address;

  var serverUrl = url.parse(address);
  var isUnixSocket = serverUrl.protocol === 'ws+unix:';

  if (!serverUrl.host && (!isUnixSocket || !serverUrl.path)) {
    throw new Error('invalid url');
  }

  var isSecure = serverUrl.protocol === 'wss:' || serverUrl.protocol === 'https:';
  var key = crypto.randomBytes(16).toString('base64');
  var httpObj = isSecure ? https : http;
  var perMessageDeflate;

  var requestOptions = {
    port: serverUrl.port || (isSecure ? 443 : 80),
    host: serverUrl.hostname,
    path: '/',
    headers: {
      'Sec-WebSocket-Version': options.protocolVersion,
      'Sec-WebSocket-Key': key,
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };

  if (options.headers) _extends(requestOptions.headers, options.headers);
  if (options.perMessageDeflate) {
    var _Extensions$format;

    perMessageDeflate = new PerMessageDeflate(options.perMessageDeflate !== true ? options.perMessageDeflate : {}, false);
    requestOptions.headers['Sec-WebSocket-Extensions'] = Extensions.format((_Extensions$format = {}, _Extensions$format[PerMessageDeflate.extensionName] = perMessageDeflate.offer(), _Extensions$format));
  }
  if (options.protocol) {
    requestOptions.headers['Sec-WebSocket-Protocol'] = options.protocol;
  }
  if (options.origin) {
    if (options.protocolVersion < 13) {
      requestOptions.headers['Sec-WebSocket-Origin'] = options.origin;
    } else {
      requestOptions.headers.Origin = options.origin;
    }
  }
  if (options.host) requestOptions.headers.Host = options.host;
  if (serverUrl.auth) requestOptions.auth = serverUrl.auth;

  if (options.localAddress) requestOptions.localAddress = options.localAddress;
  if (options.family) requestOptions.family = options.family;

  if (isUnixSocket) {
    var parts = serverUrl.path.split(':');

    requestOptions.socketPath = parts[0];
    requestOptions.path = parts[1];
  } else if (serverUrl.path) {
    //
    // Make sure that path starts with `/`.
    //
    if (serverUrl.path.charAt(0) !== '/') {
      requestOptions.path = '/' + serverUrl.path;
    } else {
      requestOptions.path = serverUrl.path;
    }
  }

  var agent = options.agent;

  //
  // A custom agent is required for these options.
  //
  if (options.rejectUnauthorized != null || options.checkServerIdentity || options.passphrase || options.ciphers || options.ecdhCurve || options.cert || options.key || options.pfx || options.ca) {
    if (options.passphrase) requestOptions.passphrase = options.passphrase;
    if (options.ciphers) requestOptions.ciphers = options.ciphers;
    if (options.ecdhCurve) requestOptions.ecdhCurve = options.ecdhCurve;
    if (options.cert) requestOptions.cert = options.cert;
    if (options.key) requestOptions.key = options.key;
    if (options.pfx) requestOptions.pfx = options.pfx;
    if (options.ca) requestOptions.ca = options.ca;
    if (options.checkServerIdentity) {
      requestOptions.checkServerIdentity = options.checkServerIdentity;
    }
    if (options.rejectUnauthorized != null) {
      requestOptions.rejectUnauthorized = options.rejectUnauthorized;
    }

    if (!agent) agent = new httpObj.Agent(requestOptions);
  }

  if (agent) requestOptions.agent = agent;

  this._req = httpObj.get(requestOptions);

  if (options.handshakeTimeout) {
    this._req.setTimeout(options.handshakeTimeout, function () {
      _this5._req.abort();
      _this5.finalize(new Error('opening handshake has timed out'));
    });
  }

  this._req.on('error', function (error) {
    if (_this5._req.aborted) return;

    _this5._req = null;
    _this5.finalize(error);
  });

  this._req.on('response', function (res) {
    if (!_this5.emit('unexpected-response', _this5._req, res)) {
      _this5._req.abort();
      _this5.finalize(new Error('unexpected server response (' + res.statusCode + ')'));
    }
  });

  this._req.on('upgrade', function (res, socket, head) {
    _this5.emit('headers', res.headers, res);

    //
    // The user may have closed the connection from a listener of the `headers`
    // event.
    //
    if (_this5.readyState !== WebSocket.CONNECTING) return;

    _this5._req = null;

    var digest = crypto.createHash('sha1').update(key + constants.GUID, 'binary').digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      socket.destroy();
      return _this5.finalize(new Error('invalid server key'));
    }

    var serverProt = res.headers['sec-websocket-protocol'];
    var protList = (options.protocol || '').split(/, */);
    var protError;

    if (!options.protocol && serverProt) {
      protError = 'server sent a subprotocol even though none requested';
    } else if (options.protocol && !serverProt) {
      protError = 'server sent no subprotocol even though requested';
    } else if (serverProt && protList.indexOf(serverProt) === -1) {
      protError = 'server responded with an invalid protocol';
    }

    if (protError) {
      socket.destroy();
      return _this5.finalize(new Error(protError));
    }

    if (serverProt) _this5.protocol = serverProt;

    if (perMessageDeflate) {
      try {
        var serverExtensions = Extensions.parse(res.headers['sec-websocket-extensions']);

        if (serverExtensions[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(serverExtensions[PerMessageDeflate.extensionName]);
          _this5.extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        socket.destroy();
        _this5.finalize(new Error('invalid Sec-WebSocket-Extensions header'));
        return;
      }
    }

    _this5.setSocket(socket, head);
  });
}

/***/ }),

/***/ "t9Jt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
    length = 64,
    map = {},
    seed = 0,
    i = 0,
    prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now + '.' + encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) {
  map[alphabet[i]] = i;
} //
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;

/***/ }),

/***/ "tzUF":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module requirements.
 */

var XMLHttpRequest = __webpack_require__("6weq");
var Polling = __webpack_require__("hsm0");
var Emitter = __webpack_require__("Wr69");
var inherit = __webpack_require__("X1xq");
var debug = __webpack_require__("G8yc")('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty() {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname !== global.location.hostname || port !== opts.port;
    this.xs = opts.secure !== isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (self.supportsBinary && contentType === 'application/octet-stream') {
              xhr.responseType = 'arraybuffer';
            }
          } catch (e) {}
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type');
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response || this.xhr.responseText;
    } else {
      data = this.xhr.responseText;
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (global.document) {
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

/***/ }),

/***/ "vHs2":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "vs2a":
/***/ (function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function (qs) {
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

/***/ }),

/***/ "wT76":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parser = __webpack_require__("EDhw");
var Emitter = __webpack_require__("Wr69");
var toArray = __webpack_require__("9PFW");
var on = __webpack_require__("BM2E");
var bind = __webpack_require__("NpfF");
var debug = __webpack_require__("xlf4")('socket.io-client:socket');
var parseqs = __webpack_require__("vs2a");
var hasBin = __webpack_require__("/E6E");

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket(io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  this.flags = {};
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [on(io, 'open', bind(this, 'onopen')), on(io, 'packet', bind(this, 'onpacket')), on(io, 'close', bind(this, 'onclose'))];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open = Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = {
    type: (this.flags.binary !== undefined ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
    data: args
  };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  this.flags = {};

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({ type: parser.CONNECT, query: query });
    } else {
      this.packet({ type: parser.CONNECT });
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  var sameNamespace = packet.nsp === this.nsp;
  var rootNamespaceError = packet.type === parser.ERROR && packet.nsp === '/';

  if (!sameNamespace && !rootNamespaceError) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: hasBin(args) ? parser.BINARY_ACK : parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close = Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags.compress = compress;
  return this;
};

/**
 * Sets the binary flag
 *
 * @param {Boolean} whether the emitted data contains binary
 * @return {Socket} self
 * @api public
 */

Socket.prototype.binary = function (binary) {
  this.flags.binary = binary;
  return this;
};

/***/ }),

/***/ "xQDS":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies
 */

var XMLHttpRequest = __webpack_require__("6weq");
var XHR = __webpack_require__("tzUF");
var JSONP = __webpack_require__("ru/O");
var websocket = __webpack_require__("Ex/H");

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

/***/ }),

/***/ "xlf4":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__("g98s");
} else {
  module.exports = __webpack_require__("qG0H");
}

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map