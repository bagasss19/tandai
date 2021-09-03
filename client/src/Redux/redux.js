// KARENA APPNYA MASIH KECIL, REDUX DIBIKIN SATU FILE DULU

//bikin initial state
const initialState = {
    home: true,
    train: false,
    test: false
}


//action creators
export const SETHOME = (data) => {
    return { type: 'SETHOME', value: data }
}

export const SETTRAIN = (data) => {
    return { type: 'SETTRAIN', value: data }
}

export const SETTEST = (data) => {
    return { type: 'SETTEST', value: data }
}

export const SETHOMEACTIVE = (data) => {
    return (dispatch) => {
    dispatch(SETHOME(true))
    dispatch(SETTEST(false))
    dispatch(SETTRAIN(false))
    }
}

export const SETTRAINACTIVE = (data) => {
    return (dispatch) => {
    dispatch(SETHOME(false))
    dispatch(SETTEST(false))
    dispatch(SETTRAIN(true))
    }
}

export const SETTESTACTIVE = (data) => {
    return (dispatch) => {
    dispatch(SETHOME(false))
    dispatch(SETTEST(true))
    dispatch(SETTRAIN(false))
    }
}

//reducer
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SETHOME':
            return { ...state, home: action.value }

        case 'SETTRAIN':
            return { ...state, train: action.value }

        case 'SETTEST':
            return { ...state, test: action.value }

        default:
            return state
    }
}

// console.log(store.getState())