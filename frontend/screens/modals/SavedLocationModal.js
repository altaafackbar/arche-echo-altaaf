import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

export default function SavedLocationsModal(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>{props.name}</Text>
          <Text>Save this clinic to your Saved Locations</Text>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}


