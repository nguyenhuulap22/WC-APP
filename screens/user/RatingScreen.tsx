import React, { useState } from "react";
import { useRating } from "../../store/RatingContext";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RatingScreen() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { addRating } = useRating();


  const handleSubmit = () => {
  if (rating === 0) {
    Alert.alert("Lỗi", "Vui lòng chọn số sao đánh giá!");
    return;
  }

  addRating(rating, comment);
  setSubmitted(true);
};

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* TIÊU ĐỀ */}
        <View style={styles.header}>
          <Ionicons name="star-outline" size={26} color="#facc15" />
          <Text style={styles.title}>Đánh giá dịch vụ</Text>
        </View>

        {/* CHỌN SAO */}
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={36}
                color="#facc15"
                style={{ marginHorizontal: 4 }}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.ratingText}>
          Bạn đã chọn: {rating} ⭐
        </Text>

        {/* NHẬP BÌNH LUẬN */}
        <TextInput
          placeholder="Nhập bình luận..."
          value={comment}
          onChangeText={setComment}
          style={styles.input}
          multiline
        />

        {/* NÚT GỬI */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Ionicons name="send-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}> Gửi đánh giá</Text>
        </TouchableOpacity>

        {/* KẾT QUẢ SAU KHI GỬI (DEMO FE) */}
        {submitted && (
          <View style={styles.resultBox}>
            <Text style={{ fontWeight: "bold" }}>Đánh giá của bạn:</Text>
            <Text>⭐ {rating} sao</Text>
            <Text>💬 {comment || "Không có bình luận"}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

/* ================= STYLE ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  ratingText: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 80,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultBox: {
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
});
