
export const createRefreshRequestAction = () => ({
    type: 'REFRESH_REQUEST',
});

export const createRefreshDoneAction = cars => ({
    type: 'REFRESH_DONE',
    cars,
});

export const createDeleteRequestAction = () => ({
    type: 'DELETE_REQUEST',
});

export const createInsertRequestAction = () => ({
    type: 'INSERT_REQUEST',
});

export const createInsertDoneAction = car => ({
    type: 'INSERT_DONE',
    car,
});

export const insert = car => {

    return dispatch => {
        dispatch(createInsertRequestAction(car))

        return fetch('http://localhost:4000/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car)
            })
            .then(() => refresh()(dispatch));
    };
}

export const update = car => {

    return dispatch => {
        dispatch(createInsertRequestAction(car))

        return fetch('http://localhost:4000/cars/' + car.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car)
            })
            .then(() => refresh()(dispatch));
    };
}

export const deleteCar = (id) => {
    return dispatch => {
        dispatch(createDeleteRequestAction());
        return fetch('http://localhost:4000/cars/' + id, {
            method: 'DELETE' })
            .then(() => refresh()(dispatch));
    }
}

export const refresh = () => {
    return dispatch => {
        dispatch(createRefreshRequestAction());
        
        return fetch('http://localhost:4000/cars')
            .then(res => res.json())
            .then(cars => dispatch(createRefreshDoneAction(cars)));
    };
}