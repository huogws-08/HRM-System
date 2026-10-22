
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông báo</Text>
            <Text style={styles.description}>Cập nhật thông tin dành cho bạn.</Text>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Nhắc nhở chấm công</Text>
                <Text style={styles.text}>
                    Hãy kiểm tra giờ vào và giờ ra để đảm bảo dữ liệu chính xác.
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Lịch làm việc</Text>
                <Text style={styles.text}>
                    Bạn có ca hành chính từ 08:00 đến 17:00.
                </Text>
            </View>
            <Text style={styles.note}>Dữ liệu minh họa</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F5F8', padding: 20 },
    title: { fontSize: 24, fontWeight: '800', color: '#353D49' },
    description: { color: '#687586', marginTop: 8, marginBottom: 20 },
    card: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, borderWidth: 1, borderColor: '#DCE2E9', marginBottom: 12 },
    cardTitle: { fontSize: 15, fontWeight: '700', color: '#2878C8', marginBottom: 8 },
    text: { color: '#687586', lineHeight: 21 },
    note: { color: '#687586', textAlign: 'center', marginTop: 12 },
});
