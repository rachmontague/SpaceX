import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

const SideButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.container, styles.leftSide]}>
        <Text style={styles.title}>{props.title}</Text>
        <Image source={props.icon} width="24" height="24"></Image>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start"
  },

  leftSide: {
    borderBottomLeftRadius: 21,
    borderTopLeftRadius: 21
  },

  title: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white,
    paddingRight: 8
  }
});

export default SideButton;
