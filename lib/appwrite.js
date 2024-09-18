export const appWriteConfig = {
    endpoint: 'https:///cloud.appwrite.io/v1',
    platform: 'com.ios.aistrology',
    projectId: '66e0e48700224cd28d74',
    databaseId: '66e0e626003d05b58ba7',
    userCollectionId: '66e0e667001ff6702097',
    videoCollectionId: '66e0e68d002b67753565',
    storageId: '66e0e835002e526943e0'
}

const {endpoint, platform, projectId, databaseId, userCollectionId, videoCollectionId, storageId} = appWriteConfig
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
import {Alert} from 'react-native'
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
const storage = new Storage(client);

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

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents;
    }
    catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async() => {
    try{
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
            return posts.documents
        
    }
    catch(error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    console.log('THIS IS QUERY', query)
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents
    }
    catch(error) {
        throw new Error(error);
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId)]
        )
        return posts.documents
    }
    catch(error) {
        throw new Error(error);
    }
}

export const signOut = async() => {
    try {
        const session = await account.deleteSession('current');
        return session;
    }
    catch(error) {
        throw new Error(error)
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId)
        }
        else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100), 100;
        }
        else {
            throw new Error('Invalid file type');
        }
        if (!fileUrl) {
            throw Error;
        }
        return fileUrl
    }
    catch(error) {
        throw new Error(error)
    }
}

export const uploadFile = async (file,type) => {

    if(!file) return;
    const asset = {
        name: file.fieName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        );
        const fileUrl = await getFilePreview(uploadedFile.$id, type)

        return fileUrl;
    } catch(error)
 {
    throw new Error(error);
 }}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ]) // handles all promises

        const newPost = await databases.create(
            databaseId, videoCollectionId, ID.unique(), {
                title: form.title,
                thumbnail: thumbnailUrl,
                prompt: form.prompt,
                video: videoUrl,
                creator: form.userId,
            }
        )
        return newPost;
    }
    catch(error) {
        throw new Error(error)
    }
}

export const setLikedVideo = async (videoId, userId, liked) => {
   try {
       const currentVideo = await databases.getDocument(databaseId, videoCollectionId, videoId);
       console.log('THIS IS CURRENT VIDEO'
        , currentVideo);
        let updated = null; 
        const currentLikes = currentVideo.likes
        if (liked) {
            currentLikes.push(userId);
            updated = await databases.updateDocument(databaseId, videoCollectionId, videoId, {likes: currentLikes})
        }
        
        if (!liked) {
            const filteredLikes = currentLikes.filter(user=> {user.$id !== userId})
            updated = await databases.updateDocument(databaseId, videoCollectionId, videoId, { likes: filteredLikes})
        } // Unliked 
        return updated;
   }
   catch(error){
    console.log(error)
    Alert.alert('Error', error.message)
   }
}