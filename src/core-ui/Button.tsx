import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  Text,
} from 'react-native';

import { colors } from '../constants/theme';

type Props = TouchableOpacityProps & {
  title?: string;
  mode?: 'primary' | 'secondary';
};

export default function Button(props: Props) {
  let { title, mode = 'primary', style, disabled, ...otherProps } = props;

  let buttonModeStyle = {
    backgroundColor: disabled
      ? colors.button.disabled
      : mode === 'primary'
      ? colors.button.primary
      : colors.button.secondary,
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, buttonModeStyle, style]}
      {...otherProps}
    >
      <Text style={styles.textBtn}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.misc.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    padding: 10,
    borderRadius: 5,
  },
  textBtn: {
    color: colors.text.light,
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
});
