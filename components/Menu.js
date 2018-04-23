import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, TouchableHighlight, TouchableWithoutFeedback, TouchableNativeFeedback, Easing, Platform } from 'react-native';
import { connect } from 'react-redux';
import { closeMenu } from '../actions/MenuActions';

class Menu extends Component {
    constructor(props) {
        super(props);

        const duration = 350;

        this.backdropOpacity = new Animated.Value(0);
        this.backdropOpenAnimation = Animated.timing(
            this.backdropOpacity,
            {
                duration,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                toValue: 0.4
            }
        );
        this.backdropCloseAnimation = Animated.timing(
            this.backdropOpacity,
            {
                duration,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                toValue: 0
            }
        );

        this.menuPosition = new Animated.Value(-175);
        this.menuOpenAnimation = Animated.timing(
            this.menuPosition,
            {
                duration,
                easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                toValue: 0
            }
        );
        this.menuCloseAnimation = Animated.timing(
            this.menuPosition,
            {
                duration,
                easing: Easing.bezier(0.4, 0.0, 0.6, 1),
                toValue: -175
            }
        );
    }

    state = {
        options: ["Option One", "Option Two", "Option Three"],
        visible: false
    }

    renderOptionList = list => list.map((x, i) => this.renderOption(x, i));

    renderOption = (option, key) => {
        //const TouchableDynamic = Platform.select({ ios: TouchableOpacity, android: TouchableNativeFeedback });
        return (
            <TouchableOpacity key={key} style={styles.option}>
                <Text style={styles.optionLabel}>{option}</Text>
            </TouchableOpacity>
        );
    }

    _open = () => {
        if (!this.state.visible) {
            this.setState({ visible: true });
            setTimeout(() => {
                this.backdropOpenAnimation.start();
                this.menuOpenAnimation.start();
            }, 50);
        } else {
            this.backdropCloseAnimation.stop();
            this.menuCloseAnimation.stop();

            this.backdropOpenAnimation.start();
            this.menuOpenAnimation.start();
        }
    }

    _close = () => {
        this.backdropOpenAnimation.stop();
        this.menuOpenAnimation.stop();

        this.backdropCloseAnimation.start();
        this.menuCloseAnimation.start(() => this.setState({ visible: false }));
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.open && newProps.open)
            this._open();
        else if (this.props.open && !newProps.open)
            this._close();
    }

    render() {
        if (!this.state.visible)
            return <View />

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => this.props.closeMenu()}>
                    <Animated.View style={{ ...styles.backdrop, opacity: this.backdropOpacity }} />
                </TouchableWithoutFeedback>
                <Animated.View style={{ ...styles.menu, bottom: this.menuPosition }}>
                    {this.renderOptionList(this.state.options)}
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        options,
        open
    } = state.menuState;
    return {
        options,
        open
    };
}

export default connect(mapStateToProps, { closeMenu })(Menu);

const styles = {
    option: {
        paddingLeft: 15,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
    },
    optionLabel: {
        fontSize: 16,
        color: '#2089dc'
    },
    menu: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 25,
        backgroundColor: '#ddd',
        shadowColor: 'black',
        shadowOffset: { height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    backdrop: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: '#000',
        opacity: 0.4
    }
}
