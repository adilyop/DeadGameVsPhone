import { StyleSheet, Dimensions } from 'react-native';
var {width, height} = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    //Header
    headerContainer: {
        flexDirection: 'column',
        backgroundColor: "#7AAB89"
    },
    underlineStyle: {
        backgroundColor: 'white',
        height: 2
    },
    //Row
    tabView: {
        flex: 1
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 250
    },
    campaignImage: {
        flex: 1,
        width: width - 60,
        height: 150,
        margin: 15
    },
    compaignLike: {
        width: 72,
        height: 80,
        marginLeft: 220,
        marginTop: 10
    },
    compaignGlobal: {
        flex: 1,
        marginLeft: 40,
        marginBottom: 30
    },
    compaignTitel: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    compaignRating: {
        flex: 1,
        flexDirection: 'row'
    },
    compaignReview: {
        marginLeft: 10,
        fontSize: 11
    },
    hr: {
        width: width,
        marginBottom: 10,
        height: 0.8,
        backgroundColor: "#eee"
    },
    textHr: {
        width: 80,
        marginTop: 5,
        height: 3,
        backgroundColor: "white",
        marginLeft: 51,
        marginRight: 51
    }
});
