![react-times](./intro_src/react_times.png)

[![npm version](https://badge.fury.io/js/react-times.svg)](https://badge.fury.io/js/react-times) [![Build Status](https://travis-ci.org/ecmadao/react-times.svg?branch=master)](https://travis-ci.org/ecmadao/react-times) [![Coverage Status](https://coveralls.io/repos/github/ecmadao/react-times/badge.svg?branch=master)](https://coveralls.io/github/ecmadao/react-times?branch=master) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![react-times](http://img.shields.io/npm/dm/react-times.svg)](https://www.npmjs.com/package/react-times) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/ecmadao/react-times/master/LICENSE)

[![NPM](https://nodei.co/npm/react-times.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-times)

README：[中文版](./README_CN.md)

> A time picker react-component, no jquery-rely, writing in es6 standard style.

**ATTENTION: new version 2.0.0 published. Check [here](./CHANGELOG.md) to see these changed props.**

![react-times](./intro_src/react-times.gif)

# Online demo

Check [here](https://ecmadao.github.io/react-times) to play online demo.

# Play in local

```bash
$ git clone https://github.com/ecmadao/react-times.git

$ npm install

$ npm run storybook
```

# Install

dependencies:

- [`moment`](https://github.com/moment/moment/)
- [`react`](https://github.com/facebook/react)
- [`react-dom`](https://github.com/facebook/react)

> No jQuery rely 😤😤😤

So generally speaking, you should already have `react` & `react-dom` dependencies in your project. If not:

```bash
$ npm install react react-dom --save-dev
# and
$ npm install react-times --save-dev
```

# Config

Cause I'm using `moment-timezone`, you need to be able to parse json file.

Use webpack config as example:

- [How should I use moment-timezone with webpack?](https://stackoverflow.com/questions/29548386/how-should-i-use-moment-timezone-with-webpack)

```bash
$ npm i json-loader --save
```

```javascript
// webpack.config.js
{
  module: {
    loaders: [
        {include: /\.json$/, loaders: ["json-loader"]}
    ]
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js']
  }
}
```

# Usage

This component has two themes now: Material Theme by default, or Classic Theme.

> Always remember import css file when you use react-times

```javascript
// basic usage
// in some react component
import React from 'react';
import TimePicker from 'react-times';

// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

export default class SomeComponent extends React.Component {
  // do some work
  onHourChange(hour) {
    // do something
  }

  onMinuteChange(minute) {
    // do something
  }

  onTimeChange(time) {
    // do something
  }

  onFocusChange(focusStatue) {
    // do something
  }

  onMeridiemChange(meridiem) {
    // do something
  }

  render() {
    <TimePicker
      onFocusChange={this.onFocusChange.bind(this)}
      onHourChange={this.onHourChange.bind(this)}
      onMinuteChange={this.onMinuteChange.bind(this)}
      onTimeChange={this.onTimeChange.bind(this)}
      onMeridiemChange={this.onMeridiemChange.bind(this)}
    />
  }
}
```

> See more examples here:

```javascript
// some config example
render() {
  <TimePicker
      colorPalette="dark" // main color, default "light"
      focused={true} // whether to show timepicker modal after rendered. default false
      withoutIcon={true} // whether to has time icon on button, default false
      time="13:05" // initial time, default current time
      theme="material"
      // or
      // theme="classic"
      timeMode="12" // use 24 or 12 hours mode, default 24
      showTimezone=true // show the timezone, default false
      timezone="America/New_York" // what timezone to use, detects the user's local timezone by default
  />
}
```

> For more detail usage, you can visit [example](https://github.com/ecmadao/react-times/tree/master/examples) or see the source code.

# Show time

- 24 hours mode with Material Theme, light color by default

```javascript
<TimePicker />
```

![24HoursMode](./intro_src/24HoursMode.png)

- 12 hours mode with Material Theme, light color by default

```javascript
<TimePicker timeMode="12"/>
```

![12HoursMode](./intro_src/12HoursMode.png)

- 24 hours mode with Material Theme, dark color

```javascript
<TimePicker colorPalette="dark"/>
```

![DarkColor](./intro_src/DarkColor.png)

- 24 hours mode, showing user current timezone. (Besides, your can use `timezone` props to custom timezone)

```javascript
<TimePicker showTimezone={true}/>
```

![showTimezone](./intro_src/24HoursMode-showTimezone.png)

- 24 hours mode with Classic Theme, light color by default

```javascript
<TimePicker theme="classic"/>
```

![24HoursMode-ClassicTheme](./intro_src/24HoursMode-ClassicTheme.png)

- 24 hours mode with Classic Theme, dark color

```javascript
<TimePicker colorPalette="dark" theme="classic"/>
```

![24HoursMode-ClassicTheme-dark](./intro_src/24HoursMode-ClassicTheme-dark.png)

# APIs

## Props

- `time`

> Initial time, must be a string, with `${hour}:${minute}` format, default now (by using `moment()`):

```javascript
// PropTypes.string
time='11:11'
time='11:01'
time='1:01'
time='1:1'
```

- `timeFormat`

> To show the time using custom style

```javascript
// PropTypes.string
// HH, MM means 24 hours mode
// hh, mm means 12 hours mode
timeFormat='HH:MM'
timeFormat='hh:mm'
timeFormat='H:M'
timeFormat='h:m'

// Warning:
// If you are using 12 hours mode but with hh or mm format,
// or using 24 hours mode with HH or MM format,
// you will receive a warning on console, and force to use the timeMode props

// So, if you wanna use hh:mm or h:m, you need to set timeMode props to 12
// (cause timeMode default is 24)
```

- `timeFormatter`

> To show the time using custom style

```javascript
// PropTypes.func
timeFormatter={({ hour, minute, meridiem }) => `${hour} - ${minute}`}

// Note:
// If you both set timeFormat and timeFormatter props (and they all validate), component will use timeFormatter function
```

- `focused`

> Whether the timepicker pannel is focused or not when it did mount. Default `false`

```javascript
// PropTypes.bool
focused={false}
focused={true}
```

- `withoutIcon`

> Whether the timepicker has a svg icon. Default `false`.

```javascript
// PropTypes.bool
withoutIcon={true}
```

- `colorPalette`

> The main color palette of picker pannel. Default `light`.

```javascript
// PropTypes.string
colorPalette="dark"
colorPalette="light"
```

- `timeMode`

> Support "12" or "24" hours mode.

```javascript
// PropTypes.string or PropTypes.number
timeMode="24"
timeMode=24
timeMode="12"
timeMode=12
```

- `meridiem`

> `PropTypes.string`, support "PM" or "AM" for 12 hours mode, default `AM`

- `showTimezone`

> `PropTypes.bool`, whether show user timezone or not, default `false`

- `timezone`

> `PropTypes.string`, change user timezone, default user current local timezone.

- `trigger`

> `React.component`, means a DOM which can control TimePicker Modal "open" or "close" status.

```javascript
<TimePicker
  focused={focused}
  trigger={(
    <div
      onClick={this.handleFocusedChange.bind(this)} >
      click to open modal
    </div>
  )}
/>
```

- `draggable`

If you don't want to drag the pointer, then you can set `draggable` props to `false`, then users can only use click to change time. Default `true`

```
<TimePicker
  draggable={true}
/>
```

- `language`

> `React.string`, use different language. Default english.

```javascript
/*
 * support
 * en: english
 * zh-cn: 中文简体
 * zh-tw: 中文繁体
 * fr: Français
 * ja: 日本語
 */
<TimePicker
  language="zh-cn" // 中文简体
/>
```

- `phrases`

> `React.object`, specify text values to use for specific messages.  By default, phrases will be set from defaults based on language.
> Specify any of the available phrases you wish to override or all of them if your desired language is not yet supported.
> See [language.js](./src/utils/language.js) for default phrases.

```javascript
<TimePicker
  phrases={{
    confirm: 'Are you sure?',
    cancel: 'Do you want to cancel?',
    close: 'DONE',
    am: 'Ante Meridiem',
    pm: 'Post Meridiem'
  }}
/>
```

- `minuteStep`

> `React.number`, default `5`. It means the minium minute can change. You can set it to 1, 2, 3...

```javascript
<TimePicker
  minuteStep={1}
/>
```

- `limitDrag`

> `React.bool`, default `false`. If `true`, it will limite the drag rotation by `minuteStep`

```javascript
<TimePicker
  limitDrag
/>
```

## Callback

- `onFocusChange`

`PropTypes.func`

> The callback func when component `focused` state is changed.

- `onHourChange`

`PropTypes.func`

> The callback func when component `hour` state is changed.

```javascript
onHourChange(hour) {
  // ...
}
```

- `onMinuteChange`

`PropTypes.func`

> The callback func when component `minute` state is changed.

```javascript
onMinuteChange(minute) {
  // ...
}
```

- `onTimeChange`

`PropTypes.func`

> The callback func when component `hour` or `minute` or `AM/PM` state is changed.

```javascript
onTimeChange(time) {
  // ...
}
```

- `onMeridiemChange`

`PropTypes.func`

> The callback func when meridiem changed.

- `onTimezoneChange`

`PropTypes.func`

> The callback func when timezone changed.  Receives timezone object as argument with the following properties:
* city
* zoneAbbr
* zoneName

# Article

- [一言不合造轮子--撸一个ReactTimePicker](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/React/ReactJS/Write%20a%20React%20Timepicker%20Component%20hand%20by%20hand.md)

# Todos

- Test

  - [x] TimePicker Component
  - [x] PickerDragHandler Component
  - [x] PickerPointGenerator Component
  - [x] MaterialTheme Component
  - [x] TwelveHoursTheme Component
  - [x] PickerPoint Component
  - [ ] OutsideClickHandler Component

  - [x] utils test

- Color Palette (Now It has light and dark color)

  - [x] light
  - [x] dark
  - [ ] colorful

- Themes

  - [x] Material Theme
  - [x] Classical Theme

- Mode

  - [x] 12h mode
  - [x] 24h mode

- Animations

# Thx

Thanks to the Airbnb's open source project: [react-dates](https://github.com/airbnb/react-dates), I have learn a lot from that. Thanks.

# Core Contributers 🎉

- **[carlodicelico](https://github.com/carlodicelico)**
- **[erin-doyle](https://github.com/erin-doyle)**
- **[MatthieuLemoine](https://github.com/MatthieuLemoine)**
- **[naseeihity](https://github.com/naseeihity)**
- **[shianqi](https://github.com/shianqi)**
- **[thg303](https://github.com/thg303)**

# License

[MIT License](./LICENSE)
