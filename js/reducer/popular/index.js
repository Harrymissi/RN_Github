import Types from '../../action/types';

const defaultState = {};

/**
 *  popular: {
 *      java: {
 *          items: [],
 *          isLoading: false
 *      },
 *      ios: {
 *          items: [],
 *          isLoading: false
 *      }
 *  }
 *  0. state树，横向拓展
 *  1. 如何动态的设置store，和动态的获取store（难点： storeKey不固定）
 * @param state
 * @param action
 * @returns {{theme: string}}
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,
                    isLoading: false
                },
                theme: action.theme,
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true
                },
                theme: action.theme,
            };
        case Types.LOAD_POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                },
                theme: action.theme,
            };
        default:
            return state;
    }
}