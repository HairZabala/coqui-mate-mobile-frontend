import { AnyAction } from 'redux';
import { SingleViewItemsActions, SingleViewItemsState, VALUE_SLIDES_SEEN } from './singleViewItemsTypes';

const initialState: SingleViewItemsState = {
  seenValueSlides: false,
};

export default function userReducer(
  state = initialState,
  action: SingleViewItemsActions | AnyAction,
): SingleViewItemsState {
  switch (action.type) {
    case VALUE_SLIDES_SEEN: {
      return {
        ...state,
        seenValueSlides: true,
      };
    }

    default: {
      return state;
    }
  }
}
