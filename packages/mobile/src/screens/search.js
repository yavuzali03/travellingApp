import {ActivityIndicator, FlatList, View, Text, TouchableOpacity, useWindowDimensions} from "react-native";
import { useEffect, useState } from "react";
import { debounce } from "lodash"; // DÜZENLENDİ!
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {useStyle} from "../contexts/styleContext";

export const Search = ({ searchValue }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const styleContext = useStyle();
    const {width,height} = useWindowDimensions();
    const debouncedSearch = debounce(async (text) => {
        if (!text) {
            setResults([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`http://3.78.68.196:5000/api/search?query=${text}`);
            setResults(response.data);
        } catch (error) {
            console.error('Arama hatası:', error);
        } finally {
            setLoading(false);
        }
    }, 300);

    // searchValue değiştikçe debouncedSearch tetiklenir
    useEffect(() => {
        debouncedSearch(searchValue);
    }, [searchValue]);

    // Komponent unmount olunca debounce'u iptal et
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, []);

    const renderItem = ({item}) => {
        return (
            <View style={styleContext.renderItemContainer}>
                <View style={{flexDirection: "row" , alignItems: "center" , justifyContent: "center" ,}}>
                    <View style={{width : width*0.1 , height : width*0.1  , borderRadius : width*0.05 , backgroundColor : "red"}}></View>
                    <Text style={[styleContext.title ,{paddingLeft : 10}]}>{item.username}</Text>
                </View>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faEllipsisVertical} size={24} color={"#313335"}/>
                </TouchableOpacity>

            </View>

        )
    }

    console.log(results);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};
