import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { firebase } from '../../Firebase'
import { Card } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';

class StarredResources extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            data: [],
            starTools: [],
        }
    };

    user = firebase.auth().currentUser

    componentDidMount() {
        this.getDataFromFirebase();
    }

    getDataFromFirebase = () => {
        this.setState({loading: true})
        firebase.firestore().collection('users').doc(this.user.uid)
            .onSnapshot(documentSnapshot => {
                this.setState({
                    starTools: documentSnapshot.data().starTools,
                })
                firebase.firestore().collection('tools').where('name', 'in', documentSnapshot.data().starTools)
                    .onSnapshot(querySnapshot => {
                        const tools = []
                        querySnapshot.forEach(documentSnapshot => {
                            tools.push({...documentSnapshot.data()})
                            // console.log(documentSnapshot.data())
                        })
                        this.setState({
                            data: tools,
                        })
                    })
                // console.log(documentSnapshot.data().starTools)
                // this.setState({
                //     starTools: documentSnapshot.data().starTools,
                // })
            })
        

    }

    getToolsData = (item) => {
        var tool = item.name;
        // console.log(tool)

        this.props.navigation.navigate('ToolDetails', { toolName: tool })

        // Alert.alert('Test', tool, [
        //     {text: 'OK', onPress: () => console.log('OK pressed')}
        // ]);
    };

    handleUnstartool = (item) => {
        var starred = [...this.state.starTools]
        var index = starred.indexOf(item.name)
        if (index > -1) {
            starred.splice(index, 1)
        }
        // console.log(starred)
        firebase.firestore().collection('users').doc(this.user.uid)
            .update({
                starTools: starred,
            })
    }



    render() {
        // console.log(this.state.starTools)
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => 
                    <TouchableOpacity onPress={this.getToolsData.bind(this, item)}>
                        <Card containerStyle={styles.card_item}>
                        <Card.Title h4 style={{color: '#8A76B6',}}>{item.name}</Card.Title>
                        <Card.Divider></Card.Divider>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 0.8}}>{item.details}</Text>
                            <TouchableOpacity style={{ flex: 0.2, alignContent: 'center', alignItems: 'center', paddingTop: '5%' }} onPress={this.handleUnstartool.bind(this, item)}>
                                <AntDesign name="star" size={35} color="black" />
                                {/* <AntDesign name="staro" size={35} color="black"/> */}
                            </TouchableOpacity>
                        </View>
                        </Card>
                    </TouchableOpacity>
                    }
                />
            </SafeAreaView>
        )
    }
    
}

export default StarredResources

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fafafa',
    },
    flat_list_item: {
        backgroundColor: "#E7ECF2",
    },
    card_item: {
        flex: 1,
        backgroundColor: "#E7ECF2",
        borderRadius: 15,
        margin: 15,
    },
});
