import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";

const Card = props => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.white,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: colors.grey,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 5
  },

  cardContent: {
    marginLeft: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default Card;
