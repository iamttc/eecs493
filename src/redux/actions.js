import { CONTENT_TOGGLE } from './actionTypes';

export const updateContent = (toggle) => ({
  type: CONTENT_TOGGLE,
  data: toggle
});
