import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useCart} from './ShopContext';
const SignUp = ({navigation}) => {
  const {setUser, user, email, setPassword, password, setEmail} = useCart();

  const handleInputChange = text => {
    setUser(text);
    console.log(user);
  };

  const handleInputChangeemail = text => {
    setEmail(text);
    console.log(email);
  };
  const handleInputChangepassword = text => {
    setPassword(text);
    console.log(password);
  };

  const handleSignUp = () => {
    if (user && email && password) {
      // Check if user and email are not empty
      // Perform your sign-up logic here
      navigation.navigate('Index');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '15%',
            backgroundColor: 'black',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Intro')}>
            <Image
              style={{width: 25, marginLeft: 50, height: 25}}
              source={require('../imgs/back.png')}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: 'white',
              marginRight: 140,
              fontSize: 20,
              fontWeight: '800',
            }}>
            Sign Up
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: '85%',
            backgroundColor: 'white',
            borderTopEndRadius: 50,
            borderTopStartRadius: 50,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
            Hello!
          </Text>

          <View
            style={{
              width: '85%',
              height: 55,
              borderWidth: 1.5,
              borderColor: '#e6e6e6',
              borderRadius: 20,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={{width: 25, height: 25, marginLeft: 20}}
              source={require('../imgs/person.png')}
            />
            <TextInput
              style={{marginLeft: 10, color: 'black', width: '80%'}}
              placeholder="Username"
              placeholderTextColor="gray"
              name="username"
              onChangeText={handleInputChange}
              value={user}
            />
          </View>
          <View
            style={{
              width: '85%',
              height: 55,
              borderWidth: 1.5,
              borderColor: '#e6e6e6',
              borderRadius: 20,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={{width: 25, height: 25, marginLeft: 20}}
              source={require('../imgs/email.png')}
            />
            <TextInput
              style={{marginLeft: 10, color: 'black', width: '80%'}}
              placeholder="Email"
              placeholderTextColor="gray"
              name="Email"
              onChangeText={handleInputChangeemail}
              value={email}
            />
          </View>

          <View
            style={{
              width: '85%',
              height: 55,
              borderWidth: 1.5,
              borderColor: '#e6e6e6',
              borderRadius: 20,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={{width: 25, height: 25, marginLeft: 20}}
              source={require('../imgs/lock.png')}
            />
            <TextInput
              style={{marginLeft: 10, color: 'black', width: '80%'}}
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={true}
              value={password}
              onChangeText={handleInputChangepassword}
            />
          </View>

          <Text style={{color: 'gray'}}>
            Signing up you accept the{' '}
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Team of Servicess
            </Text>
          </Text>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleSignUp}>
            <View
              style={{
                width: '80%',
                height: 50,
                backgroundColor: 'orange',
                borderRadius: 15,

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '85%',
              height: 25,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '43%',
                borderWidth: 0.5,
                borderColor: '#bfbfbf',
              }}></View>
            <Text style={{fontSize: 18, marginTop: -7}}>or</Text>
            <View
              style={{
                width: '43%',
                borderWidth: 0.5,
                borderColor: '#bfbfbf',
              }}></View>
          </View>
          <View
            style={{
              width: '100%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '50%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../imgs/google.png')}
              />
              <Image
                style={{width: 35, height: 35}}
                source={require('../imgs/apple.png')}
              />
              <Image
                style={{width: 35, height: 35}}
                source={require('../imgs/facebook.png')}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
