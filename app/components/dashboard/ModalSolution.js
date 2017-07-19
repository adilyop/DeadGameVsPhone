import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView, Image,
    TextInput,
    Modal,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import styles from './modalWin.styles';
class ModalSolution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    };
    start() {
        this.props.toggleModalSolution();
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => undefined}
            >
                <View style={styles.headerSolution}>
                </View>


                <View style={styles.modalSolution}>

                    <View style={styles.containerNumbersRow1}>
                        <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                            <Text style={{ color: "white", fontSize: 20 }}> {this.props.oldRandomNumber[0]} </Text>
                        </View>
                        <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                            <Text style={{ color: "white", fontSize: 20 }}> {this.props.oldRandomNumber[1]} </Text>
                        </View>
                        <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                            <Text style={{ color: "white", fontSize: 20 }}> {this.props.oldRandomNumber[2]} </Text>
                        </View>
                        <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                            <Text style={{ color: "white", fontSize: 20 }}> {this.props.oldRandomNumber[3]} </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonRestart} onPress={() => this.start()}>
                                <Text style={styles.TextRestart}>RESTART</Text>
                            </TouchableOpacity>
                </View>

            </Modal>
        );
    };
}
module.exports = ModalSolution;