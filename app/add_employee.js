import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import api_endpoint from '../utils/api'

export default function AddEmployee() {
    const [sections, setSections] = useState([])
    const [designations, setDesignations] = useState([])
    const [id, setId] = useState('')
    useEffect(()=>{
        fetch(`${api_endpoint}?v=section_designation`)
        .then(res=>res.json())
        .then(data=>{
            setSections(data.sections)
            setDesignations(data.designations)
        })
    },[])
    console.log(sections,designations)
    return (
        <View>
            <Text>AddEmployee</Text>
        </View>
    )
}