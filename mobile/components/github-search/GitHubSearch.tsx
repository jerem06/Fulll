import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SearchInput } from "./SearchInput";
import { UserCard } from "./UserCard";
import { GitHubUser, SearchError } from "./types";

export const GitHubSearch: React.FC = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Set<number | string>>(
    new Set()
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    setIsLoading(true);
    setSearchQuery(query);
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        const error: SearchError = await response.json();
        if (response.status === 403) {
          Alert.alert(
            "Rate Limit Exceeded",
            "You've reached the GitHub API rate limit. Please try again later."
          );
          return;
        }
        throw new Error(error.message);
      }

      const data = await response.json();
      setUsers(data.items);
      setSelectedUsers(new Set()); // Reset selection on new search
      setIsEditMode(false); // Reset edit mode on new search
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users. Please try again.");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleUserSelection = (userId: number | string) => {
    setSelectedUsers((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(userId)) {
        newSelection.delete(userId);
      } else {
        newSelection.add(userId);
      }
      return newSelection;
    });
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((user) => user.id)));
    }
  };

  const handleDuplicate = () => {
    const selectedUsersList = users.filter((user) =>
      selectedUsers.has(user.id)
    );
    const timestamp = Date.now();
    const duplicatedUsers = selectedUsersList.map((user, index) => ({
      ...user,
      id: `${user.id}-${timestamp}-${index}`,
    }));
    setUsers((prev) => [...prev, ...duplicatedUsers]);
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((user) => !selectedUsers.has(user.id)));
    setSelectedUsers(new Set());
    setIsEditMode(false);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {isEditMode ? (
          <>
            <TouchableOpacity
              style={styles.selectAllContainer}
              onPress={toggleSelectAll}
            >
              <View
                style={[
                  styles.checkbox,
                  selectedUsers.size === users.length &&
                    styles.checkboxSelected,
                ]}
              >
                {selectedUsers.size === users.length && (
                  <View style={styles.checkboxInner} />
                )}
              </View>
              <Text style={styles.selectAllText}>Select All</Text>
              <View style={styles.selectAllTextContainer}>
                <Text style={styles.selectAllText}>
                  {selectedUsers.size > 0 && `${selectedUsers.size} selected`}
                </Text>
              </View>
            </TouchableOpacity>
            {selectedUsers.size > 0 && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.iconButton, styles.duplicateButton]}
                  onPress={handleDuplicate}
                >
                  <Ionicons name="copy" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconButton, styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Ionicons name="trash" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                setIsEditMode(false);
                setSelectedUsers(new Set());
              }}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </>
        ) : users.length > 0 ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditMode(true)}
          >
            <Ionicons name="pencil" size={24} color="#007AFF" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyState}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : searchQuery ? (
        <Text style={styles.emptyStateText}>No users found</Text>
      ) : (
        <Text style={styles.emptyStateText}>Search for GitHub users</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchInput onSearch={searchUsers} />
      {renderHeader()}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            isSelected={selectedUsers.has(item.id)}
            onSelect={toggleUserSelection}
            isEditMode={isEditMode}
          />
        )}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 50,
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 12,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  checkboxSelected: {
    backgroundColor: "#007AFF",
  },
  selectAllText: {
    fontSize: 16,
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  duplicateButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  listContent: {
    flexGrow: 1,
  },
  selectAllTextContainer: {
    marginLeft: 10,
    padding: 10,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  doneButton: {
    marginLeft: "auto",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  doneButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});
