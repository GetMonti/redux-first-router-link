import { pathToAction, redirect, getOptions, history } from 'redux-first-router';
export default ((url, routesMap, onClick, shouldDispatch, target, dispatch, to, dispatchRedirect, e) => {
  let shouldGo = true;

  if (onClick) {
    shouldGo = onClick(e); // onClick can return false to prevent dispatch

    shouldGo = typeof shouldGo === 'undefined' ? true : shouldGo;
  }

  const prevented = e.defaultPrevented;

  if (e.button !== 1 && !target && e && e.preventDefault && !isModified(e)) {
    e.preventDefault();
  }

  if (shouldGo && shouldDispatch && !target && !prevented && e.button === 0 && !isModified(e)) {
    const {
      querySerializer: serializer
    } = getOptions();
    let action = to;

    if (!isAction(to)) {
      url = url.indexOf('#') > -1 ? url.substring(url.indexOf('#') + 1, url.length) : url;
      action = pathToAction(url, routesMap, serializer);
    }

    action = dispatchRedirect ? redirect(action) : action;
    dispatch(action);
  }
});

const isAction = to => typeof to === 'object' && !Array.isArray(to);

const isModified = e => !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);