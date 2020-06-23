// @flow
import * as React from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {Easing} from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import Theme from 'src/utils/Theme';
import Card from 'src/components/Card';
import Details from 'src/components/Details';
import ModalTrailer from 'src/components/ModalTrailer';

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 400,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [set(config.toValue, dest)],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

const {width, height} = Dimensions.get('window');
const toRadians = angle => angle * (Math.PI / 180);
const rotatedWidth =
  width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));
const {
  add,
  multiply,
  block,
  debug,
  neq,
  cond,
  eq,
  event,
  lessThan,
  greaterThan,
  and,
  call,
  set,
  clockRunning,
  startClock,
  stopClock,
  Clock,
  Value,
  concat,
  interpolate,
  Extrapolate,
  timing,
} = Animated;

export default class Swipe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.translationX = new Value(0);
    this.translationY = new Value(0);
    this.velocityX = new Value(0);
    this.offsetY = new Value(0);
    this.offsetX = new Value(0);
    this.gestureState = new Value(State.UNDETERMINED);
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationX: this.translationX,
            translationY: this.translationY,
            velocityX: this.velocityX,
            state: this.gestureState,
          },
        },
      ],
      {useNativeDriver: true},
    );
    this.init();
  }

  state = {
    modal: false,
    trailerId: '',
  };

  init = () => {
    const clockX = new Clock();
    const clockY = new Clock();
    const {
      translationX,
      translationY,
      velocityX,
      gestureState,
      offsetY,
      offsetX,
    } = this;
    gestureState.setValue(State.UNDETERMINED);
    translationX.setValue(0);
    translationY.setValue(0);
    velocityX.setValue(0);
    offsetY.setValue(0);
    offsetX.setValue(0);

    const finalTranslateX = add(translationX, multiply(0.2, velocityX));
    const translationThreshold = width / 4;
    const snapPoint = cond(
      lessThan(finalTranslateX, -translationThreshold),
      -rotatedWidth,
      cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0),
    );

    // TODO: handle case where the user drags the card again before the spring animation finished
    this.translateY = cond(
      eq(gestureState, State.END),
      [
        set(translationY, runTiming(clockY, translationY, 0)),
        set(offsetY, translationY),
        translationY,
      ],
      cond(
        eq(gestureState, State.BEGAN),
        [stopClock(clockY), translationY],
        translationY,
      ),
    );
    this.translateX = cond(
      eq(gestureState, State.END),
      [
        set(translationX, runTiming(clockX, translationX, snapPoint)),
        set(offsetX, translationX),
        cond(and(eq(clockRunning(clockX), 0), neq(translationX, 0)), [
          call([translationX], this.swipped),
        ]),
        translationX,
      ],
      cond(
        eq(gestureState, State.BEGAN),
        [stopClock(clockX), translationX],
        translationX,
      ),
    );
  };

  swipped = ([translationX]) => {
    this.init();
    this.props.handleSwipe({like: translationX > 0});
  };

  onInfoClick = () => {
    this.RBSheet.open();
  };

  onTrailerClick = ({trailerId}) => {
    this.setState({
      modal: !this.state.modal,
      trailerId,
    });
  };

  render() {
    const {onGestureEvent, translateX, translateY} = this;
    const {
      cards: [first, ...cards],
    } = this.props;
    const rotateZ = concat(
      interpolate(translateX, {
        inputRange: [-width / 2, width / 2],
        outputRange: [15, -15],
        extrapolate: Extrapolate.CLAMP,
      }),
      'deg',
    );
    const likeOpacity = interpolate(translateX, {
      inputRange: [0, width / 4],
      outputRange: [0, 1],
    });
    const nopeOpacity = interpolate(translateX, {
      inputRange: [-width / 4, 0],
      outputRange: [1, 0],
    });
    const style = {
      ...StyleSheet.absoluteFillObject,
      zIndex: 800,
      transform: [{translateX}, {translateY}, {rotateZ}],
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cards}>
          {(cards || [])
            .slice(0, 1)
            .reverse()
            .map(card => (
              <Card key={card.id} {...{card}} />
            ))}
          <PanGestureHandler
            onHandlerStateChange={onGestureEvent}
            {...{onGestureEvent}}>
            <Animated.View {...{style}}>
              {first && (
                <Card
                  card={first}
                  onTrailerClick={this.onTrailerClick}
                  {...{likeOpacity, nopeOpacity}}
                  onInfoClick={this.onInfoClick}
                />
              )}
            </Animated.View>
          </PanGestureHandler>
        </View>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
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
          <Details
            card={first}
            alertShowUnavailable={this.props.alertShowUnavailable}
          />
        </RBSheet>
        <ModalTrailer
          isVisible={this.state.modal}
          onClose={this.onTrailerClick}
          trailerId={this.state.trailerId}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  cards: {
    flex: 1,
    margin: 8,
    marginTop: 0,
    zIndex: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});
