import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Spinner = () => {
  return (
    <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}
  >
    <ActivityIndicator size="large" color="#000" />
  </View>
  )
}

export default Spinner