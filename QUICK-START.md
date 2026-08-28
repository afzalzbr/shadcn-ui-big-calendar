# Quick Start Guide

## For Package Publishers

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Package
```bash
npm run build:lib
```

### 3. Test Build Output
```bash
ls -la dist/
# Should show: index.js, index.mjs, index.d.ts, styles/
```

### 4. Update Package Info
Edit `package.json`:
```json
{
  "name": "shadcn-big-calendar",  // Change if name is taken
  "version": "1.0.0",
  "author": "Your Name <your.email@example.com>"
}
```

### 5. Prepare README
```bash
# Copy npm README to main README
cp README.npm.md README.md
```

### 6. Test Locally (Optional)
```bash
npm pack
# Creates shadcn-big-calendar-1.0.0.tgz
# Test in another project:
# npm install /path/to/shadcn-big-calendar-1.0.0.tgz
```

### 7. Publish to NPM
```bash
npm login
npm publish
```

## For Package Users

### Installation
```bash
npm install shadcn-big-calendar react-big-calendar
npm install react react-dom clsx tailwind-merge
npm install moment  # or date-fns
```

### Basic Usage
```tsx
import { ShadcnBigCalendar, momentLocalizer } from "shadcn-big-calendar";
import "shadcn-big-calendar/styles";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const events = [
    {
      title: "Meeting",
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
    },
  ];

  return (
    <ShadcnBigCalendar
      localizer={localizer}
      events={events}
      height={600}
    />
  );
}
```

### With Drag and Drop
```tsx
import {
  ShadcnBigCalendar,
  withDragAndDrop,
  momentLocalizer,
} from "shadcn-big-calendar";
import "shadcn-big-calendar/styles";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const DnDCalendar = withDragAndDrop(ShadcnBigCalendar);
const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [events, setEvents] = useState([...]);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((e) =>
      e === event ? { ...e, start, end } : e
    );
    setEvents(updatedEvents);
  };

  return (
    <DnDCalendar
      localizer={localizer}
      events={events}
      onEventDrop={handleEventDrop}
      resizable
      draggableAccessor={() => true}
      style={{ height: 600 }}
    />
  );
}
```

## Key Files

- **USAGE.md** - Complete usage examples
- **PUBLISHING.md** - Detailed publishing guide
- **NPM-PACKAGE-SUMMARY.md** - Package overview
- **README.npm.md** - Package documentation

## Scripts

```bash
npm run build:lib      # Build the library
npm run type-check     # TypeScript validation
npm run dev           # Run demo app
npm run build         # Build demo app
```

## Troubleshooting

**Build fails?**
```bash
rm -rf dist node_modules package-lock.json
npm install
npm run build:lib
```

**Package name taken?**
- Change `name` in package.json
- Use scoped package: `@username/shadcn-big-calendar`

**CSS not working?**
```tsx
// Import in correct order:
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "shadcn-big-calendar/styles";  // Last
```

## Support

- Demo: https://shadcn-ui-big-calendar.vercel.app/
- Repo: https://github.com/list-jonas/shadcn-ui-big-calendar
- Issues: https://github.com/list-jonas/shadcn-ui-big-calendar/issues
