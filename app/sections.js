import { View, ScrollView,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import api_endpoint from '../utils/api'
import ImageBackgroundScreen from '../components/ImageBackgroundScreen'
import AppText from '../components/AppText'
import useAppStore from '../store/useStore'
import Loading from '../components/Loading'

export default function Sections() {
    const {loading,setLoading} = useAppStore()
    const [sections, setSections] = useState([])
    useEffect(() => {
        setLoading()
        fetch(`${api_endpoint}?v=sections`)
            .then(res => res.json())
            .then(data => {
                setLoading()
                setSections(data)
            })
            .catch((error)=>{
                setLoading()
            })
    }, [])
    
    return (
        <ImageBackgroundScreen>
            <ScrollView
                className='py-2 space-y-3'
            >
                <View
                    className='mx-1 p-2 space-y-1 bg-white/70 rounded'
                >
                    <AppText
                        styles='font-bold'
                    >
                        Total Section - {sections.length}
                    </AppText>
                    <AppText
                        styles=''
                    >
                        Total Manpower - { sections.reduce((sum, item) => sum + item.total, 0)}
                    </AppText>
                </View>
                <View
                    className='pb-5 flex-row flex-wrap'
                >
                    {
                        sections.map(section => (
                            <TouchableOpacity
                                key={section.id}
                                className='w-1/2 p-1'
                            >
                                <View
                                className='p-4 bg-white/50 justify-center items-center space-y-3 rounded'
                                >
                                    <AppText
                                        styles='text-xl text-red-500'
                                    >
                                        {section.total}
                                        </AppText>
                                    <AppText>
                                        {section.name}
                                        </AppText>
                                        <AppText
                                            className='absolute -top-2 left-0.5 w-10  bg-green-500 text-white text-center rounded'
                                        >
                                        {section.code}
                                        </AppText>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <Loading
                    visible={loading}
                    setVisible={setLoading}
                />
            </ScrollView>
        </ImageBackgroundScreen>
    )
}