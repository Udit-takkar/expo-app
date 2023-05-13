import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { Player } from "@livepeer/react-native";
import { Dimensions } from "react-native";

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get("window");


const getIPFSLink = (hash) => {
  const gateway = "https://lens.infura-ipfs.io/ipfs/";

  return hash
    .replace(/^Qm[1-9A-Za-z]{44}/gm, `${gateway}${hash}`)
    .replace("https://ipfs.io/ipfs/", gateway)
    .replace("ipfs://", gateway);
};


export default function VideoPlayer({ data, isActive }) {
  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <View
      style={[
        styles.container,
        { height: WINDOW_HEIGHT  - statusBarHeight },
      ]}
    >
      <StatusBar barStyle={"light-content"} />
      <Player
        src={getIPFSLink(data.metadata.media[0].original.url)}
        priority
        aspectRatio={"16:9"}
        loop
        autoplay={isActive}
      />
      <View style={styles.bottomSection}>
        <View style={styles.bottomLeftSection}>
          <Text style={styles.channelName}>{data.profile.name}</Text>
          <Text style={styles.caption}>{data.metadata.name}</Text>
        </View>
        <View style={styles.bottomRightSection}>
          <Image
            source={require("../assets/images/floating-music-note.png")}
            style={[styles.floatingMusicNote]}
          />
          <Image
            source={require("../assets/images/disc.png")}
            style={[styles.musicDisc]}
          />
        </View>
      </View>

      <View style={styles.verticalBar}>
        <View style={[styles.verticalBarItem, styles.avatarContainer]}>
          <Image
            style={styles.avatar}
            source={{
              uri: getIPFSLink(data.profile.picture.original.url),
            }}
          />
          <View style={styles.followButton}>
            <Image
              source={require("../assets/images/plus-button.png")}
              style={styles.followIcon}
            />
          </View>
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require("../assets/images/heart.png")}
          />
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require("../assets/images/message-circle.png")}
          />
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require("../assets/images/reply.png")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomLeftSection: {
    flex: 4,
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  channelName: {
    color: "white",
    fontWeight: "bold",
  },
  caption: {
    color: "white",
    marginVertical: 8,
  },
  musicNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  musicNameIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  musicName: {
    color: "white",
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
  verticalBar: {
    position: "absolute",
    right: 8,
    bottom: 72,
  },
  verticalBarItem: {
    marginBottom: 24,
    alignItems: "center",
  },
  verticalBarIcon: {
    width: 32,
    height: 32,
  },
  verticalBarText: {
    color: "white",
    marginTop: 4,
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  followButton: {
    position: "absolute",
    bottom: -8,
  },
  followIcon: {
    width: 21,
    height: 21,
  },
  floatingMusicNote: {
    position: "absolute",
    right: 40,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: "white",
  },
});
