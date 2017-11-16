/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Dimensions, Alert } from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import LinearGradient from 'react-native-linear-gradient';
var {height, width} = Dimensions.get('window');
import axios from 'axios';

export default class Scores extends Component<{}> {

  constructor(props){
    super(props);
    this.press = this.press.bind(this);
    this.getmatches = this.getmatches.bind(this);
    this.state={
      headerMargin:10,
      teams:[['real madrid','fc barcelona']],
      nbMatches: 4,
      data:[],
    }
  }

  componentDidMount(){
    console.log(this.calendar.getSelectedDate().format('DD.MM.YYYY'));
    setInterval(() => {this.getmatches()},60000);
  }

  press(){
    console.log(this.calendar.getSelectedDate());
    this.calendar.setSelectedDate('09.11.2017','DD.MM.YYYY');
  }

  getmatches(){
    console.log('getting matches ...');
    axios.get('http://api.football-api.com/2.0/matches?comp_id=1265&from_date=06.11.2017&to_date=30.11.2017&Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76')
      .then(function (response){
        var arr = Object.values(response.data);
        console.log(arr);
        this.setState({data:arr});
        console.log(this.state.data);
      }.bind(this));

  }


  render() {

    const matches = this.state.data.map( (item) =>{
      return (
        <View elevation={20} style={[styles.gameView,{marginTop:15}]}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{item.formatted_date}</Text>
            <Text>{item.venue}</Text>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between', marginLeft:50, marginRight:50, marginBottom:10}}>
            <View style={{alignItems:'center'}}>
              <Image source={require('./assets/realmadrid.png')} style={{height:60, width:60}}/>
              <Text style={{fontSize:12}}>{item.localteam_name}</Text>
            </View>
            <View style={{marginTop:20, alignItems:'center'}}>
              <Text style={{fontSize:20, color:'black'}}>{item.localteam_score} : {item.visitorteam_score}</Text>
              <Text>{item.status}</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Image source={require('./assets/barcelona.png')} style={{height:60, width:60}}/>
              <Text style={{fontSize:12}}>{item.visitorteam_name}</Text>
            </View>
          </View>

          <View>
            <View style={{height:1, backgroundColor:'grey'}}></View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableHighlight style={{flexDirection:'row', marginLeft:40, marginTop:10, marginBottom:10}}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={require('./assets/stats.png')}/>
                    <Text style={{marginLeft:5, fontSize:12}}>View Statistics</Text>
                  </View>
                </TouchableHighlight>

                <View></View>

                <TouchableHighlight style={{flexDirection:'row', marginRight:40, marginTop:10, marginBottom:10}}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={require('./assets/comment.png')}/>
                    <Text style={{marginLeft:5, fontSize:12}}>Live comments</Text>
                  </View>
                </TouchableHighlight>
            </View>
          </View>
        </View>
        )}
      )

    return (
      <View style={styles.container}>

            <LinearGradient colors={['#FDBE21','#FAD961']} start={{x:0.0, y:0.0}} end={{x:1.0, y:0.0}} style={{justifyContent:'space-between'}}>
              <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between', marginLeft:20, marginRight:20, marginTop:15}}>
                <TouchableHighlight onPress={this.press}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={require('./assets/drawer.png')} style={{width:30, height:30}}/>
                  </View>
                </TouchableHighlight>
                <View style={{alignItems:'center'}}>
                  <Text ref='x' style={{fontSize:18, color:'black'}}>Champions League</Text>
                  <Text>Gameweek x</Text>
                </View>
                <View></View>
              </View>
              <CalendarStrip
                  calendarAnimation={{type: 'sequence', duration: 30}}
                  daySelectionAnimation={{type: 'background', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                  style={{height: 70, paddingTop: 0, paddingBottom: 10}}
                  calendarHeaderStyle={{color: 'transparent'}}
                  calendarColor={'transparent'}
                  dateNumberStyle={{color: 'black', fontWeight:'normal'}}
                  dateNameStyle={{color: 'black', fontWeight:'normal'}}
                  highlightDateNumberStyle={{color: 'black', fontWeight:'bold'}}
                  highlightDateNameStyle={{color: 'black', fontWeight:'bold'}}
                  disabledDateNameStyle={{color: 'black', fontWeight:'normal'}}
                  disabledDateNumberStyle={{color: 'black', fontWeight:'normal'}}
                  weekendDateNameStyle={{color: 'black', fontWeight:'normal'}}
                  weekendDateNumberStyle={{color: 'black', fontWeight:'normal'}}
                  ref={(elem) => this.calendar = elem}
                />
            </LinearGradient>


            <ScrollView>
              {matches}
            </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#F7F7F7',
},
gameView:{
  backgroundColor:'white',
  marginBottom:20,
  height:171,
  marginLeft:20,
  marginRight:20,
  borderRadius:5,
  justifyContent:'space-between',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 }
},
});
