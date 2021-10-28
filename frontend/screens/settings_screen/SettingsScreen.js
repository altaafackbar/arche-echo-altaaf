import React, { Component } from "react";
import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../Firebase";


class SettingsScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Button 
                    title="Log Out"
                    onPress={() => firebase.auth().signOut()}
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