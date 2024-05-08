import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Bookmark = () => {
    return (
        <SafeAreaView className="h-full bg-primary items-center justify-center " >
            <Text className="font-psemibold text-xl text-white text-center " >currently in { "\n" } developement</Text>
        </SafeAreaView>
    )
}

export default Bookmark;

const styles = StyleSheet.create( {} );