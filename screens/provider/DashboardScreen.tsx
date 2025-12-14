import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function DashboardScreen() {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      {/* ================= TỔNG QUAN HÔM NAY ================= */}
      <LinearGradient
        colors={["#4c6ef5", "#7950f2"]}
        style={styles.summaryCard}
      >
        <View style={styles.summaryHeader}>
          <Ionicons name="speedometer-outline" size={30} color="#fff" />
          <Text style={styles.summaryTitle}>Tổng quan hôm nay</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Doanh thu:</Text>
          <Text style={styles.value}>500.000 đ</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Lượt sử dụng:</Text>
          <Text style={styles.value}>85 lượt</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Đánh giá TB:</Text>
          <Text style={styles.value}>4.8 ⭐</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Số sự cố:</Text>
          <Text style={styles.value}>2</Text>
        </View>
      </LinearGradient>

      {/* ================= ACTION ================= */}
      <Text style={styles.sectionTitle}>Chức năng nhanh</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("FinanceScreen")}
        >
          <Ionicons name="cash-outline" size={26} color="#2563eb" />
          <Text style={styles.actionText}>Tài chính</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("FacilityScreen")}
        >
          <Ionicons name="build-outline" size={26} color="#2563eb" />
          <Text style={styles.actionText}>Cơ sở vật chất</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("ReportScreen")}
        >
          <Ionicons name="bar-chart-outline" size={26} color="#2563eb" />
          <Text style={styles.actionText}>Báo cáo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("IncidentScreen")}
        >
          <Ionicons name="warning-outline" size={26} color="#2563eb" />
          <Text style={styles.actionText}>Sự cố</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ====================== STYLE ====================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f6",
    padding: 16,
  },

  /* SUMMARY */
  summaryCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    elevation: 8,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: { color: "#e0e7ff", fontSize: 15 },
  value: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  /* ACTIONS */
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e293b",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  actionBtn: {
    backgroundColor: "#fff",
    width: "48%",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    elevation: 5,
  },
  actionText: {
    marginTop: 6,
    fontWeight: "600",
    fontSize: 14,
    color: "#1e293b",
  },
});
