import React, { useState } from 'react';
import { UiButton, UiModal, UiText, useTheme } from '@/shared';
import { useAuth } from '@/features';

export const LogOutButton = () => {
  const {
    theme: { colors },
  } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const { signOut } = useAuth();

  return (
    <>
      <UiButton type="text" color={colors.error} onPress={() => setModalVisible(true)}>
        Выйти
      </UiButton>
      <UiModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onCancel={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          signOut();
        }}
      >
        <UiText type="body1">Вы уверенны что хотите выйти?</UiText>
      </UiModal>
    </>
  );
};
