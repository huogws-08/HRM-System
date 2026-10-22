
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const COLORS = {
  primary: '#2878C8',
  primaryHover: '#2067AE',
  background: '#F3F5F8',
  surface: '#FFFFFF',
  graphite: '#353D49',
  secondary: '#687586',
  border: '#DCE2E9',
  softBlue: '#A9D3F5',
  paleBlue: '#EAF3FC',
  success: '#24845D',
  paleGreen: '#E8F5EE',
  pending: '#B7791F',
  paleYellow: '#FFF4DF',
  danger: '#C44747',
  paleRed: '#FCECEC',
  palePurple: '#F2EDFC',
};

const shortcuts = [
  {
    icon: '📅',
    title: 'Lịch làm việc',
    subtitle: 'Xem ca làm của bạn',
    color: COLORS.paleBlue,
  },
  {
    icon: '⏰',
    title: 'Chấm công',
    subtitle: 'Theo dõi giờ làm',
    color: COLORS.paleYellow,
  },
  {
    icon: '📝',
    title: 'Xin nghỉ phép',
    subtitle: 'Tạo đơn nghỉ phép',
    color: COLORS.paleGreen,
  },
  {
    icon: '🔔',
    title: 'Thông báo',
    subtitle: 'Cập nhật mới nhất',
    color: COLORS.palePurple,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.brand}>HRM-SYSTEM</Text>

            <Text style={styles.heading}>
              Xin chào, Nhân viên 👋
            </Text>

            <Text style={styles.muted}>
              Chúc bạn một ngày làm việc tốt lành!
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>NV</Text>
          </View>
        </View>

        {/* WORKING SHIFT */}
        <View style={styles.dateCard}>
          <View style={styles.dateCardHeader}>
            <View style={styles.calendarIcon}>
              <Text style={styles.calendarEmoji}>📆</Text>
            </View>

            <Text style={styles.dateLabel}>
              LỊCH LÀM VIỆC HÔM NAY
            </Text>
          </View>

          <Text style={styles.shiftTitle}>Ca hành chính</Text>

          <View style={styles.timeRow}>
            <Text style={styles.clockIcon}>◷</Text>
            <Text style={styles.shiftTime}>08:00 – 17:00</Text>
          </View>

          <View style={styles.shiftDivider} />

          <View style={styles.shiftFooter}>
            <Text style={styles.shiftNote}>
              📍 Văn phòng
            </Text>

            <View style={styles.status}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Theo lịch</Text>
            </View>
          </View>
        </View>

        {/* QUICK ACCESS */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Truy cập nhanh</Text>
            <Text style={styles.sectionSubtitle}>
              Các tiện ích dành cho bạn
            </Text>
          </View>
        </View>

        <View style={styles.grid}>
          {shortcuts.map((item) => (
            <View key={item.title} style={styles.shortcut}>
              <View
                style={[
                  styles.shortcutIcon,
                  { backgroundColor: item.color },
                ]}
              >
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              <Text style={styles.shortcutTitle}>
                {item.title}
              </Text>

              <Text style={styles.shortcutSubtitle}>
                {item.subtitle}
              </Text>

              <View style={styles.shortcutArrow}>
                <Text style={styles.arrowText}>↗</Text>
              </View>
            </View>
          ))}
        </View>

        {/* PERSONAL INFORMATION */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Thông tin của bạn
            </Text>
            <Text style={styles.sectionSubtitle}>
              Tổng quan thông tin cá nhân
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View
              style={[
                styles.smallIcon,
                { backgroundColor: COLORS.paleBlue },
              ]}
            >
              <Text style={styles.smallEmoji}>🌴</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Ngày phép còn lại
              </Text>
              <Text style={styles.infoSubtitle}>
                Số dư phép năm
              </Text>
            </View>

            <View style={styles.valueContainer}>
              <Text style={styles.infoValue}>12</Text>
              <Text style={styles.valueUnit}>ngày</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View
              style={[
                styles.smallIcon,
                { backgroundColor: COLORS.paleGreen },
              ]}
            >
              <Text style={styles.smallEmoji}>✓</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Trạng thái công việc
              </Text>
              <Text style={styles.infoSubtitle}>
                Tình trạng trong ngày
              </Text>
            </View>

            <View style={styles.readyBadge}>
              <Text style={styles.readyText}>Sẵn sàng</Text>
            </View>
          </View>
        </View>

        {/* NOTIFICATION REMINDER */}
        <View style={styles.noticeCard}>
          <View style={styles.noticeIcon}>
            <Text style={styles.noticeEmoji}>💡</Text>
          </View>

          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>
              Đừng quên chấm công nhé!
            </Text>
            <Text style={styles.noticeText}>
              Hãy kiểm tra giờ vào và giờ ra để đảm bảo
              dữ liệu chấm công chính xác.
            </Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          HRM-SYSTEM · Dữ liệu minh họa
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
  },

  headerContent: {
    flex: 1,
    paddingRight: 8,
  },

  brand: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.8,
    marginBottom: 9,
  },

  heading: {
    color: COLORS.graphite,
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 7,
  },

  muted: {
    color: COLORS.secondary,
    fontSize: 12,
    lineHeight: 19,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#8AB9E8',
  },

  avatarText: {
    color: COLORS.primaryHover,
    fontSize: 15,
    fontWeight: '800',
  },

  // WORKING SHIFT
  dateCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 21,
    marginBottom: 28,
  },

  dateCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  calendarIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  calendarEmoji: {
    fontSize: 16,
  },

  dateLabel: {
    color: '#EAF3FC',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    flexShrink: 1,
  },

  shiftTitle: {
    color: COLORS.surface,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 17,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  clockIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    marginRight: 8,
  },

  shiftTime: {
    color: '#F0F6FF',
    fontSize: 16,
    fontWeight: '600',
  },

  shiftDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: 18,
  },

  shiftFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },

  shiftNote: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: 6,
  },

  statusText: {
    color: COLORS.primaryHover,
    fontSize: 11,
    fontWeight: '700',
  },

  // SECTION HEADERS
  sectionHeader: {
    marginBottom: 15,
  },

  sectionTitle: {
    color: COLORS.graphite,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 5,
  },

  sectionSubtitle: {
    color: COLORS.secondary,
    fontSize: 12,
    lineHeight: 18,
  },

  // QUICK ACCESS
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 19,
  },

  shortcut: {
    width: '48%',
    minHeight: 158,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  shortcutIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  icon: {
    fontSize: 21,
  },

  shortcutTitle: {
    color: COLORS.graphite,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },

  shortcutSubtitle: {
    color: COLORS.secondary,
    fontSize: 11,
    lineHeight: 16,
    paddingRight: 2,
  },

  shortcutArrow: {
    position: 'absolute',
    right: 12,
    top: 13,
  },

  arrowText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },

  // PERSONAL INFORMATION
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  smallIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  smallEmoji: {
    color: COLORS.success,
    fontSize: 19,
    fontWeight: '800',
  },

  infoContent: {
    flex: 1,
    paddingRight: 5,
  },

  infoTitle: {
    color: COLORS.graphite,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 5,
  },

  infoSubtitle: {
    color: COLORS.secondary,
    fontSize: 10,
    lineHeight: 15,
  },

  valueContainer: {
    alignItems: 'flex-end',
  },

  infoValue: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '800',
  },

  valueUnit: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  readyBadge: {
    backgroundColor: COLORS.paleGreen,
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 10,
  },

  readyText: {
    color: COLORS.success,
    fontSize: 10,
    fontWeight: '800',
  },

  // REMINDER
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.paleBlue,
    borderRadius: 16,
    padding: 15,
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#D4E6F8',
  },

  noticeIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  noticeEmoji: {
    fontSize: 17,
  },

  noticeContent: {
    flex: 1,
  },

  noticeTitle: {
    color: COLORS.graphite,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
  },

  noticeText: {
    color: COLORS.secondary,
    fontSize: 11,
    lineHeight: 17,
  },

  disclaimer: {
    color: COLORS.secondary,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 24,
  },
});
