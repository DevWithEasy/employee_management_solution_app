import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import api_endpoint from "../utils/api";
import AppSelectModal from "../components/AppSelectModal";
import AppButton from "../components/AppButton";
import getId from "../utils/getId";
import AppText from "../components/AppText";
import AppInput from "../components/AppInput";

export default function AddEmployee() {
    const [sections, setSections] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [visible, setVisible] = useState(false);
    const [field, setField] = useState("");
    const [section, setSection] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [nid, setNID] = useState("");
    const [joining, setJoining] = useState("");
    const [phone, setPhone] = useState("");
    const [designation, setDesignation] = useState("");
    const [quarter, setQuarter] = useState("");
    const [meal, setMeal] = useState("");
    const handleSectionChange = (item) => {
        const section = sections.find((section) => section.name === item.value);
        setSection(section);
        console.log(section);
        setId(section.code + "-" + getId(section.total));
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

    const handleSubmit=()=>{
        const url = `${api_endpoint}?v=add_employee`
    }

    useEffect(() => {
        fetch(`${api_endpoint}?v=section_designation`)
            .then((res) => res.json())
            .then((data) => {
                setSections(data.sections);
                setDesignations(data.designations);
            });
    }, []);

    return (
        <ScrollView className="p-4 bg-white">
            <View className="flex-row space-x-2">
                <AppButton
                    title={section ? section.name : "Select Section"}
                    btnStyle="w-1/2 border border-gray-200 rounded"
                    onPress={() => {
                        setField("section");
                        setVisible(true);
                    }}
                />
                <AppText styles="w-1/2 pt-1 justify-center items-center text-center bg-gray-100 text-lg rounded">
                    {id}
                </AppText>
            </View>
            <View className="py-2">
                <AppInput
                    placeholder="Name"
                    styles="p-1 my-1 border-gray-200 rounded"
                    onChangeText={(text) => setName(text)}
                />
                <AppInput
                    placeholder="Phone"
                    styles="p-1 my-1 border-gray-200 rounded"
                    onChangeText={(text) => setPhone(text)}
                />
                <AppInput
                    placeholder="NID"
                    styles="p-1 my-1 border-gray-200 rounded"
                    onChangeText={(text) => setNID(text)}
                />
                <AppInput
                    placeholder="Salary"
                    styles="p-1 my-1 border-gray-200 rounded"
                    onChangeText={(text) => setSalary(text)}
                />
                <AppButton
                    title={designation ? designation : "Select designation"}
                    btnStyle="my-1 border border-gray-200 rounded"
                    onPress={() => {
                        setField("designation");
                        setVisible(true);
                    }}
                />
                <AppButton
                    title={quarter ? quarter : "Select Quarter service"}
                    btnStyle="my-1 border border-gray-200 rounded"
                    onPress={() => {
                        setField("quarter");
                        setVisible(true);
                    }}
                />
                <AppButton
                    title={meal ? meal : "Select Meal service"}
                    btnStyle="my-1 border border-gray-200 rounded"
                    onPress={() => {
                        setField("meal");
                        setVisible(true);
                    }}
                />
                <AppButton
                    title="Submit"
                    btnStyle="my-1 bg-blue-500 rounded-full"
                    textStyle="text-white text-center"
                    onPress={() => { }}
                />
            </View>
            <AppSelectModal
                data={data}
                visible={visible}
                setVisible={setVisible}
                onChange={handleFieldChange}
            />
        </ScrollView>
    );
}
