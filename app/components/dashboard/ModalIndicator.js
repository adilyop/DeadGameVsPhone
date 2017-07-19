import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView, Image,
    TextInput, StyleSheet,
    Modal, Dimensions,
    ToastAndroid, Animated,
    ActivityIndicator
} from 'react-native';
let {width, height} = Dimensions.get('window');
var width_window = width;
let height_window = height - 25;
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
class ModalIndicator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNumber: [true, true, true, true, true, true, true, true, true, true],
            numberProposed: ["_", "_", "_", "_"]
        };
    };
    componentWillMount() {
        var self = this;

    }

    generateNumber() {
        var res = "";
        while (res.length < 4) {
            var randomdigit = Math.floor(Math.random() * 9)
            if (res.indexOf("" + randomdigit) == -1)
                res = res + "" + randomdigit
        }
        return res
    }

    hide() {
        this.props.toggleModalIndicator();
    }
    play() {
        var numberProposed = this.state.numberProposed;
        if (numberProposed[0] !== "_" && numberProposed[2] !== "_"
            && numberProposed[1] !== "_" && numberProposed[3] !== "_") {
            this.hide()
            this.props.refreshNumber(this.state.numberProposed)
        }
    }
    _pressNumber(number) {
        var numberProposed = this.state.numberProposed;
        if (numberProposed[0] === "_") {
            var showNumber = this.state.showNumber;
            showNumber[number] = false;
            numberProposed[0] = number;
            this.setState({
                numberProposed: numberProposed,
                showNumber: showNumber
            })
        }
        else if (numberProposed[1] === "_") {
            var showNumber = this.state.showNumber;
            showNumber[number] = false;
            numberProposed[1] = number;
            this.setState({
                numberProposed: numberProposed,
                showNumber: showNumber
            })
        }
        else if (numberProposed[2] === "_") {
            var showNumber = this.state.showNumber;
            showNumber[number] = false;
            numberProposed[2] = number;
            this.setState({
                numberProposed: numberProposed,
                showNumber: showNumber
            })
        }
        else if (numberProposed[3] === "_") {
            var showNumber = this.state.showNumber;
            showNumber[number] = false;
            numberProposed[3] = number;
            this.setState({
                numberProposed: numberProposed,
                showNumber: showNumber
            })
        }
    }
    _renderNumber(number) {
        var a = this.state.showNumber[number]
        if (a) {

            return (

                <TouchableOpacity
                    style={styles.blockNumber}
                    onPress={() => this._pressNumber(number)}
                >
                    <Image
                        source={require('../../images/burtton_grey.png')}

                        style={styles.blockNumber}
                    >
                        <Text style={{ marginBottom: 5, color: "black", fontSize: 35, fontWeight: 'bold' }}>{number}</Text>
                    </Image>
                </TouchableOpacity>
            );
        } else {

            return (
                <View
                    style={styles.blockNumberFad}>
                    <Text style={{ color: "white", fontSize: 35, fontWeight: 'bold' }}></Text>
                </View>
            );
        }
    }
    _pressProposedNumber(position) {

        var listNumberProposed = this.state.numberProposed;
        var showNumber = this.state.showNumber;
        var number = listNumberProposed[position]
        if (number !== "_") {


            showNumber[number] = true;
            listNumberProposed[position] = "_";
            this.setState({
                numberProposed: listNumberProposed,
                showNumber: showNumber
            })
        }
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => undefined}
            >
                <View style={styles.container}>
                    <View style={styles.containerHeader}>
                    </View>

                    <Image style={styles.containerModal}
                        source={require('../../images/modal.png')}>

                        <View style={styles.containerTitle}>

                            <Text style={styles.headerTitle} >SELECT YOUR NUMBER</Text>

                        </View>
                        <View style={styles.containerMessage}>


                            <View style={styles.containerNumbersRow1}>
                                <TouchableOpacity style={[styles.blockEmpty, { backgroundColor: this.state.backgroundColorNumber }]}
                                    onPress={() => this._pressProposedNumber(0)}>
                                    <Text style={{ color: this.state.colorText, fontSize: 35, fontWeight: 'bold' }}>{this.state.numberProposed[0]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.blockEmpty, { backgroundColor: this.state.backgroundColorNumber }]}
                                    onPress={() => this._pressProposedNumber(1)}>
                                    <Text style={{ color: this.state.colorText, fontSize: 35, fontWeight: 'bold' }}>{this.state.numberProposed[1]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.blockEmpty, { backgroundColor: this.state.backgroundColorNumber }]}
                                    onPress={() => this._pressProposedNumber(2)}>
                                    <Text style={{ color: this.state.colorText, fontSize: 35, fontWeight: 'bold' }}>{this.state.numberProposed[2]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.blockEmpty, { backgroundColor: this.state.backgroundColorNumber }]}
                                    onPress={() => this._pressProposedNumber(3)}>
                                    <Text style={{ color: this.state.colorText, fontSize: 35, fontWeight: 'bold' }}>{this.state.numberProposed[3]}</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.containerNumbersRow2}>
                                {this._renderNumber(0)}
                                {this._renderNumber(1)}
                                {this._renderNumber(2)}
                                {this._renderNumber(3)}
                                {this._renderNumber(4)}
                            </View>
                            <View style={styles.containerNumbersRow3}>
                                {this._renderNumber(5)}
                                {this._renderNumber(6)}
                                {this._renderNumber(7)}
                                {this._renderNumber(8)}
                                {this._renderNumber(9)}
                            </View>


                        </View>
                        <View style={styles.containerButton}>
                            <TouchableOpacity onPress={() => this.play()} style={styles.buttonPlay}>
                                <Text > Play </Text>
                            </TouchableOpacity>
                        </View>
                    </Image>



                    <View style={styles.containerFooter}>
                    </View>
                </View>


            </Modal>
        );
    }
}
const styles = StyleSheet.create({


    container: {
        flex: 1,
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    containerHeader: {
        backgroundColor: 'rgba(500,500, 500, 0.2)',
        height: height / 5,
        width: width,
    },
    containerModal: {
        backgroundColor: 'rgba(500,500, 500, 0.2)',
        height: width - 20,
        width: width - 20,
        resizeMode: "stretch",
        flexDirection: 'column'
    },
    containerFooter: {
        backgroundColor: 'rgba(500,500, 500, 0.2)',
        height: height / 5,
        width: width,
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(500,500, 500, 0.8)',
        flex: 4
    },
    containerTitle: {
        backgroundColor: 'rgba(500,2, 100, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
    },
    containerMessage: {
        backgroundColor: 'rgba(500,2, 0, 0.8)',
        flex: 6,
        flexDirection: 'column'
    },
    buttonPlay: {
        margin: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 70,
        borderRadius: 10,
        height: 40,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonConfirm: {
        margin: 10,
        width: 70,
        borderRadius: 10,
        height: 40,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    containerNumbersRow1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerNumbersRow2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerNumbersRow3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    blockNumber: {
        backgroundColor: 'rgba(500,500, 500, 0.2)',
        margin: 3,
        width: width_window / 8,
        height: width_window / 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    blockEmpty: {
        width: width_window / 9,
        height: width_window / 9,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
module.exports = ModalIndicator;