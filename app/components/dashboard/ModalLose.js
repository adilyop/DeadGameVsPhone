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
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'react-native-admob'
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
                    toValue: width-20,  // Animate to opacity: 1, or fully opaque
                }).start();

        }, 1500);

    }

    share() {

        this.props.share("header");
    }
    start() {
        this.props.toggleModalLose();
    }
    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onShow={this._timerModal.bind(this)}
                onRequestClose={() => undefined}
            >

                <View style={styles.globalModal}>
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
                            style={[styles.modalSecondCarreLose, { height: this.state.heightView, width: this.state.widthView }]}

                        >
                            <View style={styles.modalSecondCarreUpLose}>

                                <Icon name="md-contact" color='#fff' size={40} ></Icon>

                                <View style={styles.columnScore}>
                                    <Text style={styles.Textscore }>  {this.props.userWin} : {this.props.phoneWin}  </Text>
                                    <Text  style={styles.TextRound} >{this.props.round}</Text>
                                </View>

                                <Icon name="ios-ionitron" color='#fff' size={40} ></Icon>
                            </View>


                            <View style={styles.modalSecondCarreDownLose}>

                                <View style={styles.record}>
                                <Image style={[styles.recordImage]}
                                    source={require('../../images/youlose.png')}
                                >
                                </Image>
                                </View>
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

                            </View>
                        </Animated.View >
                </View>


                <View style={styles.containerFooterError}>
                        <AdMobBanner style={styles.containerFooterError}
                            bannerSize="Banner"
                            adUnitID="ca-app-pub-1835572944842794/6748215105"
                            testDeviceID="0123456789ABCDEF"
                            didFailToReceiveAdWithError={this.bannerError} />
                            </View>
                            </View>

            </Modal>
        );
    }
}
module.exports = ModalLose;