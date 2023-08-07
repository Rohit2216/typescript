export class Book {
    section: "Fiction" | "Documentary" | "Educational";
    name: string;

    constructor(section: "Fiction" | "Documentary" | "Educational", name: string) {
        this.section = section;
        this.name = name;
    }
}

export class Section {
    name: "Fiction" | "Documentary" | "Educational";
    books: Book[];

    constructor(name: "Fiction" | "Documentary" | "Educational") {
        this.name = name;
        this.books = [];
    }

    addBook(book: Book) {
        this.books.push(book);
    }
}

export class Library {
    name: string;
    sections: Section[];

    constructor(name: string) {
        this.name = name;
        this.sections = [];
    }
    addSection(section: Section) {
        this.sections.push(section);
    }
}

// export { Book, Section, Library };

