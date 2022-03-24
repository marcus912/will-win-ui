import _ from 'lodash';

export const LoadingState = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  LOADED: 'LOADED'
};

export const extractFormData = (columns) => {
  const data = {};
  Object.keys(columns).forEach((k) => {
    Object.assign(data, { [k]: columns[k].value });
  });
  return data;
};

export function unwrapErrorResponse(response) {
  const e = _.get(response, 'data', {});
  if (e) {
    e.status = _.get(response, 'status');
  }
  return e;
}
