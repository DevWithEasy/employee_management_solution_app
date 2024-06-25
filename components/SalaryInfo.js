import { View, Text } from 'react-native'
import React from 'react'
import AppText from './AppText'
import cn from '../utils/cn'

export default function SalaryInfo({ label, value,styles }) {
    return (
        <View
            className={cn('p-2 flex-row justify-between',styles)}
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