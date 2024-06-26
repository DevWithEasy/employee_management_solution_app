import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import api_endpoint from '../utils/api'
import ImageBackgroundScreen from '../components/ImageBackgroundScreen'
import AppSearch from '../components/AppSearch'
import useAppStore from '../store/useStore'
import Loading from '../components/Loading'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import getDate from '../utils/getDate'
import AppSelectModal from '../components/AppSelectModal'

export default function Update() {
  const { loading, setLoading } = useAppStore()
  const [sections, setSections] = useState([])
  const [designations, setDesignations] = useState([])
  const [visible, setVisible] = useState(false)
  const [dateVisible, setDateVisible] = useState(false)
  const [field, setField] = useState("")
  const [section, setSection] = useState({})
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [salary, setSalary] = useState()
  const [nid, setNID] = useState("")
  const [joining, setJoining] = useState(new Date())
  const [phone, setPhone] = useState("")
  const [designation, setDesignation] = useState("")
  const [quarter, setQuarter] = useState("")
  const [meal, setMeal] = useState("")
  const [status, setStatus] = useState("")

  const data =
    field === "designation"
      ? designations.map((designation) => ({
        label: designation.name,
        value: designation.name,
      }))
      : field === "quarter" || field === "meal" || field === "status" 
        ? [
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]
        : [];

  const handleFieldChange = (item) => {
    field === "designation"
      ? setDesignation(item.value)
      : field === "quarter"
        ? setQuarter(item.value) : field === "status" ? setStatus(item.value)
        : setMeal(item.value);
  };

  const handleUpdateSubmit = () => {
    setLoading()
    const url = `${api_endpoint}?v=update_employee&section=${section.value}&id=${id}&name=${name}&joining_date=${getDate(joining)}&designation=${designation}&mobile=${phone}&nid=${nid}&salary=${salary}&quarter=${quarter}&meal=${meal}&status=${status}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setLoading()
        if(data.success){
          return Alert.alert('Successfully Updated.','Employee Successfully Updated')
        }else{
          return Alert.alert('Failed.','Employee failed to updated')
        }
      })
      .catch(err => {
        console.log(err)
        setLoading()
      })
  }

  const onChange = (event, date) => {
    if (event.type === 'set') {
      setDateVisible(false)
      setJoining(date)
      console.log(date)
    } else {
      setDateVisible(false)
    }
  }

  const handleSubmit = () => {
    setLoading()
    fetch(`${api_endpoint}?v=salary_check&section=${section.value}&id=${id}`)
      .then(res => res.json())
      .then(data => {
        setSection({ label: data.section, value: data.section })
        setName(data.info.name)
        setPhone(data.info.phone)
        setNID(data.info.nid)
        setSalary(data.info.salary)
        setDesignation(data.info.designation)
        setQuarter(data.info.quarter)
        setMeal(data.info.meal_service)
        setJoining(new Date(data.info.joining_date))
        setStatus(data.info.status)
        setLoading()
      })
      .catch(err => {
        console.log(err)
        setLoading()
      })
  }

  useEffect(() => {
    setLoading()
    fetch(`${api_endpoint}?v=section_designation`)
      .then((res) => res.json())
      .then((data) => {
        setSections(data.sections);
        setDesignations(data.designations);
        setLoading()
      })
      .catch(err => {
        console.log(err)
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
        {name &&
          <View
            className='pb-10'
          >
            <View className="py-2">
              <AppInput
                value={name}
                placeholder="Name"
                styles="p-2 my-1 bg-white/80 border-gray-200 rounded"
                onChangeText={(text) => setName(text)}
              />
              <AppInput
                value={phone}
                placeholder="Phone"
                styles="p-2 my-1 bg-white/80 border-gray-200 rounded"
                onChangeText={(text) => setPhone(text)}
              />
              <AppInput
                value={String(nid)}
                placeholder="NID"
                styles="p-2 my-1 bg-white/80 border-gray-200 rounded"
                onChangeText={(text) => setNID(text)}
              />
              <AppInput
                value={String(salary)}
                placeholder="Salary"
                styles="p-2 my-1 bg-white/80 border-gray-200 rounded"
                onChangeText={(text) => setSalary(text)}
              />
              <AppButton
                title={designation ? designation : ""}
                btnStyle="my-1 py-3 bg-white/80 border border-gray-200 rounded"
                onPress={() => {
                  setField("designation");
                  setVisible(true);
                }}
              />
              <AppButton
                title={quarter ? quarter : ""}
                btnStyle="my-1 py-3 bg-white/80 border border-gray-200 rounded"
                onPress={() => {
                  setField("quarter");
                  setVisible(true);
                }}
              />
              <AppButton
                title={meal ? meal : ""}
                btnStyle="my-1 py-3 bg-white/80 border border-gray-200 rounded"
                onPress={() => {
                  setField("meal");
                  setVisible(true);
                }}
              />
              <AppButton
                title={status ? status : ""}
                btnStyle="my-1 py-3 bg-white/80 border border-gray-200 rounded"
                onPress={() => {
                  setField("status");
                  setVisible(true);
                }}
              />
              <AppButton
                title={joining ? getDate(joining) : ''}
                btnStyle="my-1 py-3 bg-white/80 border border-gray-200 rounded"
                onPress={() => setDateVisible(true)}
              />

              <AppButton
                title="Submit"
                btnStyle="my-1 py-3 bg-blue-500 rounded-full"
                textStyle="text-white text-center"
                onPress={handleUpdateSubmit}
              />
            </View>
            {dateVisible &&
              <RNDateTimePicker
                value={joining}
                onChange={onChange}
              />}
            <AppSelectModal
              data={data}
              visible={visible}
              setVisible={setVisible}
              onChange={handleFieldChange}
            />
          </View>
        }
        <Loading
          visible={loading}
          setVisible={setLoading}
        />
      </ScrollView>
    </ImageBackgroundScreen>
  )
}