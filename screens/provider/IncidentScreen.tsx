import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IncidentScreen() {
  const [incidents, setIncidents] = useState([
    { id: 1, title: "Hết giấy vệ sinh – Khu A", done: false },
    { id: 2, title: "Hỏng vòi nước – Khu B", done: true },
  ]);

  const toggleDone = (id: number) => {
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, done: !i.done } : i
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sự cố hôm nay</Text>

      {incidents.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.text}>• {item.title}</Text>

          <TouchableOpacity
            style={[
              styles.btn,
              { backgroundColor: item.done ? "#10b981" : "#2563eb" }
            ]}
            onPress={() => toggleDone(item.id)}
          >
            <Text style={styles.btnText}>
              {item.done ? "Đã xử lý" : "Xử lý"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#eef1f6" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 4,
  },
  text: { fontSize: 16 },
  btn: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
