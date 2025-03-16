import { dataEntry } from "./data";
import { DataEntry } from "./models";

export const getAccounts = async (): Promise<DataEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataEntry);
    }, 500);
  });
};

export const getAccountById = async (id: string): Promise<DataEntry> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = dataEntry.find((entry) => entry.account.id === id);
      data ? resolve(data) : reject(new Error("Account not found"));
    }, 250);
  });
};
