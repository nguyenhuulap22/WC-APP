import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

export default function ChatAIScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Xin chào! Tôi có thể tư vấn nhà vệ sinh cho bạn." },
  ]);

  const send = () => {
    if (!input) return;

    setMessages([
      ...messages,
      { from: "user", text: input },
      { from: "ai", text: "Cảm ơn bạn, chức năng AI sẽ kết nối sau khi có backend." },
    ]);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text
            style={[
              styles.msg,
              item.from === "user" ? styles.user : styles.ai,
            ]}
          >
            {item.text}
          </Text>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Nhập câu hỏi..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <Text style={{ color: "#fff" }}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  msg: { padding: 10, borderRadius: 10, marginBottom: 10 },
  user: { backgroundColor: "#2563eb", color: "#fff", alignSelf: "flex-end" },
  ai: { backgroundColor: "#e5e7eb", alignSelf: "flex-start" },
  inputRow: { flexDirection: "row", marginTop: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  sendBtn: {
    backgroundColor: "#2563eb",
    marginLeft: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
});
