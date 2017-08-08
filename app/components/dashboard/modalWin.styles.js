import { StyleSheet, Dimensions } from 'react-native';
let {width, height} = Dimensions.get('window');
let height_window = height - 25;

export default styles = StyleSheet.create({

    //Header
    header: {
        justifyContent: 'center',
        alignItems: "center",

        width: width,
        height: height_window / 6
    },
    headerSolution: {
        justifyContent: 'center',
        alignItems: "center",

        width: width,
        height: height_window * 2 / 3
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
    globalModal: {
        backgroundColor: 'rgba(500, 500, 500, 0.7)',
        justifyContent: 'center',
        alignItems: "center",
        width: width,
        height: height
    },
    modal: {
        backgroundColor: 'rgba(500, 500, 500, 0)',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
        flexDirection: 'column',
        height: height_window * 2 / 3
    },
    modalSolution: {
        backgroundColor: 'rgba(500, 500, 500, 0.5)',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column',
        width: width,
        height: height / 3
    },
    modalImage: {
        height: height_window / 3 - 20,
        width: width - 65

    },
    modalLign: {
        justifyContent: 'center',
        alignItems: "center",
        width: width,
        height: height_window / 3,
        flexDirection: 'row',
        flex: 1
    },
    modalSecondCarre: {
        margin: 10,
        borderColor: "rgba(98,163,207,1)",
        borderWidth: 3,
        backgroundColor: 'rgba(154,193,255,  1)',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column'
    },
    columnScore: {
        width: 50,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column'
    },
    columnScoreWin: {
        width: 100,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column'
    },
    modalSecondCarreUp: {
        width: width,
        backgroundColor: 'rgba(98,163,207,1)',
        justifyContent: 'center',
        alignItems: "center",
        flex: 1,
        flexDirection: 'row'
    },
    modalSecondCarreDown: {
        flex: 2,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row'
    },
    modalSecondCarreLose: {
        margin: 10,
        borderColor: "rgba(189,0,0,1)",
        borderWidth: 3,
        backgroundColor: 'rgba(255,61,61, 1)',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column'
    },
    modalSecondCarreUpLose: {
        width: width,
        backgroundColor: 'rgba(189,0,0,1)',
        justifyContent: 'center',
        alignItems: "center",
        flex: 1,
        flexDirection: 'row'
    },
    modalSecondCarreDownLose: {
        flex: 2,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row'
    },
    modalSecondLign: {
        margin: 10,
        borderColor: "rgba(98,163,207,1)",
        borderWidth: 3,
        backgroundColor: 'rgba(154,193,255,  1)',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row'
    },
    modalSecondLignLose: {
        margin: 10,
        borderRadius: 10,
        borderColor: "rgba(189,0,0,1)",
        borderWidth: 3,
        backgroundColor: 'rgba(255,61,61, 0.8)',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row'
    },
    modalSecondLignButton: {
        width: width,
        height: height_window / 3,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column',
        flex: 1
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
        fontSize: 12,
    },
    TextRound: {
        fontWeight: 'bold',
        color: "red",
        fontSize: 15,
    },
    Textscore: {
        fontWeight: 'bold',
        color: "white",
        fontSize: 14,
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
        fontSize: 17,
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
        height: 40,
        width: 100,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,

    },
    buttonShare: {
        backgroundColor: "grey",
        height: 35,
        width: 70,
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

        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    recordImage: {

        resizeMode: "stretch",
        height: 80,
        width: 80,
    },
    containerFooterError: {
        height: 50,
        backgroundColor: 'rgba(500, 500, 500, 0)',
        width: width
    },
    containerIndicator: {
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        width: width
    },
});