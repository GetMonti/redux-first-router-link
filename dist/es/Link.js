function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { connect } from 'react-redux';
import { selectLocationState } from 'redux-first-router';
import toUrl from './toUrl';
import handlePress from './handlePress';
import preventDefault from './preventDefault';
export const Link = ({
  to,
  href,
  redirect,
  replace,
  tagName = 'a',
  children,
  onPress,
  onClick,
  down = false,
  shouldDispatch = true,
  target,
  dispatch,
  routesMap,
  ...props
}) => {
  to = href || to; // href is deprecated and will be removed in next major version

  const url = toUrl(to, routesMap);
  const handler = handlePress.bind(null, url, routesMap, onPress || onClick, shouldDispatch, target, dispatch, to, replace || redirect);
  const Root = tagName;
  const localProps = {};

  if (tagName === 'a' && url) {
    localProps.href = url;
  }

  if (down && handler) {
    localProps.onMouseDown = handler;
    localProps.onTouchStart = handler;
  }

  if (target) {
    localProps.target = target;
  }

  return React.createElement(Root, _extends({
    onClick: !down && handler || preventDefault
  }, localProps, props), children);
};

const mapState = state => ({
  routesMap: selectLocationState(state).routesMap
});

const connector = connect(mapState); // $FlowIgnore

export default connector(Link);