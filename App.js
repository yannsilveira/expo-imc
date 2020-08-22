import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, StatusBar, KeyboardAvoidingView } from 'react-native';
import imageBackground from './assets/imc.png';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = { altura: 0, massa: 0, resultado: 0, resultadoText: '' }
    this.calcular = this.calcular.bind(this)
  }

  calcular() {
    let s = this.state
    let imc = this.state.massa / (this.state.altura * this.state.altura)
    s.resultado = imc

    if (this.state.altura === 0 || this.state.massa === 0) {
      alert('Por favor, Preencha todos os campos!');
      s.resultadoText = '';
      s.resultado = 0.0;
    } else {
      if (s.resultado < 16) {
        s.resultadoText = "Magreza Grave"
      } else if (s.resultado < 17) {
        s.resultadoText = "Magreza Moderada"
      } else if (s.resultado < 18.5) {
        s.resultadoText = "Magreza Leve"
      } else if (s.resultado < 25) {
        s.resultadoText = "Saudavél"
      } else if (s.resultado < 30) {
        s.resultadoText = "Sobrepeso"
      } else if (s.resultado < 35) {
        s.resultadoText = "Obesidade Grau 1"
      } else if (s.resultado < 40) {
        s.resultadoText = "Obesidade Grau 2"
      } else {
        s.resultadoText = "Obesidade Grau 3"
      }
    }
    this.setState(s)
  }

  render() {
    return (
      <ImageBackground source={imageBackground} style={styles.container} >
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : undefined} >
          <StatusBar animated={true} barStyle="dark-content" />
          <Text style={styles.title}>Calculadora de IMC</Text>
          <View style={styles.entradas}>
            <Text style={styles.text}>Altura</Text>
            <TextInput
              keyboardType="numbers-and-punctuation"
              style={styles.input}
              onChangeText={(altura) => { this.setState({ altura }) }}
            />
            <Text style={styles.text}>Peso</Text>
            <TextInput
              keyboardType="numbers-and-punctuation"
              style={styles.input}
              onChangeText={(massa) => { this.setState({ massa }) }}
            />
          </View>
          <TouchableOpacity
            onPress={this.calcular}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
          <Text style={styles.resultado}>{this.state.resultado.toFixed(1)}</Text>
          <Text style={styles.resultado}>{this.state.resultadoText.toUpperCase()}</Text>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'center',
    alignItems: 'center',
  },

  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    textAlign: 'center',
    padding: 5,
    borderRadius: 8,
    width: 340,
    fontSize: 35,
    marginTop: 15,
  },

  button: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
    borderRadius: 50,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20
  },

  title: {
    marginTop: 180,
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  entradas: {
    marginTop: 60
  },

  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },

  buttonText: {
    alignSelf: 'center',
    padding: 12,
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },

  resultado: {
    alignSelf: 'center',
    color: 'lightgray',
    fontSize: 30,
    padding: 15
  }
});
