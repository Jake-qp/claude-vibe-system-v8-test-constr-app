# CrewBoard Specification

## User Story

As Pete, a remodeling business owner, I want a simple app to manage my projects, tasks, and materials so I can stop juggling spreadsheets and texts.

## Acceptance Criteria

### Projects
- [ ] AC1: Can create a project with name, client, address, start date, end date, budget
- [ ] AC2: Can view list of all projects with status indicators
- [ ] AC3: Can edit project details
- [ ] AC4: Can mark project as active/completed/on-hold
- [ ] AC5: Can delete a project

### Tasks
- [ ] AC6: Can add tasks to a project
- [ ] AC7: Each task has title, assignee, status, due date
- [ ] AC8: Status options: not started, in progress, done, blocked
- [ ] AC9: Assignee options: Mike, Jose, Tony, Sarah, Dave, Pete
- [ ] AC10: Can edit task details
- [ ] AC11: Can delete a task
- [ ] AC12: Can change task status quickly

### Materials
- [ ] AC13: Can add materials to a project
- [ ] AC14: Each material has name, quantity, unit, cost, purchased status
- [ ] AC15: Can mark material as purchased/not purchased
- [ ] AC16: Can edit material details
- [ ] AC17: Can delete a material

### Dashboard
- [ ] AC18: Shows count of active projects
- [ ] AC19: Shows all overdue tasks across projects (past due date, not done)
- [ ] AC20: Shows total materials cost for current month
- [ ] AC21: Can navigate to any project from dashboard

### Budget Tracking
- [ ] AC22: Project detail shows budget amount
- [ ] AC23: Project detail shows actual spent (sum of purchased materials)
- [ ] AC24: Visual indicator when over budget

### Schedule Tracking
- [ ] AC25: Project shows if behind schedule (has overdue tasks)
- [ ] AC26: Dashboard highlights overdue tasks prominently

### Mobile
- [ ] AC27: Works on phone screens (responsive)
- [ ] AC28: Touch-friendly buttons and inputs

### Data Persistence
- [ ] AC29: Data survives browser refresh
- [ ] AC30: No external services required

## Edge Cases
- Empty states: No projects, no tasks, no materials
- Long project names (truncation)
- Past dates for start/end
- Zero budget projects
- Negative quantities (prevent)

## Out of Scope
- User authentication
- Multi-device sync
- Photo uploads
- Time tracking
- Invoicing
- Notifications
