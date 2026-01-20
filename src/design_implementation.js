// ==========================================
// 1. THE BOOK CLASS 
// ==========================================
class Book {
    constructor(title, isbn) {
        this.title = title;
        this.isbn = isbn;
        this.status = "AVAILABLE"; // Matches State Diagram
    }

    issue() {
        if (this.status === "AVAILABLE") {
            this.status = "ISSUED";
            return true;
        }
        return false;
    }

    returnBook() {
        this.status = "AVAILABLE";
    }
}

// ==========================================
// 2. THE MEMBER CLASS
// ==========================================
class Member {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.currentLoans = [];
    }

    borrow(book) {
        if (book.issue()) {
            this.currentLoans.push(book);
            console.log("Success: Book borrowed.");
        } else {
            console.log("Error: Book is not available.");
        }
    }
}