import React from 'react';
import {View, StyleSheet,Text,Button,TouchableOpacity,ImageBackground,
} from 'react-native';
import { useState, useEffect } from 'react';


const styles = StyleSheet.create({
  time:{    
      position:'absolute',
      fontStyle:"normal",
      fontFamily:'Roboto',
      fontWeight:700,
      fontSize: 45,
      color: '#1e90ff',
      top:'30%',
      left:'35%',},
  seasonImage:{width: 40, height: 40,top:120,marginLeft:160,},
  CounterWithLimitStyle:
       { 
        backgroundColor:"white",width:"100%",
        height:'30%',
        marginTop:'60%',
        borderColor:"black",
        alignContent:'center',
        borderWidth:5,
      },
  title:{   
            alignSelf:'center',
            fontStyle:"normal",
            fontFamily:'Roboto',
            fontWeight:700,
            fontSize: 20,
            color: '#1e90ff',
          },
  
});

function App(): JSX.Element {
  const [active, setActive] = useState(false);
  const [idx, setIdx] = useState(0);
  const arr=['https://static.vecteezy.com/system/resources/previews/003/206/498/original/cute-smiling-sun-face-funny-sun-character-for-kids-vector.jpg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpWzMb8EmqkCEUUqb43bvp4l4WygGnBC4R3w&usqp=CAU','data:image/png;base64,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',
'data:image/png;base64,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'
];

const [maxCount , setMaxCount ] = useState(10);
const [minCount , setMinCount ] = useState(-10);
const [count,setCount]=useState(0);
const [title,setTitle]=useState('Count');
useEffect(()=>
{
  if (count>maxCount){setCount(maxCount);}
  if (count<minCount){setCount(minCount)};
  if( count>=0){
  setTitle('Count: '+count);}
  if (count<0){setTitle('Negative Count: '+count);}
},[count])
  return (
    <View style={{backgroundColor:'white',width:'100%',height:'100%'}}>
        <View style={{ backgroundColor: active ? "black" : "white",width:"100%",
          height:'30%',
          flexWrap:'wrap',
          paddingTop: 0,
          position:'absolute',
          left:'0%',
          right:'0%',
          top:'0%',
          bottom:'0%',
          borderColor:"black",
          borderWidth:5, }}>
          <Text  onPress={()=>setActive(!active) } style={styles.time}>12:00</Text>
          <TouchableOpacity onPress={()=>setIdx((idx+1)%4) }
                style={styles.seasonImage}>
            <ImageBackground source={{uri: arr[idx]}} 
              style={{width: 60, height: 60,}}   />
          </TouchableOpacity>
        </View>
        <View style={styles.CounterWithLimitStyle}>
          <Text  style={styles.title}>
             <Button title='-' onPress={()=>{setCount(count-1)}}/>
              {title}
             <Button title='+' onPress={()=>{setCount(count+1)}}/>
          </Text>
          <Button title='reset' onPress={()=>{setCount(0)}}/>
        </View>
  </View>
  );
}
export default App;
