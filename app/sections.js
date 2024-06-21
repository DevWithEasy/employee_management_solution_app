import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import api_endpoint from '../utils/api'

export default function Sections() {
    const [sections,setSections] = useState([])
    useEffect(()=>{
        fetch(`${api_endpoint}?v=sections`)
        .then(res=>res.json())
        .then(data=>{
            setSections(data)
        })
    },[])
    return (
        <View>
            <Text>sections</Text>
        </View>
    )
}