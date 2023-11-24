/* eslint-disable @typescript-eslint/no-explicit-any */
import translate from "translate-google";

export const translator = async (txt: string, ln: string): Promise<string> => {
  const res = await translate(txt, { to: ln });
  return res;
};
