import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import icons from '../constants/icon';
const SearchInput = ( { title, value, placeholder, handleChangeText, otherStyles, ...props } ) => {
    const [ showPassword, setShowPassword ] = useState( false );
    return (

        <View className={ `border-2 border-black-200 w-full h-16 px-4 bg-slate-800 rounded-2xl focus:border-secondary items-center flex-row space-x-4 ` } >
            <TextInput
                className='flex-1 text-white font-pregular text-base mt-0.5 '
                value={ value }
                placeholder={ `Search for videos` }
                placeholderTextColor="#7b7b8b"
                onChangeText={ handleChangeText }

            />
            <TouchableOpacity onPress={ () => {

            } } >
                <Image source={ icons.search } resizeMode='contain' className="h-5 w-5" />
            </TouchableOpacity>
        </View>

    )
}

export default SearchInput