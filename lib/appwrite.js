export const appWriteConfig = {
    endpoint: 'https:///cloud.appwrite.io/v1',
    platform: 'com.ios.aistrology',
    projectId: '66e0e48700224cd28d74',
    databaseId: '66e0e626003d05b58ba7',
    userCollectionId: '66e0e667001ff6702097',
    videoCollectionId: '66e0e68d002b67753565',
    storageId: '66e0e835002e526943e0'
}

import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {

    const newAccount = await account.create(ID.unique(), email, password, username)
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(appWriteConfig.databaseId, appWriteConfig.userCollectionId, ID.unique(),
     {accountId: newAccount.$id, email: email, username: username, avatar: avatarUrl});
    return newUser;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }

}

// Sign In
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email,password);

        return session;
    }
    catch (error) {
        throw new Error (error);
    }
}
// Get Account
export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }
  

export const getCurrentUser = async() => {
    try {
        const currentAccount = await getAccount()
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    }
    catch(error) {
        console.log(error);return null 
    }


}