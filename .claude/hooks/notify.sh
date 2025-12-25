#!/bin/bash
# Claude Code V8 - Notification Hook

TITLE="$1"
MESSAGE="$2"

# macOS notification
if command -v osascript &> /dev/null; then
    osascript -e "display notification \"$MESSAGE\" with title \"Claude Code: $TITLE\""
fi

# Linux notification
if command -v notify-send &> /dev/null; then
    notify-send "Claude Code: $TITLE" "$MESSAGE"
fi

# Windows notification (WSL)
if command -v powershell.exe &> /dev/null; then
    powershell.exe -Command "[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null; \$template = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02); \$template.SelectSingleNode('//text[@id=\"1\"]').InnerText = 'Claude Code: $TITLE'; \$template.SelectSingleNode('//text[@id=\"2\"]').InnerText = '$MESSAGE'; [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('Claude Code').Show(\$template)" 2>/dev/null
fi

exit 0
