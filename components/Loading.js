import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading({ text, visible, setVisible }) {
    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible()}
            animationType="fade"
            statusBarTranslucent
            transparent={true}
        >
            <View
                className='flex-1 justify-center items-center bg-gray-500/50'
            >
                <View
                    className='p-4 flex-row space-x-2 bg-white rounded'
                >
                    <ActivityIndicator />
                    <Text>{text ? text : 'Connecting server'}</Text>
                </View>
            </View>
        </Modal>
    )
}