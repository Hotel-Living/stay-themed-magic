# Avatar System Documentation

## Current Status
The avatar system has been refactored to resolve conflicts between different avatar implementations.

## Active Components

### DIDAvatar
- **Purpose**: Main D-ID avatar implementation with language detection
- **Features**: 
  - Automatic language detection (Spanish/English)
  - Agent validation via D-ID API
  - Aggressive cleanup of conflicting elements
  - Enhanced error handling and debugging
  - Widget detection with fallbacks

### AvatarConflictResolver
- **Purpose**: Detects and reports conflicts between different avatar systems
- **Features**:
  - Real-time conflict detection
  - Development mode warnings
  - Debugging information

## Temporarily Disabled Components
The following components have been temporarily disabled to avoid conflicts with D-ID:

- `RandomAvatarAssistant`
- `EnhancedAvatarAssistant` (when used globally)

These can be re-enabled once D-ID implementation is stable.

## Configuration

### D-ID Agents
- **Spanish**: `v2_agt_JZ4Lnlqs`
- **English**: `v2_agt_20pNgPtt`
- **Client Key**: Embedded in component (Base64 encoded)

### Debugging
In development mode, both components render debug panels showing:
- Current status
- Language detection
- Agent information
- Widget detection status
- Manual test buttons

## Best Practices

1. **Single Source of Truth**: Only one avatar system should be active at a time
2. **Language Detection**: Uses i18n.language as primary, navigator.language as fallback
3. **Cleanup**: Aggressive cleanup prevents ghost avatars and conflicts
4. **Error Handling**: Comprehensive error handling with detailed logging
5. **Testing**: Manual test functions available in development mode

## Troubleshooting

Common issues and solutions:
1. **Widget not appearing**: Check agent validation and network requests
2. **Multiple avatars**: Use AvatarConflictResolver to identify conflicts
3. **Language switching**: Component automatically handles language changes
4. **CSP Issues**: Monitor console for Content Security Policy violations