import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ================= DATA ================= */
const PRODUCTS = [
  { id: 1, name: "Giấy vệ sinh", price: 5000, icon: "document-text-outline" },
  { id: 2, name: "Xà phòng rửa tay", price: 7000, icon: "water-outline" },
  { id: 3, name: "Kem đánh răng", price: 12000, icon: "medkit-outline" },
  { id: 4, name: "Bàn chải đánh răng", price: 10000, icon: "brush-outline" },
  { id: 5, name: "Sữa tắm mini", price: 15000, icon: "leaf-outline" },
  { id: 6, name: "Dầu gội mini", price: 15000, icon: "flower-outline" },
  { id: 7, name: "Bông tẩy trang", price: 8000, icon: "layers-outline" },
];

/* ===== PRODUCT COLOR THEME ===== */
const PRODUCT_COLORS: Record<
  number,
  { bg: string; icon: string }
> = {
  1: { bg: "#F1F5F9", icon: "#475569" }, // Giấy vệ sinh
  2: { bg: "#ECFEFF", icon: "#0891B2" }, // Xà phòng
  3: { bg: "#EFF6FF", icon: "#2563EB" }, // Kem đánh răng
  4: { bg: "#F0FDF4", icon: "#16A34A" }, // Bàn chải
  5: { bg: "#FAF5FF", icon: "#7C3AED" }, // Sữa tắm
  6: { bg: "#FFF7ED", icon: "#EA580C" }, // Dầu gội
  7: { bg: "#F8FAFC", icon: "#334155" }, // Bông tẩy trang
};

type PaymentMethod = "QR" | "WALLET" | "CASH";

/* ================= SCREEN ================= */
export default function ShopScreen() {
  const [cart, setCart] = useState(
    PRODUCTS.map((p) => ({
      ...p,
      checked: false,
      quantity: 0,
    }))
  );

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CASH");

  /* ===== HANDLERS ===== */
  const toggleCheck = (id: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, checked: !i.checked } : i
      )
    );
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              quantity: Math.max(0, i.quantity + delta),
              checked: i.quantity + delta > 0 ? true : i.checked,
            }
          : i
      )
    );
  };

  const total = cart.reduce(
    (sum, i) =>
      i.checked ? sum + i.price * i.quantity : sum,
    0
  );

  /* ================= UI ================= */
  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <Text style={styles.title}>🛒 Cửa hàng tiện ích</Text>

        {cart.map((item) => (
          <View
            key={item.id}
            style={[
              styles.itemRow,
              { backgroundColor: PRODUCT_COLORS[item.id]?.bg },
            ]}
          >
            <TouchableOpacity onPress={() => toggleCheck(item.id)}>
              <Ionicons
                name={
                  item.checked
                    ? "checkbox-outline"
                    : "square-outline"
                }
                size={24}
                color="#2563eb"
              />
            </TouchableOpacity>

            <Ionicons
              name={item.icon}
              size={22}
              color={PRODUCT_COLORS[item.id]?.icon}
              style={{ marginHorizontal: 10 }}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.price}>
                {item.price.toLocaleString()} đ
              </Text>
            </View>

            <View style={styles.qtyBox}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => changeQty(item.id, -1)}
              >
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qty}>{item.quantity}</Text>

              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => changeQty(item.id, 1)}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* ===== PAYMENT METHOD ===== */}
        <View style={styles.paymentBox}>
          <Text style={styles.sectionTitle}>
            Phương thức thanh toán
          </Text>

          <PaymentOption
            icon="qr-code-outline"
            label="QR Code"
            active={paymentMethod === "QR"}
            onPress={() => setPaymentMethod("QR")}
          />
          <PaymentOption
            icon="wallet-outline"
            label="Ví điện tử"
            active={paymentMethod === "WALLET"}
            onPress={() => setPaymentMethod("WALLET")}
          />
          <PaymentOption
            icon="cash-outline"
            label="Tiền mặt"
            active={paymentMethod === "CASH"}
            onPress={() => setPaymentMethod("CASH")}
          />
        </View>
      </ScrollView>

      {/* ===== CHECKOUT BAR ===== */}
      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.totalLabel}>Tổng thanh toán</Text>
          <Text style={styles.totalPrice}>
            {total.toLocaleString()} đ
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.payBtn,
            total === 0 && { backgroundColor: "#94a3b8" },
          ]}
          disabled={total === 0}
          onPress={() =>
            alert(
              `Thanh toán bằng ${
                paymentMethod === "QR"
                  ? "QR Code"
                  : paymentMethod === "WALLET"
                  ? "Ví điện tử"
                  : "Tiền mặt"
              }`
            )
          }
        >
          <Text style={styles.payText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= COMPONENT ================= */
function PaymentOption({ icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity
      style={[
        styles.paymentRow,
        active && styles.paymentActive,
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#2563eb" : "#64748b"}
      />
      <Text style={styles.paymentText}>{label}</Text>
      <Ionicons
        name={active ? "radio-button-on" : "radio-button-off"}
        size={22}
        color={active ? "#2563eb" : "#cbd5e1"}
      />
    </TouchableOpacity>
  );
}

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },

  itemName: {
    fontSize: 15,
    fontWeight: "600",
  },

  price: {
    fontSize: 13,
    color: "#2563eb",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  qty: {
    marginHorizontal: 10,
    fontSize: 16,
  },

  paymentBox: {
    backgroundColor: "#fff",
    marginTop: 12,
    padding: 14,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },

  paymentActive: {
    backgroundColor: "#eff6ff",
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  paymentText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },

  checkoutBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },

  totalLabel: {
    fontSize: 12,
    color: "#64748b",
  },

  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc2626",
  },

  payBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  payText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
