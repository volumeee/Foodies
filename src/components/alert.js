import { Modal, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomAlert = ({
  visible,
  onClose,
  title,
  message,
  onPressOk,
  onTouchOutside,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onTouchOutside} // Menutup modal saat area di luar modal di-klik
        className="flex-1 justify-center items-center bg-black/50"
      >
        <View className="bg-white p-5 w-80" style={{ borderRadius: 20 }}>
          <Text className="text-black font-montSB text-lg mb-2 text-center">
            {title}
          </Text>
          <Text className="text-gray-500 font-montR text-sm mb-5 text-center">
            {message}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onPressOk();
            }}
          >
            <Text className="text-blue-500 font-montSB text-lg text-center">
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default CustomAlert;
