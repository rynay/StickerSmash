import { Image, type ImageSource } from 'expo-image'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

type Props = {
  imageSize: number
  stickerSource: ImageSource
}

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  // const style = useAnimatedStyle();
  const scaleImage = useSharedValue(imageSize)

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value *= 2
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2)
      }
    })

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  return (
    <View style={{ top: -350 }}>
      <GestureDetector gesture={doubleTap}>
        <Animated.Image
          source={stickerSource}
          resizeMode="contain"
          style={[imageStyle, { width: imageSize, height: imageSize }]}
        />
      </GestureDetector>
    </View>
  )
}
