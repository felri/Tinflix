import * as React from 'react';
import {TouchableOpacity, View, Dimensions} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Picker} from '@react-native-community/picker';
import {Text} from 'src/utils/Text';
import {FilterSvg} from 'src/utils/svgIcons';
import Theme from 'src/utils/Theme';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {FILTER_GENRE, FILTER_LANGUAGE} from 'src/api/env';
import styles from './styles';

const CustomMarker = () => (
  <TouchableOpacity
    style={{hitSlop: {top: 20, bottom: 20, left: 20, right: 20}}}>
    <View style={styles.marker} />
  </TouchableOpacity>
);

const BtnFilter = ({handlePress}) => (
  <TouchableOpacity
    style={[styles.btnAction, {backgroundColor: Theme.colors.red}]}
    onPress={handlePress}>
    <Text style={styles.textBtn}>Filter</Text>
  </TouchableOpacity>
);

const BtnCancel = ({handlePress}) => (
  <TouchableOpacity style={styles.btnAction} onPress={handlePress}>
    <Text style={styles.textBtn}>Cancel</Text>
  </TouchableOpacity>
);

const Btns = ({handleFilter, handleCancel}) => (
  <View style={styles.btns}>
    <BtnCancel handlePress={handleCancel} />
    <BtnFilter handlePress={handleFilter} />
  </View>
);

const Year = ({onYearChange, from, to, max}) => (
  <View>
    <Text style={[styles.textGenre, {marginBottom: 5}]}>Year</Text>
    <MultiSlider
      values={[from, to]}
      sliderLength={Dimensions.get('window').width - 50}
      onValuesChange={onYearChange}
      min={1920}
      customMarker={e => {
        return <CustomMarker currentValue={e.currentValue} />;
      }}
      selectedStyle={{
        backgroundColor: Theme.colors.red,
      }}
      max={max}
      step={1}
      allowOverlap={false}
      snapped
    />
    <View style={styles.containerFromTo}>
      <Text style={styles.textFromTo}>{from}</Text>
      <Text style={styles.textFromTo}>{to}</Text>
    </View>
  </View>
);

const Dropdown = ({setSelectedValue, item, title, data}) => (
  <View style={styles.containerPicker}>
    <Text style={styles.textGenre}>{title}</Text>
    <Picker
      selectedValue={item}
      style={styles.picker}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedValue({item: itemValue, name: title})
      }>
      {data.map((f, index) => (
        <Picker.Item
          label={f.value.charAt(0).toUpperCase() + f.value.slice(1)}
          value={f.value}
          key={index}
        />
      ))}
    </Picker>
  </View>
);

const Options = ({
  setSelectedValue,
  genre,
  language,
  onYearChange,
  to,
  from,
  max,
}) => (
  <View style={styles.containerOptions}>
    <Dropdown
      title="Language"
      data={FILTER_LANGUAGE}
      setSelectedValue={setSelectedValue}
      item={language}
    />
    <Dropdown
      title="Genre"
      data={FILTER_GENRE}
      setSelectedValue={setSelectedValue}
      item={genre}
    />
    <Year onYearChange={onYearChange} to={to} from={from} max={max} />
  </View>
);

export default ({
  handleChangeFilter,
  genre,
  language,
  from,
  to,
  handleFilter,
  handleCancel,
  onYearChange,
  max,
  active,
}) => {
  const refSheef = React.useRef(null);

  const handleCancelClick = () => {
    refSheef.current.close();
    handleCancel();
  };

  const handleFilterClick = () => {
    refSheef.current.close();
    handleFilter();
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
          style={styles.btn}
          onPress={() => refSheef.current.open()}>
          <FilterSvg
            width={30}
            height={30}
            fill={active ? Theme.colors.red : Theme.colors.textColor}
          />
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
        <Options
          max={max}
          from={from}
          to={to}
          onYearChange={onYearChange}
          setSelectedValue={handleChangeFilter}
          genre={genre}
          language={language}
        />
        <Btns
          handleCancel={handleCancelClick}
          handleFilter={handleFilterClick}
        />
      </RBSheet>
    </>
  );
};
