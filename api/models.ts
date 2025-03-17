export interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  paymentMethod: string;
  country: string;
  expirationDate: string;
  observation?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  price: string;
  paymentDate: string;
  observation?: string;
  phone: string,
  accountId: string,
}

export interface DataEntry {
  account: Account;
  users: User[];
}
