class Cart {
  constructor() {
    this.courses = [];
    this.length = 0;
  }

  addCourse(courseId) {
    const course = courses.find(function(c) {
      return c.id === courseId;
    });

    this.courses.push(course);
    this.length++;
    this.redrawCart();
  }

  removeCourse(courseId) {
    const courseIndex = this.courses.findIndex(function(c) {
      return c.id === courseId;
    });

    this.courses.splice(courseIndex, 1); 
    this.length--;
    this.redrawCart();
  }

  subtotal() {
    let subtotal = 0;
    this.courses.forEach(function(course) {
      subtotal += course.price;
    });

    return subtotal.toFixed(2);
  }

  total() {
    return (this.subtotal() * 1.13).toFixed(2);
  }

  redrawCart() {
    const cartInner = document.querySelector('.cart-inner ul');
    const itemsInCart = document.getElementById('items-in-cart');
    const subtotal = document.getElementById('subtotal-amount');
    const total = document.getElementById('total-amount');

    itemsInCart.textContent = `You have ${this.length} items in your cart.`;

    cartInner.textContent = "";

    this.courses.forEach(function(course) {
      cartInner.insertAdjacentHTML('afterbegin', `
      <li data-course-id="${course.id}">
        <img src="images/${course.image}">  
        <div id="cart-title">${course.title}</div>
        <div id="cart-price">$${course.price}</div>
        <div id="delete">
          <i class="far fa-times-circle"></i>
        </div>
      </li>`);
    });

    subtotal.textContent = `$${this.subtotal()}`;
    total.textContent = `$${this.total()}`;
  }
}

const cart = new Cart();
const coursesUl = document.querySelector('ul.courses');
const cartCourseList = document.querySelector('.cart-inner ul');

coursesUl.onclick = function(e) {
  if (e.target.nodeName === "BUTTON") {
    const courseLi = e.target.closest('li');
    cart.addCourse(courseLi.dataset.courseId);
  }
}

cartCourseList.onclick = function(e) {
  if (e.target.classList.contains('fa-times-circle')) {
    const courseLi = e.target.closest('li');
    cart.removeCourse(courseLi.dataset.courseId);
  }
}