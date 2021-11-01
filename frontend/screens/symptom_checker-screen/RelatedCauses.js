import React from "react";
import { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList, Image, Picker } from "react-native";;
import TouchableScale from 'react-native-touchable-scale';
import { ListItem } from 'react-native-elements';
import symptoms from './symptoms.json'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from "lodash"
import { useNavigation } from '@react-navigation/native';

export default function RelatedCauses({ route }) {

    const [causes, setCauses] = useState(route.params.relatedCauses)

    return (
        <SafeAreaView>
            <View style={styles.titles}>
                <Text style={styles.headerTitle}>Related Causes</Text>
                <Text style={styles.subTitle}>Find possible causes below</Text>
                <FlatList
                
                data={causes}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => 
                <ListItem 
                    containerStyle={{backgroundColor: "#E7ECF2"}}
                    bottomDivider
                    Component={TouchableScale}
                    friction={90}
                    tension={100}
                    activeScale={0.95}
                >
                    <ListItem.Content>
                        <ListItem.Title h3>{item.name}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron color="black" solid/>
                </ListItem>
                }
            />
            </View>

        </SafeAreaView>
        


    );
  }
  
  const styles = StyleSheet.create({
    safeview:{
        flex: 1,  
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        
    },
    container: {
        backgroundColor: '#fff',
    },
    titles: {
        marginTop: '10%',
        width: '100%',
        textAlign: 'center'
    },
    headerTitle: {
        fontSize: 24,
        color: '#1f1f1f',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 16,
        color: '#919191',
        textAlign: 'center',
        padding: 10,
    },

  });
