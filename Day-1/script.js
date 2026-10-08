

// const expenseForm = document.getElementById("expenseForm");

// const expenseName = document.getElementById("expenseName");

// const expenseAmount = document.getElementById("expenseAmount");

// const expenseDate = document.getElementById("expenseDate");

// const expenseList = document.getElementById("expenseList");

// const totalAmount = document.getElementById("totalAmount");




// let expenses = [];



// expenseForm.addEventListener("submit", function (event) {



//     event.preventDefault();


//     const name = expenseName.value;

//     const amount = Number(expenseAmount.value);

//     const date = expenseDate.value;



//     const expense = {

//         name: name,

//         amount: amount,

//         date: date

//     };


//     expenses.push(expense);



//     displayExpenses();


   

//     calculateTotal();

//     expenseForm.reset();

// });



// function displayExpenses() {

 

//     expenseList.innerHTML = "";


   

//     expenses.forEach(function (expense, index) {

        

//         const li = document.createElement("li");


       

//         li.innerHTML = `

//             <div>

//                 <strong>${expense.name}</strong>

//                 <p>₹${expense.amount}</p>

//                 <small>${expense.date}</small>

//             </div>

//             <button onclick="deleteExpense(${index})">
//                 Delete
//             </button>

//         `;



//         expenseList.appendChild(li);

//     });

// }



// function calculateTotal() {

//     const total = expenses.reduce(function (sum, expense) {

//         return sum + expense.amount;

//     }, 0);



//     totalAmount.textContent = total;

// }




// function deleteExpense(index) {


//     expenses.splice(index, 1);




//     displayExpenses();



//     calculateTotal();

// }



const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Get transactions from localStorage or initialize empty array
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a description and amount');
    return;
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();

  text.value = '';
  amount.value = '';
}

// Generate unique ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `-$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();
  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
