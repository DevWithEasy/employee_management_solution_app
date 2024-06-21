import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AppButton from './AppButton'
import AppSelectModal from './AppSelectModal'
import AppInput from './AppInput'

export default function AppSearch({data,section,setSection,setId }) {
    const [visible, setVisible] = useState(false)
    return (
        <View
            className='p-2 border border-gray-300 rounded'
        >
            <AppButton
                title={section.label ? section.label : 'Select Section'}
                btnStyle="border border-gray-200 rounded"
                onPress={() => setVisible(true)}
            />
            <AppInput
                placeholder="B-001"
                styles="px-2 py-1 my-1 border-gray-200 rounded"
                onChangeText={(text) => setId(text)}
            />
            <AppButton
                title='Submit'
                btnStyle='p-2 bg-blue-500 rounded'
                textStyle='text-white text-center'
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