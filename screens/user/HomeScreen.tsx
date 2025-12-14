import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

/* ================= DATA ================= */
const TOILETS = [
  {
    id: 1,
    name: "WC Công viên Gia Định",
    lat: 10.8142,
    lng: 106.6778,
    open: "06:00",
    close: "22:00",
    services: ["WC", "Tắm", "Xà bông", "Khăn"],
  },
  {
    id: 2,
    name: "WC Bến xe Miền Đông",
    lat: 10.8787,
    lng: 106.7136,
    open: "00:00",
    close: "23:59",
    services: ["WC", "Xà bông"],
  },
];

/* ================= SCREEN ================= */
export default function HomeScreen({ navigation }: any) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  /* Toggle filter */
  const toggleFilter = (key: string) => {
    setFilters((prev) =>
      prev.includes(key)
        ? prev.filter((f) => f !== key)
        : [...prev, key]
    );
  };

  /* Filter logic */
  const filtered = TOILETS.filter((t) => {
    const matchName = t.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchService = filters.every((f) => {
      if (f === "24/7") return t.open === "00:00";
      return t.services.includes(f);
    });

    return matchName && matchService;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ===== SEARCH ===== */}
      <View style={styles.header}>
        <Ionicons name="search-outline" size={20} color="#fff" />
        <TextInput
          placeholder="Tìm kiếm nhà vệ sinh..."
          placeholderTextColor="#e0e7ff"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />
      </View>

      {/* ===== FILTER CHIPS ===== */}
      <View style={styles.quickRow}>
        <FilterChip
          label="Có tắm"
          active={filters.includes("Tắm")}
          onPress={() => toggleFilter("Tắm")}
        />
        <FilterChip
          label="Có xà bông"
          active={filters.includes("Xà bông")}
          onPress={() => toggleFilter("Xà bông")}
        />
        <FilterChip
          label="Có khăn"
          active={filters.includes("Khăn")}
          onPress={() => toggleFilter("Khăn")}
        />
        <FilterChip
          label="Mở 24/7"
          active={filters.includes("24/7")}
          onPress={() => toggleFilter("24/7")}
        />
      </View>

      {/* ===== MAP ===== */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.81,
          longitude: 106.67,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {filtered.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.lat,
              longitude: item.lng,
            }}
            title={item.name}
          />
        ))}
      </MapView>

      {/* ===== LIST ===== */}
      <View style={styles.listBox}>
        {filtered.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("ToiletDetail", { toilet: item })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>
              🕒 {item.open} - {item.close}
            </Text>
            <Text style={styles.sub}>
              🛠 {item.services.join(", ")}
            </Text>
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <Text style={styles.empty}>
            Không tìm thấy nhà vệ sinh phù hợp
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

/* ================= COMPONENT ================= */
function FilterChip({ label, active, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        active && styles.chipActive,
      ]}
    >
      <Text
        style={[
          styles.chipText,
          active && styles.chipTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },

  header: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  search: {
    color: "#fff",
    marginLeft: 10,
    flex: 1,
  },

  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },

  chip: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: "#2563eb",
  },
  chipText: {
    fontSize: 12,
    color: "#1f2937",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  map: { height: 280 },

  listBox: { backgroundColor: "#fff" },

  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  name: { fontWeight: "bold", fontSize: 16 },
  sub: { fontSize: 13, color: "#374151", marginTop: 2 },

  empty: {
    textAlign: "center",
    padding: 20,
    color: "#6b7280",
  },
});
