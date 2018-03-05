import * as React from 'react';
import * as PropTypes from 'prop-types';

import { CarViewRow } from './car-view-row';
import { CarEditView } from './edit-car-row';

export class CarTable extends React.Component {
    static propTypes = {
        cars: PropTypes.array,
        onDeleteCar: PropTypes.func,
        onSaveCar: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            editCar: null,
        };
    }

    cancel = () => {
        this.setState({ editCar: null });
    }

    editCar = (car) => {
        this.setState({ editCar: car });
    }

    saveCar = (car) => {
        this.props.onSaveCar(car);
    }

    render() {
        const carRows = this.props.cars.map( car => {
            return (car !== this.state.editCar) 
                ? <CarViewRow car={car} onDeleteCar={this.props.onDeleteCar} onEditCar={this.editCar} />
                : <CarEditView car={car} onSaveCar={this.saveCar} onCancel={this.cancel} />;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <td>Make</td><td>Model</td><td>Year</td><td>Color</td><td>Price</td><td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {carRows}
                </tbody>
            </table>
        );
    }
} 