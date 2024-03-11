import React, { PropsWithChildren } from 'react';
import { Modal, ModalProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { staticModerateScale, useResponsiveSizes, useTheme } from '@/shared';

interface IProps extends ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const UiModal = (props: PropsWithChildren<IProps>) => {
  const { scale } = useResponsiveSizes();
  const {
    theme: { colors },
  } = useTheme();

  return (
    <Modal {...props}>
      <TouchableOpacity disabled={true} style={styles.container}>
        <View style={[styles.modal, { width: scale(280), backgroundColor: colors.background }]}>
          <View style={styles.body}>{props.children}</View>
          <View style={[styles.buttons, { borderTopColor: colors.outlineVariant }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.onCancel();
              }}
            >
              <Text style={styles.text}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.onConfirm();
              }}
            >
              <Text style={styles.text}>Ок</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modal: {
    padding: 10,
    borderRadius: 4,
  },
  body: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  buttons: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
  },
  text: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: staticModerateScale(16),
  },
});
