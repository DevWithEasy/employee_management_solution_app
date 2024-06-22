import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import api_endpoint from "../utils/api";
import AppSelectModal from "../components/AppSelectModal";
import AppButton from "../components/AppButton";
import getId from "../utils/getId";
import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import getDate from "../utils/getDate";
import ImageBackgroundScreen from "../components/ImageBackgroundScreen";
import useAppStore from "../store/useStore";
import Loading from "../components/Loading";

export default function AddEmployee() {
    const {loading,setLoading} = useAppStore()
    const [sections, setSections] = useState([])
    const [designations, setDesignations] = useState([])
    const [visible, setVisible] = useState(false)
    const [dateVisible, setDateVisible] = useState(false)
    const [field, setField] = useState("")
    const [section, setSection] = useState("")
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [salary, setSalary] = useState("")
    const [nid, setNID] = useState("")
    const [joining, setJoining] = useState(new Date())
    const [phone, setPhone] = useState("")
    const [designation, setDesignation] = useState("")
    const [quarter, setQuarter] = useState("")
    const [meal, setMeal] = useState("")
    const handleSectionChange = (item) => {
        const section = sections.find((section) => section.name === item.value);
        setSection(section)
        console.log(section)
        setId(section.code + "-" + getId(section.total))
    };

    const data =
        field === "section"
            ? sections.map((section) => ({
                label: section.name,
                value: section.name,
            }))
            : field === "designation"
                ? designations.map((designation) => ({
                    label: designation.name,
                    value: designation.name,
                }))
                : field === "quarter" || field === "meal"
                    ? [
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                    ]
                    : [];

    const handleFieldChange = (item) => {
        field === "section"
            ? handleSectionChange(item)
            : field === "designation"
                ? setDesignation(item.value)
                : field === "quarter"
                    ? setQuarter(item.value)
                    : setMeal(item.value);
    };

    const handleSubmit = () => {
        const url = `${api_endpoint}?v=add_employee&section=${section.name}&section_row=${section.row}&section_col=${section.col}&id=${id}&name=${name}&joining_date=${getDate(joining)}&designation=${designation}&mobile=${phone}&nid=${nid}&salary=${salary}&quarter=${quarter}&meal=${meal}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setSections(sections.map(s => s.code === section.code ? {...s, total : s.total + 1} : s))
                setSection('')
                setId('')
                setName('')
                setPhone('')
                setNID('')
                setSalary('')
                setDesignation('')
                setQuarter('')
                setMeal('')
                setJoining(new Date())
            })
            .catch(err => console.error(err))
    }
    const onChange = (event, date) => {
        if (event.type === 'set') {
            setDateVisible(false)
            setJoining(date)
        } else {
            setDateVisible(false)
        }
    };

    useEffect(() => {
        setLoading()
        fetch(`${api_endpoint}?v=section_designation`)
            .then((res) => res.json())
            .then((data) => {
                setSections(data.sections);
                setDesignations(data.designations);
                setLoading()
            })
            .catch(err=>{
                console.log(err)
                setLoading()
            })
    }, []);

    return (
        <ImageBackgroundScreen>
            <ScrollView className="p-2">
            <View className="flex-row space-x-2">
                <AppButton
                    title={section ? section.name : "Select Section"}
                    btnStyle="w-1/2 py-3 bg-white/80 border border-gray-200 rounded"
                    onPress={() => {
                        setField("section");
                        setVisible(true);
                    }}
                />
                <AppText styles="w-1/2 pt-2 justify-center items-center text-center bg-white/80 text-lg rounded">
                    {id}
                </AppText>
            </View>
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
                    value={nid}
                    placeholder="NID"
                    styles="p-2 my-1 bg-white/80 border-gray-200 rounded"
                    onChangeText={(text) => setNID(text)}
                />
                <AppInput
                    value={salary}
                    placeholder="Salary"
                    styles="p-2 my-1 bg-white/80 border-gray-200 rounded"
                    onChangeText={(text) => setSalary(text)}
                />
                <AppButton
                    title={designation ? designation : "Select designation"}
                    btnStyle="my-1 py-3 bg-white/80 border border-gray-200 rounded"
                    onPress={() => {
                        setField("designation");
                        setVisible(true);
                    }}
                />
                <AppButton
                    title={quarter ? quarter : "Select Quarter service"}
                    btnStyle="my-1 py-3 bg-white/80 border border-gray-200 rounded"
                    onPress={() => {
                        setField("quarter");
                        setVisible(true);
                    }}
                />
                <AppButton
                    title={meal ? meal : "Select Meal service"}
                    btnStyle="my-1 py-3 bg-white/80 border border-gray-200 rounded"
                    onPress={() => {
                        setField("meal");
                        setVisible(true);
                    }}
                />
                <AppButton
                    title={joining ? getDate(joining) : 'Joining date'}
                    btnStyle="my-1 py-3 bg-white/80 border border-gray-200 rounded"
                    onPress={() => setDateVisible(true)}
                />

                <AppButton
                    title="Submit"
                    btnStyle="my-1 py-3 bg-blue-500 rounded-full"
                    textStyle="text-white text-center"
                    onPress={handleSubmit}
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
            <Loading
                visible={loading}
                setVisible={setLoading}
            />
        </ScrollView>
        </ImageBackgroundScreen>
    );
}
