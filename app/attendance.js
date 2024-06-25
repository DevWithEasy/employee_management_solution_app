import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import AppAttendanceButton from '../components/AppAttendanceButton'
import AppSearch from '../components/AppSearch'
import AppText from '../components/AppText'
import ImageBackgroundScreen from '../components/ImageBackgroundScreen'
import Loading from '../components/Loading'
import useAppStore from '../store/useStore'
import api_endpoint from '../utils/api'

export default function Attendance() {
    const {loading,setLoading} = useAppStore()
    const [sections, setSections] = useState([])
    const [section, setSection] = useState({})
    const [id, setId] = useState("")
    const [row, setRow] = useState()
    const [employee, setEmployee] = useState({})
    const [days, setDays] = useState([])

    const handleSubmit = () => {
        setLoading()
        fetch(`${api_endpoint}?v=attendence&section=${section.value}&id=${id}`)
            .then(res => res.json())
            .then(data => {
                const {row,section,info,days} = data.data
                setSection({label : section, value : section})
                setRow(row)
                setEmployee(info)
                setDays(days)
                setLoading()
            })
            .catch(err => {
                console.log(err)
                setLoading()
            })
    }

    const handleUpdateAttendence = (day, value) => {
        setLoading()
        fetch(`${api_endpoint}?v=update_attendence&section=${section.value}&row=${row}&col=${day.column}&value=${value}`)
            .then(res => res.json())
            .then(data => {
                setDays(days.map(day => day.column === Number(data.data.col) ? { ...day, value: data.data.value } : day))
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
                setSections(data)
                setLoading()
            })
    }, [])
    console.log(days)
    return (
        <ImageBackgroundScreen>
            <ScrollView className="p-2">
                <AppSearch
                    data={sections.map(section => ({ value: section.name, label: section.name }))}
                    section={section}
                    setSection={setSection}
                    setId={setId}
                    id={id}
                    onSubmit={handleSubmit}
                />
                {
                    row &&
                    <>
                        <View
                            className='my-2 p-2 bg-white/50 rounded'
                        >
                            <AppText>
                                Name : {employee.name}
                            </AppText>
                            <AppText>
                                Designation : {employee.designation}
                            </AppText>
                            <AppText>
                                Section : {section.label}
                            </AppText>
                            <AppText>
                                ID : {id}
                            </AppText>
                        </View>
                        <View
                            className='p-2 pb-5 bg-white/50 space-y-2 rounded'
                        >
                            {
                                days.map((day, i) =>
                                    <View
                                        key={i}
                                        className='p-1 flex-row justify-center bg-white/80 rounded'
                                    >
                                        <View
                                            className='w-4/12 justify-center items-center'
                                        >
                                            <AppText
                                                styles='text-lg'
                                            >
                                                {i + 1}
                                            </AppText>
                                        </View>

                                        <View
                                            className='w-8/12 flex-row justify-between'
                                        >
                                            {
                                                ['', 'P', 'L', 'H', 'A']
                                                    .map((text, i) =>
                                                        <AppAttendanceButton
                                                            key={i}
                                                            text={text}
                                                            day={day}
                                                            onChange={handleUpdateAttendence}
                                                        />
                                                    )
                                            }
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    </>
                }

                <Loading
                    visible={loading}
                    setVisible={setLoading}
                />
            </ScrollView>
        </ImageBackgroundScreen>
    )
}