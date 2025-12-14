import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function FinanceScreen() {
  const [mode, setMode] = useState<"day" | "week" | "month">("day");

  /* ===== DATA DEMO ===== */
  const revenueData: any = {
    day: {
      labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      data: [120, 150, 90, 200, 170, 250, 220],
    },
    week: {
      labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
      data: [1200, 1800, 1500, 2100],
    },
    month: {
      labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
      data: [4500, 5200, 4800, 6100, 5900, 7200],
    },
  };

  const services = [
    { name: "WC thường", price: 5000, usage: 42 },
    { name: "Nhà tắm", price: 10000, usage: 18 },
    { name: "WC VIP", price: 15000, usage: 8 },
  ];

  const totalRevenue = services.reduce(
    (sum, s) => sum + s.price * s.usage,
    0
  );

  /* ================= UI ================= */
  return (
    <ScrollView style={styles.container}>
      {/* ===== HEADER ===== */}
      <Text style={styles.title}>💰 Tài chính</Text>

      {/* ===== SUMMARY CARDS ===== */}
      <View style={styles.row}>
        <View style={[styles.statCard, { backgroundColor: "#4A6C6F" }]}>
          <Ionicons name="cash-outline" size={22} color="#fff" />
          <Text style={styles.statLabel}>Doanh thu tháng</Text>
          <Text style={styles.statValue}>0 đ</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: "#5F8575" }]}>
          <Ionicons name="pricetag-outline" size={22} color="#fff" />
          <Text style={styles.statLabel}>Tổng giá dịch vụ</Text>
          <Text style={styles.statValue}>
            {services.reduce((s, i) => s + i.price, 0).toLocaleString()} đ
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: "#8FB8AC" }]}>
          <Ionicons name="layers-outline" size={22} color="#fff" />
          <Text style={styles.statLabel}>Số dịch vụ</Text>
          <Text style={styles.statValue}>{services.length}</Text>
        </View>
      </View>

      {/* ===== QUICK REPORT ===== */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Dòng tiền hôm nay</Text>
        <Text>• Doanh thu: {totalRevenue.toLocaleString()} đ</Text>
        <Text>• Lượt sử dụng: {services.reduce((s, i) => s + i.usage, 0)}</Text>
        <Text style={{ color: "#2F855A" }}>• So với hôm qua: +12%</Text>
      </View>

      {/* ===== CHART ===== */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📈 Doanh thu</Text>

        {/* Switch */}
        <View style={styles.switchRow}>
          {[
            { key: "day", label: "Ngày" },
            { key: "week", label: "Tuần" },
            { key: "month", label: "Tháng" },
          ].map((item: any) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.switchBtn,
                mode === item.key && styles.switchActive,
              ]}
              onPress={() => setMode(item.key)}
            >
              <Text
                style={{
                  color: mode === item.key ? "#fff" : "#4A6C6F",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <LineChart
          data={{
            labels: revenueData[mode].labels,
            datasets: [{ data: revenueData[mode].data }],
          }}
          width={screenWidth - 60}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 0,
            color: () => "#4A6C6F",
            labelColor: () => "#6B7280",
          }}
          style={{ marginTop: 10, borderRadius: 12 }}
        />
      </View>

      {/* ===== SERVICE LIST ===== */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📋 Hiệu quả dịch vụ</Text>

        {services.map((s, index) => (
          <View key={index} style={styles.serviceItem}>
            <Text style={styles.serviceName}>{s.name}</Text>
            <Text>Giá: {s.price.toLocaleString()} đ</Text>
            <Text>Lượt dùng: {s.usage}</Text>
            <Text style={{ color: "#2F855A" }}>
              Doanh thu: {(s.price * s.usage).toLocaleString()} đ
            </Text>
          </View>
        ))}
      </View>

      {/* ===== SUGGESTION ===== */}
      <View style={[styles.card, { backgroundColor: "#E6F2EF" }]}>
        <Text style={styles.cardTitle}>💡 Gợi ý tài chính</Text>
        <Text>
          Dịch vụ WC thường có tần suất sử dụng cao. Có thể tăng giá +1.000 đ để
          tối ưu doanh thu.
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1F2937",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "30%",
    padding: 12,
    borderRadius: 14,
  },
  statLabel: {
    color: "#E5E7EB",
    fontSize: 12,
    marginTop: 6,
  },
  statValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1F2937",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4A6C6F",
  },
  switchActive: {
    backgroundColor: "#4A6C6F",
  },
  serviceItem: {
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 10,
  },
  serviceName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
