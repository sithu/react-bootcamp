import * as React from 'react';

import { CarTable } from './car-table';
import { Header } from './header';
import { CarForm } from './car-form';

export class CarTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            cars: props.cars.concat(),
        };           
    }

    addCar = (car) => {
        this.setState({
            cars: this.state.cars.concat(car),
        });
    };

    deleteCar = (car) => {
        this.setState({
            cars: this.state.cars.filter( c => c !== car ),
        });
    }

    saveCar = (car) => {
        const id = this.state.cars.findIndex( c => c.id === car.id);
        const updatedCars = [...this.state.cars.slice(0, id), car, ...this.state.cars.slice(id + 1)];
        this.setState({
            cars: updatedCars,
        });
    }

    render() {
        return (
            <div>
                <Header headerText="Car Tool" />
                <CarForm onSubmitCar={this.addCar} />
                <hr />            
                <CarTable cars={this.state.cars} onDeleteCar={this.deleteCar} onSaveCar={this.saveCar} />
            </div>
        );
    }
}
