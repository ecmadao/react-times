const LANGUAGES = {
  en: {
    confirm: 'confirm',
    cancel: 'cancel',
    close: 'close',
    am: 'AM',
    pm: 'PM'
  },
  'zh-cn': {
    confirm: '确认',
    cancel: '取消',
    close: '关闭',
    am: '上午',
    pm: '下午'
  },
  'zh-tw': {
    confirm: '確認',
    cancel: '取消',
    close: '關閉',
    am: '上午',
    pm: '下午'
  },
  fr: {
    confirm: 'Confirmer',
    cancel: 'Annulé',
    close: 'Arrêter',
    am: 'AM',
    pm: 'PM'
  },
  ja: {
    confirm: '確認します',
    cancel: 'キャンセル',
    close: 'クローズ',
    am: 'AM',
    pm: 'PM'
  }
};

const language = (type = 'cn') => {
  return LANGUAGES[type];
};

export default {
  get: language
};
