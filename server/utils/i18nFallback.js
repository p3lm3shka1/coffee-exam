// import deepl from "deepl-node";

// const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

// export const pickLang = (lang) =>
//   String(lang || "en")
//     .toLowerCase()
//     .startsWith("lt")
//     ? "lt"
//     : "en";

// export const isNonEmpty = (v) => typeof v === "string" && v.trim().length > 0;

// export async function ensureLtField(doc, baseField, ltField) {
//   const baseText = doc?.[baseField];
//   if (!isNonEmpty(baseText)) return false;
//   if (isNonEmpty(doc?.[ltField])) return false;

//   const res = await translator.translateText(baseText, "EN", "LT");
//   doc[ltField] = res.text;
//   return true;
// }
