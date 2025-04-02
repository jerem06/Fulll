import { View, StyleSheet } from "react-native";
import { GitHubSearch } from "@/components/github-search/GitHubSearch";
export default function Home() {
  return (
    <View style={styles.container}>
      <GitHubSearch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
