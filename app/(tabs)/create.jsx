import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { ResizeMode, Video } from 'expo-av';
import icon from '../../constants/icon';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { createUser, createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
const Create = () => {
    const { user } = useGlobalContext()
    const [ form, setForm ] = useState( {
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
    } )
    const [ uploading, setuploading ] = useState( false )

    // const onPicker = async ( selectType ) => {
    //     let result = await ImagePicker.launchImageLibraryAsync( {
    //         mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
    //         aspect: [ 4, 3 ],
    //         quality: 1,
    //     } );
    //     console.log( "picker", result )
    //     if ( !result.canceled ) {
    //         if ( selectType === 'image' ) {
    //             setForm( { ...form, thumbnail: result.assets[ 0 ] } )
    //         } else {
    //             setForm( { ...form, video: result.assets[ 0 ] } )
    //         }
    //     }
    // }

    const onPicker = async ( selectType ) => {
        const result = await DocumentPicker.getDocumentAsync( {
            type:
                selectType === "image"
                    ? [ "image/png", "image/jpg" ]
                    : [ "video/mp4", "video/gif" ],
        } );
        console.log( "ResultFile", result )
        if ( !result.canceled ) {
            if ( selectType === "image" ) {
                setForm( {
                    ...form,
                    thumbnail: result.assets[ 0 ],
                } );
            }

            if ( selectType === "video" ) {
                setForm( {
                    ...form,
                    video: result.assets[ 0 ],
                } );
            }
        } else {
            setTimeout( () => {
                Alert.alert( "Document picked", JSON.stringify( result, null, 2 ) );
            }, 100 );
        }
    };

    const submit = async () => {
        if ( !form.title || !form.video || !form.thumbnail || !form.prompt ) {
            return Alert.alert( '', 'Please fill all the fields' )
        }
        setuploading( true );
        try {
            await createVideo( {
                ...form, userId: user.$id
            } )
            Alert.alert( "Success", "Post uploaded successfully" );
            router.push( "/home" );
        } catch ( error ) {
            Alert.alert( 'Error!!', error.message );
            console.log( error )
        } finally {
            setForm( {
                title: '',
                video: null,
                thumbnail: null,
                prompt: '',
            } );
            setuploading( false )
        }
    }



    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView className="px-4 my-6" >
                <Text className="font-psemibold text-white text-2xl" >
                    Upload Video
                </Text>
                <FormField
                    title="Video Title"
                    value={ form.title }
                    placeholder="Enter a catchy title for your video"
                    handleChangeText={ ( e ) => setForm( { ...form, title: e } ) }
                    otherStyles="mt-10"

                />
                <View className="space-y-2 mt-7" >
                    <Text className="text-base text-gray-100 font-pmedium" >
                        Upload Video
                    </Text>
                    <TouchableOpacity onPress={ () => onPicker( 'video' ) } >

                        { form.video ?
                            <Video
                                source={ { uri: form.video.uri } }
                                className="w-full h-64 rounded-2xl"
                                // useNativeControls
                                resizeMode={ ResizeMode.COVER }
                            />
                            : <View className="w-full h-40 px-4 bg-gray-800 rounded-2xl justify-center items-center" >
                                <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center" >
                                    <Image source={ icon.upload } resizeMode='contain' className="w-1/2 h-1/2" />
                                </View>
                            </View> }
                    </TouchableOpacity>
                </View>
                <View className="" >
                    <View className="space-y-2 mt-7" >
                        <Text className="text-base text-gray-100 font-pmedium" >
                            Upload Thumbnail
                        </Text>
                        <TouchableOpacity onPress={ () => onPicker( 'image' ) } >

                            { form.thumbnail ?
                                <Image
                                    source={ { uri: form.thumbnail.uri } }
                                    className="w-full h-64 rounded-2xl"
                                    resizeMode='cover'
                                />
                                : <View className="w-full h-16 px-4 bg-gray-800 rounded-2xl justify-center items-center border border-black-200 flex-row space-x-2" >

                                    <Image source={ icon.upload } resizeMode='contain' className="w-5 h-5" />
                                    <Text className="text-sm text-gray-100 font-pmedium" >Choose a file</Text>
                                </View> }
                        </TouchableOpacity>
                    </View>
                    <FormField
                        title="AI prompt"
                        value={ form.prompt }
                        placeholder="Enter a prompt for your video"
                        handleChangeText={ ( e ) => setForm( { ...form, prompt: e } ) }
                        otherStyles="mt-7"

                    />
                    <CustomButton
                        title={ `Publish Video` }
                        handlePress={ submit }
                        customStyles="mt-7"
                        isLoading={ uploading }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create

const styles = StyleSheet.create( {} )