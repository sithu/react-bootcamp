class Account {
    constructor(accountNum, firstName, lastName) {
        this._accountNum = accountNum;
        this._firstName = firstName;
        this._lastName = lastName;
        this._txns = [];
    }

    get firstName() { 
        return this._firstName; 
    }

    set firstName(val) {
        this._firstName = val;
    }

    get lastName() { 
        return this._lastName; 
    }

    set lastName(val) {
        this._lastName = val;
    }

    get accountNum() { 
        return this._accountNum; 
    }

    set accountNum(val) {
        this._accountNum = val;
    }
    
    get txns() { 
        return this._txns; 
    }

    set txns(val) {
        this._txns= val;
    }

    deposit(amt, from) {
        let txn = { type: 'deposit', amt };
        if (from) txn['fromAcct'] = from;
        this._txns.push(txn);
    }

    getBalance() { 
        let bal = 0;
        this._txns.forEach(txn => {
            if (txn.type === 'deposit') {
                bal += txn.amt;
            } else {
                bal -= txn.amt;
            }
        });
        return bal; 
    }

    getTxns() {
        const header = `Transaction List of Account Number:${this.accountNum}: ${this.firstName} ${this.lastName}`;
        console.log(header);
        this._txns.map(v => console.log(v));
        console.log('Balance = ' + this.getBalance());
    }
}

class Checking extends Account {
    withdraw(amt) {
        this.txns.push({ type: 'withdraw', amt });
    }
}

class Saving extends Account {
    transfer(to, amt) {
        if (!to instanceof Account) new Error("Arugment 'to' must be Account type!");
        this.txns.push({ type: 'transfer', amt, toAcct: to.accountNum });
        to.deposit(amt, this.accountNum);
    }
}

const myChecking = new Checking('c1', 'Calvin', 'Smith');
myChecking.deposit(10);

const mySaving = new Saving('s1', 'Sally', 'Smith');
mySaving.deposit(100);

mySaving.transfer(myChecking, 50);

myChecking.getTxns();
mySaving.getTxns();