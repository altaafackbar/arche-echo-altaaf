import React, { Component } from 'react';
import { TextInput, StyleSheet, SafeAreaView, Text, View } from 'react-native';

export default function CustomInput({value, setValue, placeholder, secureTextEntry, label}) {

  return (
    <View style={styles.container}> 
    
    <TextInput
      style={styles.input}
      onChangeText={setValue}
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      label={label}
    />
    
    </View>
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
    marginVertical: 30,
    paddingVertical: 10,
  },
    input: {
      
    }

})