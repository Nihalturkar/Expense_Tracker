document.addEventListener("DOMContentLoaded", function () {
    let expenseForm = document.querySelector("#expenseform");
    let expenseList = document.querySelector("#expenselist");

    // Load expenses from localStorage if available
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to save expenses to localStorage
    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // Function to render expenses
    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `<td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td><button onclick="deleteExpense(${index})">Delete</button></td>`;
            expenseList.appendChild(newRow); 
        });
    }

    // Function to delete an expense
    window.deleteExpense = function (index) {
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    };

    renderExpenses(); // Render existing expenses on page load

    expenseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let description = document.querySelector(".description").value;
        let category = document.querySelector(".category").value;
        let amount = parseFloat(document.querySelector(".amount").value);

        if (description && category && !isNaN(amount)) {
            const expense = { description, category, amount };
            expenses.push(expense);
            saveExpenses();
            renderExpenses();

            document.querySelector(".description").value = "";
            document.querySelector(".category").value = "";
            document.querySelector(".amount").value = "";
        } else {
            alert("Please enter required data");
        }
    });
});
