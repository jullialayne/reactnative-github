import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Pressable,
  Linking,
  TextInput,
} from 'react-native';

import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/users/jullialayne',
});

const colorGithub = '#010409';
const colorFontGithub = '#C9D1D9';
const colorDarkFontGithub = '#4F565E';

const App = () => {
  var [user, setUser] = useState({
    avatar: undefined,
    login: undefined,
    name: undefined,
    html_url: '',
    followers: 0,
    following: 0,
    public_gists: 0,
    public_repos: 0,
  });
  axiosInstance.get().then(({data}) => {
    setUser(prevState => ({
      ...prevState,
      avatar: data.avatar_url,
      login: data.login,
      name: data.name,
      html_url: data.html_url,
      followers: data.followers,
      following: data.following,
      public_gists: data.public_gists,
      public_repos: data.public_repos,
    }));
  });
  const handlePressGoToGithub = async () => {
    console.log('Verificando link');
    const res = await Linking.canOpenURL(user.html_url);
    if (res) {
      console.log('Link aprovado');
      console.log('Abrindo link....');
      await Linking.openURL(user.html_url);
    }
  };
  const [text, onChangeText] = React.useState('Useless Text');
  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={colorGithub} barStyle="light-content" />
      <View style={style.content}>
        <TextInput
          style={style.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Image
          accessibilityLabel=""
          style={style.avatar}
          source={{uri: user.avatar}}
        />
        <Text
          accessibilityLabel="Nome: "
          style={[style.defaultText, style.name]}>
          {user.name}
        </Text>
        <Text
          accessibilityLabel="Nickname: "
          style={[style.defaultText, style.nickname]}>
          {user.login}
        </Text>

        <Pressable onPress={handlePressGoToGithub}>
          <View style={style.button}>
            <Text style={[style.defaultText, style.textButton]}>
              Open in Github
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    // Column
    backgroundColor: colorGithub,
    flex: 1, // Expandir para a tela inteira
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  defaultText: {
    color: colorFontGithub,
  },
  name: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 24,
  },
  nickname: {
    fontSize: 18,
    color: colorDarkFontGithub,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    backgroundColor: colorDarkFontGithub,
    borderRadius: 10,
    padding: 20,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
