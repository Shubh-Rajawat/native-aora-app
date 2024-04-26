import { Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ( { title, handlePress, customStyles, textStyles, isLoading } ) => {
    return (
        <TouchableOpacity activeOpacity={ 0.8 } onPress={ handlePress } disabled={ isLoading }
            className={ `bg-secondary rounded-xl min-h-[62px] justify-center items-center ${ customStyles } ${ isLoading ? 'opacity-50' : '' }` } >
            <Text className={ `text-primary font-psemibold text-lg ${ textStyles }` } >{ title }</Text>

        </TouchableOpacity>
    )
}

export default CustomButton