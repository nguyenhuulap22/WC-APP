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

type ServiceType = "WC" | "Nhà tắm" | "Khác";

interface Service {
  id: number;
  name: string;
  price: string;
  type: ServiceType;
  active: boolean;
}

export default function FacilityScreen() {
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState<ServiceType>("WC");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<ServiceType | "ALL">("ALL");

  /* ===== ICON THEO LOẠI ===== */
  const getIcon = (type: ServiceType) => {
    if (type === "WC") return "man-outline";
    if (type === "Nhà tắm") return "water-outline";
    return "construct-outline";
  };

  /* ===== THÊM ===== */
  const handleAdd = () => {
    if (!name || !price) return;

    setServices([
      ...services,
      {
        id: Date.now(),
        name,
        price,
        type,
        active: true,
      },
    ]);

    resetForm();
  };

  /* ===== CHỌN SỬA ===== */
  const handleSelect = (item: Service) => {
    setSelectedId(item.id);
    setName(item.name);
    setPrice(item.price);
    setType(item.type);
  };

  /* ===== CẬP NHẬT ===== */
  const handleUpdate = () => {
    if (selectedId === null) return;

    setServices(
      services.map((s) =>
        s.id === selectedId ? { ...s, name, price, type } : s
      )
    );

    resetForm();
  };

  /* ===== XÓA ===== */
  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  /* ===== BẬT / TẮT ===== */
  const toggleActive = (id: number) => {
    setServices(
      services.map((s) =>
        s.id === id ? { ...s, active: !s.active } : s
      )
    );
  };

  const resetForm = () => {
    setSelectedId(null);
    setName("");
    setPrice("");
    setType("WC");
  };

  const filteredServices =
    filter === "ALL"
      ? services
      : services.filter((s) => s.type === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý cơ sở vật chất</Text>

      {/* ===== FILTER ===== */}
      <View style={styles.filterRow}>
        {["ALL", "WC", "Nhà tắm", "Khác"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterBtn,
              filter === f && styles.filterActive,
            ]}
            onPress={() => setFilter(f as any)}
          >
            <Text style={filter === f ? styles.filterTextActive : styles.filterText}>
              {f === "ALL" ? "Tất cả" : f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ===== FORM ===== */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Tên dịch vụ"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Giá (đ/lượt)"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <View style={styles.typeRow}>
          {(["WC", "Nhà tắm", "Khác"] as ServiceType[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.typeBtn,
                type === t && styles.typeActive,
              ]}
              onPress={() => setType(t)}
            >
              <Text style={type === t ? styles.typeTextActive : styles.typeText}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.btnText}>Thêm</Text>
          </TouchableOpacity>

          {selectedId && (
            <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
              <Text style={styles.btnText}>Cập nhật</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ===== LIST ===== */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name={getIcon(item.type)}
                size={26}
                color="#4A6C6F"
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.price}>{item.price} đ</Text>
                <Text style={styles.status}>
                  Trạng thái: {item.active ? "Đang hoạt động" : "Tạm ngưng"}
                </Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Ionicons name="create-outline" size={22} color="#6B7280" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#DC2626" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleActive(item.id)}>
                <Ionicons
                  name={item.active ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="#2F855A"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

/* ================= STYLE ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8", padding: 15 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },

  filterRow: { flexDirection: "row", marginBottom: 10 },
  filterBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    marginRight: 6,
  },
  filterActive: { backgroundColor: "#4A6C6F" },
  filterText: { color: "#374151" },
  filterTextActive: { color: "#fff", fontWeight: "bold" },

  form: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  typeRow: { flexDirection: "row", marginBottom: 10 },
  typeBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    marginRight: 6,
  },
  typeActive: { backgroundColor: "#4A6C6F" },
  typeText: { color: "#374151" },
  typeTextActive: { color: "#fff", fontWeight: "bold" },

  actionRow: { flexDirection: "row" },
  addBtn: {
    flex: 1,
    backgroundColor: "#4A6C6F",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  updateBtn: {
    flex: 1,
    backgroundColor: "#6B7280",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 8,
  },
  btnText: { color: "#fff", fontWeight: "bold" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  price: { color: "#2F855A", fontWeight: "bold" },
  status: { fontSize: 12, color: "#6B7280" },

  cardActions: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});
