import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Intro = ({navigation}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          width: '100%',
          height: '60%',
          alignItems: 'center',
          justifyContent: 'flex-end',
          //   backgroundColor: 'red',
        }}>
        <Image
          style={{width: 100, height: 80, borderRadius: 10}}
          source={require('../imgs/Logoimg.jpg')}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 35,
            letterSpacing: 8,
            fontFamily: 'monospace',

            fontWeight: '900',
            marginBottom: 80,
            marginTop: 10,
          }}>
          INE<Text style={{color: 'orange'}}>XOFT</Text>
        </Text>
      </View>
      <View
        style={{
          width: '80%',
          height: 240,
          //   backgroundColor: 'yellow',
          borderRadius: 20,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: 'orange',
              borderRadius: 15,
              marginBottom: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Get Started
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({});
