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
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
var {width, height} = Dimensions.get('window');
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
var width_window = width;
var height_window = height;

class HowToPlay extends Component {

    onPrevious() {
        Actions.pop();
    };
    francais() {
        return (
            <ScrollView  >
            <View style={styles.info} >
                <Text>Commencer par glisser les chiffres dans les champs gris vides. Et essayer de deviner le nombre dans un minimum des essais.</Text>
                <Text></Text>
                <Text>Le nombre de "COWS" signifie les chiffres trouvés mais mal placés.</Text>
                <Text>Le nombre de "BULLS" signifie les chiffres trouvés et bien placés.</Text>
                <Text style={{ fontWeight: 'bold' ,color: 'blue', fontSize: 15, }}>Obtenir 4 "BULLS" pour gagner!</Text>
                <Text></Text>
                <Text style={{ fontWeight: 'bold' }} >Exemple1: </Text>
                <Text>Numéro à deviner est :</Text>
                <View style={styles.containerNumbersRow1}>
                    <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 3 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 7 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 0 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 5 </Text>
                    </View>
                </View>

                <Text> Si vous choisissez le nombre :</Text>
                <View style={styles.containerNumbersRow1}>
                    <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 3 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 4 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "blue" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 5 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 1 </Text>
                    </View>
                </View>
                <Text>Le resultat sera "BULLS":1 et "COWS" :1</Text>
                <Text>BULLS :1 signifie qu'un chiffre est trouvé et bien placé(3)</Text>
                <Text>COWS :1 signifie qu'un chiffre est trouvé mais mal placé(5)</Text>
                <Text></Text>
                <Text style={{ fontWeight: 'bold' }} >Exemple2: </Text>
                <Text>Si tu choisis le nombre: </Text>
                <View style={styles.containerNumbersRow1}>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 7 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 9 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 5 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 2 </Text>
                    </View>
                </View>
                <Text>Le resultat sera "BULLS":0 et "COWS" :2</Text>
                <Text>BULLS :0 signifie qu'aucun chiffre n'est trouvé dans sa position exacte</Text>
                <Text>COWS :2 signifie que deux chiffres(7,5) est trouvés mais mal placés</Text>
                <Text></Text>
                <Text style={{ fontWeight: 'bold' ,color: 'red', fontSize: 15, }}>AMUSES-TOI !</Text>
            </View>
            </ScrollView>
        );
    }
    english() {
        return (
            <ScrollView  >
            <View style={styles.info} >
                <Text>Start by dragging digits to the empty grey fields. And try to guess the number in the least attempts.</Text>
                <Text></Text>
                <Text>Numbers of "COWS" means correct digits selected but wrong position.</Text>
                <Text>Numbers of "BULLS" means correct digits selected and right position.</Text>
                <Text style={{ fontWeight: 'bold' ,color: 'blue', fontSize: 15, }}>Get 4 "BULLS" to win!</Text>
                <Text></Text>
                <Text style={{ fontWeight: 'bold' }} >Example1: </Text>
                <Text >Number to guess is :</Text>
                <View style={styles.containerNumbersRow1}>
                    <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 3 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 7 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 0 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 5 </Text>
                    </View>
                </View>

                <Text> If you choose :</Text>
                <View style={styles.containerNumbersRow1}>
                    <View style={[styles.blockEmpty, { backgroundColor: "green" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 3 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 4 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "blue" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 5 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 1 </Text>
                    </View>
                </View>
                <Text>The result will be BULLS :1 , COWS :1</Text>
                <Text>BULLS :1 means one digit in the right position (3)</Text>
                <Text>COWS :1 means one digit is guessed but misplaced (5)</Text>
                <Text></Text>
                <Text style={{ fontWeight: 'bold' }} >Example2: </Text>
                <Text>If you choose the number :</Text>
                <View style={styles.containerNumbersRow1}>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 7 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 9 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 5 </Text>
                    </View>
                    <View style={[styles.blockEmpty, { backgroundColor: "grey" }]}>
                        <Text style={{ color: "white", fontSize: 20 }}> 2 </Text>
                    </View>
                </View>
                <Text>the result will be BULLS :0 , COWS :2</Text>
                <Text>BULLS :0 means no digit is in the right position </Text>
                <Text>COWS :2 means two digits(7,5) are guessed but misplaced.</Text>
                <Text></Text>
                <Text style={{ fontWeight: 'bold' ,color: 'red', fontSize: 15, }}>ENJOY !</Text>
            </View>
            </ScrollView>
        );
    }
    render() {
        return (
            <View style={styles.containerTab} >
                <View style={styles.subHeader1}>
                    <TouchableOpacity onPress={() => this.onPrevious()} style={styles.settingShare}>
                        <Icon name="ios-arrow-back" color='#fff' size={40} > </Icon>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        HOW TO PLAY
                    </Text>
                    <TouchableOpacity  style={styles.settingShare}>
                        <Icon name="ios-arrow-back" color='#2c3e50' size={40} > </Icon>
                    </TouchableOpacity>
                </View>
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() =>
                        <ScrollableTabBar
                            backgroundColor={'white'}
                            activeTextColor={'#2c3e50'}
                            inactiveTextColor={'grey'}
                            underlineStyle={styles.underlineStyle}
                        />
                    }
                >
                    <View tabLabel='ENGLISH' style={styles.tabView}>
                        {this.english()}
                    </View>
                    <View tabLabel='FRANCAIS' style={styles.tabView}>
                        {this.francais()}
                    </View>
                </ScrollableTabView>
                <View style={styles.containerFooterError}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    settingShare: {
        marginLeft: 10,
    },

    containerFooterError: {
        height: 25,
        backgroundColor: 'white',
        width: width
    },
    containerNumbersRow1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    blockEmpty: {
        margin: 2,
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    NumberListHeader: {
        height: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    info: {
        margin: 10,
    },
    containerTab: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    containerNumbersRow2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerNumbersRow3: {
        flex: 1,
        flexDirection: 'row'
    },
    containerNumbersColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerTitle: {
        color: '#90949c',
        fontWeight: 'bold',
        fontSize: 30,
    },
    underlineStyle: {
        backgroundColor: '#2c3e50',
        height: 2
    },
    subHeader1: {
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#2c3e50'
    },
});

export default HowToPlay;