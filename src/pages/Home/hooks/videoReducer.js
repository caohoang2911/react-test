const videosReducer = (state, action) => {
    function updateFavorite(favoriteValue) {
        return state.videoList.map((item) => {
            if (item.id === action.id) {
                if (!item.vote) {
                    return { ...item, vote: favoriteValue };
                } else {
                    return { ...item, vote: null };
                }
            }
            return item;
        });
    }

    switch (action.type) {
        case 'setVideoList': {
            return {
                ...state,
                videoList: action.data,
                hasErrored: false,
            };
        }
        case 'favorite': {
            return { ...state, videoList: updateFavorite(1) };
        }
        case 'unFavorite': {
            return { ...state, videoList: updateFavorite(2) };
        }

        default:
            return state;
    }
};

export default videosReducer;
