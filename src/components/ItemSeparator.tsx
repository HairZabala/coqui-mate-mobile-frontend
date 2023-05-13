import theme from '@utils/theme';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface ItemSeparatorProps {
  style?: StyleProp<ViewStyle>;
}

const ItemSeparator: FC<ItemSeparatorProps> = (props) => {
  const { style } = props;

  return (
    <View style={styles.container}>
      <View style={[styles.itemSeparator, style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  itemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.black,
  },
});

export default ItemSeparator;
