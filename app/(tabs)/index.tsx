import { StyleSheet, View, Platform } from 'react-native'
import { useRef, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot'
import * as ImagePicker from 'expo-image-picker'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import domtoimage from 'dom-to-image'

import ImageViewer from '@/components/ImageViewer'
import IconButton from '@/components/IconButton'
import CircleButton from '@/components/CircleButton'
import Button from '@/components/Button'
import EmojiPicker from '@/components/EmojiPicker'
import EmojiList from '@/components/EmojiList'
import { ImageSource } from 'expo-image'
import EmojiSticker from '@/components/EmojiSticker'

const ImagePlaceholder = require('@/assets/images/background-image.png')

export default function Index() {
  const [status, requestPermission] = MediaLibrary.usePermissions()

  if (status === null) requestPermission()

  const imageRef = useRef<View>(null)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showAddOptions, setShowAppOptions] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedEmoji, setSelectedEmoji] = useState<ImageSource | null>(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if (result.canceled) {
      alert('You did not select any image')
      return
    }

    setSelectedImage(result.assets[0].uri)
    setShowAppOptions(true)
  }

  const onReset = () => {
    setShowAppOptions(false)
  }
  const onAddSticker = () => {
    setIsModalVisible(true)
  }
  const onModalClose = () => {
    setIsModalVisible(false)
  }
  const onEmojiSelect = (image: ImageSource) => {
    setSelectedEmoji(image)
    onModalClose()
  }

  const onSaveImage = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        })

        await MediaLibrary.saveToLibraryAsync(localUri)
        if (localUri) {
          alert('Saved!')
        }
      } catch (e) {
        console.log(e)
      }
    } else if (imageRef.current) {
      try {
        const dataUrl = await domtoimage.toJpeg(
          imageRef.current as unknown as Node,
          {
            quality: 0.95,
            width: 320,
            height: 440,
          }
        )

        let link = document.createElement('a')
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl
        link.click()
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            imgSource={ImagePlaceholder}
            selectedImage={selectedImage}
          />
          {selectedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={selectedEmoji} />
          )}
        </View>
      </View>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={onEmojiSelect} />
      </EmojiPicker>
      {showAddOptions && (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImage} />
          </View>
        </View>
      )}
      {!showAddOptions && (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImage} />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
