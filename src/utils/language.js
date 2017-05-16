const LANGUAGES = {
  en: {
    confirm: 'confirm',
    cancel: 'cancel',
    close: 'close',
    timezonePickerTitle: 'Pick a TimeZone',
    timezonePickerLabel: 'Closest City or TimeZone',
    am: 'AM',
    pm: 'PM'
  },
  'zh-cn': {
    confirm: '确认',
    cancel: '取消',
    close: '关闭',
    // TODO: translate
    timezonePickerTitle: 'Pick a TimeZone',
    timezonePickerLabel: 'Closest City or TimeZone',
    am: '上午',
    pm: '下午'
  },
  'zh-tw': {
    confirm: '確認',
    cancel: '取消',
    close: '關閉',
    // TODO: translate
    timezonePickerTitle: 'Pick a TimeZone',
    timezonePickerLabel: 'Closest City or TimeZone',
    am: '上午',
    pm: '下午'
  },
  fr: {
    confirm: 'Confirmer',
    cancel: 'Annulé',
    close: 'Arrêter',
    // TODO: translate
    timezonePickerTitle: 'Pick a TimeZone',
    timezonePickerLabel: 'Closest City or TimeZone',
    am: 'AM',
    pm: 'PM'
  },
  ja: {
    confirm: '確認します',
    cancel: 'キャンセル',
    close: 'クローズ',
    // TODO: translate
    timezonePickerTitle: 'Pick a TimeZone',
    timezonePickerLabel: 'Closest City or TimeZone',
    am: 'AM',
    pm: 'PM'
  }
};

const language = (type = 'en') => {
  return LANGUAGES[type];
};

export default {
  get: language
};
