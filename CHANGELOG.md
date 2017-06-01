# CHANGELOG

### v2.1.3

- Bugfixed for drag position offset
- Add `onTimezoneChange` callback

### v2.1.0

#### new props

- `phrases`: `React.PropTypes.object`
- `timezone`: `React.PropTypes.string`
- `onTimezoneChange`: `React.PropTypes.func`

### v2.0.0

#### changed props

- `onTimeQuantumChange` --> `onMeridiemChange`
- `timeQuantum` --> `meridiem`
- `dragable` --> `draggable`

#### new props

- `showTimezone`: `React.PropTypes.bool`, default `false`
- `timezone`:  `React.PropTypes.string`, default user current local timezone
