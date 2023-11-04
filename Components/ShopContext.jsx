import React, {useState, createContext, useEffect} from 'react';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {datas} from './Data';
import {secnddatas} from './Data';

export const CartContext = createContext();

const allProducts = [...datas, ...secnddatas];

export const CartProvider = ({children}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [storedData, setStoredData] = useState(null);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [cartItems, setCartItems] = useState([]);

  const [showpopup, setShowPopup] = useState(false);

  const [yourOrdersData, setYourOrderData] = useState(false);

  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const toggleSecondModal = () => {
    setSecondModalVisible(!isSecondModalVisible);
  };

  const openOrderDataPopup = () => {
    setYourOrderData(!yourOrdersData);
  };

  const applyDiscount = code => {
    if (code === 'inexoft50') {
      setIsDiscountApplied(true);
    } else {
      setIsDiscountApplied(false);
    }
  };

  const addToCart = productId => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);

    const productToAdd = allProducts.find(product => product.id === productId);
    console.log('mridhu', allProducts);
    console.log('hello', productToAdd);

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

  console.log(cartItems, 'hggfrttyy');

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

  const coupendiscount = () => {
    const total1 = totalAmount();
    const discountAmount = 50;

    if (isDiscountApplied) {
      var totalAmount1 = total1 - discountAmount;
      return totalAmount1;
    } else {
      return total1;
    }
  };

  const handleDiscountCodeInput = code => {
    setDiscountCode(code);
    applyDiscount(code);
  };

  let price = coupendiscount();

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

    if (name && place && phoneNumber) {
      setOrderConfirmed(true);
      setValidationEnabled(false);
      saveDataToStorage(name, phoneNumber, place);
      // Clear the input fields
      setName('');
      setPlace('');
      setPhoneNumber('');
    }
  };
  const saveDataToStorage = async userDetails => {
    try {
      const dataToStore = {
        user: userDetails,
        cartItems: cartItems,
        price: price,
        place: place,
        phoneNumber: phoneNumber,
      };

      const existingUsers = await AsyncStorage.getItem('userData');
      let users = [];

      if (existingUsers) {
        users = JSON.parse(existingUsers);
      }

      users.push(dataToStore);

      await AsyncStorage.setItem('userData', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving user to AsyncStorage:', error);
    }
  };

  const saveCartToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('@MyCart:key', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart data: ', error);
    }
  };

  const retrieveDataFromStorage = async () => {
    try {
      var BillingData = await AsyncStorage.getItem('userData');
      if (BillingData !== null) {
        const parsedData = JSON.parse(BillingData);
        setStoredData(parsedData);
        return parsedData;
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage: ', error);
    }
  };

  const retrieveCartFromAsyncStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('@MyCart:key');
      console.log('storedCart', storedCart);
      if (storedCart !== null) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error retrieving cart data: ', error);
    }
  };

  useEffect(() => {
    retrieveCartFromAsyncStorage();
  }, []);

  useEffect(() => {
    saveCartToAsyncStorage();
  }, [cartItems]);

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
        allProducts, // Changed from 'allProdects' to 'allProducts'

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
        retrieveDataFromStorage,
        storedData,

        openOrderDataPopup,
        yourOrdersData,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
