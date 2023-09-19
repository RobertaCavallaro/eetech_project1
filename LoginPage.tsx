import React, {useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator  } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const API_URL = 'https://5gwfi2834f.execute-api.us-east-2.amazonaws.com/verifying_credentials';
  const loginUrl = `${API_URL}?user_name=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  
  const handleLogin = () => {
    setLoading(true);
    const request = new XMLHttpRequest();
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        console.log('not ready');
        return;
      }
    
      if (request.status === 200) {
        const jsonObject = JSON.parse(request.responseText);
        if(jsonObject.user_validated == true){
          navigation.navigate('Details',  { username })
        }else{
          alert('Incorrect Login details!! Please retry');
          setUsername('');
          setPassword('');
        }
        setLoading(false);
      } else {
        alert('Server Error');
        setLoading(false);
      }
    };
    console.log('sent request:', loginUrl);
    request.open('GET', loginUrl);
    request.send();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eetech Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        secureTextEntry
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
      {loading && <ActivityIndicator size="small" color="blue" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: 'cursive',
    color: 'blue',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default LoginScreen;