import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

type Props = {
  label: string
  theme?: 'primary'
  onPress?: PressableProps['onPress']
}

export default function Button({ label, theme, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View style={[styles.buttonContainer, styles.buttonContainer_primary]}>
        <Pressable
          style={[styles.button, styles.button_primary]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color={styles.buttonLabel_primary.color}
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, styles.buttonLabel_primary]}>
            {label}
          </Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  buttonContainer_primary: {
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 18,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button_primary: {
    backgroundColor: '#fff',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  buttonLabel_primary: {
    color: '#25292e',
  },
})
