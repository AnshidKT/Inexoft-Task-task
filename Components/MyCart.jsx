import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
  TextInput,
} from 'react-native';

import {useCart} from './ShopContext';
import {useState} from 'react';
const MyCart = ({navigation}) => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    totalAmount,
    toggleSecondModal,
    isSecondModalVisible,

    setName,
    name,

    place,
    setPlace,

    nameError,
    placeError,
    phoneNumberError,
    phoneNumber,
    setPhoneNumber,
    handleOrderNow,
    orderConfirmed,

    handleDiscountCodeInput,
    isDiscountApplied,
    applyDiscount,
    coupendiscount,

    saveDataToStorage,
  } = useCart();

  const [discountCode, setDiscountCode] = useState('');
  const onApplyDiscount = () => {
    applyDiscount(discountCode);
    // Clear the input field or take other actions as needed
    setDiscountCode('');
  };

  const renderItemButton = item => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);

    // Discount...............................

    if (cartItem) {
      return (
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 28,
              height: 28,
              backgroundColor: '#800000',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => decreaseQuantity(item.id)}>
            <Text style={{fontSize: 15, color: 'white'}}>-</Text>
          </TouchableOpacity>
          <Text style={{color: 'black', fontSize: 18}}>
            {cartItem.quantity}
          </Text>
          <TouchableOpacity
            style={{
              width: 28,
              height: 28,
              backgroundColor: '#800000',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => addToCart(item.id)}>
            <Text style={{fontSize: 15, color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.Add} onPress={() => addToCart(item.id)}>
          <Text style={{fontWeight: '900', fontSize: 18, color: 'white'}}>
            +
          </Text>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          height: 60,
          // backgroundColor: 'red',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={{width: 25, marginLeft: 23, height: 25}}
            source={require('../imgs/back.png')}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            marginLeft: 130,
            fontWeight: '900',
            fontSize: 18,
          }}>
          Cart
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: '75%',
            backgroundColor: '#e6ffff',
            borderWidth: 1,
            borderColor: '#00994d',
            borderRadius: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../imgs/discount.png')}
            style={{width: 20, height: 20, marginLeft: 10}}
          />
          <Text
            style={{
              fontSize: 12,
              color: '#008040',
              fontWeight: '700',
              marginLeft: 6,
            }}>
            100 Inexoft Coin{' '}
          </Text>
          <Text style={{fontSize: 12, color: '#00994d'}}>
            With Get Free Delivery
          </Text>
        </View>
      </View>
      {cartItems.length === 0 ? (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: 310,
          }}>
          <Image
            source={require('../imgs/empty-cart.png')}
            style={{width: 160, height: 160}}
          />
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            height: 300,
            // backgroundColor: 'yellow',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: '90%',
              height: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            {/* <Image
              style={{
                width: '90%',
                height: '90%',
                position: 'absolute',
                opacity: 0.2,
              }}
              source={require('../../imgs/cartoon.png')}
            /> */}
            <View>
              <ScrollView
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                {cartItems.map(item => (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderTopEndRadius: 10,
                      borderTopLeftRadius: 10,
                      height: 80,
                      backgroundColor: 'white',
                      alignItems: 'center',
                      borderBottomWidth: 0.3,
                      borderBottomColor: 'gray',
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        width: '20%',
                        height: '90%',
                        // backgroundColor: 'black',
                        alignItems: 'center',

                        justifyContent: 'center',
                      }}>
                      <Image
                        source={item.img}
                        style={{
                          width: '90%',
                          height: '90%',
                          borderRadius: 10,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: '39%',
                        height: '80%',
                        // backgroundColor: 'red',
                        // alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          marginLeft: 9,
                          fontWeight: '500',
                          color: 'black',
                        }}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          width: '30%',
                          height: '30%',
                          // backgroundColor: '#e6e6e6',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          marginLeft: 10,
                        }}>
                        <Image
                          source={item.star}
                          style={{width: 12, height: 12}}
                        />
                        <Text style={{fontSize: 11, color: 'black'}}>
                          {item.rating}
                        </Text>
                      </View>
                      <Text style={{fontSize: 12, marginLeft: 10}}>
                        {item.brand}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '23%',
                        height: '90%',
                        // backgroundColor: 'blue',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      {renderItemButton(item)}
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '15%',
                        height: '90%',
                        // backgroundColor: 'red',
                      }}>
                      <Text style={{fontSize: 16, color: 'green'}}>
                        ₹{item.price * item.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      )}

      <View
        style={{
          width: '100%',
          height: 70,
          // backgroundColor: 'yellow',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: '70%',
            backgroundColor: 'white',
            // elevation: 10,
            // shadowColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{flex: 1, fontSize: 14, color: 'black', paddingLeft: 15}}
            placeholder="Enter Discount Code"
            placeholderTextColor="gray"
            value={discountCode}
            onChangeText={text => setDiscountCode(text)}
          />
          <TouchableOpacity
            style={{
              width: 70,
              height: '100%',
              backgroundColor: '#ff6600',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onApplyDiscount}>
            <Text style={{fontSize: 14, color: 'white', fontWeight: '600'}}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: 70,
          // backgroundColor: 'red',

          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            width: '90%',
            height: '90%',
            backgroundColor: 'white',
            // borderWidth:0.2,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              // marginTop:20,
              color: 'black',
              // marginLeft: 80,
            }}>
            Total Amount Your Cart
          </Text>

          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',

              fontWeight: '900',
              // marginRight:40,
              color: 'green',
              // marginTop:20,
              marginLeft: 10,
            }}>
            ₹{coupendiscount()}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: 70,
          // backgroundColor: 'blue',
        }}>
        <TouchableOpacity
          onPress={toggleSecondModal}
          style={{
            width: 180,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ff6600',
            borderRadius: 20,
          }}>
          <Text style={{fontSize: 15, color: 'white', fontWeight: '600'}}>
            Order Details
          </Text>
        </TouchableOpacity>
      </View>

      {/* //      Input Popup      // */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSecondModalVisible}
        onRequestClose={toggleSecondModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}>
          <View
            style={{
              width: '85%',
              height: 350,
              backgroundColor: 'black',
              borderRadius: 10,
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderColor: '#ff9900',
              borderWidth: 0.6,
            }}>
            <View style={{width: '100%', height: 25, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={toggleSecondModal}
                style={{marginLeft: 30}}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../imgs/back.png')}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: 'white',
                  marginLeft: 35,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Order Details
              </Text>
            </View>
            <View
              style={{
                width: '80%',
                height: '65%',
                // backgroundColor: 'gray',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  width: '100%',
                  borderRadius: 5,
                  height: 40,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../imgs/person-cartt.png')}
                />
                <TextInput
                  style={{
                    width: '80%',
                    paddingLeft: 15,
                    height: '100%',
                    color: 'gray',
                  }}
                  placeholder="Your Name"
                  placeholderTextColor="gray"
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>
              <Text style={{color: 'red'}}>{nameError}</Text>
              <View
                style={{
                  width: '100%',
                  borderRadius: 5,
                  height: 40,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../imgs/location-cartt.png')}
                />
                <TextInput
                  style={{
                    width: '80%',
                    paddingLeft: 15,
                    height: '100%',
                    color: 'gray',
                  }}
                  placeholder="Your Place"
                  placeholderTextColor="gray"
                  value={place}
                  onChangeText={text => setPlace(text)}
                />
              </View>
              <Text style={{color: 'red'}}>{placeError}</Text>
              <View
                style={{
                  width: '100%',
                  borderRadius: 5,
                  height: 40,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../imgs/phone-cartt.png')}
                />
                <TextInput
                  style={{
                    width: '80%',
                    paddingLeft: 15,
                    height: '100%',
                    color: 'gray',
                  }}
                  placeholder="Phone Number"
                  placeholderTextColor="gray"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={text => setPhoneNumber(text)}
                />
              </View>
              <Text style={{color: 'red'}}>{phoneNumberError}</Text>
            </View>
            <TouchableOpacity
              onPress={handleOrderNow}
              style={{
                width: 110,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
                backgroundColor: '#ff6600',
              }}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                Order Now
              </Text>
            </TouchableOpacity>

            {orderConfirmed && (
              <Text style={{color: 'green'}}>Order is confirmed!</Text>
            )}
          </View>
        </View>
      </Modal>

      {/* //      Input Popup      // */}

      <View
        style={{
          height: 150,
          // backgroundColor: 'red',
          width: '100%',
          justifyContent: 'center',
        }}>
        <View style={{marginLeft: 20}}>
          <Text style={{color: '#75787d', fontSize: 35, fontWeight: '700'}}>
            Live
          </Text>
          <Text style={{color: '#75787d', fontSize: 35, fontWeight: '700'}}>
            it up!
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 15}}>
          <Text style={{color: 'grey'}}>Crafted with</Text>
          <Image
            style={{width: 15, height: 15}}
            source={require('../imgs/heart.png')}
          />
          <Text style={{color: 'grey'}}>in Bengaluru,India</Text>
        </View>
      </View>
    </View>
  );
};
export default MyCart;

const styles = StyleSheet.create({});
