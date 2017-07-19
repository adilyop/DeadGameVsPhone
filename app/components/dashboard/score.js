import React, { Component } from 'react';
import {
    ListView,
    View,
    Text,
    Image,
    ToastAndroid,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    PanResponder,
    Animated, Modal, TouchableHighlight, Dimensions
} from 'react-native';
var {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { addScoreRow, getAllScore, dropAll } from '../../services/database';
export default class Score extends Component {
    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            buttonValid: true,
            listScore: []
        };
    }
    componentWillMount() {
        this.setState({buttonValid: true})
        getAllScore((data) => {
            this.setState({ listScore: data })
        });

    }
    back() {
        Actions.pop();
    }
    cleanDatabase() {
        this.setState({buttonValid:false})
    }
    confirm() {
        dropAll((data) => {
            this.setState({ listScore: [] })
        });
    }
    cancel() {
        this.setState({buttonValid:true})
    }
    _renderfooter(){
        var showClean = this.state.buttonValid;
        if (showClean) {
           return (
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => this.cleanDatabase()} style={styles.buttonValid}>
                    <Text > CLEAN </Text>
                </TouchableOpacity>
            </View>
        );
        } else {
        return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.cancel()} style={styles.buttonCancel}>
                <Text > CANCEL </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.confirm()} style={styles.buttonConfirm}>
                <Text > CONFIRM </Text>
            </TouchableOpacity>
        </View>
        );
        }
    }
    _renderCleanButton() {
        return (
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => this.cleanDatabase()} style={styles.buttonValid}>
                    <Text > CLEAN </Text>
                </TouchableOpacity>
            </View>
        );
    }
    _renderConfirmButton() {
        return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.cancel()} style={styles.buttonCancel}>
                <Text > CANCEL </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.confirm()} style={styles.buttonConfirm}>
                <Text > CONFIRM </Text>
            </TouchableOpacity>
        </View>
        );
    }
    _renderScore(item, sectionID, rowID) {
        return (
            <View>

                <TouchableOpacity style={styles.NumberListContainer}>
                    <View style={styles.NumberListTime}>
                        <View style={styles.halfNumberListTime}>
                            <Text > </Text>
                        </View>
                        <View style={styles.halfNumberListTime}>
                            <Text style={{ color: "black", fontSize: 17 }}> {item.id}</Text>
                        </View>
                        <View style={styles.doubeNumberListTime}>
                            <Text style={{ color: "black", fontSize: 17 }}>  {item.type} </Text>
                        </View>
                        <View style={styles.halfNumberListTime}>
                            <Text style={{ color: "black", fontSize: 17 }}> {item.value}   </Text>
                        </View>
                        <View style={styles.halfNumberListTime}>
                            <Text > </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subHeader1}>
                    <TouchableOpacity onPress={() => this.back()} style={styles.settingShare}>
                        <Icon name="ios-arrow-back" color='#fff' size={40} > </Icon>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        SCORE
                    </Text>
                    <TouchableOpacity style={styles.settingShare}>
                        <Icon name="ios-arrow-back" color='#2c3e50' size={40} > </Icon>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.NumberListContainer}>
                    <View style={styles.NumberListTime}>
                        <View style={styles.emptyHalfNumberListTime}>
                            <Text > </Text>
                        </View>
                        <View style={styles.halfNumberListTime}>
                            <Text style={{ color: "black", fontSize: 15 }}>Order</Text>
                        </View>
                        <View style={styles.doubeNumberListTime}>
                            <Text style={{ color: "black", fontSize: 15 }}>Time</Text>
                        </View>
                        <View style={styles.halfNumberListTime}>
                            <Text style={{ color: "black", fontSize: 15 }}>Attempts</Text>
                        </View>
                        <View style={styles.emptyHalfNumberListTime}>
                            <Text > </Text>
                        </View>
                    </View>
                </TouchableOpacity>


                <ScrollView tabLabel='numbers' style={styles.tabView}>
                    <ListView
                        style={styles.tabView}
                        enableEmptySections={true}
                        showsVerticalScrollIndicator={true}
                        dataSource={this.dataSource.cloneWithRows(this.state.listScore)}
                        renderRow={(rowData, sectionID, rowID) => this._renderScore(rowData, sectionID, rowID)}
                    />
                </ScrollView>
                {this._renderfooter()}

                <View style={styles.containerFooterError}></View>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    subHeader1: {
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#2c3e50'
    },
    settingShare: {
        marginLeft: 10,
    },

    headerContainerTab: {
        flexDirection: 'column',
        backgroundColor: "#7AAB89",
        height: 40
    },
    blockNumber: {
        backgroundColor: '#1abc9c',
        margin: 2,
        width: 40,
        height: 40,
        borderRadius: 10,
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
    buttonValid: {
        width: 70,
        borderRadius: 10,
        height: 40,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCancel: {
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
    blockOK: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    NumberListContainer: {
        height: 30,
        borderRadius: 0,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    NumberListHeader: {
        height: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    emptyHalfNumberListTime: {
        alignItems: 'center',
        flex: 1,
        height: 30,
        backgroundColor: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    halfNumberListTime: {
        alignItems: 'center',
        flex: 2,
        height: 30,
        backgroundColor: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    doubeNumberListTime: {
        alignItems: 'center',
        flex: 3,
        height: 30,
        backgroundColor: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    halfNumberListTimeText: {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: '#77b5fe'
    },
    NumberListTime: {
        flex: 1,
        flexDirection: 'row',
        height: 30,
        backgroundColor: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    footer: {
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#2c3e50'
    },
    container: {
        width: width,
        height: height,
    },
    containerTab: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
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
    containerFooter: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: 'black'
    },
    containerFooterBox: {
        flex: 1,
        flexDirection: 'row'
    },
    mainContainer: {
        flex: 1
    },
    text: {
        marginTop: 25,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
        color: '#fff'
    },

    underlineStyle: {
        backgroundColor: 'white',
        height: 2
    },
    rowModale: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#eee",
    },
    showHideText: {
        fontWeight: 'bold',
        color: "#000",
        fontSize: 30,
    },
    containerFooterError: {
        height: 25,
        backgroundColor: '#2c3e50',
        width: width
    }
});
module.exports = Score;