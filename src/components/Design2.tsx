import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {RefObject, useRef} from 'react';
import {ONBOARDING_BGS, ONBOARDING_DATA} from '../common/data';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('screen');

const NextButton = ({
  scrollx,
  flatListRef,
}: {
  scrollx: Animated.Value;
  flatListRef: RefObject<FlatList<any>>;
}) => {
  const yolo = Animated.modulo(
    Animated.divide(Animated.modulo(scrollx, width), new Animated.Value(width)),
    1,
  );
  const scale = yolo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

  let indexIncrementer = 1;
  return (
    <View
      style={{
        position: 'absolute',
        bottom: height * 0.1,
        flexDirection: 'row',
      }}>
      <Pressable
        onPress={() => {
          if (
            flatListRef &&
            flatListRef?.current &&
            indexIncrementer < ONBOARDING_DATA.length
          ) {
            flatListRef?.current.scrollToIndex({index: indexIncrementer});
            indexIncrementer++;
          } else {
            indexIncrementer = 0;
          }
        }}>
        {({pressed}) => (
          <Animated.View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#000',
              alignItems: 'center',
              justifyContent: 'center',
              transform: [
                {
                  scale,
                },
              ],
            }}>
            <FontAwesome5 name="arrow-right" size={20} color="#fff" />
          </Animated.View>
        )}
      </Pressable>
    </View>
  );
};

const SquareFront = ({scrollx}: {scrollx: Animated.Value}) => {
  const yolo = Animated.modulo(
    Animated.divide(Animated.modulo(scrollx, width), new Animated.Value(width)),
    1,
  );

  const translateY = yolo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, width, 0],
  });
  const rotate = yolo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['25deg', '0deg', '25deg'],
  });
  return (
    <Animated.View
      style={{
        width: width * 0.7,
        height: height * 0.5,
        top: height * 0.1,
        left: 80,
        backgroundColor: '#eee',
        borderRadius: 15,
        position: 'absolute',
        transform: [
          {
            translateY,
          },
          {
            rotate,
          },
        ],
        alignItems: 'center',
        padding: 10,
      }}>
      <View
        style={{
          width: '100%',
          height: width * 0.6,
          backgroundColor: '#ddd',
          borderRadius: 10,
        }}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <View
          style={{
            width: '49%',
            height: width * 0.4,
            backgroundColor: '#ddd',
            borderRadius: 10,
          }}
        />
        <View
          style={{
            width: '49%',
            height: width * 0.4,
            backgroundColor: '#ddd',
            borderRadius: 10,
          }}
        />
      </View>
    </Animated.View>
  );
};
const SquareBack = ({scrollx}: {scrollx: Animated.Value}) => {
  const yolo = Animated.modulo(
    Animated.divide(Animated.modulo(scrollx, width), new Animated.Value(width)),
    1,
  );

  const translateY = yolo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, height, 0],
  });

  const rotate = yolo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-25deg', '0deg', '-25deg'],
  });
  return (
    <Animated.View
      style={{
        width: width * 0.7,
        height: height * 0.5,
        top: height * 0.1,
        right: 5,
        backgroundColor: '#eee',
        borderRadius: 15,
        position: 'absolute',
        transform: [
          {
            translateY,
          },
          {
            rotate,
          },
        ],
        alignItems: 'center',
        padding: 10,
      }}>
      <View
        style={{
          width: '100%',
          height: width * 0.3,
          backgroundColor: '#ddd',
          borderRadius: 10,
        }}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <View
          style={{
            width: '49%',
            height: width * 0.4,
            backgroundColor: '#ddd',
            borderRadius: 10,
          }}
        />
        <View
          style={{
            width: '49%',
            height: width * 0.4,
            backgroundColor: '#ddd',
            borderRadius: 10,
          }}
        />
      </View>
    </Animated.View>
  );
};

const Backdrop = ({scrollx}: {scrollx: Animated.Value}) => {
  const backgroundColor = scrollx.interpolate({
    inputRange: ONBOARDING_BGS.map((_, i) => i * width),
    outputRange: ONBOARDING_BGS.map(bg => bg),
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, {backgroundColor}]} />
  );
};

const Indicator = ({scrollx}: {scrollx: Animated.Value}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: height * 0.2 + 10,
        flexDirection: 'row',
      }}>
      {ONBOARDING_DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollx.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indiator-${i}`}
            style={{
              height: 5,
              width: 5,
              borderRadius: 5,
              backgroundColor: '#333',
              margin: 2,
              opacity,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

export default function Design2() {
  const scrollx = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollx={scrollx} />
      <SquareBack scrollx={scrollx} />
      <SquareFront scrollx={scrollx} />
      <Animated.FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        keyExtractor={_item => _item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollx,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => {
          return (
            <View style={styles.onboardContainer}>
              <View style={styles.onboardImageContainer}></View>
              <View style={styles.onboardContentContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollx={scrollx} />
      <NextButton scrollx={scrollx} flatListRef={flatListRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardContainer: {
    flex: 1,
    width,
  },
  onboardImageContainer: {
    height: height * 0.5,
  },
  onboardContentContainer: {
    height: height * 0.5,
    paddingTop: 20,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 23,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
  },
});
