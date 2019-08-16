export default (state={articles: [], letters: []}, action) => {
    switch(action.type) {
        case 'HOME_PAGE_LOADED':
            return {
                ...state,
                articles: action.data.articles,
            };
        case 'LETTER_PAGE_LOADED':
            return {
                ...state,
                letters: action.data.letters,
            };
        case 'SUBMIT_ARTICLE':
            return {
                ...state,
                articles: ([action.data.article]).concat(state.articles),
            };
        case 'SUBMIT_LETTER':
            return {
                ...state,
                letters: ([action.data.letter]).concat(state.letters),
            };
        case 'DELETE_ARTICLE':
            return {
                ...state,
                articles: state.articles.filter((article) => article._id !== action.id),
            };
        case 'DELETE_LETTER':
            return {
                ...state,
                letters: state.letters.filter((letter) => letter._id !== action.id),
            };
        case 'SET_EDIT':
            return {
                ...state,
                articleToEdit: action.article,
            };
        case 'SET_EDIT_LETTER':
            return {
                ...state,
                letterToEdit: action.letter,
            };
        case 'EDIT_ARTICLE':
            return {
                ...state,
                articles: state.articles.map((article) => {
                    if(article._id === action.data.article._id) {
                        return {
                            ...action.data.article,
                        }
                    }
                    return article;
                }),
                articleToEdit: undefined,
            }
        case 'EDIT_LETTER':
            return {
                ...state,
                letters: state.letters.map((letter) => {
                    if(letter._id === action.data.letter._id) {
                        return {
                            ...action.data.letter,
                        }
                    }
                    return letter;
                }),
                letterToEdit: undefined,
            }
        default:
            return state;
    }
};