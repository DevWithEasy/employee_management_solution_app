import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import AppText from "./AppText";

export default function AppSelectModal({
  data,
  visible,
  setVisible,
  onChange,
}) {

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="fade"
    >
      <View
        className='flex-1 justify-center items-center bg-gray-500/50'
      >
        <View
          className='w-11/12 h-[350px] mx-auto bg-white rounded overflow-y-auto'
        >
          <ScrollView>
            {
              data.map((item, index) =>
                <TouchableOpacity
                  key={index}
                  className='p-4 border-b border-gray-200'
                  onPress={() => {
                    onChange(item);
                    setVisible(false);
                  }}
                >
                  <AppText>{item.label}</AppText>
                </TouchableOpacity>
              )
            }
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
