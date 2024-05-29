import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';


export const appWriteConfig = {
    endpoint : 'https://cloud.appwrite.io/v1',
    platform : 'com.vad.sneakerz',
    projectId : '66553e070034011c92b6',
    databaseId : "66554102001e0f3ead8f",
    userCollectionId : '6655413f000eeb8497ea',
    sneakerCollectionId : '6655417d000a0ed6771e',
    storaageId : '665543a400309c7fa244'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

export const createUser = async(email, password, username)  => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw error;

        const avatarUrl = avatar.getInitials(username);

        await signIn(email, password);

        const newUser = await database.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);

    }
}

export const checkSession = async () => {
    try {
        const session = await account.get(); // Attempts to get session details
        return !!session; 
    } catch (error) {
        console.log('No active session found', error);
        return false;
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            appWriteConfig.databaseId,
            appwriteconfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try {
        await account.deleteSession('current'); // This deletes the current session
    } catch (error) {
        console.log('Failed to log out', error);
        throw new Error('Failed to log out');
    }
};


