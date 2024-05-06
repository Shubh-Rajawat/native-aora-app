import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from "../constants/images"
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
export default function App() {

    const { isLoading, isLoggedIn } = useGlobalContext();

    if ( !isLoading && isLoggedIn ) {
        return <Redirect href={ '/home' } />
    }

    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView contentContainerStyle={ {
                height: '100%'
            } } >
                <View className="w-full min-h-[90vh] items-center justify-center  px-4" >
                    <Image
                        source={ images.logo }
                        resizeMode='contain'
                        className="w-[130px] h-[84px]"
                    />
                    <Image
                        source={ images.cards }
                        resizeMode='contain'
                        className="w-full h-[300px] max-w-[380px]"

                    />
                    <View className="relative mt-5" >
                        <Text className="text-3xl text-white font-bold text-center " >
                            Join <Text className="text-secondary-200 font-psemibold " >Aora</Text>
                        </Text>
                        <Image source={ images.path } resizeMode='center' className="w-20 absolute -bottom-4 -right-4" />
                    </View>
                    <Text className="text-gray-100 mt-7 font-pregular text-sm text-center" >Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
                    <CustomButton title="Continue With Email" customStyles="w-full mt-7" handlePress={ () => { router.push( '/signup' ) } } textStyles="" isLoading={ false } />

                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    );
}


