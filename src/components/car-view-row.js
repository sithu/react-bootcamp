import * as React from 'react';

export class CarViewRow extends React.Component {
    constructor(props) {
        super(props);
    }

    onDeleteCar = () => {
        this.props.onDeleteCar(this.props.car);
    }
     
    onEditCar = () => {
        this.props.onEditCar(this.props.car);
    }
    
    render() {
        const car = this.props.car;
        return <tr>
            <td>{car.make}</td>
            <td>{car.model}</td>
            <td>{car.year}</td>
            <td style={{backgroundColor: car.color}}></td>
            <td>${car.price}</td>
            <td>
                <button type="button" onClick={this.onDeleteCar}>Delete</button>
                <button type="button" onClick={this.onEditCar}>Edit</button>
            </td>
        </tr>;
    }
}