import { randomUUID } from "node:crypto";

export class User {
  constructor({ id, name, lastName, email, password }) {
    if (!(name && lastName && email && password))
      throw new Error('Any user required field is not provided')
    this._id = id ?? randomUUID();
    this._name = name;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(lastName) {
    this._lastName = lastName;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    this._password = password;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      email: this.email
    };
  }
}
