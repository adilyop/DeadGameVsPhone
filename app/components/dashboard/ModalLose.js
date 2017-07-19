import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView, Image,
    TextInput,
    Modal, Dimensions,
    ToastAndroid, Animated,
    ActivityIndicator
} from 'react-native';
let {width, height} = Dimensions.get('window');
let height_window = height - 25;
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './modalWin.styles';
class ModalLose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heightView: new Animated.Value(0),
            widthView: new Animated.Value(0),
            visible: this.props.visible,
            loading: false
        };
    };
    componentWillMount() {


    }

    _timerModal() {

        var self = this;

        setTimeout(() => {
            Animated.timing(  // Animate over time
                self.state.heightView,  // The animated value to drive
                {
                    toValue: height_window / 3,  // Animate to opacity: 1, or fully opaque
                }).start();

            Animated.timing(  // Animate over time
                self.state.widthView,  // The animated value to drive
                {
                    toValue: width,  // Animate to opacity: 1, or fully opaque
                }).start();

        }, 1500);

    }

    share() {

            this.props.toggleModalLose();
            this.props.share("header");
    }
    start() {
            this.props.toggleModalLose();
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onShow={this._timerModal.bind(this)}
                onRequestClose={() => undefined}
            >
                <View style={styles.header}>
                </View>
                <View style={styles.modal}>
                    <View style={styles.modalLign}>
                        <Image
                            style={styles.modalImage}
                            source={require('../../images/resolved.png')}>
                        </Image>
                    </View>
                    <Animated.View
                        style={[styles.modalSecondLign, { height: this.state.heightView, width: this.state.widthView }]}

                    >



                        <Image style={[styles.record]}
                            //source={require('../../images/win.png')}
                            >
                            <Text style={styles.TextNumber}> {this.props.randomNumber} </Text>
                            <Text style={styles.TextRecord}> {this.props.time} </Text>
                        </Image>


                        <View style={styles.modalSecondLignButton}>
                            <TouchableOpacity
                                style={styles.buttonRestart}

                                onPress={() => this.start()}>
                                <Text style={styles.TextRestart}>RESTART</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonShare} onPress={() => this.share()}>
                                <Text style={styles.TextShare}>SHARE</Text>
                            </TouchableOpacity>
                        </View>

                    </Animated.View >
                </View>


                <View style={styles.containerFooterError}></View>


            </Modal>
        );
    }
}
module.exports = ModalLose;