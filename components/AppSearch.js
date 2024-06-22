import { Alert, View } from 'react-native'
import React, { useState } from 'react'
import AppButton from './AppButton'
import AppSelectModal from './AppSelectModal'
import AppInput from './AppInput'

export default function AppSearch({ data, section, setSection, id, setId, onSubmit }) {
    const [visible, setVisible] = useState(false)
    const handleSubmit = () => {
        if (!section || !id) {
            return Alert.alert('Field is required', 'Please select section and ID')
        }
        onSubmit()
    }
    
    return (
        <View
            className='p-2 border border-gray-300 rounded'
        >
            <AppButton
                title={section.label ? section.label : 'Select Section'}
                btnStyle="p-3 border border-gray-200 rounded"
                onPress={() => setVisible(true)}
            />
            <AppInput
                placeholder="B-001"
                styles="px-3 py-2 my-1 border-gray-200 rounded"
                onChangeText={(text) => setId(text)}
            />
            <AppButton
                title='Submit'
                btnStyle='p-2.5 bg-blue-500 rounded'
                textStyle='text-white text-center'
                onPress={handleSubmit}
            />
            <AppSelectModal
                data={data}
                visible={visible}
                setVisible={setVisible}
                onChange={setSection}
            />
        </View>
    )
}