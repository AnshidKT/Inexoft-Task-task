import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';

import Carousel from 'react-native-snap-carousel';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {datas, secnddatas} from './Data';
import {useCart} from './ShopContext';

const CarouselItem = ({item}) => (
  <View style={styles.carouselItem}>
    <Image style={styles.carouselImage} source={item.img} />
  </View>
);

const Home = ({navigation}) => {
  const {
    addToCart,
    cartItems,
    user,
    setShowPopup,
    showpopup,
    email,
    allProdects,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState(datas);

  const handleSearch = text => {
    console.log('dddd', text);
    const inputQuery = text.toLowerCase();
    const filteredRows = datas.filter(row =>
      row.name.toLowerCase().includes(inputQuery),
    );
    setFilteredRows(filteredRows);
    setSearchQuery(text);
    console.log('andi:', searchQuery);
  };



  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  
  return (
    <View>
      <View
        style={{
          width: '100%',
          height: 128,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: 70,
            backgroundColor: 'white',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 29,
              letterSpacing: 5,
              fontWeight: 'bold',
              marginLeft: 25,
              color: 'black',
            }}>
            INE<Text style={{color: 'orange'}}>X</Text>OFT
          </Text>

          <TouchableOpacity onPress={toggleModal}>
            <View
              style={{
                width: 100,
                height: 60,
                flexDirection: 'column',
                // backgroundColor: 'red',
                alignItems: 'center',
              }}>
              <Image
                style={{objectFit: 'fill'}}
                source={require('../imgs/person.png')}
              />
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#737373',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {user}
                </Text>
                <Image
                  style={{width: 10, height: 10, marginLeft: 3, marginTop: 5}}
                  source={require('../imgs/down-arrow.png')}
                />
              </View>
            </View>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setModalVisible(!isModalVisible);
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.7)',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  width: 280,
                  height: '100%',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 200,
                    // backgroundColor: 'yellow',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                    }}
                    source={require('../imgs/drawwer-bg.png')}
                  />

                  <View
                    style={{
                      width: '80%',
                      height: '90%',
                      // backgroundColor: 'yellow',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: 90,
                        height: 90,
                        backgroundColor: 'gray',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100,
                        marginLeft: 10,
                      }}>
                      <Image
                        style={{width: 60, height: 60}}
                        source={require('../imgs/person-drawwer.png')}
                      />
                    </View>

                    <Text
                      style={{
                        color: 'white',
                        marginTop: 10,
                        fontWeight: 'bold',
                        marginLeft: 10,
                      }}>
                      {user}
                    </Text>

                    <Text
                      style={{
                        color: '#cccccc',
                        marginLeft: 10,
                        fontWeight: 'bold',
                      }}>
                      {email}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '20%',
                      height: '100%',
                      // backgroundColor: 'black',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableWithoutFeedback
                      style={{zIndex: 1}}
                      onPress={() => {
                        console.log('Close button pressed');
                        toggleModal();
                      }}>
                      <Image
                        source={require('../imgs/close-btn.png')}
                        style={{
                          width: 35,
                          height: 35,
                          marginRight: 10,
                          marginTop: 10,
                        }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    height: 70,
                    borderWidth: 1,
                    // backgroundColor: 'gray',
                    borderBottomColor: '#f2f2f2',
                  }}>
                  <View
                    style={{
                      width: '50%',
                      height: '100%',
                      // backgroundColor: 'black',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: 60,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../imgs/person-img.png')}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#262626',
                        fontSize: 15,
                        fontWeight: '500',
                      }}>
                      Your profile
                    </Text>
                  </View>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Myorders')}>
                  <View
                    style={{
                      width: '100%',
                      height: 70,
                      borderBottomWidth: 1,
                      // backgroundColor: 'gray',
                      borderBottomColor: '#f2f2f2',
                    }}>
                    <View
                      style={{
                        width: '50%',
                        height: '100%',
                        // backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          width: 60,
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          style={{width: 30, height: 30}}
                          source={require('../imgs/order-img.png')}
                        />
                      </View>
                      <Text
                        style={{
                          color: '#262626',
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
                        Your orders
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <View
                  style={{
                    width: '100%',
                    height: 70,
                    borderBottomWidth: 1,
                    // backgroundColor: 'gray',
                    borderBottomColor: '#f2f2f2',
                  }}>
                  <View
                    style={{
                      width: '50%',
                      height: '100%',
                      // backgroundColor: 'black',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: 60,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../imgs/favourite.png')}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#262626',
                        fontSize: 15,
                        fontWeight: '500',
                      }}>
                      Favourite orders
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    height: 70,
                    borderBottomWidth: 1,
                    // backgroundColor: 'gray',
                    borderBottomColor: '#f2f2f2',
                  }}>
                  <View
                    style={{
                      width: '50%',
                      height: '100%',
                      // backgroundColor: 'black',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: 60,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../imgs/hidden.png')}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#262626',
                        fontSize: 15,
                        fontWeight: '500',
                      }}>
                      Hidden restaurants
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 70,
                    borderBottomWidth: 1,
                    // backgroundColor: 'gray',
                    borderBottomColor: '#f2f2f2',
                  }}>
                  <View
                    style={{
                      width: '50%',
                      height: '100%',
                      // backgroundColor: 'black',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: 60,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../imgs/credit.png')}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#262626',
                        fontSize: 15,
                        fontWeight: '500',
                      }}>
                      Inexoft credits
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    height: 70,
                    borderBottomWidth: 1,
                    // backgroundColor: 'gray',
                    borderBottomColor: '#f2f2f2',
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('SignUp')}>
                    <View
                      style={{
                        width: '50%',
                        height: '100%',
                        // backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          width: 60,
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          style={{width: 30, height: 30}}
                          source={require('../imgs/sighnout.png')}
                        />
                      </View>
                      <Text
                        style={{
                          color: '#262626',
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
                        Signout
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        {showpopup ? (
          <View
            style={{
              width: '45%',
              height: 20,
              // backgroundColor: 'yellow',
              // borderRadius:9,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -10,
            }}>
            <Image
              style={{width: 18, height: 18, marginRight: 8}}
              source={require('../imgs/Cart-Green.png')}
            />
            <Text style={{color: '#00b3b3', fontWeight: 'bold'}}>
              Added To Cart
            </Text>
          </View>
        ) : null}

        <View
          style={{
            width: '80%',
            height: 40,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            elevation: 15,
            shadowColor: 'gray',
            marginBottom: 8,

            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}>
          <TextInput
            style={{
              width: '80%',
              height: '100%',
              backgroundColor: 'white',
              borderRadius: 40,
              color: 'gray',
            }}
            placeholder="Search for food items..."
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={text => handleSearch(text)}
          />
          <View
            style={{
              width: '12%',
              height: '80%',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'orange',
              borderRadius: 100,
            }}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../imgs/search-icon.png')}
            />
          </View>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            width: '100%',
            height: 100,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: '90%',
              height: '70%',
              backgroundColor: '#e6e6e6',
              borderRadius: 12,
            }}>
            <Image
              style={{width: 48, height: 48}}
              source={require('../imgs/discount-badge.png')}
            />
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'column',
                width: '68%',
                height: '100%',
                // backgroundColor: 'white',
              }}>
              <Text
                style={{
                  marginLeft: 15,
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 500,
                }}>
                Offers upto 60% off
              </Text>
              <Text style={{marginLeft: 15, color: 'gray', fontSize: 12}}>
                Hot Deals, Flat Offers & more
              </Text>
            </View>
            <Image
              style={{width: 17, height: 17}}
              source={require('../imgs/rightarrow.png')}
            />
          </View>
        </View>

        <ScrollView horizontal>
          <View
            style={{
              width: 350,
              alignItems: 'center',
              justifyContent: 'center',
              height: 180,
              backgroundColor: 'white',
            }}>
            <Image
              style={{width: '90%', height: '100%', borderRadius: 10}}
              source={require('../imgs/banner-three.jpg')}
            />
          </View>
          <View
            style={{
              width: 350,
              alignItems: 'center',
              justifyContent: 'center',
              height: 180,
              backgroundColor: 'white',
            }}>
            <Image
              style={{width: '90%', height: '100%', borderRadius: 10}}
              source={require('../imgs/banner-two.jpg')}
            />
          </View>
          <View
            style={{
              width: 350,
              alignItems: 'center',
              justifyContent: 'center',
              height: 180,
              backgroundColor: 'white',
            }}>
            <Image
              style={{width: '89%', height: '100%', borderRadius: 10}}
              source={require('../imgs/banner-one.jpg')}
            />
          </View>
        </ScrollView>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Myorders')}>
          <View
            style={{
              width: '100%',
              height: 70,
              borderBottomWidth: 1,
              // backgroundColor: 'gray',
              borderBottomColor: '#f2f2f2',
            }}>
            <View
              style={{
                width: '50%',
                height: '100%',
                // backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 60,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../imgs/order-img.png')}
                />
              </View>
              <Text
                style={{
                  color: '#262626',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                Your orders
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            width: '100%',
            height: 100,
            backgroundColor: 'white',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              marginBottom: 10,
              fontWeight: 500,
              marginLeft: 20,
              color: 'black',
              fontSize: 18,
            }}>
            Quick Picks For You
          </Text>
          <View
            style={{
              marginLeft: 20,
              alignItems: 'center',
              justifyContent: 'center',
              width: '33%',
              height: '30%',
              backgroundColor: 'black',
              borderRadius: 30,
            }}>
            <Text style={{color: 'white', fontSize: 12}}>
              Lowest Delivery Fee
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            data={filteredRows}
            // renderItem={renderItem}
            // keyExtractor={(item) => item.id.toString()}

            numColumns={3}
            // data={rows.length > 0 ? filterData : datas}

            keyExtractor={item => item.id.toString()}
            style={{backgroundColor: 'white'}}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center', // Center vertically
                  alignItems: 'center', // Center horizontally
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => addToCart(item.id)}
                  style={{
                    marginTop: 0,
                    width: 110,
                    // marginLeft: 0,
                    // marginRight: 0,

                    height: 150,
                    borderRadius: 10,
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '75%',
                      backgroundColor: 'black',
                      borderRadius: 10,
                      opacity: 1.1,
                    }}>
                    <Image
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                        opacity: 0.7,
                        // backgroundColor: 'black',
                      }}
                      source={item.img}
                    />
                    <View
                      style={{
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '100%',

                        borderRadius: 20,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: '30%',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}>
                        <Image style={{marginRight: 7}} source={item.love} />
                      </View>
                      <View
                        style={{
                          width: '100%',
                          height: '50%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 800,
                          }}>
                          {item.offer}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 400,
                            fontSize: 10,
                          }}>
                          {item.upto}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      height: '20%',
                      // backgroundColor: 'yellow',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'black',
                        fontSize: 14,
                      }}>
                      {item.name}
                    </Text>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          width: '50%',
                          justifyContent: 'space-evenly',
                          flexDirection: 'row',
                        }}>
                        <Image
                          style={{width: 11, height: 11}}
                          source={item.star}
                        />
                        <Image
                          style={{width: 11, height: 11}}
                          source={item.star}
                        />
                        <Image
                          style={{width: 11, height: 11}}
                          source={item.star}
                        />
                        <Image
                          style={{width: 11, height: 11}}
                          source={item.star}
                        />
                      </View>

                      <Text
                        style={{color: 'black', fontSize: 11, fontWeight: 500}}>
                        {item.rating}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 50,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '90%',
              height: '100%',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#cccccc',
              // backgroundColor: 'yellow',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                height: '100%',
                flexDirection: 'row',
                // backgroundColor: 'red',
              }}>
              <Text style={{color: '#ff751a', fontWeight: 700}}>
                see more restaurants
              </Text>
            </TouchableOpacity>
            <Image
              style={{width: 13, height: 13, marginLeft: -30}}
              source={require('../imgs/orange-arrow.png')}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            height: 300,
            backgroundColor: 'white',
          }}>
          <View style={styles.card}>
            <View
              style={{
                width: '109%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.heading}>FAVOURITE ORDERS</Text>
            </View>
            <Carousel
              style={styles.caro}
              layout={'stack'}
              layoutCardOffset={18}
              data={datas}
              sliderWidth={180}
              itemWidth={200}
              renderItem={CarouselItem}
              loop={true}
            />
          </View>

          <View style={styles.card1}>
            <View
              style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.heading}> MOST FREEQUENT</Text>
            </View>
            <Carousel
              style={styles.caro}
              layout={'stack'}
              layoutCardOffset={18}
              data={secnddatas}
              sliderWidth={180}
              itemWidth={200}
              renderItem={CarouselItem}
              loop={true}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: 'white',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 19,
              marginLeft: 20,
              fontWeight: 800,
            }}>
            Restaurants To Explore
          </Text>
        </View>

        <View style={{width: '100%', height: 650, backgroundColor: 'white'}}>
          <FlatList
            data={secnddatas}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => addToCart(item.id)}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  height: 140,
                  // backgroundColor: 'yellow',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '35%',
                    height: '100%',
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    backgroundColor: 'black',
                    borderRadius: 10,
                    opacity: 1.1,
                  }}>
                  <Image
                    source={item.img}
                    style={{
                      width: '100%',
                      opacity: 0.7,
                      height: '100%',
                      borderRadius: 10,
                      position: 'absolute',
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '30%',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <Image style={{marginRight: 7}} source={item.love} />
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: '50%',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-end',
                      // backgroundColor:'red'
                    }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {item.offer}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        marginLeft: 10,
                        marginBottom: 10,
                        fontWeight: 900,
                        fontSize: 10,
                      }}>
                      {item.upto}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '40%',
                    height: '80%',
                    // backgroundColor: 'white',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text style={{fontSize: 17, color: 'black'}}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      width: '80%',
                      height: '20%',
                      // backgroundColor: 'gray',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: '55%',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 15, height: 15}}
                        source={item.star}
                      />
                      <Image
                        style={{width: 15, height: 15}}
                        source={item.star}
                      />
                      <Image
                        style={{width: 15, height: 15}}
                        source={item.star}
                      />
                      <Image
                        style={{width: 15, height: 15}}
                        source={item.star}
                      />
                    </View>
                    <Text
                      style={{fontSize: 14, color: 'black', fontWeight: 900}}>
                      {item.rating}
                    </Text>
                  </View>
                  <Text style={{color: '#a6a6a6'}}>{item.brand}</Text>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '80%',
                      justifyContent: 'space-evenly',
                      height: 25,
                      backgroundColor: '#f0e6ff',
                      borderRadius: 13,
                    }}>
                    <Image
                      source={require('../imgs/delivery-man.png')}
                      style={{width: 17, height: 17}}
                    />
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: '900',
                        color: '#751aff',
                      }}>
                      FREE DELEVERY
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            backgroundColor: '#e6e6e6',
            height: 350,
            width: '100%',
            // justifyContent: 'center',
          }}>
          <View style={{marginLeft: 20}}>
            <Text style={{color: '#75787d', fontSize: 75, fontWeight: '700'}}>
              Live
            </Text>
            <Text style={{color: '#75787d', fontSize: 75, fontWeight: '700'}}>
              it up!
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 15}}>
            <Text style={{color: 'grey'}}>Crafted with</Text>
            <Image
              style={{width: 17, height: 17}}
              source={require('../imgs/heart.png')}
            />
            <Text style={{color: 'grey'}}>in Anshid KT</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  card: {
    width: '46%',
    height: 220,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  card1: {
    width: '46%',
    height: 220,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  heading: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },

  carouselItem: {
    width: 150,
    height: 150,
    borderRadius: 15,
    // backgroundColor: 'lightgray',

    marginLeft: 25,
    alignItems: 'center',
    // elevation:5,
    justifyContent: 'center',
  },
  carouselImage: {
    width: 120,
    height: 120,

    borderRadius: 15,
  },
});
