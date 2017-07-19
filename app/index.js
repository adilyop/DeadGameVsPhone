import Dashboard from './components/dashboard/dashboard.component';
import DashboardPhone from './components/dashboard/dashboard.phone';
import HowToPlay from './components/dashboard/howToPlay';
import Score from './components/dashboard/score';
import Share from './components/dashboard/share';
import Accueil from './components/dashboard/accueil';
import React, { Component } from 'react';

import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
    TouchableHighlight,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;




var App = React.createClass({
  render() {
    return (
      <Router>
        <Scene key="DashboardPhone"
          component={DashboardPhone}
          title="DashboardPhone"
          hideNavBar
        />
        <Scene key="Accueil"
          component={Accueil}
          title="Accueil"
          hideNavBar
          initial
        />
        <Scene key="dashboard"
          component={Dashboard}
          title="Dashboard"
          hideNavBar
        />
        <Scene
          key="howToPlay"
          component={HowToPlay}
          title="HowToPlay"
          hideNavBar
        />
        <Scene
          key="score"
          component={Score}
          title="Score"
          hideNavBar
        />
        <Scene
          key="share"
          component={Share}
          title="Share"
          hideNavBar
        />
      </Router>
    );
  }
});

var communityLoansMobileApp = React.createClass({
    getInitialState: function () {
        return {
            loading: false,//true
        }
    },
    componentWillMount: function () {
        this.timeOut();
    },

    timeOut() {
        var self = this;
        setTimeout(function () {
            self.setState({ loading: false })
        }, 500);
    },
    render() {
        if (this.state.loading) {
            return (
            <Image
                    style={styles.container}
                    source={require('./images/acceuil.png')}
                    >
                    <View > 
                         <Image
                    style={styles.logo}
                    source={require('./images/icon.png')}
                    >
                </Image>
                    </View>
                </Image>
            );
        } else {
            return (
                <View style={styles.flex}>
                            <App>

                            </App>
                </View>
            );
        }
    },
});

var styles = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: ScreenHeight - 80,
        top: 56
    },
    container: {
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: ScreenWidth,
        height: ScreenHeight
    },
    flex: {
        flex: 1,
        width: ScreenWidth,
        height: ScreenHeight
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        backgroundColor: '#F5FCFF',
    },
    actionButton: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#16214D',
        borderRadius: 5,
        margin: 8,
    },
    actionButtonText: {
        color: '#ffffff',
    },
    message: {
        fontFamily: 'HelveticaNeue-Thin',
        fontSize: 14,
        alignSelf: 'center',
    },
    // Header View
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 30,
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 10,
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 20,
    },
    logo: {
        height: 60,
        width: 80
    }
});

export default communityLoansMobileApp; 