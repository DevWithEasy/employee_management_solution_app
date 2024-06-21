import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import AppButton from '../components/AppButton'
import AppInput from '../components/AppInput'
import AppSelectModal from '../components/AppSelectModal'
import api_endpoint from '../utils/api'
import AppSearch from '../components/AppSearch'

export default function Attendance() {
    const [sections, setSections] = useState([])
    const [section, setSection] = useState('')
    const [id, setId] = useState("")
    const [employee, setEmployee] = useState({})
    const handleChange = (item) => {
        setSection(item)
    }
    useEffect(() => {
        fetch(`${api_endpoint}?v=sections`)
            .then(res => res.json())
            .then(data => {
                setSections(data)
            })
    }, [])
    console.log(section)
    return (
        <ScrollView className="p-4 bg-white">
            <AppSearch
                data={sections.map(section => ({ value: section.name, label: section.name }))}
                section={section}
                setSection={setSection}
                setId={setId}
            />
            <View>

            </View>
        </ScrollView>
    )
}