import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function ReportScreen() {
  const [mode, setMode] = useState<"day" | "week" | "month">("day");

  const chartData = {
    day: {
      labels: ["6h", "9h", "12h", "15h", "18h", "21h"],
      data: [50, 120, 200, 160, 140, 90],
    },
    week: {
      labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      data: [500, 650, 700, 600, 900, 1200, 800],
    },
    month: {
      labels: ["W1", "W2", "W3", "W4"],
      data: [3200, 4500, 3900, 5200],
    },
  };

  const current = chartData[mode];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Báo cáo nhanh</Text>

      {/* ===== CARD THỐNG KÊ ===== */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="stats-chart-outline" size={22} color="#2563eb" />
          <Text style={styles.cardTitle}>Thống kê hôm nay</Text>
        </View>

        <Text style={styles.item}>• Doanh thu: <Text style={styles.bold}>500.000 đ</Text></Text>
        <Text style={styles.item}>• Lượt sử dụng: <Text style={styles.bold}>85 lượt</Text></Text>
        <Text style={styles.item}>• Đánh giá TB: <Text style={styles.bold}>4.8 ⭐</Text></Text>
      </View>

      {/* ===== CHỌN CHẾ ĐỘ ===== */}
      <View style={styles.segment}>
        {[
          { key: "day", label: "Ngày" },
          { key: "week", label: "Tuần" },
          { key: "month", label: "Tháng" },
        ].map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.segmentBtn,
              mode === item.key && styles.segmentActive,
            ]}
            onPress={() => setMode(item.key as any)}
          >
            <Text
              style={[
                styles.segmentText,
                mode === item.key && styles.segmentTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ===== BIỂU ĐỒ ===== */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>
          📈 Doanh thu theo {mode === "day" ? "ngày" : mode === "week" ? "tuần" : "tháng"}
        </Text>

        <LineChart
          data={{
            labels: current.labels,
            datasets: [{ data: current.data }],
          }}
          width={screenWidth - 40}
          height={240}
          yAxisSuffix="k"
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
            labelColor: () => "#374151",
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#2563eb",
            },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>
    </ScrollView>
  );
}

/* ================= STYLE ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    fontSize: 15,
    marginVertical: 4,
  },
  bold: {
    fontWeight: "bold",
  },

  segment: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    marginBottom: 20,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  segmentActive: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
  },
  segmentText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  segmentTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
