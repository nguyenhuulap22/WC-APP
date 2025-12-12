import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Báo cáo nhanh</Text>

      <View style={styles.card}>
        <Ionicons name="bar-chart-outline" size={28} color="#2563eb" />
        <Text style={styles.cardTitle}>Thống kê hôm nay</Text>

        <Text style={styles.text}>• Doanh thu: 500.000 đ</Text>
        <Text style={styles.text}>• Lượt sử dụng: 85 lượt</Text>
        <Text style={styles.text}>• Đánh giá trung bình: 4.8 ⭐</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#eef1f6" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    elevation: 5,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  text: { fontSize: 15, marginTop: 4 },
});
