export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_TAGS       = 'LOAD_TAGS';
export const GET_TAB_INFO    = 'GET_TAB_INFO';

export function loadCategories() {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: LOAD_CATEGORIES
      });
    }, 1000);
  };
}

export function loadTags() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch({
      type: LOAD_TAGS
    });
  };
}
