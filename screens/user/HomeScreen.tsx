import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

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

export default function HomeScreen({ navigation }: any) {
  const [search, setSearch] = useState("");

  const filtered = TOILETS.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="search-outline" size={20} color="#fff" />
        <TextInput
          placeholder="Tìm kiếm nhà vệ sinh..."
          placeholderTextColor="#fff"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />
      </View>

      {/* MAP */}
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
            description={`Mở: ${item.open} - Đóng: ${item.close}`}
            onPress={() =>
              navigation.navigate("ToiletDetail", { toilet: item })
            }
          />
        ))}
      </MapView>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        style={{ backgroundColor: "#fff" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ToiletDetail", { toilet: item })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>
              🕒 {item.open} - {item.close}
            </Text>
            <Text>🛠 {item.services.join(", ")}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* ===== STYLE ===== */
const styles = StyleSheet.create({
  container: { flex: 1 },
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
  map: { height: 300 },
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontWeight: "bold", fontSize: 16 },
});
