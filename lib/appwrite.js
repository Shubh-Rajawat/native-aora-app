import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.stream.streamkaro',
    projectId: '66347d32000a5d830b54',
    databaseId: '66347fee0010ab7ebabe',
    userCollectionId: '6634808000295f0c4b2f',
    videosCollectionId: '663480c1000c55edea84',
    storageId: '6634c0370014d5698d1c',
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint( config.endpoint )
    .setProject( config.projectId )
    .setPlatform( config.platform );

const account = new Account( client );
const avatars = new Avatars( client );
const databases = new Databases( client )


export const createUser = async ( userInfo ) => {

    try {
        const newAccount = account.create( ID.unique(), userInfo.email, userInfo.password, userInfo.userName )
        if ( !newAccount ) {
            throw Error
        }

        const avatarUrl = avatars.getInitials( userInfo.userName );

        await signIn( userInfo.email, userInfo.password )
        const newUser = await databases.createDocument( config.databaseId, config.userCollectionId, ID.unique(), {
            username: userInfo.userName,
            accountId: newAccount.$id,
            email: userInfo.email,
            avatar: avatarUrl,
        } )
        return newUser;
    } catch ( error ) {
        console.log( error );
        throw new error
    }

}

export async function signIn( email, password ) {
    try {
        const session = await account.createEmailSession( email, password )
        return session
    } catch ( error ) {
        throw new error
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if ( !currentAccount ) {
            throw Error;
        }

        const currentUser = databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [ Query.equal( 'accountId', currentAccount.$id ) ]
        )

        if ( !currentUser ) throw Error;

        return currentUser.documents[ 0 ];

    } catch ( error ) {
        console.log( error )

    }
}