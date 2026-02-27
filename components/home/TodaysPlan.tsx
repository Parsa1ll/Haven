import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii, shadows } from '../../constants/theme';
import { getReadingPlan } from '../../data/readingPlan';

export default function TodaysPlan() {
  const plan = getReadingPlan();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Today's Plan</Text>
          <Text style={styles.subtitle}>{plan.daysUntil} days until {plan.name}</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>{plan.streak}</Text>
          </View>
        </View>
      </View>

      <View style={styles.daysRow}>
        {plan.days.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayCircle,
              day.completed && styles.dayCompleted,
              day.isToday && styles.dayToday,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                day.completed && styles.dayTextCompleted,
                day.isToday && styles.dayTextToday,
              ]}
            >
              {day.label}
            </Text>
          </View>
        ))}
      </View>

      <Pressable style={[styles.beginButton, shadows.card]}>
        <Text style={styles.beginText}>Begin</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 20,
    color: colors.black,
  },
  subtitle: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  streakIcon: {
    fontSize: 16,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gold,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCompleted: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  dayToday: {
    borderColor: colors.gold,
    borderWidth: 2,
    backgroundColor: colors.white,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray,
  },
  dayTextCompleted: {
    color: colors.white,
  },
  dayTextToday: {
    color: colors.gold,
  },
  beginButton: {
    backgroundColor: colors.white,
    paddingVertical: 14,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  beginText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
});
