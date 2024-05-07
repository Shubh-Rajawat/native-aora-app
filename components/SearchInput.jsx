import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import icons from '../constants/icon';
import { router, usePathname } from 'expo-router';
const SearchInput = ( { initialQuery } ) => {
    const pathname = usePathname();
    const [ query, setQuery ] = useState( initialQuery || '' );
    return (

        <View className={ `border-2 border-black-200 w-full h-16 px-4 bg-slate-800 rounded-2xl focus:border-secondary items-center flex-row space-x-4 ` } >
            <TextInput
                className='flex-1 text-white font-pregular text-base mt-0.5 '
                value={ query }
                placeholder={ `Search for videos` }
                placeholderTextColor="#CDCDE0"
                onChangeText={ ( e ) => setQuery( e ) }

            />
            <TouchableOpacity onPress={ () => {
                if ( !query ) {
                    return Alert.alert( '', 'Search box is empty' )
                }
                if ( pathname.startsWith( '/search' ) ) {
                    router.setParams( { query } )
                } else {
                    router.push( `/search/${ query }` )
                }
            } } >
                <Image source={ icons.search } resizeMode='contain' className="h-5 w-5" />
            </TouchableOpacity>
        </View>

    )
}

export default SearchInput