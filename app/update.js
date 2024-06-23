import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import api_endpoint from '../utils/api'
import ImageBackgroundScreen from '../components/ImageBackgroundScreen'
import AppSearch from '../components/AppSearch'
import useAppStore from '../store/useStore'
import Loading from '../components/Loading'

export default function Update() {
  const { loading, setLoading } = useAppStore()
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
        <AppSearch
          data={sections.map(section => ({ value: section.name, label: section.name }))}
          section={section}
          setSection={setSection}
          setId={setId}
          id={id}
          onSubmit={handleSubmit}
        />
        <Loading
          visible={loading}
          setVisible={setLoading}
        />
      </ScrollView>
    </ImageBackgroundScreen>
  )
}