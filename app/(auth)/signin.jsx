import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from "../../constants/images"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
const SignIn = () => {
    const [ form, setForm ] = useState( {
        email: '',
        password: ''
    } )
    const [ isSubmitting, setSubmitting ] = useState( false )
    const submit = () => {

    }
    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView>
                <View className="w-full justify-center min-h-[90vh] px-4 my-6" >
                    <Image source={ images.logo } resizeMode='contain' className='w-[115px] h-[35px]' />
                    <Text className='text-xl text-white mt-10 font-psemibold' ></Text>
                    <FormField
                        title="Email"
                        value={ form.email }
                        handleChangeText={ ( e ) => {
                            setForm( { ...form, email: e } )
                        } }
                        otherStyles={ 'mt-7' }
                        keyboardType='email-address'
                    />
                    <FormField
                        title="Password"
                        value={ form.password }
                        handleChangeText={ ( e ) => {
                            setForm( { ...form, password: e } )
                        } }
                        otherStyles={ 'mt-7' }
                    />
                    <CustomButton
                        title={ 'Sign In' }
                        handlePress={ submit }
                        customStyles="mt-7"
                        isLoading={ isSubmitting }
                    />

                    <View className="flex-row  justify-center gap-2 items-center pt-7 " >
                        <Text className="text-gray-100 text-lg font-pregular" >
                            Don't have an Account?
                        </Text >
                        <Link className='text-lg text-secondary font-psemibold' href={ '/signup' } >Sign up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default SignIn;

const styles = StyleSheet.create( {} )