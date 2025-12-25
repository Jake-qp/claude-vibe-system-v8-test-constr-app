---
name: mobile
description: Mobile development patterns (React Native, Flutter)
triggers:
  - React Native development
  - Flutter development
  - Mobile-specific features
generates: null
---

# Mobile Skill

Build solid mobile applications.

## When This Skill Activates

- React Native projects
- Flutter projects
- Mobile-specific features

## React Native Patterns

### Navigation
```typescript
// Use React Navigation
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Platform-Specific Code
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
});
```

## Mobile Considerations

- [ ] Offline support
- [ ] Deep linking
- [ ] Push notifications
- [ ] Secure storage (Keychain/Keystore)
- [ ] Responsive to screen sizes

## Testing

- [ ] Physical device testing
- [ ] iOS and Android verified
- [ ] Different screen sizes
- [ ] Offline behavior

## Exit Criteria

- [ ] Runs on iOS and Android
- [ ] Platform-specific adjustments
- [ ] Offline handled gracefully
