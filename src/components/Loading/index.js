import * as React from 'react';
import Spinner from 'react-native-spinkit';
import Theme from 'src/utils/Theme';

export default () => (
  <Spinner isVisible={true} size={100} type={'Wave'} color={Theme.colors.red} />
);
