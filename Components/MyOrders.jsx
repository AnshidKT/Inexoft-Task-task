import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCart} from './ShopContext';

const MyOrders = ({navigation}) => {
  const {openOrderDataPopup, yourOrdersData} = useCart();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const retrieveDataFromStorage1 = async () => {
    try {
      const BillingData = await AsyncStorage.getItem('userData');
      if (BillingData !== null) {
        const storedData = JSON.parse(BillingData);
        setUsers(storedData);
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage: ', error);
    }
  };

  useEffect(() => {
    const retrieveUsersFromStorage = async () => {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);
      }
    };

    retrieveUsersFromStorage();
    retrieveDataFromStorage1();
  }, []);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View
        style={{
          width: '100%',
          height: 60,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          elevation: 5,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Index')}>
          <Image
            style={{width: 30, height: 30, marginLeft: 18}}
            source={require('../imgs/back.png')}
          />
        </TouchableOpacity>

        <View
          style={{
            width: '65%',
            height: '100%',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
            Your Orders
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: '92%',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          {users.map((user, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedUser(user);
                openOrderDataPopup();
              }}>
              <View
                style={{
                  width: '80%',
                  height: 60,
                  backgroundColor: '#eff5f5',
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  borderRadius: 10,
                  elevation: 3,
                }}>
                <Image source={require('../imgs/person.png')} />
                <View
                  style={{
                    width: '60%',
                    height: '70%',
                    backgroundColor: '#eff5f5',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: '700'}}>
                    User: {user.user}
                  </Text>
                  <Text
                    style={{color: 'gray', fontSize: 11, fontWeight: '700'}}>
                    {user.place}
                  </Text>
                </View>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../imgs/rightarrow.png')}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Render the Modal for selectedUser */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={yourOrdersData}
        onRequestClose={openOrderDataPopup}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}>
          <TouchableOpacity onPress={openOrderDataPopup}>
            <View
              style={{
                width: 50,
                height: 50,
                // backgroundColor: 'white',
                marginTop: -40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../imgs/back.png')}
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: '80%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: 300,
              backgroundColor: 'white',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: 'orange',
              marginTop: 20,
            }}>
            <ScrollView>
              {selectedUser?.cartItems?.map((item, itemIndex) => (
                <View
                  style={{
                    width: '90%',
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    backgroundColor: '#f5f5f0',
                    marginTop: 8,
                    marginLeft: 10,
                    borderRadius: 6,
                  }}
                  key={itemIndex}>
                  <Image style={{width: 30, height: 30}} source={item.img} />
                  <View
                    style={{
                      width: '38%',
                      justifyContent: 'center',
                      height: '100%',
                      // backgroundColor: 'red',
                    }}>
                    <Text style={{color: 'green', fontWeight: 'bold'}}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      justifyContent: 'center',
                      height: '100%',
                      // backgroundColor: 'red',
                    }}>
                    <Text style={{color: 'orange'}}>₹{item.price}</Text>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      justifyContent: 'center',
                      height: '100%',
                      // backgroundColor: 'red',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'purple'}}>Q: {item.quantity}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyOrders;
