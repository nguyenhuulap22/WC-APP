import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Hàm chọn icon theo dịch vụ
const getIcon = (name: string): keyof typeof Ionicons.glyphMap => {
  const lower = name.toLowerCase();

  if (lower.includes("wc") || lower.includes("vệ sinh")) return "water-outline";
  if (lower.includes("khăn")) return "layers-outline";
  if (lower.includes("xà bông") || lower.includes("xà phòng")) return "flask-outline";
  if (lower.includes("dầu gội")) return "color-filter-outline";

  if (lower.includes("nhà tắm") || lower.includes("tắm")) return "water-sharp";

  return "construct-outline"; // icon mặc định
};

export default function FacilityScreen() {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [services, setServices] = useState<{ id: number; name: string; price: string }[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Thêm dịch vụ
  const handleAdd = () => {
    if (!serviceName || !price) return;

    setServices([
      ...services,
      { id: Date.now(), name: serviceName, price: price },
    ]);

    setServiceName("");
    setPrice("");
  };

  // Chọn dịch vụ
  const handleSelect = (item: any) => {
    setSelectedId(item.id);
    setServiceName(item.name);
    setPrice(item.price);
  };

  // Sửa dịch vụ
  const handleUpdate = () => {
    if (selectedId === null) return;

    const updated = services.map((item) =>
      item.id === selectedId
        ? { ...item, name: serviceName, price }
        : item
    );

    setServices(updated);
    setSelectedId(null);
    setServiceName("");
    setPrice("");
  };

  // Xóa dịch vụ
  const handleDelete = () => {
    if (selectedId === null) return;

    setServices(services.filter((item) => item.id !== selectedId));
    setSelectedId(null);
    setServiceName("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý cơ sở vật chất</Text>

      <View style={styles.box}>
        <TextInput
          style={styles.input}
          placeholder="Tên dịch vụ (WC, Khăn, Nhà tắm...)"
          value={serviceName}
          onChangeText={setServiceName}
        />

        <TextInput
          style={styles.input}
          placeholder="Giá (đ/lượt)"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.btnText}>Thêm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editBtn} onPress={handleUpdate}>
            <Text style={styles.btnText}>Sửa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.btnText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh sách dịch vụ */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedId === item.id && { backgroundColor: "#e0f2fe" },
            ]}
            onPress={() => handleSelect(item)}
          >
            <Ionicons
              name={getIcon(item.name)}
              size={28}
              color="#2563eb"
              style={{ marginRight: 12 }}
            />

            <Text style={styles.itemText}>
              {item.name} - {item.price}đ
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f1f5f9" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },

  box: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  addBtn: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  editBtn: {
    backgroundColor: "#6b7280",
    padding: 10,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },

  itemText: { fontSize: 16, fontWeight: "500" },
});
