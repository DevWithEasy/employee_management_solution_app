import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import api_endpoint from '../utils/api'
import AppSearch from '../components/AppSearch'
import AppText from '../components/AppText'
import AppButton from '../components/AppButton'

export default function Attendance() {
    const [sections, setSections] = useState([])
    const [section, setSection] = useState({})
    const [id, setId] = useState("")
    const [row, setRow] = useState()
    const [employee, setEmployee] = useState({})
    const [days, setDays] = useState([])

    const handleSubmit = () => {
        fetch(`${api_endpoint}?v=attendence&section=${section.value}&id=${id}`)
            .then(res => res.json())
            .then(data => {
                setRow(data.data.row_no)
                setEmployee(data.data.employee)
                setDays(data.data.days)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetch(`${api_endpoint}?v=sections`)
            .then(res => res.json())
            .then(data => {
                setSections(data)
            })
    }, [])
    console.log(row, days, employee)
    return (
        <ScrollView className="p-4">
            <AppSearch
                data={sections.map(section => ({ value: section.name, label: section.name }))}
                section={section}
                setSection={setSection}
                setId={setId}
                id={id}
                onSubmit={handleSubmit}
            />
            <View>
                <AppText>
                    Name : {employee.name}
                </AppText>
                <AppText>
                    Designation : {employee.designation}
                </AppText>
                <AppText>
                    Salary : {employee.salary}
                </AppText>
            </View>
            <View
                className='space-y-2'
            >
                {
                    days.map((day, i) =>
                        <View
                            key={i}
                            className='p-1 flex-row justify-center bg-white rounded'
                        >
                            <View
                                className='w-4/12 justify-center'
                            >
                                <AppText
                                    styles='text-xl'
                                >
                                    {i}
                                </AppText>
                            </View>

                            <View
                            className='w-8/12 flex-row justify-between'
                            >
                                <TouchableOpacity
                                    className={`w-10 h-10 items-center justify-center rounded-full ${day.value === '' ? 'bg-green-100' : 'bg-gray-100'}`}
                                >
                                    <Text></Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                className={`w-10 h-10 items-center justify-center rounded-full ${day.value === 'P' ? 'bg-green-100' : 'bg-gray-100'}`}
                                >
                                    <Text>P</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                className={`w-10 h-10 items-center justify-center rounded-full ${day.value === 'L' ? 'bg-green-100' : 'bg-gray-100'}`}
                                >
                                    <Text>L</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                className={`w-10 h-10 items-center justify-center rounded-full ${day.value === 'H' ? 'bg-green-100' : 'bg-gray-100'}`}
                                >
                                    <Text>H</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                className={`w-10 h-10 items-center justify-center rounded-full ${day.value === 'A' ? 'bg-green-100' : 'bg-gray-100'}`}
                                >
                                    <Text>A</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}