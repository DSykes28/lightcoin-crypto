class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  
  }

  get balance() {

    let balance = 0;

    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransactoin(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;

  }
  commit() {
  
    if (!this.isAllowed()) return false;
    
    this.time = new Date();

    this.account.addTransactoin(this);
    return true;
  }
 
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

let t1 = new Withdrawal(50.25, myAccount);
console.log('Commit result:', t1.commit());
console.log('Transaction 1:', t1);

let t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

let t3 = new Deposit(120.00, myAccount);
console.log(t3.commit());
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount);

console.log(`'Account Transaction History: ${myAccount.transactions}`)



//
//Allow multiple accounts to be created
//Each account can have many transactions
//Allow withdrawals and deposits into accounts
//Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
//Allow us to retrieve the current balance of the account at any time
//Don't allow withdrawals that exceed the remaining balance of the account
