import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as React from 'react';
import { useTheme, Surface, Icon } from "react-native-paper";

export default function HomeScreen() {

  const theme = useTheme();
  const [counter, setCounter] = React.useState(0.1);

  const higherCounter = () => {
    setCounter(counter => counter + 0.1)
  }

  const lowerCounter = () => {
    setCounter(counter => counter - 0.1)
  }


    return (
      <View style={{ backgroundColor: theme.colors.primary ,flex: 1, justifyContent: "flex-start", alignItems: "center", }}>
        <Text style={{ color: theme.colors.secondary, fontSize: 35, marginTop: 50 }}>Hallo User!</Text>
{/* Schritte anzeigen */}
        <Surface 
        style={{ 
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
          backgroundColor: theme.colors.primary, 
          borderColor: theme.colors.secondary, 
          width: 350, 
          height: 80, 
          borderWidth: 1, 
          borderRadius: 10 }} elevation={3}>
            <Text
            style= {{
              fontSize:25,
              color: theme.colors.secondary
            }}
            >11'456 Schritte</Text>
        </Surface>

{/* Kalorienverbrauch anzeigen */}
        <Surface 
        style={{
          display: "flex",
          flexDirection: "row", 
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 25,
          marginBottom: 25,
          backgroundColor: theme.colors.primary, 
          borderColor: theme.colors.secondary, 
          width: 350, 
          height: 150, 
          borderWidth: 1, 
          borderRadius: 10 }} elevation={3}>
            <Text
            style= {{
              fontSize:25,
              color: theme.colors.secondary
            }}
            >1'761 kcal</Text>
            {/* Detailverbrauch */}
            <View>
              <Text
                style= {styles.detailText}
            >Grundverbrauch</Text>
            <Text
                style= {styles.detailText}
            >1'500 kcal</Text>
            <Text
                style= {styles.detailText}
            >Aktivitäten</Text>
            <Text
                style= {styles.detailText}
            >261 kcal</Text>
            </View>
        </Surface>
{/* Gewichtsübersicht */}
  <TouchableOpacity onPress={higherCounter}>
    <View
      style={[styles.plusAndMinus, {borderColor: theme.colors.secondary}]}
    >
        <Icon
    source="plus"
    color={theme.colors.secondary}
    size={50}
  />
    </View>
    </TouchableOpacity>
    <View style={{flexDirection: "row", alignItems: "flex-end"}}>
    <Text style={{ color: theme.colors.secondary, fontSize: 50, marginBottom: 5}}>{counter.toFixed(1)}</Text>
    <Text style={{ color: theme.colors.secondary, fontSize: 15, marginBottom: 5, marginLeft: 5}}>Kg</Text>
    </View>
    <View style={{ backgroundColor: theme.colors.secondary, height:1, width: 180, marginBottom: 20 }} />
    
    <TouchableOpacity onPress={lowerCounter}>
    <View
      style={[styles.plusAndMinus, {borderColor: theme.colors.secondary}]}
    >
        <Icon
    source="minus"
    color={theme.colors.secondary}
    size={50}
  />
    </View>
    </TouchableOpacity>
      </View>
    ); 
  }

  const styles = StyleSheet.create({
    detailText:{
      marginTop: 5,
      fontSize:20,
      color: "#808080"
    },
    plusAndMinus:{
      width:60,
      height:60,
      marginBottom: 10,
      borderWidth: 3,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center"
    }
  });

