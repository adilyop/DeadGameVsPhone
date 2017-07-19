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
            <Image style={styles.container}
                source={require('../../images/back_blue.png')}>


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

                    <View style={styles.flex}>
                        
            <Image style={styles.image1}
                source={require('../../images/brain.png')}></Image>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.playAlone}
                    onPress={() => this.playAlone()}>
                    <View style={styles.flex}>
                        <Text style={styles.headerSubTitle} >Play</Text>
                        <Text style={styles.footerTitle} >Vs Time</Text>
                    </View>
                    <View style={styles.flex}>
                        
            <Image style={styles.image2}
                source={require('../../images/chrono.png')}></Image>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.howToPlay}
                    onPress={() => this.howToplay()}>
                    <Text style={styles.headerTitleInstruction} >Rules</Text>
                </TouchableOpacity>

            </Image>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    imageContainer: {
        flex: 1,
        width: 250,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 50
    },
    campaignName: {
        backgroundColor: 'white',
        color: '#333',
        fontSize: 22,
        alignSelf: 'center',
        fontFamily: 'sans-serif-light',
        fontWeight: 'bold',
        paddingTop: 18,
        paddingBottom: 20
    },

    settingShare: {
        marginLeft: 10,
    },
    playPhone: {
        flexDirection: 'row',
        borderWidth: 5,
        borderColor: '#62a3cf',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: '#1b6a9f',
        height: 100,
        width: 200,
        margin: 5
    },
    playAlone: {
        flexDirection: 'row',
        borderWidth: 4,
        borderColor: '#62a3cf',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: '#1b6a9f',
        height: 70,
        width: 150,
        margin: 5
    },
    howToPlay: {
        borderWidth: 3,
        borderColor: '#62a3cf',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: '#3e81ae',
        height: 60,
        width: 120,
        margin: 5
    },
    exit: {
        borderWidth: 2,
        borderColor: '#62a3cf',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: '#3e81ae',
        height: 50,
        width: 80,
        margin: 15
    },


    headerTitle: {
        color: '#000080',
        fontWeight: 'bold',
        fontSize: 35,
    },
    headerSubTitle: {
        color: '#000080',
        fontWeight: 'bold',
        fontSize: 25,
    },
    footerTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 10,
    },
    headerTitleInstruction: {
        color: '#000080',
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