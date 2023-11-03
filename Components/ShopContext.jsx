const {datas, secnddatas} = require('../Components/Data');
import {useState, createContext, useEffect} from 'react';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

const allProdects = [...datas, ...secnddatas];

export const CartProvider = ({children}) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [cartItems, setCartItems] = useState([]);

  const [showpopup, setShowPopup] = useState(false);



  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const toggleSecondModal = () => {
    setSecondModalVisible(!isSecondModalVisible);
  };


  const addToCart = productId => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);

    const productToAdd = allProdects.find(product => product.id === productId);

    if (productToAdd) {
      const existingItems = cartItems.find(item => item.id === productId);
      if (existingItems) {
        setCartItems(prevCartItems =>
          prevCartItems.map(item =>
            item.id === productId
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        );
      } else {
        setCartItems(prevCartItems => [
          ...prevCartItems,
          {...productToAdd, quantity: 1},
        ]);
      }
    }
  };

  const decreaseQuantity = productId => {
    setCartItems(prevCartItems =>
      prevCartItems
        .map(item =>
          item.id === productId
            ? {...item, quantity: Math.max(item.quantity - 1, 0)}
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };
  const totalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };


//CArt popup Validation..........................................................


const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameError, setNameError] = useState('');
  const [placeError, setPlaceError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [validationEnabled, setValidationEnabled] = useState(true);

  const handleOrderNow = () => {
    if (validationEnabled) {
      if (!name) {
        setNameError('Name is required');
      } else {
        setNameError('');
      }
      if (!place) {
        setPlaceError('Place is required');
      } else {
        setPlaceError('');
      }
      if (!phoneNumber) {
        setPhoneNumberError('Phone Number is required');
      } else {
        setPhoneNumberError('');
      }
    }

    // If all validations pass, set orderConfirmed to true and disable further validation.
    if (name && place && phoneNumber) {
      setOrderConfirmed(true);
      setValidationEnabled(false);
      // You can add more logic here, like submitting the order.
    }
  };




  // localstoragestarting..............................................................

  const saveCartToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('@MyCart:key', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart data: ', error);
    }
  };

  //  AsyncStorage
  const retrieveCartFromAsyncStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('@MyCart:key');
      if (storedCart !== null) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error retrieving cart data: ', error);
    }
  };

  
  // localstorage
  useEffect(() => {
    retrieveCartFromAsyncStorage();
  }, []);

  useEffect(() => {
    saveCartToAsyncStorage();
  }, [cartItems]);

  // locastorage.............................................................................

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        totalAmount,
        user,
        setUser,
        email,
        setEmail,
        setPassword,
        password,
        setShowPopup,
        showpopup,
        toggleSecondModal,
        isSecondModalVisible,
allProdects,

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
      }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};
