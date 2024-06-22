import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import api_endpoint from '../utils/api'
import AppSearch from '../components/AppSearch'
import ImageBackgroundScreen from '../components/ImageBackgroundScreen'

export default function SalaryCheck() {
  const [sections, setSections] = useState([])
  const [section, setSection] = useState('')
  const [id, setId] = useState("")

  useEffect(() => {
    fetch(`${api_endpoint}?v=sections`)
      .then(res => res.json())
      .then(data => {
        setSections(data)
      })
  }, [])
  return (
    <ImageBackgroundScreen>
      <ScrollView className="p-2">
        <AppSearch
          data={sections.map(section => ({ value: section.name, label: section.name }))}
          section={section}
          setSection={setSection}
          id={id}
          setId={setId}
        />
        <View>

        </View>
      </ScrollView>
    </ImageBackgroundScreen>
  )
}