import * as React from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:"",
      buttonState:"normal",
    }
  }

  handleBarCodeScan=async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:"clicked"
    })
  }
  
  getCameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    
    this.setState({
      hasCameraPermissions:status==="granted"
    })
  }

  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState
    if(buttonState==="clicked" && hasCameraPermissions){
      return(
        <BarCodeScanner
        onBarCodeScan={scanned? undefined : this.handleBarCodeScan}
        style={StyleSheet.absoluteFillObject}/>
      )
    }
    else if(buttonState==="normal"){
  return (
    <View style={styles.container}> 
    <Image style={styles.imageIcon}
      source={{
        uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg'}}/>

    <Text style={styles.text}> Bar Code Scanner </Text>

    <Text style={styles.displayText}>
      {hasCameraPermissions===true?this.state.scannedData:"Request Camera Permission"}</Text>   

    <TouchableOpacity style={styles.buttonScanner} onPress={this.getCameraPermissions}>
      <Text style={styles.buttontext}>Scan QR Code</Text>
    </TouchableOpacity>  
    </View>
  );
  }
  }
}

const styles = StyleSheet.create({
  imageIcon:{
    width:150,
    height:150,
    alignSelf:"center",
    marginLeft:-50
  },
  text:{
    textAlign:"center",
    fontSize:25
  }, 
  buttonScanner:{
    width:"45%",
    height:40,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#1AA3E9",
  },
  buttontext:{
    fontSize :20,
    color:"#000000",
    fontWeight:"bold"
  },
  container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center"
  }
});
