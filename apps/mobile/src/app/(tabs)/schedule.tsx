
import { View, Text, StyleSheet } from 'react-native';

export default function ScheduleScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lịch làm việc</Text>
            <Text style={styles.description}>Theo dõi ca làm theo ngày và tuần.</Text>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Ca hành chính</Text>
                <Text style={styles.text}>08:00 – 17:00</Text>
                <Text style={styles.text}>Địa điểm: Văn phòng</Text>
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
    cardTitle: { fontSize: 18, fontWeight: '700', color: '#2878C8', marginBottom: 12 },
    text: { color: '#353D49', marginBottom: 8 },
    note: { color: '#687586', textAlign: 'center', marginTop: 24 },
});
