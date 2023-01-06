import React, { useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";

import { format } from "date-fns";

import Card from "./src/components/card";
import TextIconButton from "./src/components/text-icon-button";
import SideButton from "./src/components/side-button";

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
  const refresh = () => {};

  const convertDate = dateString => {
    return format(new Date(dateString), "do MMMM Y");
  };

  useEffect(() => {
    getLaunches();
  }, []);

  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView>
      <View style={[styles.buttonContainer, styles.sideButtonContainer]}>
        <SideButton title="Reload Data" icon={require("./src/assets/images/icons/refresh.png")} onPress={refresh} />
      </View>
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
                  <Text style={styles.flightText}>#{item.flight_number}</Text>
                  <Text style={styles.missionText}>{item.mission_name}</Text>
                  <View style={styles.stackContainer}>
                    <Text style={styles.dateText}>{convertDate(item.launch_date_utc)}</Text>
                    <Text style={styles.rocketText}>{item.rocket.rocket_name}</Text>
                  </View>
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

  sideButtonContainer: {
    marginBottom: 40
  },

  flightText: {
    fontSize: 30,
    fontFamily: fonts.medium,
    color: colors.grey,
    flex: 1
  },
  missionText: {
    fontSize: 22,
    fontFamily: fonts.medium,
    color: colors.grey,
    flex: 4
  },

  stackContainer: {
    flex: 2
  },

  dateText: {
    fontSize: 10,
    fontFamily: fonts.regular,
    color: colors.grey
  },
  rocketText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.grey
  }
});

export default App;
