import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
    ToastAndroid,BackAndroid,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './modalBalance.styles';
import { Actions } from 'react-native-router-flux';
class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    };
    play() {
        this.props.toggleModalBalance();
    }
    score() {
        Actions.score();
        this.props.toggleModalBalance();
    }
    _howToPlay() {
        Actions.howToPlay();
        this.props.toggleModalBalance();
    }
    exit() {
        this.props.toggleModalBalance();
        BackAndroid.exitApp();
    }
    render() {
        return (
            <Modal 
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => undefined}
            >
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.showHideTextHeader}>MENU</Text>
                    </View>
                    <TouchableOpacity style={styles.row}
                        onPress={() => this.play()}>
                        <View >
                            <Text style={styles.showHideText}>RESUME</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row}
                        onPress={() => this.score()}>
                        <View >
                            <Text style={styles.showHideText}>SCORE</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}
                        onPress={() => this._howToPlay()}>
                        <View >
                            <Text style={styles.showHideText}>HOW TO PLAY</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}
                        onPress={() => this.exit()}>
                        <View >
                            <Text style={styles.showHideText}>EXIT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    };
}
module.exports = ModalComponent;