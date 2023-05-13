import ItemSeparator from '@components/ItemSeparator';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '@utils/theme';
import countryCallingCodes, { CountryProperty } from 'country-codes-list';
import { CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js/max';
import { groupBy } from 'lodash';
import React, { FC, useCallback, useMemo } from 'react';
import { ListRenderItem, SectionList, StyleSheet, Text, View } from 'react-native';
import CountryCodeRow, { CountryCodeRowItem } from '../components/CountryCodeRow';
import { AuthenticationStackParamList } from '../navigators/AuthenticationNavigator';
import { ModalNavigatorParamList } from '../navigators/ModalNavigator';
import { ROUTE_AUTHENTICATION_MOBILE_NUMBER, ROUTE_COUNTRY_CODE_SELECT } from '../navigators/routeNames';

type CountryCodeLookup = {
  [countryCode: string]: string;
};

const countryCodeByCountryId: CountryCodeLookup = countryCallingCodes.customList(
  'countryCode' as CountryProperty,
  '{countryNameEn}',
);

type CountryCodeRouteProp = RouteProp<ModalNavigatorParamList, typeof ROUTE_COUNTRY_CODE_SELECT>;
type CountryCodeNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalNavigatorParamList, typeof ROUTE_COUNTRY_CODE_SELECT>,
  StackNavigationProp<AuthenticationStackParamList>
>;

interface Section {
  title: string;
  data: Array<CountryCodeRowItem>;
}

interface CountryCodeSelectScreenProps {
  navigation: CountryCodeNavigationProp;
  route: CountryCodeRouteProp;
}

const CountryCodeSelectScreen: FC<CountryCodeSelectScreenProps> = ({ navigation }) => {
  const sections: Section[] = useMemo(() => {
    const countryCodes = getCountries();

    const countryCodeRows = countryCodes
      .map((countryCode) => {
        try {
          const word = countryCodeByCountryId?.[countryCode];

          return word
            ? {
                name: word,
                countryCode: countryCode,
                countryCallingCode: '+ ' + getCountryCallingCode(countryCode as CountryCode),
              }
            : undefined;
        } catch {
          return undefined;
        }
      }, [])
      .filter((v) => !!v) as CountryCodeRowItem[];

    // Organise contacts into section by first character in name
    const groupedCountryCodeRows = groupBy<CountryCodeRowItem>(
      countryCodeRows.sort((a, b) => (a?.name ?? '').toUpperCase().localeCompare((b?.name ?? '').toUpperCase())),
      (countryCodeRow) => countryCodeRow.name[0]?.toUpperCase() ?? ' ',
    );

    return Object.entries(groupedCountryCodeRows).map((entry) => {
      const [letter, countryCodeRowGroup] = entry;

      return {
        title: letter,
        data: countryCodeRowGroup,
      };
    });
  }, []);

  const onSelectCountry = useCallback(
    (country: string, countryCode: string) => {
      navigation.navigate(ROUTE_AUTHENTICATION_MOBILE_NUMBER, { country: country, countryCode: countryCode });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<CountryCodeRowItem> = useCallback(
    ({ item }) => {
      return <CountryCodeRow item={item} onSelectCountry={onSelectCountry} key={item.countryCode} />;
    },
    [onSelectCountry],
  );

  return (
    <View style={styles.container}>
      {sections.length > 0 && (
        <SectionList
          sections={sections}
          contentContainerStyle={[styles.scrollContainer]}
          keyExtractor={(item) => item.name + item.countryCallingCode}
          indicatorStyle={'white'}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeaderContainer}>
              <Text>{title}</Text>
            </View>
          )}
          initialNumToRender={20}
          maxToRenderPerBatch={50}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContainer: {
    paddingHorizontal: theme.spacing.horizontalDefault,
  },
  sectionHeaderContainer: {
    backgroundColor: theme.colors.white,
  },
});

export default CountryCodeSelectScreen;
