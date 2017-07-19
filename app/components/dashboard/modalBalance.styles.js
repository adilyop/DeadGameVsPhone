import { StyleSheet, Dimensions } from 'react-native';
let {width, height} = Dimensions.get('window');

export default styles = StyleSheet.create({

    //Header
    header: {
        justifyContent: 'center',
        alignItems: "center"
    },
    //modal
    modal: {
            backgroundColor:'rgba(500, 500, 500, 0.9)',
        justifyContent: 'center',
        alignItems: "center",
        width: width,
        height: height
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
        fontSize: 50,
    },
    showHideText: {
        fontWeight: 'bold',
        color: "#000",
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
    buttonValid: {
        backgroundColor: "#2fb987",
        bottom: 10,
        right: 15,
        position: "absolute"
    },
    h3: {
        color: "#999",
        fontSize: 18,
        fontWeight: 'bold'
    },
    centerElement: {
        alignItems: "center",
    },
    modalPart:{

    },

  configMyIp: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'white'
  },

  configHalfMyIpAddress: {
    alignItems: 'center',
    flex: 1,
    height: 30
  },
  configdDoubeMyIpAddress: {
    alignItems: 'center',
    flex: 3,
    height: 30,
    backgroundColor: 'white'
  },
    configContainerNumbersRow1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    configBlockEmpty: {
        margin: 2,
        elevation: 20,
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});