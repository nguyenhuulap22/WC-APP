import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function FinanceScreen() {
  const [services, setServices] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [newPrice, setNewPrice] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const json = await AsyncStorage.getItem("services");
    if (json) setServices(JSON.parse(json));
  };

  const updatePrice = async () => {
    if (!selected || !newPrice.trim()) return;

    const updated = services.map((item) =>
      item.id === selected.id ? { ...item, price: newPrice } : item
    );

    setServices(updated);
    await AsyncStorage.setItem("services", JSON.stringify(updated));

    setSelected(null);
    setNewPrice("");
    setModalVisible(false);
  };

  /* === THỐNG KÊ === */
  const totalServices = services.length;
  const totalPrice = services.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );
  const monthlyRevenue = Math.round(totalPrice * 12.5); // demo

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>💸 Tài chính</Text>

      {/* ===== DASHBOARD ===== */}
      <View style={styles.dashboard}>
        {/* 1 */}
        <View style={[styles.card, styles.cardBlue]}>
          <Ionicons name="cash-outline" size={35} color="#fff" />
          <Text style={styles.cardLabel}>Doanh thu tháng</Text>
          <Text style={styles.cardValue}>{monthlyRevenue} đ</Text>
        </View>

        {/* 2 */}
        <View style={[styles.card, styles.cardPurple]}>
          <Ionicons name="pricetag-outline" size={35} color="#fff" />
          <Text style={styles.cardLabel}>Tổng giá dịch vụ</Text>
          <Text style={styles.cardValue}>{totalPrice} đ</Text>
        </View>

        {/* 3 */}
        <View style={[styles.card, styles.cardOrange]}>
          <Ionicons name="layers-outline" size={35} color="#fff" />
          <Text style={styles.cardLabel}>Số dịch vụ</Text>
          <Text style={styles.cardValue}>{totalServices}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Danh sách giá</Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => {
              setSelected(item);
              setModalVisible(true);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="pricetag" size={24} color="#2563eb" />
              <Text style={styles.serviceName}>{item.name}</Text>
            </View>

            <Text style={styles.servicePrice}>{item.price} đ</Text>
          </TouchableOpacity>
        )}
      />

      {/* ===== POPUP ===== */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalWrap}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Cập nhật giá</Text>
            <Text style={styles.modalService}>{selected?.name}</Text>

            <TextInput
              style={styles.input}
              placeholder="Nhập giá mới"
              value={newPrice}
              keyboardType="numeric"
              onChangeText={setNewPrice}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={updatePrice}>
              <Text style={styles.saveText}>Lưu thay đổi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ======================= STYLE ========================== */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#eef0f4" },

  pageTitle: { fontSize: 26, fontWeight: "800", marginBottom: 15 },

  dashboard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: "32%",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: "center",
    elevation: 4,
  },

  cardBlue: {
    backgroundColor: "#2563eb",
  },

  cardPurple: {
    backgroundColor: "#7c3aed",
  },

  cardOrange: {
    backgroundColor: "#f97316",
  },

  cardLabel: {
    color: "#fff",
    marginTop: 6,
    fontSize: 13,
  },

  cardValue: {
    color: "#fff",
    marginTop: 4,
    fontWeight: "bold",
    fontSize: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 15,
  },

  serviceItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },

  serviceName: { fontSize: 17, marginLeft: 8 },
  servicePrice: { fontSize: 17, fontWeight: "bold", color: "#2563eb" },

  modalWrap: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 25,
    elevation: 10,
  },

  modalTitle: { fontSize: 20, fontWeight: "800" },

  modalService: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  saveBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  cancelBtn: { marginTop: 10, alignItems: "center" },
  cancelText: { color: "red", fontWeight: "600" },
});
