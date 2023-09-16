import db from "./database";
import { JaxAuth } from "./JaxAuth";
import { getUserById } from "./dbMethods";
import auth from './auth';

function createUsersTable() {
    const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='Users'").get();

    if (!tableExists) {
        db.exec(`
            CREATE TABLE Users (
                hashedPassword TEXT NOT NULL,
                salt TEXT NOT NULL,
                userId TEXT PRIMARY KEY UNIQUE,
                userEmail TEXT NOT NULL UNIQUE
            );
        `);
        console.log("Users table created successfully.");
    } else {
        console.log("Users table already exists.");
    }
}


createUsersTable();
const insert = db.prepare("INSERT INTO Users (hashedPassword, salt, userId, userEmail) VALUES (?, ?, ?, ?)");
const userId = "randomid";

async function createExampleUser() {
    // Check if user already exists
    const user = await getUserById(userId);
    if (user) {
        console.log("user: " + JSON.stringify(user) + " exists!");
        return;
    }
    const password = "12345";
    const salt = JaxAuth.generateSalt();
    const hashedPassword = JaxAuth.hashPassword(password, salt);
    
    insert.run(hashedPassword, salt, userId, "jas@gmail.com");
}

createExampleUser();


async function attemptLogin() {
    const cookie = await auth.attemptVerify(userId, "12345")
    console.log(cookie);
    console.log("Hold on, we're decrytping");
    console.log(auth.attemptCookieDecryption(cookie));
}
attemptLogin()