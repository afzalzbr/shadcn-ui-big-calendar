# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-22

### Added

- Initial release of shadcn-big-calendar as an npm package
- `ShadcnBigCalendar` component with Shadcn UI styling
- Support for light and dark themes using CSS custom properties
- Three built-in event variants: primary, secondary, and outline
- Full TypeScript support with comprehensive type definitions
- ESM and CommonJS builds for maximum compatibility
- Drag-and-drop support through `withDragAndDrop` HOC
- `EventForm` component with validation schema (optional)
- `cn` utility function for class name merging
- Comprehensive documentation and examples
- Full compatibility with React Big Calendar API

### Features

- **Theming**: Automatic theme adaptation using Shadcn UI CSS variables
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- **Responsive**: Mobile-friendly calendar views
- **Customizable**: Easy to extend and customize with Tailwind CSS
- **Tree-shakeable**: Optimized bundle size with proper ESM support

### Documentation

- README.md with installation and usage instructions
- USAGE.md with comprehensive examples
- PUBLISHING.md with npm publishing guide
- TypeScript definitions for all components and utilities

### Dependencies

- React Big Calendar (^1.13.0)
- Peer dependencies: React (^18.0.0), React DOM (^18.0.0)
- Utility dependencies: clsx, tailwind-merge

## [1.1.0] - 2026-01-23

### Added

- **Confirmation Modal for Drag & Drop**: New optional confirmation dialog when dragging or resizing events
  - Shows comparison between old and new times
  - Configurable via toggle switch
  - Supports both drag and resize operations
  - Smart date formatting (shows full date when spanning multiple days)
  - Accessible dialog with proper ARIA attributes
- **Interactive Feature Demo Pages**: Three new demo pages showcasing library capabilities
  - `/features/custom-classname` - Custom className styling examples
  - `/features/time-display` - Time display component demonstrations
  - `/features/data-props` - Generic data props and custom modal integration
- **Improved Event UI**: Events now use subtle rounded corners (`rounded-sm`) for a more professional appearance
- **Enhanced Time Display in Agenda View**: Agenda view now displays event times alongside titles
- **Call-to-Action Components**: New CTA cards for improved user engagement

### Changed

- Updated event border-radius from `var(--radius)` to fixed `0.25rem` for consistency
- Improved event component styling across all views (month, week, day, agenda)

### Documentation

- Updated README.md with comprehensive examples for new features
- Added interactive feature demos section
- Improved drag-and-drop documentation with confirmation modal examples
- Enhanced TypeScript examples

## [1.2.0] - 2026-05-18

### Added

- **Full `react-big-calendar` type re-exports**: All types now exported directly from `shadcn-big-calendar` — no need to import from `react-big-calendar` separately
  - `ToolbarProps`, `Components`, `Formats`, `Messages`, `HeaderProps`, `DateHeaderProps`
  - `EventProps`, `EventWrapperProps`, `DateCellWrapperProps`, `ResourceHeaderProps`
  - `ViewProps`, `ViewsProps`, `TimeGridProps`, `DayProps`, `WeekProps`, `WorkWeekProps`
  - `DayLayoutFunction`, `DateLocalizerSpec`, `DateRange`, `DateRangeFormatFunction`
  - `TitleOptions`, `MoveOptions`, `FormatInput`, `ViewKey`, `ViewStatic`
  - `SlotGroupPropGetter`, `stringOrDate`, `Culture`, `DateFormat`, `DateFormatFunction`, `DayLayoutAlgorithm`
  - DnD: `DragAction`, `DragDirection`, `OnDragStartArgs`, `DragFromOutsideItemArgs`

### Fixed

- Calendar event overlap rendering handled correctly

### Changed

- Calendar height raised to 700px for better usability
- Toolbar interactions and theme select button props refined
- Shadcn UI updated to 4.0.6
- Big calendar UI components updated with improved styling
- Preset event durations extended
- Chart color tokens refreshed
- Replaced Radix UI primitives with `lucide-react` and `radix-ui` unified package
- Updated `@radix-ui/react-label` and `@radix-ui/react-slot` dependencies
- Updated `eslint-config-next` to 14.2.35 for Next.js 14 compatibility

### Documentation

- Updated demo URL to `https://shadcn-big-calendar.vercel.app/` across README.md, README.npm.md, and USAGE.md
- Updated USAGE.md with latest examples
- Updated README.md with full type re-export documentation

### Internal

- Code structure and formatting improvements across multiple components

## [1.3.0] - 2026-08-29

### Added

- **`height` prop** on `ShadcnBigCalendar`: sets calendar height without requiring `style={{ height: ... }}`.
- **`rowHeight` prop** on `ShadcnBigCalendar`: sets the exact height of each time-slot row in Week/Day views. Numbers are interpreted as pixels, and CSS length strings are supported.
- **Interactive row-height demo** at `/features/row-height` with seven presets, a validated custom height field, live Week/Day previews, and copyable examples.
- **CSS custom property support** through `--calendar-row-height` for consumers who need to size rows outside the prop.

### Fixed

- Compact row heights now render at their requested size instead of stretching to fill the calendar viewport.
- Calendar header columns stay aligned with time-grid columns when row-height changes add or remove the vertical scrollbar.
- Overflow state is recalculated after runtime row-height changes.

### Documentation

- Added sizing API documentation and examples to `README.md` and `README.npm.md`.
- Added practical density presets and usage guidance to the feature showcase.
- Added standalone release notes in `docs/releases/v1.3.0.md`.

## [Unreleased]

### Planned Features

- Recurring events support
- Event filtering and search
- Print-friendly styles
- Additional calendar view customizations
- Keyboard shortcuts for confirmation modal
- Batch confirmation for multiple changes

---

For a complete list of changes, see the [commit history](https://github.com/afzalzbr/shadcn-ui-big-calendar/commits/main).
