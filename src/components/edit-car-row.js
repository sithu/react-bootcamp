import * as React from 'react';

export class CarEditView extends React.Component {
    constructor(props) {
        super(props);
        const {car} = props;
        this.state = {
            id: car.id,
            make: car.make,
            model: car.model,
            year: car.year,
            color: car.color,
            price: car.price,
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value,
        });
    }

    saveCar = () => {
        this.props.onSaveCar(this.state);
    }

    render() {
        return <tr>
            <td><input id="make-input" type="text" name="make" value={this.state.make} onChange={this.onChange} /></td>
            <td><input id="model-input" type="text" name="model" value={this.state.model} onChange={this.onChange} /></td>
            <td><input id="year-input" type="number" name="year" value={this.state.year} onChange={this.onChange} /></td>
            <td><input id="color-input" type="text" name="color" value={this.state.color} onChange={this.onChange} /></td>
            <td><input id="price-input" type="number" name="price" value={this.state.price} onChange={this.onChange} /></td>
            <td>
                <button type="button" onClick={this.saveCar}>Save</button>
                <button type="button" onClick={this.props.onCancel}>Cancel</button>
            </td>
        </tr>;
    }
}