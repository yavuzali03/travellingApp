import {View, Platform, TouchableOpacity,StyleSheet} from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAppleAlt} from "@fortawesome/free-solid-svg-icons/faAppleAlt";
import {faUser, faHouse, faMap,faMessage,faLocationArrow} from "@fortawesome/free-solid-svg-icons";


export function NavigationTabBar({ state, descriptors, navigation }) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    const icon = {
        Home : (props) => <FontAwesomeIcon icon={faHouse} size={24} color={props.color} />,
        Chats : (props) => <FontAwesomeIcon icon={faMessage} size={24} color={props.color} />,
        CreateTrips : (props) => <FontAwesomeIcon icon={faLocationArrow} size={30} color={props.color} />,
        MyTrips : (props) => <FontAwesomeIcon icon={faMap} size={24} color={props.color} />,
        Profile : (props) => <FontAwesomeIcon icon={faUser} size={24} color={props.color} />,
    }

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabbarItem}
                    >

                        {route.name === 'CreateTrips' ? (
                            <TouchableOpacity onPress={onPress}  onLongPress={onLongPress} style={styles.createTripIconContainer}>
                                {icon[route.name]({
                                    color: "#FFFFF8"
                                })}
                            </TouchableOpacity>
                        ) : (
                            icon[route.name]({
                                color: isFocused ? "#ED1C24" : "#B2B4B6"
                            })
                        )}
                        {route.name === 'CreateTrips' ? (null):(<Text style={{ color: isFocused ? "#ED1C24" : "#B2B4B6" }}>
                            {label}
                        </Text>)}

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#FFFFF8",
        paddingVertical: 15,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        elevation: 10,
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createTripIconContainer: {
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 24,
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -20,
        elevation : 5,
        borderWidth : 3,
        borderColor: '#f26066',
    }
});

