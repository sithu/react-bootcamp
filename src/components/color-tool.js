import * as React from 'react';

import { Header } from './header';

export class ColorTool extends React.Component {
    constructor(props) {
        super(props);
        // THE ONLY PLACE YOU CAN SET STATE.
        this.state = {
            colors: props.colors.concat(),
            colorName: '',
        };
        // This is most developer missed unless you define onChange fun with => {}
        // this.onChange = this.onChange.bind(this);
    }

    addColor = (colorName) => {
        this.setState({
            colors: this.state.colors.concat(colorName),
        });
    }

    render() {
        return (
            <div>
                <Header headerText="Color Tool" />
                <ul>
                    {this.state.colors.map( color => <li key={color}>{color}</li> )}
                </ul>
                <ColorForm onSubmitColor={this.addColor}/>
            </div>
        );
    }
}

export class ColorForm extends React.Component {

    static defaultProps = {
        buttonText: 'Submit Color',
    };

    constructor(props) {
        super(props)
        this.state = {
            colorName: ''
        }
    }

    onChange = (e) => {
        this.setState({ 
            [ e.target.name ]: e.target.type === 'number' 
                ? Number(e.target.value) : e.target.value,
        });
    }

    submitColor = () => {
        this.props.onSubmitColor(this.state.colorName);
        this.setState({
            colorName: '',
        });
    }

    render() {
        return (
            <form>
                <div>
                    <label htmlFor="name-input">Color Name:</label>
                    <input id="name-input" type="text" name="colorName" 
                    value={this.state.colorName} onChange={this.onChange} />
                </div>
                <button type="button" onClick={this.submitColor}>{this.props.buttonText}</button>
            </form>
        );
    }
    
}