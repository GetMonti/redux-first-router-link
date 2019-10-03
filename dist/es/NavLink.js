function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { connect } from 'react-redux';
import matchPath from 'rudy-match-path';
import { selectLocationState, getOptions } from 'redux-first-router';
import { stripBasename } from 'rudy-history/PathUtils';
import { Link } from './Link';
import toUrl from './toUrl';

const NavLink = ({
  to,
  href,
  location,
  className,
  style,
  activeClassName = 'active',
  activeStyle,
  ariaCurrent = 'true',
  exact,
  strict,
  isActive,
  ...props
}) => {
  to = href || to;
  const options = getOptions();
  const basename = options.basename ? options.basename : '';
  const path = toUrl(to, location.routesMap).split('?')[0];
  const match = matchPath(location.pathname, {
    path: stripBasename(path, basename),
    exact,
    strict
  });
  const active = !!(isActive ? isActive(match, location) : match);
  const combinedClassName = active ? [className, activeClassName].filter(i => i).join(' ') : className;
  const combinedStyle = active ? { ...style,
    ...activeStyle
  } : style;
  return React.createElement(Link, _extends({
    to: to,
    className: combinedClassName,
    style: combinedStyle,
    "aria-current": active && ariaCurrent,
    routesMap: location.routesMap
  }, props));
};

const mapState = state => ({
  location: selectLocationState(state)
});

const connector = connect(mapState); // $FlowIgnore

export default connector(NavLink);