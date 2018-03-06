import * as React from 'react';
import * as PropTypes from 'prop-types';

/**
 * Static Component
 * @param {*} props 
 */
export const ColorTool = props => <div>
    <ColorList colors={props.colors} deleteColor={props.deleteColor} />
    <button type="button" onClick={ () => props.refresh() }>Refresh</button>
    <form>
        <div>Name: <input type="text" defaultValue="" ref={i => this.n = i} /></div>
        <div>HexCode: <input type="color" defaultValue="#000000" ref={i => this.h = i} /></div>
        <button type="button" onClick={ 
            () => props.insert({name: this.n.value, hexCode: this.h.value})
            }>Add Color</button>
    </form>
</div>

const ColorList = props => {
    return props.colors.map( c => { 
        return <li key={c.id}>{c.name}<button type="button" onClick={ () => props.deleteColor(c.id) } >Delete</button></li>
    });
};