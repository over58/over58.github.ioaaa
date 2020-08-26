"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var path = require('path');

var locatePath = require('locate-path');

var stop = Symbol('findUp.stop');

function getFile(name) {
  var options,
      directory,
      _path$parse,
      root,
      paths,
      runMatcher,
      foundPath,
      _args2 = arguments;

  return regeneratorRuntime.async(function getFile$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          directory = path.resolve(options.cwd || '');
          _path$parse = path.parse(directory), root = _path$parse.root;
          paths = [].concat(name);

          runMatcher = function runMatcher(locateOptions) {
            var foundPath;
            return regeneratorRuntime.async(function runMatcher$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(typeof name !== 'function')) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return", locatePath(paths, locateOptions));

                  case 2:
                    _context.next = 4;
                    return regeneratorRuntime.awrap(name(locateOptions.cwd));

                  case 4:
                    foundPath = _context.sent;

                    if (!(typeof foundPath === 'string')) {
                      _context.next = 7;
                      break;
                    }

                    return _context.abrupt("return", locatePath([foundPath], locateOptions));

                  case 7:
                    return _context.abrupt("return", foundPath);

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

        case 5:
          if (!true) {
            _context2.next = 19;
            break;
          }

          console.log(directory);
          _context2.next = 9;
          return regeneratorRuntime.awrap(runMatcher(_objectSpread({}, options, {
            cwd: directory
          })));

        case 9:
          foundPath = _context2.sent;

          if (!(foundPath === stop)) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return");

        case 12:
          if (!foundPath) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", path.resolve(directory, foundPath));

        case 14:
          if (!(directory === root)) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt("return");

        case 16:
          directory = path.dirname(directory);
          _context2.next = 5;
          break;

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  });
} // getFile()


(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = console;
          _context3.next = 3;
          return regeneratorRuntime.awrap(locatePath(['file.html', 'find.js', 'package.json', 'test'], {
            cwd: process.cwd(),
            type: 'directory'
          }));

        case 3:
          _context3.t1 = _context3.sent;

          _context3.t0.log.call(_context3.t0, _context3.t1);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
})();