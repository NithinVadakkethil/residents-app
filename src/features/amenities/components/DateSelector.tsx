/**
 * Date Selector Component
 * Source of Truth: Stitch Screen 08_Amenity_Details_Booking
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import { formatDisplayDate, generateUpcomingDates } from '../utils/bookingDate';
import { CalendarIcon, ChevronDownIcon, CloseIcon } from '../../../components/common/Icons';
import { colors, radius, spacing, typography, shadows } from '../../../theme';

interface DateSelectorProps {
  selectedDate: string; // "YYYY-MM-DD"
  onDateChange: (dateStr: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const upcomingDates = generateUpcomingDates(21);
  const formattedText = formatDisplayDate(selectedDate);

  const handleSelectDate = (dateStr: string) => {
    onDateChange(dateStr);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date</Text>

      {/* Stitch 08_Amenity_Details_Booking Date Trigger Button */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={({ pressed }) => [
          styles.triggerCard,
          pressed && styles.triggerCardPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Selected date: ${formattedText}. Tap to change.`}
      >
        <View style={styles.leftRow}>
          <CalendarIcon size={16} color={colors.onSurfaceVariant} />
          <Text style={styles.dateText}>{formattedText}</Text>
        </View>
        <ChevronDownIcon size={16} color={colors.outline} />
      </Pressable>

      {/* Date Selection Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Booking Date</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Close date selector"
              >
                <CloseIcon size={18} color={colors.onSurface} />
              </Pressable>
            </View>

            <FlatList
              data={upcomingDates}
              keyExtractor={(item) => item.dateStr}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = item.dateStr === selectedDate;
                return (
                  <Pressable
                    onPress={() => handleSelectDate(item.dateStr)}
                    style={({ pressed }) => [
                      styles.dateOption,
                      isSelected && styles.dateOptionSelected,
                      pressed && styles.dateOptionPressed,
                    ]}
                  >
                    <View style={styles.dateOptionLeft}>
                      <Text
                        style={[
                          styles.dayName,
                          isSelected && styles.textWhite,
                        ]}
                      >
                        {item.displayDay}
                      </Text>
                      <Text
                        style={[
                          styles.fullDate,
                          isSelected && styles.textWhite,
                        ]}
                      >
                        {item.displayDate} {item.monthLabel}
                      </Text>
                    </View>

                    {item.isToday && (
                      <View
                        style={[
                          styles.todayBadge,
                          isSelected && styles.todayBadgeSelected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.todayBadgeText,
                            isSelected && styles.textWhite,
                          ]}
                        >
                          Today
                        </Text>
                      </View>
                    )}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.headlineSm,
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  triggerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: 13,
    ...shadows.sm,
  },
  triggerCardPressed: {
    backgroundColor: colors.surfaceContainerLow,
    borderColor: colors.primary,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dateText: {
    ...typography.labelMd,
    fontSize: 13,
    color: colors.onSurface,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxHeight: 460,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius['2xl'],
    padding: spacing.md,
    ...shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalTitle: {
    ...typography.headlineSm,
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  closeButton: {
    padding: spacing['2xs'],
  },
  dateOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    marginBottom: 6,
    backgroundColor: colors.surfaceContainerLow,
  },
  dateOptionSelected: {
    backgroundColor: colors.primary,
  },
  dateOptionPressed: {
    opacity: 0.85,
  },
  dateOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dayName: {
    ...typography.labelSm,
    width: 36,
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSurface,
  },
  fullDate: {
    ...typography.bodyMd,
    fontSize: 14,
    color: colors.onSurface,
  },
  textWhite: {
    color: colors.onPrimary,
  },
  todayBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
    backgroundColor: colors.secondaryContainer,
  },
  todayBadgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  todayBadgeText: {
    ...typography.labelXs,
    fontSize: 10,
    fontWeight: '600',
    color: colors.onSecondaryContainer,
  },
});
