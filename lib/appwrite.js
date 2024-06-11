import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
import * as ImagePicker from 'expo-image-picker';


export const appWriteConfig = {
    endpoint : 'https://cloud.appwrite.io/v1',
    platform : 'com.vad.sneakerz',
    projectId : '66553e070034011c92b6',
    databaseId : "66554102001e0f3ead8f",
    userCollectionId : '6655413f000eeb8497ea',
    sneakerCollectionId : '6655417d000a0ed6771e',
    storageId : '665543a400309c7fa244'
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
const storage = new Storage(client);

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
            appWriteConfig.userCollectionId,
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

export const getSneakers = async () => {
    try {
        const sneakers = await database.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.sneakerCollectionId
        )
        return sneakers.documents
    } catch (error) {
        throw new Error(error)
        console.log(error)
    }
}

export const getLatestSneaker = async () => {
    try {
        const sneakers = await database.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.sneakerCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))] // query to order by createdAt desc and limit 7
        )
        return sneakers.documents
    } catch (error) {
        throw new Error(error)
        console.log(error)
    }
}

export const searchSneakers = async (query) => {
    try {
        const sneakers = await database.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.sneakerCollectionId,
            [Query.search('sneakersName', query)]
        )
        return sneakers.documents
    } catch (error) {
        throw new Error(error)
        console.log(error)
    }
}

export const getSneakersByBrand = async (brand) => {
    try {
        const sneakers = await database.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.sneakerCollectionId,
            [Query.search('brand', brand)]
        )
        return sneakers.documents
    } catch (error) {
        throw new Error(error)
        console.log(error)
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')

        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const formatNumberWithCommas = (number) => {
    if (isNaN(number)) {
        return "Invalid number";
      }
    
      // Convert the number to a string
      const numberString = number.toString();
    
      // Split the number into integer and decimal parts
      const [integerPart, decimalPart = ""] = numberString.split(".");
    
      // Reverse the integer part for easier comma insertion
      const reversedInteger = integerPart.split("").reverse().join("");
    
      // Insert commas every 3 digits
      const formattedInteger = reversedInteger.replace(/(\d{3})(?!$)/g, "$1,");
    
      // Reverse the formatted integer back to normal order
      const finalInteger = formattedInteger.split("").reverse().join("");
    
      // Combine the formatted integer and decimal part
      return `${finalInteger}${decimalPart.length > 0 ? "." + decimalPart : ""}`;
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl

    try {
        if(type === 'image'){
            fileUrl = storage.getFilePreview(appWriteConfig.storageId, fileId, 2000, 2000, 'top', 100 )
        } else{
            throw new Error('Invalid File Type')
        }

        if(!fileUrl) throw Error;

        return fileUrl;

    } catch (error) {
        console.log("getFilePreview()", error)
        throw new Error(error)
    }
}


export const uploadFile =  async (file, type) => {
    if(!file) return ;

    const { mimeType, ...rest} = file;
    const asset = { type: mimeType, ...rest}

    try {
        const uploadedFile = await storage.createFile(
            appWriteConfig.storageId,
            ID.unique(),
            asset
        );

        if (!uploadedFile) throw new Error('File upload failed');

        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        
        return fileUrl;

    } catch (error) {
        console.log("uploadFIle()", error)
        throw new Error(error)
    }
}

function capitalizeFirstLetter(string) {
    if (!string) return string; // Check if the input is an empty string or null
    let txt = string.slice(1);
    return string.charAt(0).toUpperCase() + txt.toLowerCase();
}


export const uploadSneaker = async (form) => {
    try {
        const [imageUrl] = await Promise.all([
            uploadFile(form.imageThumbnail, 'image')
        ])

        if (!imageUrl) throw new Error('Image upload failed');

        const newPost = await database.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.sneakerCollectionId,
            ID.unique(),
            {
                sneakersName: form.sneakersName,
                sneakersPrice: form.sneakersPrice,
                sneakersImage: imageUrl,
                brand: capitalizeFirstLetter(form.brand),
            }
        )

        return newPost;

    } catch (error) {
        console.log("uploadSneaker()", error)
        throw new Error(error)
    }
}




