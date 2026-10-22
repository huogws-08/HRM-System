
import { View, Text, StyleSheet } from 'react-native';

export default function AttendanceScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chấm công</Text>
            <Text style={styles.description}>Theo dõi thời gian làm việc của bạn.</Text>
            <View style={styles.card}>
                <Text style={styles.label}>Giờ vào</Text>
                <Text style={styles.time}>08:00</Text>
                <Text style={styles.label}>Giờ ra</Text>
                <Text style={styles.time}>17:00</Text>
                <Text style={styles.status}>Đúng giờ</Text>
            </View>
            <Text style={styles.note}>Dữ liệu minh họa</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F5F8', padding: 20 },
    title: { fontSize: 24, fontWeight: '800', color: '#353D49' },
    description: { color: '#687586', marginTop: 8, marginBottom: 20 },
    card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#DCE2E9' },
    label: { color: '#687586', marginTop: 8 },
    time: { fontSize: 24, fontWeight: '800', color: '#2878C8', marginVertical: 8 },
    status: { color: '#24845D', fontWeight: '700', marginTop: 12 },
    note: { color: '#687586', textAlign: 'center', marginTop: 24 },
});
