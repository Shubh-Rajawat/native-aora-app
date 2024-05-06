import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'

const Home = () => {

    const { data: posts, refetch, isLoading } = useAppwrite( getAllPosts );

    const [ refreshing, setRefreshing ] = useState( false );

    const onRefresh = async () => {
        setRefreshing( true );
        await refetch;
        setRefreshing( false );
    }

    return (
        <SafeAreaView className="bg-primary h-full " >
            <FlatList
                // data={ [ { id: 1 }, { id: 2 }, { id: 3 } ] }
                data={ posts }
                keyExtractor={ ( item ) => item.$id }
                renderItem={ ( { item } ) => (
                    <Text className="text-white" >{ item.title }</Text>
                ) }
                ListHeaderComponent={ () => (
                    <View className="my-6 px-4 space-y-6" >
                        <View className="flex-row justify-between items-start mb-6" >
                            <View className="" >
                                <Text className="font-pmedium text-sm text-gray-100" >Welcome</Text>
                                <Text className="font-psemibold text-2xl text-white" >Shubh</Text>
                            </View>
                            <View className="mt-1.5" >
                                <Image source={ images.logoSmall } resizeMode='contain' className="w-9 h-10" />
                            </View>
                        </View>
                        <SearchInput />
                        <View className="w-full flex-1 pt-5 pb-8" >
                            <Text className="text-gray-100 text-lg font-pregular mb-3 " >Latest Videos</Text>
                            <Trending posts={ [ { id: 1 }, { id: 2 }, { id: 3 } ] ?? [] } />
                        </View>
                    </View>
                ) }
                ListEmptyComponent={ () => (
                    <EmptyState title={ 'No Videos Found' } subtitle={ 'Be the first to upload a video' } />
                ) }
                refreshControl={ <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } /> }
            />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create( {} )