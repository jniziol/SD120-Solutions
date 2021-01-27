const form = document.querySelector('.header form'); 
const newRepairInput = document.querySelector('.new-repair');
const repairListUL = document.querySelector('.repair-list');
const clearCompletedButton = document.querySelector('.clear-completed');

class Repair {
  constructor(description, id) {
    this.id = id;
    this.description = description;
    this.completed = false;
  }
}

class RepairList { 
  constructor() {
    this.id = 0;
    this.repairs = [];
  }

  addRepair(description) {
    this.repairs.push(new Repair(description, this.id++));
    this.updateDOM();
  }

  deleteRepair(id) {
    this.repairs = this.repairs.filter(function(repair) {
      return repair.id != id;
    });

    this.updateDOM();
  }

  markAsComplete(id) {
    const repairToMark = this.repairs.find(function(repair) {
      return repair.id == id;
    })

    repairToMark.completed = true;
    this.updateDOM();
  }

  clearCompleted() {
    this.repairs = this.repairs.filter(function(repair) {
      return !repair.completed;
    });
    this.updateDOM();
  }

  updateDOM() {    
    repairListUL.textContent = "";

    for(let repair of this.repairs) {
      repairListUL.insertAdjacentHTML('afterbegin',`
        <li data-id="${repair.id}" class="${repair.completed ? "completed" : ""}">
          <div class="view">
            <input class="toggle" type="checkbox" ${repair.completed ? "checked" : ""}>
            <label>${repair.description}</label>
            <button class="destroy"></button>
          </div>
        </li>
      `);
    }
  }
}

const repairList = new RepairList();

form.onsubmit = function(e) {
  if (newRepairInput.value !== "") {
    repairList.addRepair(newRepairInput.value); 
    newRepairInput.value = "";
  }

  e.preventDefault();
}

repairListUL.onclick = function(e) {
  if (e.target.nodeName === "BUTTON") {
    const liElement = e.target.closest("li");
    repairList.deleteRepair(liElement.dataset.id);
  } else if (e.target.nodeName === "INPUT") {
    const liElement = e.target.closest("li");
    repairList.markAsComplete(liElement.dataset.id);
  }
}

clearCompletedButton.onclick = function() {
  repairList.clearCompleted();
}
