import i18n from '../i18n';

const translate = (lang, section, id, args, fallback) => {
  try {
    const res = i18n[lang][section][id](args);
    return res || fallback || `TRANSLATE ${id}`;
  } catch (err) {
    // console.warn(err, lang, section, id, args);
    return fallback || `TRANSLATE ${id}`;
  }
};
export default translate;
