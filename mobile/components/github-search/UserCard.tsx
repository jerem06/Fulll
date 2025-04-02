import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import { GitHubUser } from "./types";

interface UserCardProps {
  user: GitHubUser;
  isSelected: boolean;
  onSelect: (userId: number | string) => void;
  isEditMode: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  isSelected,
  onSelect,
  isEditMode,
}) => {
  return (
    <View style={styles.container}>
      {isEditMode && (
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => onSelect(user.id)}
        >
          <View
            style={[
              styles.checkboxInner,
              isSelected && styles.checkboxSelected,
            ]}
          >
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.content}>
        <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.id}>{user.id}</Text>
          <Text style={styles.username}>{user.login}</Text>
        </View>
        <View style={styles.viewProfile}>
          <Text style={styles.viewProfileText}>View profile</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  checkbox: {
    position: "absolute",
    left: 24,
    top: 24,
    zIndex: 1,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  checkboxSelected: {
    backgroundColor: "#007AFF",
  },
  checkmark: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "gray",

    borderRadius: 10,
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    marginTop: 10,
    marginLeft: 12,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  id: {
    textAlign: "center",
  },
  type: {
    fontSize: 14,
    color: "#666",
  },
  viewProfile: {
    marginTop: 50,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  viewProfileText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
  },
});
