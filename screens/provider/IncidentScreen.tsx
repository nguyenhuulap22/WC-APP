import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IncidentStatus = "pending" | "processing" | "done";
type Priority = "high" | "medium" | "low";

interface Incident {
  id: number;
  title: string;
  area: string;
  type: string;
  priority: Priority;
  status: IncidentStatus;
  time: string;
}

export default function IncidentScreen() {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 1,
      title: "Hết giấy vệ sinh",
      area: "Khu A",
      type: "🧻",
      priority: "medium",
      status: "pending",
      time: "17:30",
    },
    {
      id: 2,
      title: "Hỏng vòi nước",
      area: "Khu B",
      type: "🚰",
      priority: "high",
      status: "processing",
      time: "16:50",
    },
    {
      id: 3,
      title: "Mất vệ sinh",
      area: "Khu C",
      type: "🧼",
      priority: "low",
      status: "done",
      time: "15:20",
    },
  ]);

  const updateStatus = (id: number, status: IncidentStatus) => {
    setIncidents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const renderStatusButton = (item: Incident) => {
    if (item.status === "pending") {
      return (
        <TouchableOpacity
          style={[styles.btn, styles.btnProcess]}
          onPress={() => updateStatus(item.id, "processing")}
        >
          <Text style={styles.btnText}>Nhận xử lý</Text>
        </TouchableOpacity>
      );
    }

    if (item.status === "processing") {
      return (
        <TouchableOpacity
          style={[styles.btn, styles.btnDone]}
          onPress={() => updateStatus(item.id, "done")}
        >
          <Text style={styles.btnText}>Hoàn tất</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.btn, styles.btnDisabled]}>
        <Text style={styles.btnText}>Đã xử lý</Text>
      </View>
    );
  };

  const statusColor = (status: IncidentStatus) => {
    switch (status) {
      case "pending":
        return "#F59E0B";
      case "processing":
        return "#2563EB";
      case "done":
        return "#10B981";
    }
  };

  const priorityLabel = (p: Priority) => {
    if (p === "high") return "🔴 Cao";
    if (p === "medium") return "🟡 Trung bình";
    return "🟢 Thấp";
  };

  return (
    <View style={styles.container}>
      {/* ===== THỐNG KÊ NHANH ===== */}
      <View style={styles.summary}>
        <Text>🔴 Chưa xử lý: {incidents.filter(i => i.status === "pending").length}</Text>
        <Text>🔵 Đang xử lý: {incidents.filter(i => i.status === "processing").length}</Text>
        <Text>🟢 Đã xử lý: {incidents.filter(i => i.status === "done").length}</Text>
      </View>

      {/* ===== DANH SÁCH SỰ CỐ ===== */}
      <FlatList
        data={incidents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { borderLeftColor: statusColor(item.status) },
            ]}
          >
            <View style={styles.row}>
              <Text style={styles.icon}>{item.type}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>
                  {item.title} – {item.area}
                </Text>
                <Text style={styles.sub}>
                  Ưu tiên: {priorityLabel(item.priority)}
                </Text>
                <Text style={styles.sub}>⏱ {item.time}</Text>
              </View>
            </View>

            {renderStatusButton(item)}
          </View>
        )}
      />
    </View>
  );
}

/* ================== STYLE ================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 16,
  },
  summary: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    gap: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 6,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 28,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  sub: {
    fontSize: 13,
    color: "#6B7280",
  },
  btn: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  btnProcess: {
    backgroundColor: "#2563EB",
  },
  btnDone: {
    backgroundColor: "#10B981",
  },
  btnDisabled: {
    backgroundColor: "#9CA3AF",
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
