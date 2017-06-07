# CHANGELOG

### v2.1.3

- Bugfixed for drag position offset
- Add `onTimezoneChange` callback

### v2.1.0

#### new props

- `phrases`: `PropTypes.object`
- `timezone`: `PropTypes.string`
- `onTimezoneChange`: `PropTypes.func`

### v2.0.0

#### changed props

- `onTimeQuantumChange` --> `onMeridiemChange`
- `timeQuantum` --> `meridiem`
- `dragable` --> `draggable`

#### new props

- `showTimezone`: `PropTypes.bool`, default `false`
- `timezone`:  `PropTypes.string`, default user current local timezone
