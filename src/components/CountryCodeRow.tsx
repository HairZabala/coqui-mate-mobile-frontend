import theme from '@utils/theme';
import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface CountryCodeRowItem {
  name: string;
  countryCode: string;
  countryCallingCode: string;
}

interface CountryCodeRowProps {
  item: CountryCodeRowItem;
  onSelectCountry: (country: string, countryCode: string) => void;
}

const CountryCodeRow: FC<CountryCodeRowProps> = (props) => {
  const { item, onSelectCountry } = props;

  const onPress = useCallback(() => {
    onSelectCountry(item.name, item.countryCallingCode);
  }, [onSelectCountry, item]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <View style={styles.countryNameContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <Text style={styles.codeText}>{item.countryCallingCode}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  codeText: {
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0,
  },
  countryNameContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 15,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.horizontalDefault,
  },
});

export default React.memo(CountryCodeRow);
