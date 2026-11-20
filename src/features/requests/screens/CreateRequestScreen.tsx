/**
 * Screen 10_Create_Request
 * Source of Truth: Stitch Screen 10_Create_Request (id: f48b8fe664534a69ad662ec428383a8b)
 * 
 * Features:
 * - Back button & screen title "Create Request"
 * - Context header with active building & unit: "Skyline Residency (A-1203)"
 * - Category cards for Visitor Pass, Maintenance, Work Permit, Access Card, Move In/Out, Unit Viewing
 * - Clean tactile feedback
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Screen } from '../../../components/common/Screen';
import { BackArrowIcon } from '../../../components/common/Icons';
import {
  VisitorPassIcon,
  MaintenanceIcon,
  WorkPermitIcon,
  AccessCardIcon,
  MoveInIcon,
  UnitViewingIcon,
  ChevronRightIcon,
} from '../../../components/common/ServiceIcons';
import { useCurrentBuilding } from '../../buildings/hooks/useCurrentBuilding';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

interface CreateRequestScreenProps {
  onBack: () => void;
}

interface RequestCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
}

export const CreateRequestScreen: React.FC<CreateRequestScreenProps> = ({
  onBack,
}) => {
  const { selectedBuilding, selectedUnit } = useCurrentBuilding();

  const buildingContext = `${selectedBuilding?.name || 'Skyline Residency'} (${
    selectedUnit?.number || 'A-1203'
  })`;

  const categories: RequestCategory[] = [
    {
      id: 'visitor',
      title: 'Visitor Pass',
      subtitle: 'Pre-approve entry for guests & deliveries',
      icon: <VisitorPassIcon size={24} color="#1E56A0" />,
      iconBg: '#E0F2FE',
    },
    {
      id: 'maintenance',
      title: 'Maintenance Request',
      subtitle: 'Plumbing, electrical, appliance fixes',
      icon: <MaintenanceIcon size={24} color="#C05621" />,
      iconBg: '#FFEDD5',
    },
    {
      id: 'work_permit',
      title: 'Work Permit',
      subtitle: 'Contractor access, renovations, moving',
      icon: <WorkPermitIcon size={24} color="#4338CA" />,
      iconBg: '#EDE9FE',
    },
    {
      id: 'access_card',
      title: 'Access Card',
      subtitle: 'Request RFID badge or parking transponder',
      icon: <AccessCardIcon size={24} color="#0B7285" />,
      iconBg: '#CCFBF1',
    },
    {
      id: 'move',
      title: 'Move In / Move Out',
      subtitle: 'Schedule freight elevator & security passes',
      icon: <MoveInIcon size={24} color="#1B7339" />,
      iconBg: '#DCFCE7',
    },
    {
      id: 'unit_viewing',
      title: 'Unit Viewing',
      subtitle: 'Schedule property tour for prospective tenants',
      icon: <UnitViewingIcon size={24} color="#006B67" />,
      iconBg: '#E6F4F1',
    },
  ];

  const handleCategoryPress = (category: RequestCategory) => {
    Alert.alert(
      category.title,
      `Creating a new ${category.title} for ${buildingContext}. Detailed form submission will be wired in Phase 3.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <Screen backgroundColor="#F8FAFC" statusBarStyle="dark-content" edges={['top']}>
      {/* Top Header Navigation */}
      <View style={styles.navBar}>
        <Pressable
          onPress={onBack}
          hitSlop={12}
          style={({ pressed }) => [styles.backBtn, pressed && styles.backPressed]}
          accessibilityLabel="Go back"
        >
          <BackArrowIcon size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={styles.navTitle}>Create Request</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Context Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.headingTitle}>Select a Service</Text>
          <Text style={styles.buildingContext}>📍 {buildingContext}</Text>
          <Text style={styles.headingSubtitle}>
            Choose the category of request or permit you would like to submit to management.
          </Text>
        </View>

        {/* Categories Stack */}
        <View style={styles.cardsList}>
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => handleCategoryPress(cat)}
              style={({ pressed }) => [
                styles.categoryCard,
                pressed && styles.categoryCardPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={cat.title}
            >
              <View style={[styles.iconSquircle, { backgroundColor: cat.iconBg }]}>
                {cat.icon}
              </View>

              <View style={styles.categoryDetails}>
                <Text style={styles.categoryTitle}>{cat.title}</Text>
                <Text style={styles.categorySubtitle}>{cat.subtitle}</Text>
              </View>

              <ChevronRightIcon size={18} color="#94A3B8" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 52,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingHorizontal: spacing.md,
  },
  backBtn: {
    position: 'absolute',
    left: spacing.md,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  navTitle: {
    ...typography.headlineSm,
    fontSize: 17,
    color: colors.onSurface,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing['3xl'],
  },
  headingSection: {
    marginBottom: spacing.md,
  },
  headingTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    color: colors.onSurface,
    fontWeight: '700',
  },
  buildingContext: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  headingSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    lineHeight: 18,
  },
  cardsList: {
    gap: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  categoryCardPressed: {
    backgroundColor: '#F8FAFC',
    transform: [{ scale: 0.99 }],
  },
  iconSquircle: {
    width: 48,
    height: 48,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  categoryDetails: {
    flex: 1,
    paddingRight: 8,
  },
  categoryTitle: {
    ...typography.labelLg,
    fontSize: 15,
    color: colors.onSurface,
    fontWeight: '600',
  },
  categorySubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});
