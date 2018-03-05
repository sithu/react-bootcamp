import * as React from 'react';

export class CarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initCar();
    }

    initCar() {
        return {
            make: '',
            model: '',
            year: 2018,
            color: '',
            price: 0,
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value,
        });
    }

    addCar = () => {
        const newCar = {
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            color: this.state.color,
            price: this.state.price
        };
        this.props.onSubmitCar(newCar);
        this.setState(this.initCar());
    };

    render() {
        return (
            <form>
                <h3>New Car Form:</h3>
                <div>
                    <label htmlFor="make-input">Make:</label>
                    <input id="make-input" type="text" name="make" 
                    value={this.state.make} onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="model-input">Model:</label>
                    <input id="model-input" type="text" name="model" 
                    value={this.state.model} onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="year-input">Year:</label>
                    <input id="year-input" type="number" name="year"
                    min="1980" step="1" max="2019" 
                    value={this.state.year} onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="color-input">Color:</label>
                    <input id="color-input" type="color" name="color" 
                    value={this.state.color} onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="price-input">Price: $</label>
                    <input id="price-input" type="number" name="price" step="1000" min="0"
                    value={this.state.price} onChange={this.onChange} />
                </div>
                <br />
                <div>
                    <button type="button" onClick={this.addCar}>Add Car</button>
                </div>             
            </form>
        );
    }
}