import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store';
import { ValueSlidesSeenAction, VALUE_SLIDES_SEEN } from './singleViewItemsTypes';

export const valueSlidesSeen = (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
  dispatch({
    type: VALUE_SLIDES_SEEN,
  } as ValueSlidesSeenAction);
};
