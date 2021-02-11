const form = document.querySelector('form');
const descriptionInput = form.querySelector('#description-input');
const timeInput = form.querySelector('#time-input');
const intensityInput = form.querySelector('#intensity-input');
const tableBody = document.querySelector('table tbody');
const activitiesTotal = document.querySelector("#activities-total h3");
const timeTotal = document.querySelector("#time-total h3");
const averageCaloriesTotal = document.querySelector("#average-calories-total h3");
const caloriesTotal = document.querySelector("#calories-total h3");

class Activity {
  constructor(description, duration, intensity, id) {
    this.description = description;
    this.date = new Date();
    this.duration = duration;
    this.intensity = intensity;
    this.id = id;
    this.calories = intensity * 90 / 60 * duration;
  }
}

class ActivityTracker {
  constructor() {
    this.activities = [];
    this.activity_id = 0;
  }

  createActivity(description, duration, intensity) {
    const activity = new Activity(
      description,
      duration,
      intensity,
      this.activity_id++, 
    );
    
    this.activities.push(activity);  
    this.updateDOM();
  }

  destroyActivity(id) {
    const activityIndex = this.activities.findIndex(elem => elem.id == id);
    this.activities.splice(activityIndex, 1);
    this.updateDOM();
  }

  updateDOM() {
    this.updateTotals();  
    this.updateTable();
  }

  updateTable() {
    tableBody.textContent = "";

    for (const activity of this.activities) {
      tableBody.insertAdjacentHTML('afterbegin', `
        <tr class="activity" data-activity-id=${activity.id}>
          <td class="description">${activity.description}</td>
          <td class="calories">${activity.calories}</td>
          <td class="time">${formatTime(activity.duration)}</td>
          <td class="date">${formatDate(activity.date)}</td>
          <td class="close"><i class="las la-times"></i></i></td>
        </tr>
      `);
    }
  }

  updateTotals() {
    activitiesTotal.textContent = this.activities.length;

    const totalTime = this.activities.reduce((total, activity) => total += activity.duration, 0);
    const totalCalories = this.activities.reduce((total, activity) => total += activity.calories, 0);
    
    timeTotal.textContent = formatTime(totalTime);
    caloriesTotal.textContent = totalCalories;
    averageCaloriesTotal.textContent = Math.round(totalCalories / this.activities.length);
  }
}

const formatDate = function(date) {
  const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December",
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const formatTime = function(minutes) {
  let hrs = Math.floor(minutes / 60);
  let mins = minutes % 60;
  let hrsAsString = hrs > 0 ? hrs + 'hrs. ' : "";

  return `${hrsAsString}${mins}mins.`
}

const activityTracker = new ActivityTracker();

form.onsubmit = function(e) {
  activityTracker.createActivity(descriptionInput.value, timeInput.value, intensityInput.value);
  form.reset();
  e.preventDefault();
}

tableBody.onclick = (e) => {
  if (e.target.classList.contains('la-times')) {    
    activityTracker.destroyActivity(e.target.closest('tr').dataset.activityId);
  }
}