import { View, Text } from 'react-native'
import React from 'react'
import AppText from './AppText'

export default function SalaryInfo({ label, value }) {
    return (
        <View
            className='p-2 flex-row justify-between'
        >
            <AppText
                className='w-1/2'
            >
                {label}
            </AppText>
            <AppText
                className='w-1/2'
            >
                {value}
            </AppText>
        </View>
    )
}