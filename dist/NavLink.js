'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _rudyMatchPath = require('rudy-match-path');

var _rudyMatchPath2 = _interopRequireDefault(_rudyMatchPath);

var _reduxFirstRouter = require('redux-first-router');

var _PathUtils = require('rudy-history/PathUtils');

var _Link = require('./Link');

var _toUrl = require('./toUrl');

var _toUrl2 = _interopRequireDefault(_toUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var NavLink = function NavLink(_ref) {
  var to = _ref.to,
      href = _ref.href,
      location = _ref.location,
      className = _ref.className,
      style = _ref.style,
      _ref$activeClassName = _ref.activeClassName,
      activeClassName = _ref$activeClassName === undefined ? 'active' : _ref$activeClassName,
      activeStyle = _ref.activeStyle,
      _ref$ariaCurrent = _ref.ariaCurrent,
      ariaCurrent = _ref$ariaCurrent === undefined ? 'true' : _ref$ariaCurrent,
      exact = _ref.exact,
      strict = _ref.strict,
      isActive = _ref.isActive,
      props = _objectWithoutProperties(_ref, ['to', 'href', 'location', 'className', 'style', 'activeClassName', 'activeStyle', 'ariaCurrent', 'exact', 'strict', 'isActive']);

  to = href || to;

  var options = (0, _reduxFirstRouter.getOptions)();
  var basename = options.basename ? options.basename : '';

  var path = (0, _toUrl2.default)(to, location.routesMap).split('?')[0];

  var match = (0, _rudyMatchPath2.default)(location.pathname, {
    path: (0, _PathUtils.stripBasename)(path, basename),
    exact: exact,
    strict: strict
  });

  var active = !!(isActive ? isActive(match, location) : match);

  var combinedClassName = active ? [className, activeClassName].filter(function (i) {
    return i;
  }).join(' ') : className;

  var combinedStyle = active ? _extends({}, style, activeStyle) : style;

  return _react2.default.createElement(_Link.Link, _extends({
    to: to,
    className: combinedClassName,
    style: combinedStyle,
    'aria-current': active && ariaCurrent,
    routesMap: location.routesMap
  }, props));
};

var mapState = function mapState(state) {
  return { location: (0, _reduxFirstRouter.selectLocationState)(state) };
};
var connector = (0, _reactRedux.connect)(mapState);

// $FlowIgnore
exports.default = connector(NavLink);