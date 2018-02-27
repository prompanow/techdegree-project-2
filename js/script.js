/* This script is divided into tree functions
  1. showPage = this is a display yes/no function of selected elements
  2. appendPageLinks = creates a dynamical pagination on the index page
  3. selectPage = determines which pagination page shall be visible
*/

const studentItem = document.querySelectorAll('.student-item');
const pageSize = 10; // used to determine how many elements shall be visible on each page

// takes in two inputs: students (studentItem) and pageNumber (which index-number in the pagination)
function showPage(students, pageNumber) {
  for (let i = 0; i < students.length; i++) {
    // the statement determines what range shall be visible, ex. 1-10 or 21-30
    if ((pageSize * pageNumber) <= i && i < (pageSize * (pageNumber + 1))) {
      students[i].style.display = 'block';
    } else {
      students[i].style.display = 'none';
    }
  }
}

function appendPageLinks(students) {

  // pageCount determines how many pages the pagination needs to how in total
  let pageCount = studentItem.length / pageSize;
  pageCount = Math.ceil(pageCount);

  // below creates a div with the class pagination and append a child element of ul into it
  let pageNumber = document.createElement('div');
  let ul = document.createElement('ul');
  document.querySelector('.page').appendChild(pageNumber);
  pageNumber.appendChild(ul);
  pageNumber.className = 'pagination';

  // the loop creates the number a pages needed, and adds li with child element a into the ul
  for (let i = 0; i < pageCount; i++) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = '#';
    a.textContent += i + 1;
    li.className = 'pageClick';
    li.appendChild(a);
    ul.appendChild(li);
    if (i === 0) {
      a.className += 'active'; // the pagination tagElement-a with index zero gets a className of active
    }
  }
  selectPage();
}

function selectPage() {
  const page = document.querySelectorAll('.pageClick');

  // the for-loop actaches a click-eventListener to each pagination
  for (let i = 0; i < page.length; i++) {
    page[i].addEventListener('click', () => {
      let current = document.querySelector('.active');
      let pageNumber = i;
      if (page[i].lastChild.className !== 'active') {
        current.classList.remove('active');
        page[i].lastChild.className += 'active';

        showPage(studentItem, pageNumber); // calls the showPage function to select which students shall be visible

      }
    })
  }
}

appendPageLinks(studentItem);
showPage(studentItem, 0); // the zero representates page one, and will make the first 10 students visible when opening the index.html
