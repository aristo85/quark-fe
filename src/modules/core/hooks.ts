import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './services/store';
import { useSnackbar, VariantType } from "notistack";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useToastApp = () => {
    const { enqueueSnackbar } = useSnackbar();
  
    const handleClickVariant = (message: string, variant: VariantType) => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(message, { variant });
    };
  
    return [handleClickVariant];
  };
  