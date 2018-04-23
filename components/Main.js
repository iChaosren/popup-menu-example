import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { connect } from 'react-redux';
import { openMenu } from '../actions/MenuActions';

class Main extends Component {    
    render() {
        //const TouchableDynamic = Platform.select({ ios: TouchableOpacity, android: TouchableNativeFeedback })
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.openMenu()} >
                    <Text style={{ fontSize: 22, color: '#2089dc' }}>Open Slide Menu</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(null, { openMenu })(Main);
