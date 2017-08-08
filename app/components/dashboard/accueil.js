import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    Clipboard,
    ToastAndroid,
    AlertIOS,
    Dimensions,
    Platform
} from 'react-native';
import { StyleSheet } from 'react-native';
import Share, { Button } from 'react-native-share';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'react-native-admob'
var {width, height} = Dimensions.get('window');

export default class ShareSocial extends Component {
    constructor(props) {
        super(props);

        this
    }
    componentWillMount() {
        let shareContent = this.props.shareContent;
        this.setState({
            shareFile: shareContent
        });



        AdMobRewarded.setTestDeviceID('EMULATOR');
        AdMobRewarded.setAdUnitID('ca-app-pub-1835572944842794/9605440591');

        AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',
            (type, amount) => console.log('rewardedVideoDidRewardUser', type, amount)
        );
        AdMobRewarded.addEventListener('rewardedVideoDidLoad',
            () => console.log('rewardedVideoDidLoad')
        );
        AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad',
            (error) => console.log('rewardedVideoDidFailToLoad', error)
        );
        AdMobRewarded.addEventListener('rewardedVideoDidOpen',
            () => console.log('rewardedVideoDidOpen')
        );
        AdMobRewarded.addEventListener('rewardedVideoDidClose',
            () => {
                console.log('rewardedVideoDidClose');
                AdMobRewarded.requestAd((error) => error && console.log(error));
            }
        );
        AdMobRewarded.addEventListener('rewardedVideoWillLeaveApplication',
            () => console.log('rewardedVideoWillLeaveApplication')
        );

        AdMobRewarded.requestAd((error) => error && console.log(error));
        //this.showRewarded();
    }




    ////
    componentWillUnmount() {
        AdMobRewarded.removeAllListeners();
    }

    showRewarded() {
        AdMobRewarded.showAd((error) => error && console.log(error));
    }




    playPhone() {
        Actions.DashboardPhone();
    };
    playAlone() {
        Actions.dashboard();
    };
    howToplay() {
        Actions.howToPlay();
    };
    exit() {
        Actions.pop();
    };
    render() {
        return (
            <View style={styles.flex}>
            <Image style={styles.container}
             source={require('../../images/final_backgroundaccueil.png')}
            >


                <Image style={styles.iconcontainer}
                    source={require('../../images/light.png')} >

                </Image>

                <Image style={styles.mastercontainer}
                    source={require('../../images/mastermind.png')}>

                </Image>


                <TouchableOpacity style={styles.playPhone}
                    onPress={() => this.playPhone()}>

                    <View style={styles.flex}>
                        <Text style={styles.headerTitle} >Play</Text>
                        <Text style={styles.footerTitle} >Vs Phone</Text>
                    </View>

                    <View style={styles.flexicon}>

                        <View style={styles.cercle}>
                        <Icon name="md-game-controller-b" color='#9b6ab7' size={50}></Icon>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.playPhone}
                    onPress={() => this.playAlone()}>
                    <View style={styles.flex}>
                        <Text style={styles.headerTitle} >Play</Text>
                        <Text style={styles.footerTitle} >Vs Time</Text>
                    </View>
                    <View style={styles.flexicon}>
                        <View style={styles.cercle}>
                        <Icon name="md-timer" color='#9b6ab7' size={50}></Icon>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.playPhone}
                    onPress={() => this.howToplay()}>
                    <View style={styles.flex}>
                        <Text style={styles.headerTitle} >How to</Text>
                        <Text style={styles.footerTitle} >play</Text>
                    </View>
                    <View style={styles.flexicon}>
                        <View style={styles.cercle}>
                        <Icon name="md-help-circle" color='#9b6ab7' size={50}></Icon>
                        </View>
                    </View>
                </TouchableOpacity>

            </Image>
             </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9ac1ff',
        height: height,
        width: width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",

    },
    image1: {
        resizeMode: "stretch",
        height: 70,
        width: 70,
    },
    image2: {
        resizeMode: "stretch",
        height: 50,
        width: 50,
    },
    iconcontainer: {
        resizeMode: "stretch",
        marginBottom: 10,
        height: 80,
        width: 60,
        justifyContent: 'center',
        alignItems: "center",

    },
    mastercontainer: {
        resizeMode: "stretch",
        marginBottom: 10,
        height: 80,
        width: width * 3 / 4,
        justifyContent: 'center',
        alignItems: "center",

    },
    shareheader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#AAA'
    },
    flex: {
        flex: 2,
        justifyContent: 'center',
        alignItems: "center",
    },
    flexicon: {
        borderRadius: 20,
        height: 80,
        backgroundColor: '#62a3cf',
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    cercle: {
        flexDirection: 'row',
        borderRadius: 35,
        height: 60,
        width: 60,
        backgroundColor: '#533763',
        justifyContent: 'center',
        alignItems: "center",
    },
    playPhone: {
        flexDirection: 'row',
        borderWidth: 4,
        borderColor: '#62a3cf',
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: '#1b6a9f',
        height: 80,
        width: 220,
        margin: 5
    },
    headerTitle: {
        color: '#533763',
        fontWeight: 'bold',
        fontSize: 30,
    },
    headerSubTitle: {
        color: '#9b6ab7',
        fontWeight: 'bold',
        fontSize: 25,
    },
    footerTitle: {
        color: '#103e5e',
        fontWeight: 'bold',
        fontSize: 15,
    },
    headerTitleInstruction: {
        color: '#9b6ab7',
        fontWeight: 'bold',
        fontSize: 20,
    },
    subHeader1: {
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#2c3e50'
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    hr: {
        alignSelf: 'center',
        width: width * 0.85,
        height: 0.5,
        backgroundColor: "#EEE"
    },
    element: {
        width: width
    }
});