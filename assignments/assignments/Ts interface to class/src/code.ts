import { IPerson } from "./interface";

// This is the class that should use the interface
class Person{
    first_name;
  last_name;
  email;
  phone;

  constructor(first_name: string, last_name: string, email: string, phone: number) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
  }

  PrintFullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}

export default Person;