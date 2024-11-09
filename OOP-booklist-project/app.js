class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  addBook(book) {
    let tbody = document.querySelector("#book-list");
    let newBook = document.createElement("tr");
    let newBookTitle = document.createElement("td");
    newBookTitle.textContent = book.title;
    let newBookAuthor = document.createElement("td");
    newBookAuthor.textContent = book.author;
    let newBookIsbn = document.createElement("td");
    newBookIsbn.textContent = book.isbn;

    newBook.appendChild(newBookTitle);
    newBook.appendChild(newBookAuthor);
    newBook.appendChild(newBookIsbn);
    tbody.appendChild(newBook);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  showAlert(message, className) {
    if (!document.querySelector(".alert")) {
      const alert = document.createElement("div");
      alert.className = `alert ${className}`;
      alert.textContent = message;
      document.querySelector("form").appendChild(alert);
      setTimeout(() => {
        alert.remove();
      }, 2000);
    }
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

const form = document.querySelector("#book-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "")
    ui.showAlert("Please fill in all the fields", "error");
  else {
    ui.addBook(book);
    ui.showAlert("Book added", "success");
  }
  ui.clearFields();
});

document.querySelector("#book-list").addEventListener("click", (event) => {
  const ui = new UI();
  event.target.classList.add("delete");
  ui.deleteBook(event.target);
  ui.showAlert("Book removed", "success");
});
