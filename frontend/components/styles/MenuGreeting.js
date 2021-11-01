import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MenuGreeting extends Component {


    date = new Date().getHours()

    constructor(props){
        super(props)
        this.message = '';
    }

    componentDidMount(){
        this.checkTime()
    }

    

    checkTime = () => {
        if (this.date >= 0 && this.date < 12){
            this.message = 'Good Morning'
        }
        if (this.date > 12 && this.date < 18){
            this.message = 'Good Afternoon' 
        }
        if (this.date > 18){
            this.message = 'Good Evening'
        }
        if (this.date > 21 && this.date < 24){
            this.message = 'Good Night'
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.messageText}>{this.message}</Text>
            </View>
        )
    }
}

export default MenuGreeting

const styles = StyleSheet.create({

    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    messageText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1f1f1f',
    }

})