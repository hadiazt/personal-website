import Link from "next/link";
import { CONTACTS } from "../../../constants/constants";

export const Contact = () => {
  return (
    <div className="flex flex-col space-y-2 pt-6 font-IR_Sans" dir="rtl">
      <div className="flex flex-col">
        <span className="text-Snow text-xs font-bold">آدرس ایمیل</span>

        <span className="text-xs text-gray-600 text-left">
          <Link href={`mailto:${CONTACTS.EMAIL}`}>{CONTACTS.EMAIL}</Link>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-Snow text-xs font-bold">شماره تماس</span>
        <span className="text-xs text-gray-600 text-left" dir="ltr">
          {CONTACTS.PHONE}
        </span>
      </div>
    </div>
  );
};
