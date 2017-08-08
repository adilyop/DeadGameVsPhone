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
class ModalWinTime extends Component {
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
                    toValue: width - 20,  // Animate to opacity: 1, or fully opaque
                }).start();

        }, 1500);

    }

    share() {
        this.props.share("header");
    }
    start() {
        this.props.toggleModalWinTime();
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
                            style={[styles.modalSecondCarre, { height: this.state.heightView, width: this.state.widthView }]}

                        >
                            <View style={styles.modalSecondCarreUp}>

                                <Icon name="md-contact" color='#fff' size={40} ></Icon>

                                <View style={styles.columnScoreWin}>
                                    <Text style={styles.Textscore }>     {this.props.time}     </Text>
                                    <Text  style={styles.TextRound} >  Round : {this.props.round}   </Text>
                                </View>

                                <Icon name="md-timer" color='#fff' size={40} ></Icon>
                            </View>


                            <View style={styles.modalSecondCarreDown}>

                                <View style={styles.record}>
                                <Image style={[styles.recordImage]}
                                    source={require('../../images/youwin.png')}
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


                    <AdMobBanner
                        bannerSize="Banner"
                        adUnitID="ca-app-pub-1835572944842794/6748215105"
                        testDeviceID="0123456789ABCDEF"
                        didFailToReceiveAdWithError={this.bannerError} />
                    <View style={styles.containerFooterError}>
                    </View>
                </View>


            </Modal>
        );
    }
}
module.exports = ModalWinTime;