import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='sections'
                options={{
                    title: 'Sections'
                }}
            />
            <Stack.Screen
                name='add_employee'
                options={{
                    title: 'New Employee'
                }}
            />
            <Stack.Screen
                name='section/[name]'
                options={{
                    title: 'Section Manpower'
                }}
            />
            <Stack.Screen
                name='salary'
                options={{
                    title: 'Salary Check'
                }}
            />
            <Stack.Screen
                name='attendance'
                options={{
                    title: 'Attendance Taker',
                    headerBlurEffect : true
                }}
            />
        </Stack>
    )
}