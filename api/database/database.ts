// migrateDbIfNeeded.ts
import { SQLiteDatabase } from "expo-sqlite";
import { dataEntry } from "../data";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 4;

  console.log("🔍 Verificando versión de la base de datos...");

  // Obtenemos la versión actual de la BD
  const versionResult = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  let currentDbVersion = versionResult?.user_version ?? 0;
  console.log(`📂 Versión actual de la BD: ${currentDbVersion}`);

  // Verificar si la tabla "accounts" existe
  const tableResult = await db.getFirstAsync<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='accounts'"
  );
  if (!tableResult) {
    console.log("⚠️ La tabla 'accounts' no existe. Se forzará la migración.");
    currentDbVersion = 0; // Forzamos la migración si no existe la tabla
  }

  if (currentDbVersion >= DATABASE_VERSION) {
    console.log(
      "✅ La base de datos ya está actualizada. No es necesario migrar."
    );
    return;
  }

  console.log("⚡ Iniciando migración de la base de datos...");

  if (currentDbVersion === 0) {
    // Crear las tablas (usamos IF NOT EXISTS por seguridad)
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS accounts (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          address TEXT,
          paymentMethod TEXT,
          country TEXT NOT NULL,
          expirationDate TEXT NOT NULL,
          observation TEXT
      );

      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY NOT NULL,
          accountId INTEGER NOT NULL,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          price TEXT NOT NULL,
          paymentDate TEXT NOT NULL,
          phone TEXT,
          FOREIGN KEY (accountId) REFERENCES accounts(id) ON DELETE CASCADE
      );
    `);

    console.log("🛠 Tablas 'accounts' y 'users' creadas con éxito.");

    // Insertar datos iniciales
    for (const entry of dataEntry) {
      const { account, users } = entry;

      // Insertar cuenta
      await db.runAsync(
        `INSERT INTO accounts (id, name, email, password, address, paymentMethod, country, expirationDate, observation)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        account.id,
        account.name,
        account.email,
        account.password,
        account.address ?? "",
        account.paymentMethod ?? "",
        account.country,
        account.expirationDate,
        account.observation ?? ""
      );
      console.log(`✅ Cuenta '${account.name}' insertada.`);

      // Insertar usuarios asociados a la cuenta
      for (const user of users) {
        await db.runAsync(
          `INSERT INTO users (id, accountId, name, email, password, price, paymentDate, phone)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          user.id,
          account.id,
          user.name,
          user.email,
          user.password,
          user.price,
          user.paymentDate,
          user.phone ?? ""
        );
      }
      console.log(
        `✅ ${users.length} usuarios insertados para la cuenta '${account.name}'.`
      );
    }
    console.log("📥 Datos iniciales insertados correctamente.");
  }

  // Actualizar la versión de la base de datos
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  console.log(`🚀 Migración completada. Nueva versión: ${DATABASE_VERSION}`);
}
