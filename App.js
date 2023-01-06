import React, { useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";

import Card from "./src/components/card";
import TextIconButton from "./src/components/text-icon-button";

import { fonts } from "./src/styles/fonts";
import { colors } from "./src/styles/colors";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getLaunches = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v3/launches?limit=10");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterByYear = () => {};
  const sortDescending = () => {};

  useEffect(() => {
    getLaunches();
  }, []);

  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView>
      <View>
        <View style={styles.buttonContainer}>
          <TextIconButton
            title="Filter by Year"
            icon={require("./src/assets/images/icons/select.png")}
            onPress={filterByYear}
          />
          <TextIconButton
            title="Sort Descending"
            icon={require("./src/assets/images/icons/sort.png")}
            onPress={sortDescending}
          />
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ flight_number }, index) => flight_number}
              renderItem={({ item }) => (
                <Card>
                  <Text>
                    {item.flight_number}, {item.mission_name}, {item.rocket.rocket_name},{item.launch_date_utc},
                  </Text>
                </Card>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end"
  },

  titleText: {
    fontSize: 24,
    fontFamily: fonts.regularItalic,
    color: colors.blue
  }
});

export default App;
