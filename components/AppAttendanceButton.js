import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function AppAttendanceButton({text,day,onChange}) {
    return (
        <TouchableOpacity
            onPress={()=>onChange(day,text)}
            className={`w-10 h-10 items-center justify-center rounded-full ${day.value === text ? 'bg-green-100' : 'bg-gray-100'}`}
        >
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}