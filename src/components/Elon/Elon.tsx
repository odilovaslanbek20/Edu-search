import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Elon = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="bg-[#F5F5F5] text-[#2A2A2A] py-10 pt-24 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-[#461773] mb-4">{t("elon.title")}</h1>

        <p className="mb-4 text-lg">
          {t("elon.desc1")} <span className="font-semibold text-[#461773]">{t("elon.desc2")}</span>{" "}
          {t("elon.desc3")} <span className="text-[#461773] font-semibold">{t("elon.desc4")}</span>{" "}
          {t("elon.desc5")}
        </p>

        <p className="mb-8 text-lg">{t("elon.desc6")}</p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Plan 1 */}
          <div className="border rounded-xl p-6 bg-gray-50 hover:shadow-md transition">
            <h2 className="text-2xl font-bold text-[#461773] mb-2">{t("elon.plan1")}</h2>
            <p className="text-lg mb-4">{t("elon.plan1_price")}</p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>{t("elon.plan1_feature1")}</li>
              <li>{t("elon.plan1_feature2")}</li>
              <li>{t("elon.plan1_feature3")}</li>
              <li>{t("elon.plan1_feature4")}</li>
            </ul>
          </div>

          {/* Plan 2 */}
          <div className="border rounded-xl p-6 bg-gray-50 hover:shadow-md transition">
            <h2 className="text-2xl font-bold text-[#461773] mb-2">{t("elon.plan2")}</h2>
            <p className="text-lg mb-4">{t("elon.plan2_price")}</p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>{t("elon.plan2_feature1")}</li>
              <li>{t("elon.plan2_feature2")}</li>
              <li>{t("elon.plan2_feature3")}</li>
              <li>{t("elon.plan2_feature4")}</li>
            </ul>
          </div>

          {/* Plan 3 */}
          <div className="border rounded-xl p-6 bg-gray-50 hover:shadow-md transition">
            <h2 className="text-2xl font-bold text-[#461773] mb-2">{t("elon.plan3")}</h2>
            <p className="text-lg mb-4">{t("elon.plan3_price")}</p>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>{t("elon.plan3_feature1")}</li>
              <li>{t("elon.plan3_feature2")}</li>
              <li>{t("elon.plan3_feature3")}</li>
              <li>{t("elon.plan3_feature4")}</li>
              <li>{t("elon.plan3_feature5")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2 text-[#461773]">{t("elon.note_title")}</h3>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>{t("elon.note1")}</li>
            <li>{t("elon.note2")}</li>
            <li>{t("elon.note3")}</li>
          </ul>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#461773] hover:bg-[#461773]/80 cursor-pointer text-white px-6 py-2 rounded-xl transition"
          >
            {t("elon.back")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Elon;
