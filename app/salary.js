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
import getFixedNumber from '../utils/getFixedNumber'

export default function SalaryCheck() {
  const { loading, setLoading } = useAppStore()
  const [sections, setSections] = useState([])
  const [section, setSection] = useState({})
  const [employee, setEmployee] = useState({})
  const [id, setId] = useState("")
  const handleSubmit = () => {
    setLoading()
    fetch(`${api_endpoint}?v=salary_check&section=${section.value}&id=${id}`)
      .then(res => res.json())
      .then(data => {
        setSection({ label: data.data.section, value: data.data.section })
        setEmployee(data.data)
        setLoading()
      })
      .catch(err => {
        console.log(err)
        setLoading()
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
          <AppText
            className='p-1 text-center bg-green-100 rounded'
          >
            {getFixedNumber(employee.payble_salary)}
            </AppText>
          <View
            className='border border-gray-300 rounded'
          >
            <SalaryInfo
              label='Name'
              value={employee.name}
            />
            <SalaryInfo
              label='Salary'
              value={getFixedNumber(employee.salary)}
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
              value={getFixedNumber(employee.work_salary)}
            />
            <SalaryInfo
              label='Overtime'
              value={getFixedNumber(employee.overtime)}
            />
            <SalaryInfo
              label='Attendance Bonous'
              value={getFixedNumber(employee.attendence_bonous)}
            />
            <SalaryInfo
              label='Total Salary'
              value={getFixedNumber(employee.total_salary)}
              styles='border-t border-gray-300'
            />
          </View>

          {/* cost */}
          <View
            className='border border-gray-300 rounded'
          >
            <SalaryInfo
              label='Advance Salary'
              value={getFixedNumber(employee.advance_salary)}
            />
            <SalaryInfo
              label='Meal Bill'
              value={getFixedNumber(employee.meal_bill)}
            />
            <SalaryInfo
              label='Quarter Rent'
              value={getFixedNumber(employee.quarter_rent)}
            />
            <SalaryInfo
              label='Another Charge'
              value={getFixedNumber(employee.another_charge)}
            />
              <SalaryInfo
              label='Total Charge'
              value={Number(getFixedNumber(employee.another_charge))+Number(getFixedNumber(employee.advance_salary))+Number(getFixedNumber(employee.meal_bill))+Number(getFixedNumber(employee.quarter_rent))+Number(getFixedNumber(employee.another_charge))}
              styles='border-t border-gray-300'
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