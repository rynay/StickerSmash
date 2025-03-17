import { StyleSheet } from 'react-native'
import { Image, type ImageSource } from 'expo-image'

type Props = {
  imgSource: ImageSource
  selectedImage: string | null
}

export default function ImageViewer({ selectedImage, imgSource }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource

  return <Image source={imageSource} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
})
