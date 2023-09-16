
import { JaxAuth, JaxAuthBuilder } from "./JaxAuth";
import { getUserById } from "./dbMethods";
import { User } from "./types";

const auth: JaxAuth<User> = new JaxAuthBuilder<User>()
    .setUserGetter(getUserById)
    .setUserPasswordSaltField(user => user.salt)
    .setUserHashPasswordField(user => user.hashedPassword)
    .setHMACKey(process.env.HMAC_KEY as string)
    .setEncryptionSecret(process.env.ENCRYPTION_KEY as string)
    .setStringifiedCookieContents(user => JSON.stringify({userId: user.userId, userEmail: user.userEmail}))
    .setCookieName('exampleauth')
    .build();

export default auth;