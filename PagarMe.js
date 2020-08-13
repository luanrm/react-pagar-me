import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-community/picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

export default class PagarMe extends Component {

  state = {
    showAlert: false,
    api_key: "api_key",
    amount: 100000,
    installments: 1,
    // 5369008745460334
    card_number: "",
    // 191
    card_cvv: "",
    // 0328
    card_expiration_date: "",
    card_holder_name: "Luan Rodrigues",
    customer: {
      external_id: "#3311",
      name: "Luan Rodrigues",
      type: "individual",
      country: "br",
      email: "mopheus@nabucodonozor.com",
      documents: [
        {
          type: "cpf",
          number: "62807862004"
        }
      ],
      phone_numbers: ["+5511999998888"],
      birthday: "1965-01-01"
    },
    billing: {
      name: "Trinity Moss",
      address: {
        country: "br",
        state: "sp",
        city: "Cotia",
        neighborhood: "Rio Cotia",
        street: "Rua Matrix",
        street_number: "9999",
        zipcode: "06714360"
      }
    },
    items: [
      {
        id: "r123",
        title: "Red pill",
        unit_price: 100000,
        quantity: 1,
        tangible: true
      },
    ],
  }

  // componentDidMount() {
  //   axios.get('https://127.0.0.1:5001/customer')
  //     .then(response => {
  //       console.log(response);
  //       this.setState({ card_number: number })
  //     }).catch(error => { console.log(error); });

  // }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  pay = () => {
    axios.post('https://api.pagar.me/1/transactions', this.state)
      .then(response => {
        if (response.data && response.data.status == 'paid') {
          this.showAlert();
        }
      }).catch(error => { console.log(error); });

  }
  render() {
    const { showAlert } = this.state;
    return (
      <>

        <CreditCardInput
          labels={{ number: "Numero do cartão", expiry: "Expiração", cvc: "CVC/CCV" }}
          onChange={(response) => {
            this.setState({
              card_number: response.values.number.replace(/\s/g, ''),
              card_cvv: response.values.cvc,
              card_expiration_date: response.values.expiry.replace(/\//g, '')
            })
          }} />

        <Picker
          selectedValue={this.state.installments}
          style={{
            width: '50%',
            padding: 20,
            margin: 20,
          }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ installments: itemValue })
          }>
          <Picker.Item label="À Vista" value="1" />
          <Picker.Item label="Dividir em 2 vezes" value="2" />
          <Picker.Item label="Dividir em 3 vezes" value="3" />
        </Picker>


        <TouchableOpacity
          style={{
            width: '90%',
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: 'gray',
            borderRadius: 5,
          }}
          onPress={() => this.pay()}>
          <Text>Pagar</Text>
        </TouchableOpacity>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          message="Pagamento Efetuado com sucesso!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Graças a Deus <3"
          confirmButtonColor="green"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </>
    );
  }
}
