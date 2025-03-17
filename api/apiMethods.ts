import { SQLiteDatabase } from "expo-sqlite";
import { dataEntry } from "./data";
import { DataEntry, User } from "./models";

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

export const updateUserPaymentDate = async (
  db: SQLiteDatabase,
  user: User
): Promise<string> => {
  try {
    const checkQuery = `SELECT paymentDate FROM users WHERE id = ?`;
    const checkResult = await db.getFirstAsync<{ paymentDate: string }>(
      checkQuery,
      user.id
    );

    user.paymentDate = checkResult?.paymentDate ?? user.paymentDate;

    const [day, month, year] = user.paymentDate.split("/").map(Number);

    let newMonth = month + 1;
    let newYear = year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    const newPaymentDate = `${day.toString().padStart(2, "0")}/${newMonth
      .toString()
      .padStart(2, "0")}/${newYear}`;

    const updateQuery = `UPDATE users SET paymentDate = ? WHERE id = ?`;
    await db.runAsync(updateQuery, newPaymentDate, user.id);
    await db.execAsync("PRAGMA wal_checkpoint(FULL)");

    const checkResult2 = await db.getFirstAsync<{ paymentDate: string }>(
      checkQuery,
      user.id
    );

    return checkResult2?.paymentDate ?? "error update";
  } catch (error) {
    console.error("❌ Error al actualizar la fecha de pago:", error);
    return "error update";
  }
};
