
import { View, Text, StyleSheet } from 'react-native';

export default function LeaveScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Xin nghỉ phép</Text>
            <Text style={styles.description}>Quản lý phép năm và đơn nghỉ phép.</Text>
            <View style={styles.card}>
                <Text style={styles.label}>Số ngày phép còn lại</Text>
                <Text style={styles.days}>12 ngày</Text>
                <Text style={styles.status}>Đơn gần nhất: Chưa có dữ liệu</Text>
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
    label: { color: '#687586' },
    days: { fontSize: 30, fontWeight: '800', color: '#2878C8', marginVertical: 12 },
    status: { color: '#B7791F', marginTop: 8 },
    note: { color: '#687586', textAlign: 'center', marginTop: 24 },
});
