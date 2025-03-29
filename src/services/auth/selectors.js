import { createSelector } from 'reselect';

const getUser = (state) => state.auth.user;

export const getUserInfo = createSelector(getUser, (user) => user);
