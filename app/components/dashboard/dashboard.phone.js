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
import ModalWin from './ModalWin';
import ModalLose from './ModalLose';
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
      Amkhib: "Phone",
      colorText: "white",
      showModalIndicator: false,
      showReplay: false, // false
      showModalWin: false,
      showModalLose: false,
      isHidePhoneView: false,
      flexRight: new Animated.Value(15),
      flexLeft: new Animated.Value(15),
      myNumber: ["", "", "", ""],
      showNumber: [true, true, true, true, true, true, true, true, true, true],
      showProposedNumber: [true, true, true, true],
      backgroundColorScrollviewPhone: 'rgba(500,500, 500, 0.2)',
      backgroundColorScrollviewMe: 'rgba(500,500, 500, 0.2)',
      contentHeight: 0,
      scrollViewHeight1: 0,
      scrollViewHeight2: 0,
      value: {
        format: "png",
        quality: 0.9,
        result: "base64",
        snapshotContentContainer: false,
      },
      VS: "VS",
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
        numberProposed: "Num",
        mort: "B",
        blesse: "C",
      }],// todo remove 2 list
      phoneListNumbers: [{
        numberProposed: "Num",
        mort: "B",
        blesse: "C",
      }],
      backgroundColorNumber: "grey",
      rows: 0,
      numberProposed: ["_", "_", "_", "_"],
    };

  }

  _snap(refname) {
    takeSnapshot(this.refs[refname], this.state.value)
      .then(res => alert(res))
      .catch(error => (alert(error)));
  }


  componentWillMount() {
    //alert( 15 + (this.state.flexRight).getValue())
    this._timer(1000);
    var randomNumber = this.generateNumber()
    this.setState({ randomNumber: "" + randomNumber })


  }
  componentDidMount() {
    var self = this;
    setTimeout(function () {
      self._toggleModalIndicator();
    }, 500);

  }
  _share(refname) {
    this.setState({ showModalWin: false, showModalLose: false, showModalIndicator: false })
    takeSnapshot(this.refs[refname], this.state.value)
      .then(res => {
        Actions.share({ shareContent: res });
        ////////////////////
        var self = this;
        this.refs._scrollView1.scrollTo({ x: 0, y: 0, Animated: true });
        this.refs._scrollView2.scrollTo({ x: 0, y: 0, Animated: true });
        this.setState({
          rows: 0,
          second: 0,
          curTime: "00:00:00"
        })
        var randomNumber = this.generateNumber();
        this.setState({
          showNumber: [true, true, true, true, true, true, true, true, true, true],
          numberProposed: ["_", "_", "_", "_"],
          backgroundColorNumber: "grey",
          randomNumber: "" + randomNumber,
          myListNumbers: [{
            numberProposed: "Num",
            mort: "B",
            blesse: "C",
          }],
          phoneListNumbers: [{
            numberProposed: "Num",
            mort: "B",
            blesse: "C",
          }]
        });
        ///////////////////////
      })
      .catch(error => (alert(error)));
  }
  _secondToTime(second) {
    var date = new Date(null);
    date.setSeconds(second); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);
    return result;
  }
  _timer(timeOut) {
    setInterval(() => {
      this.setState({
        second: this.state.second + 1,
        curTime: this._secondToTime(this.state.second + 1)
      })
    }, timeOut)
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

  _replay() {
    var self = this;
    this.refs._scrollView1.scrollTo({ x: 0, y: 0, Animated: true });
    this.refs._scrollView2.scrollTo({ x: 0, y: 0, Animated: true });
    this.setState({
      showNumber: [true, true, true, true, true, true, true, true, true, true],
      numberProposed: ["_", "_", "_", "_"],
      rows: 0,
      second: 0,
      curTime: "00:00:00"
    })
    var randomNumber = this.generateNumber();
    this.setState({
      backgroundColorNumber: "grey",
      randomNumber: "" + randomNumber,
      myListNumbers: [{
        numberProposed: "Num",
        mort: "B",
        blesse: "C",
      }],
      phoneListNumbers: [{
        numberProposed: "Num",
        mort: "B",
        blesse: "C",
      }]
    });
    setTimeout(function () {
      self._toggleModalIndicator()
    }, 500);
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

  randomRGB = () => 100 + Math.random() * 85
  getColor() {
    let r = this.randomRGB()
    let g = this.randomRGB()
    let b = this.randomRGB()
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
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
            <Text style={styles.TextReplay} >Replay ?</Text>
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






  _renderHidePhoneView() {
    var a = this.state.isHidePhoneView
    if (!a) {
      return (
        <TouchableOpacity style={styles.viewCenter}
          onPress={() => this.hidePhoneView()}>
          <Icon name="ios-arrow-dropright" color='#fff' size={30} ></Icon>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.viewCenter}
          onPress={() => this.showPhoneView()}>
          <Icon name="ios-arrow-dropleft" color='#fff' size={30} ></Icon>
        </TouchableOpacity>
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
          showIndicator: true,
          colorText: "red"
        })
        var whoosh = new Sound('sound_false.wav', Sound.MAIN_BUNDLE, (error) => {
          whoosh.play((success) => {
            whoosh.release();
          });
        });
        setTimeout(function () {
          self.setState({
            colorText: "white"
          })
        }, 1000);

        setTimeout(function () {
          self.update();
          self.setState({
            showIndicator: false
          })
        }, 1000);

        setTimeout(() => {
          this.refs._scrollView2.scrollTo({ x: 0, y: this.state.scrollViewHeight2, Animated: true });
        }, 1500);

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
      myListNumbers: myListNumbers
    });
    if (resCampare.mort == 4) {
      this.setState({
        showModalWin: true,
        round: this.state.round + 1,
        userWin: this.state.userWin + 1,
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
        rows: this.state.rows + 1,
      })
      return false;
    }
  }

  start() {
    this.setState({ startModalVisible: false })
    this._replay();
  }

  hidePhoneView() {
    var self = this;
    Animated.timing(  // Animate over time
      self.state.flexRight,  // The animated value to drive
      {
        toValue: 0,  // Animate to opacity: 1, or fully opaque
      }).start();
    Animated.timing(  // Animate over time
      self.state.flexLeft,  // The animated value to drive
      {
        toValue: 30,  // Animate to opacity: 1, or fully opaque
      }).start();
    this.setState({
      Amkhib: "",
      VS: "",
      isHidePhoneView: true
    });
  }
  showPhoneView() {
    var self = this;
    Animated.timing(  // Animate over time
      self.state.flexRight,  // The animated value to drive
      {
        toValue: 15,  // Animate to opacity: 1, or fully opaque
      }).start();
    Animated.timing(  // Animate over time
      self.state.flexLeft,  // The animated value to drive
      {
        toValue: 15,  // Animate to opacity: 1, or fully opaque
      }).start();
    this.setState({
      Amkhib: "Phone",
      VS: "VS",
      isHidePhoneView: false
    });
  }
  _toggleModalIndicator() {
    this.setState((prevState, props) => {
      return {
        showModalIndicator: !prevState.showModalIndicator
      }
    });
  };
  _toggleModalWin() {
    var self = this;
    this.setState((prevState, props) => {
      return {
        showModalWin: !prevState.showModalWin
      }
    });
    setTimeout(function () {
      self._toggleModalIndicator()
    }, 500);
  };
  _toggleModalLose() {
    var self = this;
    this.setState((prevState, props) => {
      return {
        showModalLose: !prevState.showModalLose
      }
    });
    setTimeout(function () {
      self._toggleModalIndicator()
    }, 500);
  };
  refreshNumber(myNumber) {
    this.setState({
      myNumber: myNumber
    });
    this._replay();
  };
  render() {
    var self = this;
    return (

      <View style={styles.flex} ref="header" collapsable={false}>
        <Image
          source={require('../../images/final_backgroundaccueil.png')}
          style={styles.container}
        //source={require('../../images/screenEmpty.png')}
        >

          <ModalIndicator
            animationType={"fade"}
            visible={this.state.showModalIndicator}
            toggleModalIndicator={this._toggleModalIndicator.bind(this)}
            refreshNumber={this.refreshNumber.bind(this)}
          />
          <ModalWin
            animationType={"fade"}
            visible={this.state.showModalWin}
            toggleModalWin={this._toggleModalWin.bind(this)}
            share={this._share.bind(this)}
            round={this.state.round}
            userWin={this.state.userWin}
            phoneWin={this.state.phoneWin}
          />
          <ModalLose
            animationType={"fade"}
            visible={this.state.showModalLose}
            toggleModalLose={this._toggleModalLose.bind(this)}
            share={this._share.bind(this)}
            round={this.state.round}
            userWin={this.state.userWin}
            phoneWin={this.state.phoneWin}
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


              <View style={styles.containerNumbersColumnPlayer}>
                <View style={styles.containerRowsColumnPlayer}>
                  <Icon name="md-contact" color='#fff' size={15} ></Icon>
                  <Text style={styles.headerTitleDown} > : {this.state.userWin}</Text>
                </View>
                <View style={styles.containerRowsColumnPlayer}>
                  <Icon name="ios-ionitron" color='#fff' size={15} ></Icon>
                  <Text style={styles.headerTitleDown} > : {this.state.phoneWin}</Text>
                </View>
              </View>
            </View>


            <View style={styles.viewHeaderGame}>

              <View style={styles.viewMarging} />
              <Animated.View style={[styles.viewLeftHeader, { flex: this.state.flexLeft }]}>

                <View style={styles.headerPlayer1}>
                  <Text style={styles.headerTitleDown} >User ({this.state.myNumber})</Text>
                </View>

              </Animated.View>

              <View style={styles.viewCenter}>
                <Text style={styles.headerTitleDown} > {this.state.VS} </Text>
              </View>

              <Animated.View style={[styles.viewRightHeader, { flex: this.state.flexRight }]}>

                <View style={styles.headerPlayer2}>
                  <Text style={styles.headerTitleDown} >{this.state.Amkhib}</Text>
                </View>

              </Animated.View>
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


              {this._renderHidePhoneView()}

              <Animated.View style={[styles.viewRight, { flex: this.state.flexRight }]}>


                <View style={[{
                  flex: 1
                }]}>



                  <ScrollView ref="_scrollView2" collapsable={false} tabLabel='numbers' style={styles.tabView}>
                    <ListView
                      style={styles.tabView}
                      enableEmptySections={true}
                      showsVerticalScrollIndicator={true}

                      onContentSizeChange={(w, h) => this.setState({ contentHeight: h })}
                      onLayout={ev => this.setState({ scrollViewHeight2: ev.nativeEvent.layout.height + 30 })}

                      dataSource={this.dataSource.cloneWithRows(this.state.phoneListNumbers)}
                      renderRow={(rowData, sectionID, rowID) => this._renderNumbersPhone(rowData, sectionID, rowID)}
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
                </View>
              </View>
            </View>
          </View>
        </Image>
      </View>
    );
  }

  /////function for intelelgence artificial /Dashboar
  generateGuess() {
    var retVal = [];
    for (var i = 0; i < numPeg; ++i) {
      var randColor = Math.floor(Math.random() * numCol);
      if (!allowDuplicates) {
        while (retVal.indexOf(randColor) != -1) {
          randColor = Math.floor(Math.random() * numCol);
        }
      }
      retVal.push(randColor);
    }
    return retVal;
  }
  contains(arr, el) {
    var length = arr.length;
    var i;
    for (i = 0; i < length; ++i) {
      if (arr[i] === el) {
        return true;
      }
    }
    return false;
  }
  judgeGuess(answer, guess) {
    var length = answer.length;
    var i, j;
    var retVal = { allCorrect: 0, colorCorrect: 0 };
    var skipList = [];
    for (i = 0; i < length; ++i) {
      if (answer[i] == guess[i]) {
        retVal.allCorrect++;
        skipList.push(i);
      }
    }
    for (i = 0; i < length; ++i) {
      if (this.contains(skipList, i)) continue;
      for (j = 0; j < length; ++j) {
        if (this.contains(skipList, j)) continue;
        if (answer[i] == guess[j]) {
          retVal.colorCorrect++;
          break;
        }
      }
    }
    return retVal;
  }
  guessContradicts(guess) {
    var contradictionFound = false;
    var self = this;
    guesses.forEach(function (evidence, index) {
      var evidenceObj = evidence.data.DATA_KEY;
      if (evidenceObj && evidenceObj.allCorrect) {
        var judgement = self.judgeGuess(guess, evidenceObj.guess)
        if ((judgement.allCorrect != evidenceObj.allCorrect) || (judgement.colorCorrect != evidenceObj.colorCorrect)) {
          contradictionFound = true;
        }
      }
    });
    return contradictionFound;
  }
  update() {
    var guess;
    guess = this.generateGuess();
    while (this.guessContradicts(guess)) {
      guess = this.generateGuess();
    }
    var resCampare = this._campareMyNumber(guess)
    var allCorrect = resCampare.mort
    var colorCorrect = resCampare.blesse
    var newGuessLine = { data: { DATA_KEY: { guess: guess, allCorrect: allCorrect, colorCorrect: colorCorrect } } };
    guesses.push(newGuessLine);
    if (resCampare.mort == 4) {
      this.setState({
        showModalLose: true,
        round: this.state.round + 1,
        phoneWin: this.state.phoneWin + 1,
      })
      guesses = [];
      var whoosh = new Sound('sound_lose.wav', Sound.MAIN_BUNDLE, (error) => {
        whoosh.play((success) => {
          whoosh.release();
        });
      });
    } else {
      this.setState({
        rows: this.state.rows + 1
      })
    }
    var phoneListNumbers = this.state.phoneListNumbers;
    phoneListNumbers.push(resCampare);
    this.setState({
      phoneListNumbers: phoneListNumbers
    });
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
    width: width_window / 8,

    height: width_window / 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  blockNumberFad: {
    backgroundColor: 'rgba(500,500, 500, 0.2)',
    margin: 3,
    width: width_window / 8,

    height: width_window / 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  blockEmpty: {
    margin: 2,
    width: width_window / 9,
    height: width_window / 9,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blockOK: {
    margin: 3,
    width: width_window / 8,

    height: width_window / 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockReplay: {
    margin: 3,
    width: width_window / 7,

    height: width_window / 8,
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
    justifyContent: 'space-between',
    alignItems: "center",
    flexDirection: 'row',
    borderBottomColor: "black",
    borderBottomWidth: 5,
    height: 50,
  },
  TextReplay: {
    fontWeight: 'bold',
    color: "#fff",
    fontSize: 10,
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

  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  headerPlayer1: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: 'red'
  },
  headerPlayer2: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: 'yellow'
  },

  viewHeaderGame: {
    marginTop: 20,
    width: width,
    flexDirection: 'row'
  },
  viewGame: {
    flexDirection: 'row',
    flex: 1
  },
  viewLeftHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white'
  },
  viewLeft: {
    backgroundColor: 'rgba(255, 0, 0, 0.2);',
    height: height * 2 / 5,
    flexDirection: 'row'
  },
  viewMarging: {
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
  doubeNumberListTime: {
    alignItems: 'center',
    flex: 3,
    height: 30
  },
  halfNumberListTimeText: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#ffeead'
  },
  footer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    height: height,
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
  containerTab: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white'
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
    flex: 1,
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

