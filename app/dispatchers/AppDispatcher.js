import { Dispatcher } from 'flux';

const flux = new Dispatcher();

export function register(callback) {
  return flux.register(callback);
}

export function waitFor(ids) {
  return flux.waitFor(ids);
}

export function dispatch(type, action = {}) {
  if (!type) {
    throw new Error('You forgot to specify type.');
  }

    if (action.error) {
      console.error('**', type, action);
    } else {
      console.log('**', type, action);
    }
	
	flux.dispatch({ type, action }); 
}

export function dispatchAsync(promise, types, action = {}) {
  const { request, success, failure } = types;

  dispatch(request, action);
  promise.then(
    (body) => dispatch(success, { action, body }),
    (error) => dispatch(failure, { action, error })
  );
}