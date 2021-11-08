import React, { Component } from "react";
import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../Firebase";


class SettingsScreen extends Component {

    handleLogOut = () => {
        // Get current user
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser.isAnonymous)
        // Check if current user is anonymous
        if (currentUser.isAnonymous === true) {
            // If user is anonymous we delete user's profile first 
            firebase.firestore().collection('users').doc(currentUser.uid).delete().then(() => {
                console.log('user deleted')
            }).catch((error) => {
                console.error("Error removing document: ", error);
            })
            // Then delete user
            currentUser.delete().then(() => {
                console.log('Guest user deleted.')
            })
        // If user is a normal user, we just log in out
        } else {
            firebase.auth().signOut()
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Button 
                    title="Log Out"
                    onPress={() => {this.handleLogOut(); this.props.navigation.replace('Landing')}}
                >
                </Button>
            </SafeAreaView>
        )
    }
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})