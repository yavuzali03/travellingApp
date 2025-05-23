import {ActivityIndicator, FlatList, View, Text, TouchableOpacity, useWindowDimensions} from "react-native";
import { useEffect, useState } from "react";
import { debounce } from "lodash"; // DÜZENLENDİ!
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {useStyle} from "../contexts/styleContext";
import {RenderItem} from "../components/renderItem";

export const Search = ({ searchValue }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const test_API_URL = process.env.test_API_URL;
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
            const response = await axios.get(`${test_API_URL}/search?query=${text}`);
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



    console.log(results);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <RenderItem item={item} />}
                />
            )}
        </View>
    );
};
