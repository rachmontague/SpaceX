import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";

import Card from "./src/components/card";
import TextIconButton from "./src/components/text-icon-button";
import SideButton from "./src/components/side-button";

import { fonts } from "./src/styles/fonts";
import { colors } from "./src/styles/colors";

import { fetchLaunches } from "./src/store/features/launches/launchesSlice";
import { selectLaunches } from "./src/store/features/launches/launchesSelectors";

const App = () => {
  const data = useSelector(selectLaunches);
  const dispatch = useDispatch();

  const filterByYear = () => {};
  const sortDescending = () => {};

  const refresh = () => {
    dispatch(fetchLaunches());
  };

  const convertDate = dateString => {
    return format(new Date(dateString), "do MMMM Y");
  };

  useEffect(() => {
    dispatch(fetchLaunches());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.buttonContainer, styles.sideButtonContainer]}>
        <SideButton title="Reload Data" icon={require("./src/assets/images/icons/refresh.png")} onPress={refresh} />
      </View>
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

      <View style={styles.listContainer}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 30
  },

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
