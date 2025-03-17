import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import ImageViewer from '@/components/ImageViewer'
import Button from '@/components/Button'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

const ImagePlaceholder = require('@/assets/images/background-image.png')

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if (result.canceled) {
      alert('You did not select any image')
    } else {
      setSelectedImage(result.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={ImagePlaceholder}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button onPress={pickImage} theme="primary" label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
})
