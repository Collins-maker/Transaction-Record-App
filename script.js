let transactions = JSON.parse(localStorage.getItem('transactions')) ?? [];


function switchTab(tabIndex) {
  const tabs = document.getElementsByClassName('tab');
  const tabContents = document.getElementsByClassName('tab-content');

  // Hide all tab contents and remove "active" class from tabs
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = 'none';
    tabs[i].classList.remove('active');
  }

  // Display the selected tab content and add "active" class to the selected tab
  tabContents[tabIndex].style.display = 'block';
  tabs[tabIndex].classList.add('active');

  if (tabIndex === 1) {
    displayTransactions();
  }
}

function displayTransactions() {
  const transactionsElement = document.getElementById('transactions');
  transactionsElement.innerHTML = '';

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const listItem = document.createElement('li');
    listItem.textContent = `${transaction.title}: ${transaction.amount}`;
    listItem.classList.add(transaction.category);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTransaction(i));

    listItem.appendChild(deleteButton);
    transactionsElement.appendChild(listItem);
  }
}

function addTransaction() {
  const titleInput = document.getElementById('title');
  const categorySelect = document.getElementById('category');
  const amountInput = document.getElementById('amount');

  const title = titleInput.value;
  const category = categorySelect.value;
  const amount = parseFloat(amountInput.value);

  if (title && category && !isNaN(amount)) {
    const transaction = {
      title: title,
      category: category,
      amount: amount
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    displayTransactions();

    titleInput.value = '';
    amountInput.value = '';
  }
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  displayTransactions();
}

switchTab(0); // Initially show the "Add Transaction" tab
