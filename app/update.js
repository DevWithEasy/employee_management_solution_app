import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import api_endpoint from '../utils/api'
import ImageBackgroundScreen from '../components/ImageBackgroundScreen'
import AppSearch from '../components/AppSearch'

export default function Update() {
  const [sections, setSections] = useState([])
  const [section, setSection] = useState({})
  const [id, setId] = useState("")
  const handleSubmit = () => {
    fetch(`${api_endpoint}?v=attendence&section=${section.value}&id=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <ImageBackgroundScreen>
      <ScrollView
        className='p-2'
      >
        <AppSearch
          data={sections.map(section => ({ value: section.name, label: section.name }))}
          section={section}
          setSection={setSection}
          setId={setId}
          id={id}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </ImageBackgroundScreen>
  )
}