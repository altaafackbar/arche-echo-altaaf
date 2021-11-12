import React, { useState, useEffect } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { ListItem, Button, FAB } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../../Firebase";
import TouchableScale from 'react-native-touchable-scale';


function EditToolsAdmin() {
    const [tools, setTools] = useState([])
    const navigation = useNavigation()

    navigateToAddToolModal = () => navigation.navigate('AddToolModal')
    navigationToUpdateTools = () => navigation.navigate('UpdateToolsAdmin')

    useEffect(() => {
        const subscriber = firebase.firestore().collection('tools')
            .onSnapshot(querySnapshot => {
                const tools = []
                querySnapshot.forEach(documentSnapshot => {
                    // console.log(documentSnapshot.data())
                    tools.push({...documentSnapshot.data()})
                })
                setTools(tools)
            })
        return () => {subscriber()}
    }, [])

    const handleDeleteTool = (item) =>{
        console.log(item.name)
        firebase.firestore().collection('tools').doc(item.name).delete().then(() => {
            console.log("Document successfully deleted!")
        }).catch((error) => {
            console.log(error.message)
        })
    }

    const deleteAlert = (item) => {
        // console.log(item.name)
        Alert.alert('Warning', 'Please confirm to delete tool '+ item.name, [{text: 'Cancel', style: 'cancel'}, {text: 'Delete', onPress: () => handleDeleteTool(item)}])
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text>Hello World</Text> */}
            <FlatList
                data={tools}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => 
                    <ListItem.Swipeable
                        bottomDivider
                        Component={TouchableScale}
                        firction={90}
                        tension={100}
                        activeScale={0.95}
                        onPress={() => {navigationToUpdateTools()}}
                        leftContent={
                            <Button
                                title="edit"
                                icon={{ name: 'info', color: 'white' }}
                                buttonStyle={{minHeight: '100%'}}
                            />
                        }
                        rightContent={
                            <Button
                                title='delete'
                                icon={{ name: 'delete', color: 'white' }}
                                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                onPress={deleteAlert.bind(this, item)}
                            />
                        }
                    >
                        <ListItem.Content>
                            <ListItem.Title h4>{item.name}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem.Swipeable>
                }
            />
            <FAB
                title="Add Tool"
                placement='right'
                color='blue'
                // upperCase
                onPress={() => navigateToAddToolModal()}
                containerStyle={styles.fab}
            >
            </FAB>
        </SafeAreaView>
    )

}

export default EditToolsAdmin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fafafa',
    },
    fab: {
        padding: 0,
        margin: 0,
    },
})