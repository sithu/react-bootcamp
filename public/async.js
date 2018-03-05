'use strict';
const 
    print = console.log,
    dir = console.dir;

const t = 2;

const doIt = () => {
    print(t);
};

doIt();

dir(doIt);

const createPerson = (fn) => {
    let _fn = fn; // private variable
    return {
        get fristName() {
            return _fn;
        },
        set fristName(val) {
            _fn = val;
        }
    }
};

const createPersonWithoutClosure = (fn) => {
    return {
        _fn: fn,
        get fristName() {
            return this._fn;
        },
        set fristName(val) {
            this._fn = val;
        }
    }
};
const p = createPerson('Bob');
print(p.fristName);

setTimeout( () => { print('Timeout') }, 2000);
print('last');

const allDone = () => {
    print('all done');    
};

let counter = 0;

setTimeout( () => { print('a') }, 2000);
setTimeout( () => { print('b') }, 2000);
setTimeout( () => { print('c') }, 2000);