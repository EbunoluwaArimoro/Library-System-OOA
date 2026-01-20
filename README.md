# Library Management System - Object-Oriented Analysis

## 1. Requirement Analysis

**Actors:**

- **Librarian (Admin):** Can add books, register members, and view all records.
- **Member (User):** Can search for books, borrow books, and return books.
- **System (Timer/Automated):** Checks for overdue books daily.

**Key Use Cases:**

- Login
- Search for Book
- Issue Book
- Return Book
- Add Book

## 2. System Architecture

The system follows a Layered Architecture to separate concerns:

1. **Presentation Layer:** The UI (Web/Mobile) that handles user interaction.
2. **Business Logic Layer:** Contains rules for borrowing limits, fines, and availability.
3. **Data Access Layer:** Connects to the database to fetch/save records.

## 3. OOA Diagrams

### Class Diagram

The structure of the system showing the relationships between the Library, Books, Members, and Librarians.

```mermaid
classDiagram
    class LibrarySystem {
        +searchBook(title)
        +verifyMember(id)
    }

    class Book {
        +String title
        +String ISBN
        +String status
        +issue()
        +return()
    }

    class Member {
        +String name
        +String memberId
        +borrow(Book)
    }

    class Librarian {
        +addBook(Book)
        +registerMember(Member)
    }

    LibrarySystem --> Book : manages
    LibrarySystem --> Member : manages
    Member -- Book : borrows
    Librarian ..> LibrarySystem : administers
```

### Sequence Diagram

The flow of events when a member searches for and borrows a book.

```mermaid
sequenceDiagram
    actor Member
    participant System
    participant Book

    Member->>System: search("The Great Gatsby")
    System->>Book: checkAvailability()

    alt is Available
        Book-->>System: Returns "Available"
        System->>Member: Confirm Issue?
        Member->>System: Yes
        System->>Book: setStatus("Issued")
        System-->>Member: Success! Due in 14 days.
    else is Borrowed
        Book-->>System: Returns "Issued"
        System-->>Member: Error: Book unavailable.
    end
```

### State Diagram

The lifecycle of a single book unit.

```mermaid
stateDiagram-v2
    [*] --> Available
    Available --> Issued : Member borrows
    Issued --> Available : Member returns
    Issued --> Overdue : 14 days pass
    Overdue --> Available : Fine paid & Returned
    Available --> [*] : Removed from inventory
```

## 4. Implementation

The design logic and pseudocode for the class structures can be found in the [src folder](./src).
