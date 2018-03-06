
const createRefreshRequestAction = () => ({
    type: 'REFRESH_REQUEST',
});

const createRefreshDoneAction = colors => ({
    type: 'REFRESH_DONE',
    colors,
});

const createDeleteRequestAction = () => ({
    type: 'DELETE_REQUEST',
});

const createInsertRequestAction = () => ({
    type: 'INSERT_REQUEST',
});

const createInsertDoneAction = color => ({
    type: 'INSERT_DONE',
    color,
});

export const insert = color => {

    return dispatch => {
        dispatch(createInsertRequestAction(color))

        return fetch('http://localhost:4000/colors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(color)
            })
            .then(() => refresh()(dispatch));
    };
}

export const deleteColor = (id) => {
    return dispatch => {
        dispatch(createDeleteRequestAction());
        return fetch('http://localhost:4000/colors/' + id, {
            method: 'DELETE' })
            .then(() => refresh()(dispatch));
    }
}

export const refresh = () => {
    return dispatch => {
        dispatch(createRefreshRequestAction());
        return fetch('http://localhost:4000/colors')
            .then(res => res.json())
            .then(colors => dispatch(createRefreshDoneAction(colors)));
    }
}