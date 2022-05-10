const videosReducer = (state, action) => {
    switch (action.type) {
        case 'setVideoList': {
            return {
                ...state,
                videoList: action.data,
                hasErrored: false,
            };
        }

        default:
            return state;
    }
};

export default videosReducer;
