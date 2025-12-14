import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ================= DATA ================= */
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Giấy vệ sinh", price: 5000, stock: 2 },
  { id: 2, name: "Xà phòng rửa tay", price: 7000, stock: 8 },
  { id: 3, name: "Kem đánh răng", price: 12000, stock: 5 },
  { id: 4, name: "Bàn chải đánh răng", price: 10000, stock: 1 },
  { id: 5, name: "Bông tẩy trang", price: 8000, stock: 0 },
];

/* ================= SCREEN ================= */
export default function ProviderShopScreen() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filter, setFilter] =
    useState<"ALL" | "AVAILABLE" | "LOW" | "OUT">("ALL");

  /* ===== MODAL STATE ===== */
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  /* ===== FILTER ===== */
  const filteredProducts = products.filter((p) => {
    if (filter === "AVAILABLE") return p.stock > 2;
    if (filter === "LOW") return p.stock > 0 && p.stock <= 2;
    if (filter === "OUT") return p.stock === 0;
    return true;
  });

  /* ===== HANDLERS ===== */
  const changeStock = (id: number, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  const totalRevenueToday = products.reduce(
    (sum, p) => sum + p.price * (10 - p.stock),
    0
  );

  /* ===== ADD / EDIT ===== */
  const openAddModal = () => {
    setEditingProduct(null);
    setName("");
    setPrice("");
    setStock("");
    setModalVisible(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setModalVisible(true);
  };

  const saveProduct = () => {
    if (!name || !price) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ tên và giá");
      return;
    }

    if (editingProduct) {
      // EDIT (không động stock)
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, name, price: Number(price) }
            : p
        )
      );
    } else {
      // ADD
      setProducts((prev) => [
        ...prev,
        {
          id: Date.now(),
          name,
          price: Number(price),
          stock: Number(stock) || 0,
        },
      ]);
    }

    setModalVisible(false);
  };

  /* ===== DELETE ===== */
  const deleteProduct = (id: number) => {
    Alert.alert("Xác nhận", "Xóa sản phẩm này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () =>
          setProducts((prev) => prev.filter((p) => p.id !== id)),
      },
    ]);
  };

  /* ================= UI ================= */
  return (
    <>
      <ScrollView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🛒 Cửa hàng nhà cung cấp</Text>
          <Text style={styles.headerSub}>
            Doanh thu hôm nay:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {totalRevenueToday.toLocaleString()}đ
            </Text>
          </Text>
        </View>

        {/* FILTER */}
        <View style={styles.filterRow}>
          {[
            ["Tất cả", "ALL"],
            ["Còn hàng", "AVAILABLE"],
            ["Sắp hết", "LOW"],
            ["Hết hàng", "OUT"],
          ].map(([label, key]) => (
            <FilterChip
              key={key}
              label={label}
              active={filter === key}
              onPress={() => setFilter(key as any)}
            />
          ))}
        </View>

        {/* PRODUCT LIST */}
        {filteredProducts.map((item) => {
          const isLow = item.stock > 0 && item.stock <= 2;
          const isOut = item.stock === 0;

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                isLow && styles.lowStock,
                isOut && styles.outStock,
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>
                  Giá bán: {item.price.toLocaleString()}đ
                </Text>
                {isLow && <Text style={styles.warn}>⚠️ Sắp hết – nên bổ sung</Text>}
                {isOut && <Text style={styles.out}>❌ Hết hàng</Text>}
              </View>

              <View style={styles.stockBox}>
                <TouchableOpacity
                  style={styles.stockBtn}
                  onPress={() => changeStock(item.id, -1)}
                >
                  <Text style={styles.stockText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.stockQty}>{item.stock}</Text>
                <TouchableOpacity
                  style={styles.stockBtn}
                  onPress={() => changeStock(item.id, 1)}
                >
                  <Text style={styles.stockText}>+</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.actionBox}>
                <TouchableOpacity onPress={() => openEditModal(item)}>
                  <Ionicons name="create-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteProduct(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#dc2626" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {/* ADD BUTTON */}
        {filter === "ALL" && (
        <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
          <Ionicons name="add" size={22} color="#fff" />
          <Text style={styles.addText}>Thêm sản phẩm mới</Text>
        </TouchableOpacity>
        )}
      </ScrollView>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
            </Text>

            <TextInput
              placeholder="Tên sản phẩm"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <TextInput
              placeholder="Giá bán"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              style={styles.input}
            />

            {!editingProduct && (
              <TextInput
                placeholder="Số lượng ban đầu"
                keyboardType="numeric"
                value={stock}
                onChangeText={setStock}
                style={styles.input}
              />
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveProduct}>
                <Text style={{ fontWeight: "bold" }}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

/* ================= COMPONENTS ================= */
function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", padding: 16 },
  header: {
    backgroundColor: "#E0F2F1",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  headerSub: { marginTop: 4, fontSize: 13, color: "#334155" },

  filterRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: "#0EA5A5" },
  chipText: { fontSize: 12, color: "#334155" },
  chipTextActive: { color: "#fff", fontWeight: "bold" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  lowStock: { backgroundColor: "#FEF3C7" },
  outStock: { backgroundColor: "#FEE2E2" },

  name: { fontSize: 15, fontWeight: "bold" },
  price: { fontSize: 13, color: "#2563eb" },
  warn: { marginTop: 4, fontSize: 12, color: "#92400E" },
  out: { marginTop: 4, fontSize: 12, color: "#B91C1C", fontWeight: "bold" },

  stockBox: { flexDirection: "row", alignItems: "center", marginHorizontal: 10 },
  stockBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  stockText: { fontSize: 18, fontWeight: "bold" },
  stockQty: { marginHorizontal: 8, fontWeight: "bold" },

  actionBox: { justifyContent: "space-between", height: 40 },

  addBtn: {
    marginTop: 20,
    backgroundColor: "#0EA5A5",
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "#fff", fontWeight: "bold", marginLeft: 6 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    width: "85%",
    borderRadius: 16,
  },
  modalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
});
