import {View, StyleSheet, FlatList , Animated} from "react-native";
import slides from "./slides";
import OnboardingItem from "./onboardingItem";
import {useRef, useState} from "react";
import Paginator from "./paginator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

export const Onboarding = ()=>{
    const navigation = useNavigation();

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems})=>{
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold : 50}).current;

    const skipOnboarding = async ()=>{
        await AsyncStorage.setItem("isFirstLaunch", "false");
        navigation.reset("registerScreen");
    }

    navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
    });

    return (
        <View style={styles.container}>
            <View style={{flex: 3}}>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={slides}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    bounces={false}
                    renderItem={({item})=><OnboardingItem item={item}/>}
                    onScroll={ Animated.event([{nativeEvent :{contentOffset : {x : scrollX} } }],{
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref = {slidesRef}
                />
            </View>

            <Paginator data ={slides} scrollX={scrollX}/>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
