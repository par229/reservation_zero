import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const COLORS = {
  primary: '#4c669f',
  secondary: '#3b5998',
  tertiary: '#192f6a',
  white: '#ffffff',
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
  },
  background: {
    primary: 'rgba(255, 255, 255, 0.1)',
    secondary: 'rgba(255, 255, 255, 0.15)',
    tertiary: 'rgba(255, 255, 255, 0.05)',
  },
  border: {
    primary: 'rgba(255, 255, 255, 0.2)',
    secondary: 'rgba(255, 255, 255, 0.1)',
  },
  status: {
    success: 'rgba(46, 204, 113, 0.8)',
    warning: 'rgba(241, 196, 15, 0.8)',
    error: 'rgba(231, 76, 60, 0.8)',
    info: 'rgba(52, 152, 219, 0.8)',
  }
};

export const FONTS = {
  large: 24,
  medium: 16,
  small: 14,
  tiny: 12,
  weights: {
    bold: 'bold',
    semiBold: '600',
    medium: '500',
    regular: 'normal',
  }
};

export const SPACING = {
  tiny: 4,
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  xxlarge: 24,
};

interface CommonStyles {
  container: ViewStyle;
  gradientBackground: ViewStyle;
  card: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  iconButton: ViewStyle;
  row: ViewStyle;
  infoText: TextStyle;
}

export const commonStyles = StyleSheet.create<CommonStyles>({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
    padding: SPACING.large,
    marginBottom: SPACING.medium,
  },
  header: {
    backgroundColor: COLORS.background.primary,
    padding: SPACING.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.primary,
  },
  title: {
    fontSize: FONTS.large,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: FONTS.medium,
    fontWeight: FONTS.weights.regular,
    color: COLORS.text.secondary,
    marginTop: SPACING.tiny,
  },
  button: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.large,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.primary,
  },
  buttonText: {
    fontSize: FONTS.medium,
    fontWeight: FONTS.weights.semiBold,
    color: COLORS.text.primary,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: FONTS.small,
    color: COLORS.text.secondary,
    fontWeight: FONTS.weights.medium,
  },
}); 