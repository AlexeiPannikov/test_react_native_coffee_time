import React, { useState } from 'react';
import {
  type KeyboardType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ViewProps,
} from 'react-native';
import { useTheme } from '@shared/theme';
import { type IControllerRenderProps } from '@shared/ui/inputs/UiForm.tsx';
import { type RegisterOptions } from 'react-hook-form';
import { Eye, EyeClosed, staticModerateScale } from '@/shared';
import { SvgProps } from 'react-native-svg';

export interface IUiTextInputProps
  extends Partial<IControllerRenderProps<never, never>>,
    Partial<ViewProps> {
  name: string;
  placeholder?: string;
  hideText?: boolean;
  leftIcon?: React.FC<SvgProps>;
  keyboardType?: KeyboardType;
  options?: RegisterOptions;
  placeholderTextColor?: string;
  textColor?: string;
}

export const UiTextInput = (props: IUiTextInputProps) => {
  const {
    theme: { colors },
  } = useTheme();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(props.hideText ?? false);
  const ICON_SIZE = 25;

  return (
    <View>
      <View style={[styles.container, props.style]}>
        {props.leftIcon !== undefined && (
          <Pressable style={styles.leftIconContainer}>
            <props.leftIcon color={colors.onBackgroundVariant} width={ICON_SIZE} />
          </Pressable>
        )}
        <TextInput
          secureTextEntry={secureTextEntry}
          value={props.field?.value}
          {...props}
          style={[
            styles.input,
            {
              borderColor: 'transparent',
              borderBottomColor: !props.fieldState?.invalid
                ? isFocused
                  ? colors.primary
                  : colors.outline
                : colors.error,
              height: staticModerateScale(40),
              width: '100%',
              color: props.textColor ?? colors.onBackground,
              fontSize: staticModerateScale(18),
              paddingHorizontal: props.leftIcon !== undefined ? ICON_SIZE + 30 : 15,
            },
          ]}
          placeholderTextColor={props.placeholderTextColor ?? colors.onBackgroundVariant}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChangeText={props.field?.onChange}
        />
        {props.hideText && (
          <Pressable
            style={styles.rightIconContainer}
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}
          >
            {secureTextEntry ? (
              <EyeClosed fill={colors.onBackgroundVariant} width={ICON_SIZE} />
            ) : (
              <Eye fill={colors.onBackgroundVariant} width={ICON_SIZE} />
            )}
          </Pressable>
        )}
      </View>
      {props.fieldState?.invalid && (
        <View style={{ marginTop: 5 }}>
          <Text style={{ color: colors.error }}>{props.fieldState.error?.message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  rightIconContainer: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    paddingRight: 15,
  },
  leftIconContainer: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 15,
  },
});
