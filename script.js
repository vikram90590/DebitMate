document.getElementById('add-debit-form').addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value;
  const amount = document.getElementById('amount').value;
  let category = document.getElementById('category').value;
  const nextDate = document.getElementById('nextDate').value;
  const reminderDays = parseInt(document.getElementById('reminderDays').value);

  // If user selects "Others", prompt for new category
  if(category === "Others") {
    const newCategory = prompt("Enter new category name:");
    if(newCategory && newCategory.trim() !== "") {
      category = newCategory.trim();
    } else {
      alert("Category cannot be empty!");
      return;
    }
  }

  debits.push({name, amount, category, nextDate, reminderDays});
  localStorage.setItem('debits', JSON.stringify(debits)); // Save in browser
  renderDebits();
  document.getElementById('add-debit-form').reset();
});
