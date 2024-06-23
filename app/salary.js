import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import api_endpoint from '../utils/api'
import AppSearch from '../components/AppSearch'
import ImageBackgroundScreen from '../components/ImageBackgroundScreen'
import useAppStore from '../store/useStore'
import Loading from '../components/Loading'
import AppText from '../components/AppText'
import convertToArray from '../utils/convertToArray'
import SalaryInfo from '../components/SalaryInfo'

export default function SalaryCheck() {
  const { loading, setLoading } = useAppStore()
  const [sections, setSections] = useState([])
  const [section, setSection] = useState({})
  const [employee, setEmployee] = useState({})
  const [id, setId] = useState("")
  const handleSubmit = () => {
    fetch(`${api_endpoint}?v=salary_check&section=${section.value}&id=${id}`)
      .then(res => res.json())
      .then(data => {
        setSection({ label: data.data.section, value: data.data.section })
        setEmployee(data.data)
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
      <ScrollView className="p-2">
        <AppSearch
          data={sections.map(section => ({ value: section.name, label: section.name }))}
          section={section}
          setSection={setSection}
          id={id}
          setId={setId}
          onSubmit={handleSubmit}
        />
        <View
          className='mt-3 mb-10 space-y-2 p-1 bg-white/50 rounded'
        >
          <AppText>{employee.payble_salary}</AppText>
          <View
            className='border border-gray-300 rounded'
          >
          <SalaryInfo
            label='Name'
            value={employee.name}
          />
          <SalaryInfo
            label='Salary'
            value={employee.salary}
          />
          </View>

          {/* days */}
          <View
            className='border border-gray-300 rounded'
          >
          <SalaryInfo
            label='Working Days'
            value={employee.working_day}
          />
          <SalaryInfo
            label='Present'
            value={employee.present}
          />
          <SalaryInfo
            label='Leave'
            value={employee.leave}
          />
          <SalaryInfo
            label='Absent'
            value={employee.absent}
          />
          <SalaryInfo
            label='Holiday'
            value={employee.holiday}
          />
          </View>

          {/* salary */}
          <View
            className='border border-gray-300 rounded'
          >
                      <SalaryInfo
            label='Work Salary'
            value={employee.work_salary}
          />
          <SalaryInfo
            label='Overtime'
            value={employee.overtime}
          />
          <SalaryInfo
            label='Attendance Bonous'
            value={employee.attendence_bonous}
          />
          <SalaryInfo
            label='Total Salary'
            value={employee.total_salary}
          />
          </View>

          {/* cost */}
          <View
            className='border border-gray-300 rounded'
          >
                      <SalaryInfo
            label='Advance Salary'
            value={employee.advance_salary}
          />
          <SalaryInfo
            label='Meal Bill'
            value={employee.meal_bill}
          />
          <SalaryInfo
            label='Quarter Rent'
            value={employee.quarter_rent}
          />
          <SalaryInfo
            label='Another Charge'
            value={employee.another_charge}
          />
          </View>

        </View>
        <Loading
          visible={loading}
          setVisible={setLoading}
        />
      </ScrollView>
    </ImageBackgroundScreen>
  )
}