import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.stream.streamkaro',
    projectId: '66347d32000a5d830b54',
    databaseId: '66347fee0010ab7ebabe',
    userCollectionId: '6634808000295f0c4b2f',
    videosCollectionId: '663480c1000c55edea84',
    BucketId: '6634c0370014d5698d1c',
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint( config.endpoint )
    .setProject( config.projectId )
    .setPlatform( config.platform );

const account = new Account( client );
const avatars = new Avatars( client );
const databases = new Databases( client );
const storage = new Storage( client );

// Register user
export async function createUser( email, password, username ) {

    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );


        if ( !newAccount ) {
            console.log( "notNewAccount" )
            throw Error
        };

        const avatarUrl = avatars.getInitials( username );

        await signIn( email, password );

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch ( error ) {
        throw new Error( error );
    }
}


export async function signIn( email, password ) {
    console.log( "outside try" )
    try {
        const session = await account.createEmailSession( email, password );
        // console.log( "session", session )
        return session
    } catch ( error ) {
        console.log( "eee", error )
        throw new error
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        // console.log( "currentAccount", currentAccount )
        if ( !currentAccount ) {
            throw Error;
        }

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [ Query.equal( "accountId", currentAccount.$id ) ]
        )
        // console.log( "USERUSER", currentUser );
        if ( !currentUser ) throw Error;

        return currentUser.documents[ 0 ];

    } catch ( error ) {
        console.log( "appwrite-getuser-err", error )

    }
}

export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [ Query.orderDesc( '$createdAt' ) ]
        )
        return posts.documents;
    } catch ( error ) {
        throw new Error( error );
    }
}
export async function getLatestPosts() {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [ Query.orderDesc( '$createdAt', Query.limit( 7 ) ) ]
        )
        return posts.documents;
    } catch ( error ) {
        throw new Error( error );
    }
}
export async function searchPosts( query ) {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [ Query.search( "title", query ) ]
        );

        if ( !posts ) throw new Error( "Something went wrong" );

        return posts.documents;
    } catch ( error ) {
        throw new Error( error );
    }
}
export async function getUserPosts( userId ) {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [ Query.equal( "creator", userId ) ]
        );

        if ( !posts ) throw new Error( "Something went wrong" );

        return posts.documents;
    } catch ( error ) {
        throw new Error( error );
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession( 'current' );
        // console.log( "session", session )
        return session
    } catch ( error ) {
        console.log( "eee", error )
        throw new error
    }
}

export const getFiePreview = async ( fileID, type ) => {
    let fileUrl;

    try {
        if ( type === 'video' ) {
            fileUrl = storage.getFileView( config.BucketId, fileID )
        } else if ( type === 'image' ) {
            fileUrl = storage.getFilePreview( config.BucketId, fileID, 2000, 2000, 'top', 100 );
        } else {
            throw new Error( 'Invalid File Type' )
        }

        if ( !fileUrl ) throw Error;

        return fileUrl;

    } catch ( error ) {
        throw new Error( error );
    }
}


export const uploadFile = async ( file, type ) => {
    if ( !file ) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
    try {
        const uploadedFile = await storage.createFile(
            config.BucketId,
            ID.unique(),
            asset
        )
        console.log( "uploadedFile", uploadedFile, file, type );
        const fileUrl = await getFiePreview( uploadedFile.$id, type );

        return fileUrl;

    } catch ( error ) {
        throw new Error( error );
    }
}


export async function createVideo( form ) {
    try {
        const [ thumbnailUrl, videoUrl ] = await Promise.all( [
            uploadFile( form.thumbnail, 'image' ),
            uploadFile( form.video, 'video' )
        ] )

        const newPost = await databases.createDocument(
            config.databaseId,
            config.videosCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        )
        return newPost;
    } catch ( error ) {
        throw new Error( error );
    }
}