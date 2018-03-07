import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import { CarTool } from './components/car-tool';
import { ColorTool} from './components/color-tool';

class App extends React.Component {
    render() {
        // return React.createElement('h1', null, 'Hello World!');
        return ( 
            <div>
                <h1>Car Tool App</h1>
                <CarTool cars={this.props.cars} />
                <ColorTool colors={this.props.colors} />
            </div>
        );
    }
}

const carlist = [
    { id: 1, make: "Honda", model: "CRV", year: 2015, color: "blue", price: 27000 },
    { id: 2, make: "Tesla", model: "Model 3", year: 2018, color: "red", price: 59000 }
];

const colors = [ 'blue', 'green' ];

ReactDOM.render(
    <App cars={carlist} colors={colors} />,
    document.querySelector('main'),
);