import { StyleSheet, Dimensions } from 'react-native';
let {width, height} = Dimensions.get('window');
let height_window = height - 25;

export default styles = StyleSheet.create({

    //Header
    header: {
        justifyContent: 'center',
        alignItems: "center",
        
        width: width,
        height: height_window/3
    },
    headerSolution: {
        justifyContent: 'center',
        alignItems: "center",
        
        width: width,
        height: height_window*2/3
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
    //modal
    modal: {
            backgroundColor:'rgba(500, 500, 500, 0)',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
        flexDirection: 'column',
        height: height_window * 2 /3
    },
    modalSolution: {
            backgroundColor:'rgba(500, 500, 500, 0.5)',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column',
        width: width,
        height: height/3
    },
    modalImage: {
        height:height_window / 3 - 20,
        width: width - 65

    },
    modalLign: {
        justifyContent: 'center',
        alignItems: "center",
        width: width,
        height: height_window/3,
        flexDirection: 'row',
        flex:1
    },
    modalSecondLign: {
            backgroundColor:'rgba(500, 500, 500, 0.65)',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row'
    },
    modalSecondLignButton: {
        width: width,
        height: height_window/3,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column',
        flex:1
    },
    modalColumn: {
        justifyContent: 'center',
        alignItems: "center",
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#eee",
    },
    column: {
        width: width / 2
    },
    modalContent: {
        alignSelf: 'center'
    },
    showHideTextHeader: {
        fontWeight: 'bold',
        color: "#000",
        fontSize: 40,
    },
    TextShare: {
        fontWeight: 'bold',
        color: "#fff",
        fontSize: 15,
    },
    TextRecord: {
        fontWeight: 'bold',
        color: "#fff",
        fontSize: 15,
    },
    TextNumber: {
        fontWeight: 'bold',
        color: "#1abc9c",
        fontSize: 30,
    },
    TextRestart: {
        fontWeight: 'bold',
        color: "#fff",
        fontSize: 20,
    },
    TextWin: {
        fontWeight: 'bold',
        color: "red",
        fontSize: 30,
    },
    contentHiden: {
        margin: 0,
        height: 0,
        width: 0,
        opacity: 0
    },
    input: {
        borderColor: "#eee",
        borderWidth: 0.5,
        borderRadius: 2,
        color: "#999",
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonRestart: {
        backgroundColor: '#1abc9c',
        height: 50,
        width: 120,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,

    },
    buttonShare: {
        backgroundColor: "grey",
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    h3: {
        color: "#999",
        fontSize: 18,
        fontWeight: 'bold'
    },
    centerElement: {
        alignItems: "center",
    },
    record: {
        height: 130,
        width:50,
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    containerFooterError: {
        height: 25,
        backgroundColor: '#ffeead',
        width: width
    },
    containerIndicator :{
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        width: width
    },
});