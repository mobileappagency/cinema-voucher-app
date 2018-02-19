// @flow
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import Movies from './components/Movies'
import configureStore from './store/configureStore'
import rootSaga from './sagas'

type State = {}

type Props = {}

const store = configureStore()
store.runSaga(rootSaga)

class App extends React.Component<Props, State> {
  render () {
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
