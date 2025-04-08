import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TStore } from './types';
import type { AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TStore> = useSelector;
