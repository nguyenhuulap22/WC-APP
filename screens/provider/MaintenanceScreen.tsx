import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function MaintenanceScreen() {
  const [issues, setIssues] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [cleanTime, setCleanTime] = useState("09:00");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const issueData = await AsyncStorage.getItem("issues");
    const inventoryData = await AsyncStorage.getItem("inventory");
    const clean = await AsyncStorage.getItem("cleanTime");

    if (issueData) setIssues(JSON.parse(issueData));
    if (inventoryData) setInventory(JSON.parse(inventoryData));
    if (clean) setCleanTime(clean);
    else initDefaultInventory();
  };

  const initDefaultInventory = () => {
    const defaultItems = [
      { id: 1, name: "Giấy vệ sinh", qty: 20 },
      { id: 2, name: "Xà phòng rửa tay", qty: 5 },
      { id: 3, name: "Dung dịch tẩy rửa", qty: 3 },
    ];
    setInventory(defaultItems);
    AsyncStorage.setItem("inventory", JSON.stringify(defaultItems));
  };

  const handleResolve = async (id: number) => {
    const updated = issues.map((item) =>
      item.id === id ? { ...item, done: true } : item
    );
    setIssues(updated);
    await AsyncStorage.setItem("issues", JSON.stringify(updated));
  };

  const updateQty = async (id: number, change: number) => {
    const updated = inventory.map((item) =>
      item.id === id ? { ...item, qty: Math.max(0, item.qty + change) } : item
    );
    setInventory(updated);
    await AsyncStorage.setItem("inventory", JSON.stringify(updated));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vận hành & bảo trì</Text>

      {/* ============= SỰ CỐ ============= */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          <Ionicons name="alert-circle-outline" size={20} color="#dc2626" /> Sự cố hôm nay
        </Text>

        {issues.length === 0 ? (
          <Text style={styles.empty}>Hiện không có sự cố nào.</Text>
        ) : (
          issues.map((item) => (
            <View key={item.id} style={styles.issueRow}>
              <Text style={styles.issueText}>
                • {item.text} – {item.area}
              </Text>

              {!item.done ? (
                <TouchableOpacity
                  style={styles.doneBtn}
                  onPress={() => handleResolve(item.id)}
                >
                  <Text style={styles.doneText}>Đã xử lý</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.resolved}>✓</Text>
              )}
            </View>
          ))
        )}
      </View>

      {/* ============= TỒN KHO ============= */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          <Ionicons name="cube-outline" size={20} color="#2563eb" /> Tồn kho chính
        </Text>

        {inventory.map((item) => (
          <View key={item.id} style={styles.invRow}>
            <Text style={styles.invName}>{item.name}</Text>

            <View style={styles.qtyBox}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQty(item.id, -1)}
              >
                <Ionicons name="remove" size={20} color="#dc2626" />
              </TouchableOpacity>

              <Text style={styles.qtyText}>{item.qty}</Text>

              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQty(item.id, +1)}
              >
                <Ionicons name="add" size={20} color="#22c55e" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* ============= LỊCH VỆ SINH ============= */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          <Ionicons name="calendar-outline" size={20} color="#0ea5e9" /> Lịch vệ sinh hằng ngày
        </Text>

        <Text style={{ marginBottom: 6 }}>Giờ dọn dẹp: {cleanTime}</Text>

        <TouchableOpacity
          style={styles.timeBtn}
          onPress={async () => {
            const newTime = cleanTime === "09:00" ? "15:00" : "09:00";
            setCleanTime(newTime);
            await AsyncStorage.setItem("cleanTime", newTime);
          }}
        >
          <Text style={styles.timeBtnText}>Đổi giờ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f1f5f9" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  empty: { color: "#6b7280", fontStyle: "italic" },

  // Issues
  issueRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  issueText: { fontSize: 15 },
  doneBtn: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  doneText: { color: "#fff", fontWeight: "600" },
  resolved: { color: "green", fontSize: 20, fontWeight: "800" },

  // Inventory
  invRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  invName: { fontSize: 15, fontWeight: "500" },
  qtyBox: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    backgroundColor: "#f3f4f6",
    padding: 6,
    borderRadius: 6,
  },
  qtyText: { marginHorizontal: 10, fontSize: 16 },

  // Cleaning time
  timeBtn: {
    backgroundColor: "#0ea5e9",
    padding: 8,
    borderRadius: 10,
    marginTop: 6,
    alignItems: "center",
  },
  timeBtnText: { color: "#fff", fontWeight: "bold" },
});
