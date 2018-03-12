// @flow
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { AppLoading, Font } from 'expo'
import { FontAwesome } from '@expo/vector-icons'

import Movies from './components/Movies'
import configureStore from './store/configureStore'
import rootSaga from './sagas'

type State = {
  appReady: boolean
}

type Props = {}

const store = configureStore()
store.runSaga(rootSaga)

class App extends React.Component<Props, State> {
  state = {
    appReady: false
  }

  async loadAssetsAsync () {
    const fontAssets = await [FontAwesome.font].map(font => Font.loadAsync(font))

    return fontAssets
  }

  render () {
    if (!this.state.appReady) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onFinish={() => this.setState({ appReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Movies />
        </View>
      </Provider>
    )
  }
}

export default StackNavigator({
  Home: {
    screen: App
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
})
