export const appWriteConfig = {
    endpoint: 'https:///cloud.appwrite.io/v1',
    platform: 'com.ios.aistrology',
    projectId: '66e0e48700224cd28d74',
    databaseId: '66e0e626003d05b58ba7',
    userCollectionId: '66e0e667001ff6702097',
    videoCollectionId: '66e0e68d002b67753565',
    storageId: '66e0e835002e526943e0'
}

import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform) // Your application ID or bundle ID.
;

export const createUser = async (email, password, username) => {
    try {
    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);
    const newAccount = await account.create(ID.unique(), email, password, username)
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(appWriteConfig.databaseId, appWriteConfig.userCollectionId, ID.unique);
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }

}
