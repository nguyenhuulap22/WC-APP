import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRating } from "../../store/RatingContext";

export default function FeedbackScreen() {
  const { ratings } = useRating();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="chatbubbles-outline" size={24} color="#2563eb" />
          <Text style={styles.title}>Phản hồi từ khách hàng</Text>
        </View>

        {ratings.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            Chưa có đánh giá nào.
          </Text>
        ) : (
          <FlatList
            data={ratings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.feedbackItem}>
                <Text style={styles.stars}>⭐ {item.stars} sao</Text>
                <Text style={styles.comment}>
                  💬 {item.comment || "Không có bình luận"}
                </Text>
                <Text style={styles.time}>🕒 {item.createdAt}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

/* ================= STYLE ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 6,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  title: { marginLeft: 10, fontSize: 18, fontWeight: "bold" },
  feedbackItem: {
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 8,
  },
  stars: { fontWeight: "bold", color: "#f59e0b" },
  comment: { marginTop: 2 },
  time: { color: "#6b7280", fontSize: 12, marginTop: 2 },
});
