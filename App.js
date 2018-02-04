// @flow
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Movies from './components/Movies'

type State = {
  text: string
}

type Props = {}

class App extends React.Component<Props, State> {
  constructor (props: Object) {
    super(props)
    this.state = {
      text: 'Hello World!'
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Movies />
      </View>
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
