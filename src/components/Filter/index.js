import * as React from 'react';
import {TouchableOpacity, View, Dimensions} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import RBSheet from 'react-native-raw-bottom-sheet';

import {FilterSvg} from 'src/utils/svgIcons';
import Theme from 'src/utils/Theme';
import {FILTER_GENRE} from 'src/api/env';
import styles from './styles';

export default ({handleTypeChange, type}) => {
  const refSheef = React.useRef(null);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => RBSheet.current.open()}>
          <FilterSvg width={30} height={30} fill={Theme.colors.textColor} />
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refSheef}
        height={Dimensions.get('window').height / 1.3}
        openDuration={300}
        customStyles={{
          container: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: Theme.colors.primary,
            padding: 20,
          },
        }}>
        <Dropdown label="Genre" data={FILTER_GENRE} />
      </RBSheet>
    </>
  );
};
