import { View, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import api_endpoint from '../utils/api'
import ImageBackgroundScreen from '../components/ImageBackgroundScreen'
import useAppStore from '../store/useStore'
import Loading from '../components/Loading'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import AppSelectModal from '../components/AppSelectModal'

export default function Update() {
    const { loading, setLoading } = useAppStore()
    const [visible, setVisible] = useState(false)
    const [toVisible, setToVisible] = useState(false)
    const [sections, setSections] = useState([])
    const [from, setForm] = useState({})
    const [to, setTo] = useState({})
    const [id, setId] = useState("")
    const handleSubmit = () => {
        if (!from.value || !to.value || !id) {
            return Alert.alert('Field Required', 'Please select From or To section and ID')
        } else {
            Alert.alert(
                'Confirm Action',
                'Are you sure you want to proceed?ID not change But Section will be changed',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Confirm', onPress: () => {
                            fetch(`${api_endpoint}?v=transfer&from=${from.value}&to=${to.value}&id=${id}`)
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    },
                ],
                { cancelable: false }
            );
        }
    }
    useEffect(() => {
        setLoading()
        fetch(`${api_endpoint}?v=sections`)
            .then(res => res.json())
            .then(data => {
                setLoading()
                setSections(data)
            })
            .catch((error) => {
                setLoading()
            })
    }, [])
    return (
        <ImageBackgroundScreen>
            <ScrollView
                className='p-2'
            >
                <View
                    className='p-2 bg-white/70 border border-gray-200 rounded'
                >
                    <AppButton
                        title={from.label ? from.label : 'From'}
                        btnStyle="p-3 border border-gray-200 rounded"
                        onPress={() => setVisible(true)}
                    />
                    <AppButton
                        title={to.label ? to.label : 'To'}
                        btnStyle="p-3 my-1 border border-gray-200 rounded"
                        onPress={() => setToVisible(true)}
                    />
                    <AppInput
                        placeholder="B-001"
                        styles="px-3 py-2 mb-1 border-gray-200 rounded"
                        onChangeText={(text) => setId(text)}
                    />
                    <AppButton
                        title='Submit'
                        btnStyle='p-2.5 bg-blue-500 rounded'
                        textStyle='text-white text-center'
                        onPress={handleSubmit}
                    />
                    <AppSelectModal
                        data={sections.map(section => ({ value: section.name, label: section.name }))}
                        visible={visible}
                        setVisible={setVisible}
                        onChange={setForm}
                    />
                    <AppSelectModal
                        data={sections.map(section => ({ value: section.name, label: section.name }))}
                        visible={toVisible}
                        setVisible={setToVisible}
                        onChange={setTo}
                    />
                </View>
                <Loading
                    visible={loading}
                    setVisible={setLoading}
                />
            </ScrollView>
        </ImageBackgroundScreen>
    )
}