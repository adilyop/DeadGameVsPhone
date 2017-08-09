'use strict';

import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
  Image,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  StyleSheet, Vibration,
  ScrollView,
  ActivityIndicator,
  PanResponder, BackAndroid,
  Animated, Modal, TouchableHighlight,
  Dimensions
} from 'react-native';

var {width, height} = Dimensions.get('window');
var width_window = width;
var width_drag = width / 4;
var height_window = height - 25;
let CIRCLE_RADIUS = 36;
var DATA_KEY = 'adil';
var guesses = [];
var allowDuplicates = false;
var numPeg = 4;
var numCol = 10;
let Window = Dimensions.get('window');
import { takeSnapshot } from "react-native-view-shot";
import { Actions } from 'react-native-router-flux';
import { NetworkInfo } from 'react-native-network-info';
import Icon from 'react-native-vector-icons/Ionicons';
import { addScoreRow, getAllScore } from '../../services/database';
import ModalComponent from './ModalComponent';
import ModalWinTime from './ModalWinTime';
import ModalSolution from './ModalSolution';
import ModalIndicator from './ModalIndicator';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob'

var Sound = require('react-native-sound');
let self;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      showIndicator: false,
      colorText: "white",
      showModalWinTime: false,//false
      isHidePhoneView: false,
      showReplay: false, // false
      flexRight: new Animated.Value(15),
      flexLeft: new Animated.Value(15),
      myNumber: ["", "", "", ""],
      showNumber: [true, true, true, true, true, true, true, true, true, true],
      showProposedNumber: [true, true, true, true],
      backgroundColorScrollviewMe: 'rgba(500,500, 500, 0.2)',
      contentHeight: 0,
      scrollViewHeight1: 0,
      value: {
        format: "png",
        quality: 0.9,
        result: "base64",
        snapshotContentContainer: false,
      },
      curTime: "00:00:00",
      curTimeInfo: "00:00:00",
      roundInfo: 0,
      round: 0,
      userWin: 0,
      phoneWin: 0,
      second: 0,
      solutionModalVisible: false,
      startModalVisible: true,
      visibleShare: false,
      winModalVisible: false,//false
      menuModalVisible: false,
      myListNumbers: [{
        numberProposed: "Number",
        mort: "Bull",
        blesse: "Cow",
      }],
      backgroundColorNumber: "grey",
      rows: 0,
      numberProposed: ["_", "_", "_", "_"],
      showDraggable: [false, false, false, false, true, true, true, true, true, true],
      pan0: new Animated.Value,
    };

  }
  _snap(refname) {
    takeSnapshot(this.refs[refname], this.state.value)
      .then(res => alert(res))
      .catch(error => (alert(error)));
  }


  componentWillMount() {
    this._timer();
    var randomNumber = this.generateNumber()
    this.setState({ randomNumber: "" + randomNumber })
  }

  _timer() {
    setInterval(() => {
      this.setState({
        second: this.state.second + 1,
        curTime: this._secondToTime(this.state.second + 1)
      })
    }, 1000)
  }
  onCancel() {
    console.log("CANCEL")
    this.setState({ visible: false });
  }

  _share(refname) {
    var self = this;
    this.setState({ showModalWinTime: false })
    takeSnapshot(this.refs[refname], this.state.value)
      .then(res => {
        Actions.share({ shareContent: res });
        self._replay();
      })
      .catch(error => (alert(error)));
  }
  _secondToTime(second) {
    var date = new Date(null);
    date.setSeconds(second); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);
    return result;
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
  _solution() {
    this._showStartModal()
  }

  _replay() {
    this.refs._scrollView1.scrollTo({ x: 0, y: 0, Animated: true });
    var randomNumber = this.generateNumber();
    this.setState({
      showNumber: [true, true, true, true, true, true, true, true, true, true],
      numberProposed: ["_", "_", "_", "_"],
      round: 0,
      rows: 0,
      second: 0,
      curTime: "00:00:00",
      backgroundColorNumber: "grey",
      randomNumber: "" + randomNumber,
      myListNumbers: [{
        numberProposed: "Number",
        mort: "Bull",
        blesse: "Cow",
      }],
    });
  }

  _campare(guessedNumber) {
    var res = { numberProposed: guessedNumber[0] + "" + guessedNumber[1] + "" + guessedNumber[2] + "" + guessedNumber[3], mort: 0, blesse: 0 };
    var randomNumber = this.state.randomNumber
    for (var i = 0; i < randomNumber.length; i++) {
      for (var j = 0; j < guessedNumber.length; j++) {
        if (randomNumber[i] == guessedNumber[j]) {
          if (i == j) res.mort = Number(res.mort) + 1;
          else res.blesse = Number(res.blesse) + 1;
        }
      }
    }
    return res
  }
  onPrevious() {
    Actions.pop();
  };
  _campareMyNumber(guessedNumber) {
    var res = { numberProposed: guessedNumber[0] + "" + guessedNumber[1] + "" + guessedNumber[2] + "" + guessedNumber[3], mort: 0, blesse: 0 };
    var randomNumber = this.state.myNumber
    for (var i = 0; i < randomNumber.length; i++) {
      for (var j = 0; j < guessedNumber.length; j++) {
        if (randomNumber[i] == guessedNumber[j]) {
          if (i == j) res.mort = Number(res.mort) + 1;
          else res.blesse = Number(res.blesse) + 1;
        }
      }
    }
    return res
  }
  _recyncSolution() {
    Animated.spring(this.state.pan0, { toValue: { x: 0, y: 0 } }).start();
    this.setState({
      showDraggable: [true, true, true, true, true, true, true, true, true, true]
    })
  }

  randomRGB = () => 100 + Math.random() * 85
  getColor() {
    let r = this.randomRGB()
    let g = this.randomRGB()
    let b = this.randomRGB()
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }


  _renderButtonOK() {
    var a = this.state.showIndicator
    if (!a) {

      return (
        <TouchableOpacity
          onPress={() => this._OK()}
          style={styles.blockOK}>
          <Image style={styles.blockOK}
            source={require('../../images/burtton_red.png')}>

            <Icon name="md-checkmark-circle" color='#fff' size={30} ></Icon>
          </Image>
        </TouchableOpacity>
      );
    } else {

      return (
        <View
          style={styles.blockOK}>
          <Image style={styles.blockOK}
            source={require('../../images/burtton_red.png')}>
            <ActivityIndicator />
          </Image>
        </View>
      );
    }
  }

  _renderButtonReplay() {
    var a = this.state.showReplay
    if (!a) {

      return (
        <TouchableOpacity
          onPress={() => this._confirm()}
          style={styles.blockOK}>

          <Image style={styles.blockOK}
            source={require('../../images/burtton_red.png')}>
            <Icon name="md-refresh-circle" color='#fff' size={30} ></Icon>
          </Image>
        </TouchableOpacity>
      );
    } else {

      return (
        <TouchableOpacity
          onPress={() => this._replay()}
          style={styles.blockReplay}>

          <Image style={styles.blockReplay}
            source={require('../../images/burtton_red.png')}>
            <Text  style={styles.TextReplay} >Replay ?</Text>
          </Image>
        </TouchableOpacity>
      );
    }
  }

  _confirm() {
    this.setState({
        showReplay: true,
      })
      setTimeout(() => {

    this.setState({
        showReplay: false,
      })
        }, 5000);
}


  _renderNumbers(item, sectionID, rowID) {
    return (
      <TouchableOpacity style={[styles.NumberListContainer, { backgroundColor: this.state.backgroundColorScrollviewMe }]}       >
        <View style={styles.NumberListTime}>
          <View style={styles.doubeNumberListTime}>
            <Text style={{ color: "black", fontSize: 20 }}> {item.numberProposed} </Text>
          </View>
          <View style={styles.halfNumberListTime}>
            <Text style={{ color: "black", fontSize: 20 }}> {item.mort} </Text>
          </View>
          <View style={styles.halfNumberListTime}>
            <Text style={{ color: "black", fontSize: 20 }}> {item.blesse} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  _renderNumbersPhone(item, sectionID, rowID) {
    return (
      <TouchableOpacity style={[styles.NumberListContainer, { backgroundColor: this.state.backgroundColorScrollviewPhone }]}       >
        <View style={styles.NumberListTime}>
          <View style={styles.doubeNumberListTime}>
            <Text style={{ color: "black", fontSize: 20 }}> {item.numberProposed} </Text>
          </View>
          <View style={styles.halfNumberListTime}>
            <Text style={{ color: "black", fontSize: 20 }}> {item.mort} </Text>
          </View>
          <View style={styles.halfNumberListTime}>
            <Text style={{ color: "black", fontSize: 20 }}> {item.blesse} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderButtonOK() {
    var a = this.state.showIndicator
    if (!a) {

      return (
        <TouchableOpacity
          onPress={() => this._OK()}
          style={styles.blockOK}>
          <Image style={styles.blockOK}
            source={require('../../images/burtton_red.png')}>

            <Icon name="md-checkmark-circle" color='#fff' size={30} ></Icon>
          </Image>
        </TouchableOpacity>
      );
    } else {

      return (
        <View
          style={styles.blockOK}>
          <Image style={styles.blockOK}
            source={require('../../images/burtton_red.png')}>
            <ActivityIndicator />
          </Image>
        </View>
      );
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
      var whoosh = new Sound('sound_back.wav', Sound.MAIN_BUNDLE, (error) => {
        whoosh.play((success) => {
          whoosh.release();
        });
      });
      showNumber[number] = true;
      listNumberProposed[position] = "_";
      this.setState({
        numberProposed: listNumberProposed,
        showNumber: showNumber
      })
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
      var whoosh = new Sound('sound_number.wav', Sound.MAIN_BUNDLE, (error) => {
        whoosh.play((success) => {
          whoosh.release();
        });
      });
    }
    else if (numberProposed[1] === "_") {
      var showNumber = this.state.showNumber;
      showNumber[number] = false;
      numberProposed[1] = number;
      this.setState({
        numberProposed: numberProposed,
        showNumber: showNumber
      })
      var whoosh = new Sound('sound_number.wav', Sound.MAIN_BUNDLE, (error) => {
        whoosh.play((success) => {
          whoosh.release();
        });
      });
    }
    else if (numberProposed[2] === "_") {
      var showNumber = this.state.showNumber;
      showNumber[number] = false;
      numberProposed[2] = number;
      this.setState({
        numberProposed: numberProposed,
        showNumber: showNumber
      })
      var whoosh = new Sound('sound_number.wav', Sound.MAIN_BUNDLE, (error) => {
        whoosh.play((success) => {
          whoosh.release();
        });
      });
    }
    else if (numberProposed[3] === "_") {
      var showNumber = this.state.showNumber;
      showNumber[number] = false;
      numberProposed[3] = number;
      this.setState({
        numberProposed: numberProposed,
        showNumber: showNumber
      })
      var whoosh = new Sound('sound_number.wav', Sound.MAIN_BUNDLE, (error) => {
        whoosh.play((success) => {
          whoosh.release();
        });
      });
    }
  }

  _OK() {

    var self = this;
    var numberProposed = this.state.numberProposed;
    if (numberProposed[0] !== "_" && numberProposed[2] !== "_"
      && numberProposed[1] !== "_" && numberProposed[3] !== "_") {
      var isValide = this._validate()
      if (isValide) {
        self.setState({
          showIndicator: false
        })
      } else {
        this.setState({
          colorText: "red"
        })
        var whoosh = new Sound('sound_false.mp3', Sound.MAIN_BUNDLE, (error) => {
          whoosh.play((success) => {
            whoosh.release();
          });
        });
        setTimeout(function () {
          self.setState({
            colorText: "white"
          })
        }, 1000);

      }
    }
  }

  _validate() {
    setTimeout(() => {
      this.refs._scrollView1.scrollTo({ x: 0, y: this.state.scrollViewHeight1, Animated: true });
    }, 500);
    var numberProposed = this.state.numberProposed
    var resCampare = this._campare(numberProposed)
    var myListNumbers = this.state.myListNumbers;

    myListNumbers.push(resCampare);
    this.setState({
      round: this.state.round + 1,
      myListNumbers: myListNumbers
    });
    if (resCampare.mort == 4) {
      this.setState({
        showModalWinTime: true,
        curTimeInfo: this.state.curTime,
        roundInfo: this.state.rows + 1,
      })
      guesses = [];
      var whoosh = new Sound('sound_win.wav', Sound.MAIN_BUNDLE, (error) => {
        whoosh.play((success) => {
          whoosh.release();
        });
      });
      return true;
    } else {
      this.setState({
        rows: this.state.rows + 1
      })
      return false;
    }
  }

  start() {
    this._replay();
  }
  _toggleModalWinTime() {
    var self = this;
    this.setState((prevState, props) => {
      return {
        showModalWinTime: !prevState.showModalWinTime
      }
    });
    this._replay()
  };
  render() {
    var self = this;
    return (

      <View style={styles.flex} ref="header" collapsable={false}>
        <Image style={styles.container}
          source={require('../../images/final_backgroundaccueil.png')}

        //adUnitID="ca-app-pub-1835572944842794/6748215105"
        >
          <ModalWinTime
            animationType={"fade"}
            visible={this.state.showModalWinTime}
            toggleModalWinTime={this._toggleModalWinTime.bind(this)}
            share={this._share.bind(this)}
            time={this.state.curTimeInfo}
            round={this.state.roundInfo}
          />
          <View style={[styles.containerHeader]}
          //source={require('../../images/header.png')}
          >
            <View style={styles.subHeader1}>
              <TouchableOpacity onPress={() => this.onPrevious()} style={styles.subHeaderLeft}>
                <Icon name="ios-arrow-back" color='#fff' size={40} ></Icon>
              </TouchableOpacity>


              <View style={styles.subHeaderCenter}>
                <Image
                  source={require('../../images/round.png')}
                  style={styles.containerRound}
                //source={require('../../images/screenEmpty.png')}
                >
                  <Text style={{ color: "white", fontSize: 25, fontWeight: 'bold' }}>{this.state.round}</Text>
                </Image>
              </View>


              <View style={styles.subHeaderRight}>
                <View style={styles.halfNumberListTimeText}>
                  <Text style={styles.headerTitleDown} > {this.state.curTime} </Text>
                </View>
              </View>
            </View>


            <View style={styles.viewHeaderGame}>

              <View style={styles.viewMarging} />

              <View style={styles.viewCenter}>
                <Text style={styles.headerTitleDown} >MASTER MIND</Text>
              </View>
              <View style={styles.viewMarging} />
            </View>


            <View style={styles.viewGame}>

              <View style={styles.viewMarging} />




              <Animated.View style={[styles.viewLeft, { flex: this.state.flexLeft }]}>

                <View style={[{
                  flex: 1
                }]}>



                  <ScrollView ref="_scrollView1" collapsable={false} tabLabel='numbers' style={styles.tabView}>
                    <ListView
                      style={styles.tabView}
                      enableEmptySections={true}
                      showsVerticalScrollIndicator={true}

                      onContentSizeChange={(w, h) => this.setState({ contentHeight: h })}
                      onLayout={ev => this.setState({ scrollViewHeight1: ev.nativeEvent.layout.height + 30 })}

                      dataSource={this.dataSource.cloneWithRows(this.state.myListNumbers)}
                      renderRow={(rowData, sectionID, rowID) => this._renderNumbers(rowData, sectionID, rowID)}
                    />
                  </ScrollView>
                </View>
              </Animated.View>

              <View style={styles.viewMarging} />
            </View>

          </View>




          <View style={[styles.containerFooter]}
          //source={require('../../images/footer.png')}
          >
            <View style={styles.containerFooterBox}>
              <View style={[styles.box]}>
                <View style={styles.containerNumbersColumn}>
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



                    {this._renderButtonOK()}

                  </View>


                  <View style={styles.containerNumbersRow3}>

                    {this._renderNumber(5)}
                    {this._renderNumber(6)}
                    {this._renderNumber(7)}
                    {this._renderNumber(8)}
                    {this._renderNumber(9)}
                     {this._renderButtonReplay()}
                  </View>



                  <AdMobBanner
                    bannerSize="Banner"
                    adUnitID="ca-app-pub-1835572944842794/6748215105"
                    testDeviceID="0123456789ABCDEF"
                    didFailToReceiveAdWithError={this.bannerError} />


                </View>
              </View>
            </View>
          </View>
        </Image>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  headerContainerTab: {
    flexDirection: 'column',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blockNumber: {
    backgroundColor: '#1abc9c',
    margin: 3,
    width: width_window / 9,

    height: width_window / 9,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  blockNumberFad: {
    backgroundColor: 'rgba(500,500, 500, 0.2)',
    margin: 3,
    width: width_window / 9,

    height: width_window / 9,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  blockEmpty: {
    margin: 2,
    width: width_window / 10,
    height: width_window / 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blockOK: {
    paddingBottom: 2,
    margin: 10,
    width: width_window / 9,

    height: width_window / 9,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NumberListContainer: {
    flex: 1,
    height: 30,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  NumberListContainerPhone: {
    flex: 1,
    height: 30,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  subHeader1: {
    width: width,
    backgroundColor: '#1b6a9f',
    alignItems: "center",
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.6)',
    height: 50,
  },
  subHeaderLeft: {
    marginLeft: 10,
    flex: 1,
  },
  subHeaderCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  subHeaderRight: {
    flex: 1,
  },

  userContainer: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: width_window / 2 - 25,
    borderRadius: 25,
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  headerSettingContainer: {
  },

  headerSettingShare: {

  },
  NumberListHeader: {
    height: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  NumberListTime: {
    //marginLeft: 20,
    //marginRight: 20,
    flexDirection: 'row',
    height: 30
  },
  viewHeaderGame: {
    height: 20,
    width: width,
    flexDirection: 'row'
  },
  viewGame: {
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    flex: 1
  },
  viewLeftHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white'
  },
  viewLeft: {
    backgroundColor: 'rgba(255,0,0, 0.3)',
    flexDirection: 'row'
  },
  viewMarging: {
    backgroundColor: 'rgba(50, 50, 100, 0.2)',
    flex: 2,
  },

  viewRight: {
    backgroundColor: 'rgba(255,255,0, 0.2);',
    height: height * 2 / 5,
    flexDirection: 'row'
  },
  viewRightHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white'
  },

  viewCenter: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NumberListTimeUp: {
    flexDirection: 'row',
    height: 50
  },
  halfNumberListTimeUp: {
    alignItems: 'center',
    flex: 1,
    height: 50
  },
  halfNumberListTime: {
    alignItems: 'center',
    flex: 1,
    height: 30
  },
TextReplay: {
        fontWeight: 'bold',
        color: "#fff",
        fontSize: 10,
    },
  doubeNumberListTime: {
    alignItems: 'center',
    flex: 3,
    height: 30
  },
  halfNumberListTimeText: {
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#423f3f'
  },
  footer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#9ac1ff',
    flex: 1,
    height: height_window,
    width: width,
    flexDirection: 'column'
  },
  containerRound: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 45,
    width: 45
  },
  blockReplay: {
    margin: 3,
    width: width_window / 7,

    height: width_window / 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerNumbersColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerNumbersColumnPlayer: {
    width: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerRowsColumnPlayer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerHeader: {
    height: (height_window) * 2 / 3,
    width: width
  },
  containerFooterError: {
    height: 25,
    backgroundColor: '#964500',
    width: width
  },
  containerFooter: {
    height: (height_window) / 3,
    width: width
  },
  containerFooterBox: {
    flex: 1,
    flexDirection: 'row'
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  box: {
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10
  },
  boxButtonRight: {
    flex: 1,
    flexDirection: 'column',
    width: width_window / 6,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    alignItems: 'center',
    backgroundColor: '#964500'
  },
  boxButtonLeft: {
    flex: 1,
    flexDirection: 'column',
    width: width_window / 6,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#964500'
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

  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  headerTitleUp: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000'
  },
  headerTitleDown: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 16,
  },
  underlineStyle: {
    backgroundColor: 'white',
    height: 2
  },
  //modal 
  header: {
    justifyContent: 'center',
    alignItems: "center",

    width: width,
    height: height * 2 / 3
  },
  //modal
  modal: {
    backgroundColor: 'rgba(500,500, 500, 0.9)',
    justifyContent: 'center',
    alignItems: "center",

    width: width,
    height: height / 3
  },
  rowModale: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#eee",
  },
  containerShare: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  showHideText: {
    fontWeight: 'bold',
    color: "#000",
    fontSize: 30,
  },
});

export default Dashboard;

