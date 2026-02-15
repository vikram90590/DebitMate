let debits = JSON.parse(localStorage.getItem('debits')) || [];

function getCategoryIcon(category) {
  switch(category) {
    case "Entertainment": return "🎬";
    case "Car EMI": return "🚗";
    case "Insurance": return "🛡️";
    case "Phone Bill": return "📱";
    case "Health": return "💊";
    case "Maintenance": return "🔧";
    default: return "💼";
  }
}

function updateCountdown() {
  if(debits.length === 0) {
    document.getElementById('next-payment').innerText = "No upcoming payments!";
    return;
  }
  debits.sort((a,b) => new Date(a.nextDate) - new Date(b.nextDate));
  const today = new Date();
  const next = debits[0].nextDate;
  const diffTime = new Date(next) - today;
  const diffDays = Math.ceil(diffTime / (1000*60*60*24));
  document.getElementById('next-payment').innerText = diffDays >= 0 ? 
    `Next Payment in: ${diffDays} day(s)` : "No upcoming payments!";
}

function renderDebits() {
  const list = document.getElementById('debit-list');
  list.innerHTML = '';
  const today = new Date();
  debits.forEach(d => {
    const card = document.createElement('div');
    card.className = 'debit-card';
    const diffTime = new Date(d.nextDate) - today;
    const diffDays = Math.ceil(diffTime / (1000*60*60*24));
    if(diffDays <= d.reminderDays) card.classList.add('upcoming');

    card.innerHTML = `<strong>${getCategoryIcon(d.category)} ${d.name}</strong> - $${d.amount} <br>
                      ${d.category} - ${d.nextDate} <br>
                      Reminder: ${d.reminderDays} day(s) before`;
    list.appendChild(card);
  });
  updateCountdown();
}

document.getElementById('add-debit-form').addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value;
  const amount = document.getElementById('amount').value;
  let category = document.getElementById('category').value;
  const nextDate = document.getElementById('nextDate').value;
  const reminderDays = parseInt(document.getElementById('reminderDays').value);

  if(category === "Others") {
    const newCategory = prompt("Enter new category name:");
    if(newCategory && newCategory.trim() !== "") category = newCategory.trim();
    else { alert("Category cannot be empty!"); return; }
  }

  debits.push({name, amount, category, nextDate, reminderDays});
  localStorage.setItem('debits', JSON.stringify(debits));
  renderDebits();
  document.getElementById('add-debit-form').reset();
});

renderDebits();
setInterval(updateCountdown, 1000*60*60);
