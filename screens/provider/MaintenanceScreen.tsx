import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ================== CONSTANT ================== */
const LOW_STOCK_THRESHOLD = 5;

/* ================== TYPES ================== */
type Incident = {
  id: number;
  title: string;
  area: string;
  time: string;
  resolved: boolean;
};

type StockItem = {
  id: number;
  name: string;
  quantity: number;
  relatedIncident: boolean;
  justUpdated: boolean;
};

type ScheduleItem = {
  id: number;
  label: string;
  time: string;
  done: boolean;
};

/* ================== SCREEN ================== */
export default function MaintenanceScreen() {
  /* ===== INCIDENTS ===== */
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 1,
      title: "Hết giấy vệ sinh",
      area: "Khu A",
      time: "14:20",
      resolved: false,
    },
    {
      id: 2,
      title: "Hỏng vòi nước",
      area: "Khu B",
      time: "10:05",
      resolved: true,
    },
  ]);

  const handleResolve = (id: number) => {
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, resolved: true } : i
      )
    );
  };

  /* ===== STOCK ===== */
  const [stocks, setStocks] = useState<StockItem[]>([
    {
      id: 1,
      name: "Giấy vệ sinh",
      quantity: 0,
      relatedIncident: true,
      justUpdated: false,
    },
    {
      id: 2,
      name: "Xà phòng rửa tay",
      quantity: 5,
      relatedIncident: false,
      justUpdated: false,
    },
    {
      id: 3,
      name: "Dung dịch tẩy rửa",
      quantity: 3,
      relatedIncident: false,
      justUpdated: false,
    },
  ]);

  const updateStock = (id: number, delta: number) => {
    setStocks((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(0, item.quantity + delta),
              justUpdated: delta > 0,
            }
          : item
      )
    );
  };

  const markRestocked = (id: number) => {
    setStocks((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              relatedIncident: false,
              justUpdated: false,
            }
          : item
      )
    );
  };

  /* ===== CLEANING SCHEDULE ===== */
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { id: 1, label: "Ca sáng", time: "08:00", done: true },
    { id: 2, label: "Ca chiều", time: "15:00", done: false },
    { id: 3, label: "Ca tối", time: "20:00", done: false },
  ]);

  const markDone = (id: number) => {
    setSchedule((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, done: true } : s
      )
    );
  };

  /* ================== UI ================== */
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ===== STATUS ===== */}
      <View style={styles.statusRow}>
        <StatusChip label="Sự cố mới" value={1} color="#DC2626" />
        <StatusChip label="Đã xử lý" value={1} color="#16A34A" />
        <StatusChip label="Ca tiếp theo" value="15:00" color="#0EA5A5" />
      </View>

      {/* ===== INCIDENTS ===== */}
      <Section title="Sự cố hôm nay" icon="alert-circle-outline">
        {incidents.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              item.resolved && styles.cardResolved,
            ]}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.subText}>
              📍 {item.area} • ⏰ {item.time}
            </Text>

            {!item.resolved ? (
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => handleResolve(item.id)}
              >
                <Text style={styles.btnText}>Xử lý ngay</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.doneText}>Đã xử lý</Text>
            )}
          </View>
        ))}
      </Section>

      {/* ===== STOCK ===== */}
      <Section title="Tồn kho vật tư" icon="cube-outline">
        {stocks.map((item) => {
          const isLow = item.quantity <= LOW_STOCK_THRESHOLD;
          const isOut = item.quantity === 0;

          return (
            <View
              key={item.id}
              style={[
                styles.stockRow,
                item.relatedIncident && styles.stockHighlight,
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.stockName}>{item.name}</Text>

                {isOut && (
                  <Text style={styles.stockDanger}>
                    ⚠️ Đã hết – cần bổ sung
                  </Text>
                )}

                {!isOut && isLow && (
                  <Text style={styles.stockWarning}>
                    🔔 Sắp hết – nên bổ sung
                  </Text>
                )}
              </View>

              <View style={styles.stockControl}>
                <TouchableOpacity
                  style={styles.minus}
                  onPress={() => updateStock(item.id, -1)}
                >
                  <Text style={styles.controlText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.stockQty}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.plus}
                  onPress={() => updateStock(item.id, 1)}
                >
                  <Text style={styles.controlText}>+</Text>
                </TouchableOpacity>
              </View>

              {item.justUpdated && (
                <TouchableOpacity
                  style={styles.restockBtn}
                  onPress={() => markRestocked(item.id)}
                >
                  <Text style={styles.restockText}>Đã bổ sung</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </Section>

      {/* ===== SCHEDULE ===== */}
      <Section title="Lịch vệ sinh hàng ngày" icon="calendar-outline">
        {schedule.map((item) => (
          <View key={item.id} style={styles.scheduleRow}>
            <Text style={styles.scheduleText}>
              {item.label} – {item.time}
            </Text>

            {item.done ? (
              <Ionicons
                name="checkmark-circle"
                size={22}
                color="#16A34A"
              />
            ) : (
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={() => markDone(item.id)}
              >
                <Text style={styles.btnSecondaryText}>
                  Hoàn thành
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Section>
    </ScrollView>
  );
}

/* ================== COMPONENTS ================== */
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={22} color="#0EA5A5" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function StatusChip({
  label,
  value,
  color,
}: {
  label: string;
  value: any;
  color: string;
}) {
  return (
    <View style={[styles.statusChip, { borderColor: color }]}>
      <Text style={styles.statusValue}>{value}</Text>
      <Text style={styles.statusLabel}>{label}</Text>
    </View>
  );
}

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 16,
  },

  statusRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  statusChip: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
  },

  statusValue: {
    fontSize: 16,
    fontWeight: "bold",
  },

  statusLabel: {
    fontSize: 12,
    color: "#64748B",
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  sectionTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  cardResolved: {
    backgroundColor: "#ECFDF5",
  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },

  subText: {
    fontSize: 12,
    color: "#64748B",
    marginVertical: 4,
  },

  btnPrimary: {
    backgroundColor: "#0EA5A5",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },

  btnSecondary: {
    backgroundColor: "#CBD5E1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  btnSecondaryText: {
    color: "#334155",
    fontWeight: "bold",
  },

  doneText: {
    marginTop: 6,
    color: "#16A34A",
    fontWeight: "bold",
  },

  stockRow: {
    marginBottom: 14,
  },

  stockName: {
    fontSize: 14,
    fontWeight: "bold",
  },

  stockControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  minus: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  plus: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  controlText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  stockQty: {
    marginHorizontal: 10,
    fontWeight: "bold",
  },

  stockHighlight: {
    borderWidth: 1,
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
    borderRadius: 14,
    padding: 10,
  },

  stockWarning: {
    fontSize: 12,
    color: "#CA8A04",
    marginTop: 4,
  },

  stockDanger: {
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "bold",
    marginTop: 4,
  },

  restockBtn: {
    marginTop: 6,
    backgroundColor: "#E0F2FE",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  restockText: {
    color: "#0284C7",
    fontWeight: "bold",
    fontSize: 12,
  },

  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  scheduleText: {
    fontSize: 14,
  },
});
