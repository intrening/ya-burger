import { createSelector } from 'reselect';

const getUser = (state) => state.auth.user;
const getError = (state) => state.auth.error;

export const getUserInfo = createSelector(getUser, (user) => user);
export const getAuthError = createSelector(getError, (error) => error);
