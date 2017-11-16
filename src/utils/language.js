const LANGUAGES = {
  en: {
    confirm: 'confirm',
    cancel: 'cancel',
    close: 'close',
    timezonePickerTitle: 'Pick a timezone',
    timezonePickerLabel: 'Closest city or timezone',
    am: 'AM',
    pm: 'PM'
  },
  'zh-cn': {
    confirm: '确认',
    cancel: '取消',
    close: '关闭',
    timezonePickerTitle: '选择时区',
    timezonePickerLabel: '最近的城市或时区',
    am: '上午',
    pm: '下午'
  },
  'zh-tw': {
    confirm: '確認',
    cancel: '取消',
    close: '關閉',
    timezonePickerTitle: '選擇時區',
    timezonePickerLabel: '最近的城市或時區',
    am: '上午',
    pm: '下午'
  },
  fr: {
    confirm: 'Confirmer',
    cancel: 'Annulé',
    close: 'Arrêter',
    timezonePickerTitle: 'Choisissez un timezone',
    timezonePickerLabel: 'Ville la plus proche ou timezone',
    am: 'AM',
    pm: 'PM'
  },
  ja: {
    confirm: '確認します',
    cancel: 'キャンセル',
    close: 'クローズ',
    timezonePickerTitle: 'タイムゾーンを選択する',
    timezonePickerLabel: '最も近い都市またはTimezone',
    am: 'AM',
    pm: 'PM'
  }
};

const language = (type = 'en') => LANGUAGES[type];

export default {
  get: language
};
