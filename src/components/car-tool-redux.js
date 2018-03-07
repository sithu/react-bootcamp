import * as React from 'react';

import { CarTable } from './car-table';
import { Header } from './header';
import { CarForm } from './car-form';

export class CarTool extends React.Component {
    static defaultProps = {
        cars: [],
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header headerText="Car Tool" />
                <CarForm onSubmitCar={this.props.insert} />
                <hr />            
                <CarTable cars={this.props.cars} onDeleteCar={this.props.deleteCar} onSaveCar={this.props.update} />
            </div>
        );
    }
}
