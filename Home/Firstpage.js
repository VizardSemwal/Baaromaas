import React, {useRef,useEffect,useState} from 'react';
import {Animated, SafeAreaView, StatusBar, StyleSheet,Text,View,FlatList, TouchableOpacity} from 'react-native';

import ListItem from '../Components/ListItem';

import Location from './Location';
import Popular from './Popular';

import axios from 'react-native-axios'
import url from '../Constants/Database';
import Colors from '../Constants/Colors';
import {List} from 'react-native-paper'
import Banner from './Banner';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';



const Firstpage = (props) => {
  const [data,setdata] =useState([]);

  const ref = useRef(null);

  useEffect(() => {

    axios.get(`${url}/HomePage/Categories.php`)
      .then(function (response) {
       
        setdata(response.data)

      })
      .catch(function (error) {
        console.log(error);
        return(false);
      });
    
    
}, [])




  const ShowHeader=()=>{
      return(<View style={{width:"100%"}}>
          
            <Banner {...props}/>
            <Location {...props}/> 
            <Popular {...props}/>
          </View>
      )
  }

  const ShowFooter=()=>{
    return(<View style={{width:"100%"}}>
         <List.Section>
    <List.Subheader>About Us</List.Subheader>
    <List.Item 
   
    onPress={()=>props.navigation.navigate("Terms")}
    title="Terms & Condition" left={() => <List.Icon icon="lock-outline" />} />
    <List.Item title="Privacy Policy"
     onPress={()=>props.navigation.navigate("Privacy")}
    left={() => <List.Icon icon="fingerprint" />} />
    <List.Item title="Cancellation Policy" 
     onPress={()=>props.navigation.navigate("Cancelation")}
    left={() => <List.Icon icon="close-circle" />} />
    <List.Item title="Contact Us" 
     onPress={()=>props.navigation.navigate("Contact")}
    left={() => <List.Icon icon="email-outline" />} />
   
  </List.Section>
        
        </View>
    )
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.ORANGE} style="light" />
    
    <View style={{padding:10,flexDirection:"row"}}>
    <TouchableOpacity 
    onPress={()=>props.navigation.openDrawer()}
    style={{padding:10,alignItems:"center",borderColor:Colors.lIGHT_GREY,justifyContent:"center",borderRadius:15,flexDirection:"row"}}>
      <Icon name="menu"  size={25} style={{}}/>
      
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={()=>props.navigation.navigate("Search")}
    style={{borderWidth:2,padding:10,alignItems:"center",flex:1,borderColor:Colors.lIGHT_GREY,justifyContent:"center",borderRadius:15,flexDirection:"row"}}>
      <Icon name="magnify"  size={22} style={{marginRight:10}}/>
      <Text>Search for Treks</Text>
    </TouchableOpacity>


    </View>

      <FlatList
        numColumns={2}
        columnWrapperStyle={{justifyContent:"space-evenly"}}
        ListHeaderComponent={ShowHeader}
        ListFooterComponent={ShowFooter}
        ref={ref}
         data={data}
        renderItem={(item)=>{return(<ListItem {...props} data={item} />)}}
        keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
      />
 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
  subHeader: {
  
    width: '100%',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
});

export default Firstpage;