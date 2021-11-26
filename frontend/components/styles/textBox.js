import React, { Component } from 'react';
import { useState } from 'react';
import { TextInput, StyleSheet, SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Creating a custom input component
export default function CustomInput({value, setValue, placeholder, secureTextEntry}) {

  // const [hidePass, setHidePass] = useState('')

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}> 
    <TextInput
      selectionColor={'#1f1f1f'}
      style={styles.input}
      onChangeText={setValue}
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
    {/* <Icon
    name={hidePass ? 'eye-off' : 'eye'}
    size={15}
    color="grey"
    onPress={() => setHidePass(!hidePass)}
    ></Icon> */}
    
    
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({

  container: {
    width: '90%',
    backgroundColor: 'transparent',
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    paddingVertical: 10,
  },
    input: {
      
    }

})