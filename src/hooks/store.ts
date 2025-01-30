import { AppDispatch, RootState } from '@/store';
import { ApiResponse, SuccessResponseDto } from '@/store/types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export function transformResponse<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.message);
  }
  return (response as SuccessResponseDto<T>).data!;
}
