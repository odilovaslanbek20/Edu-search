import { useTranslation } from 'react-i18next'
import {
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
	const { t } = useTranslation()
  return (
    <footer className="w-full bg-gradient-to-b from-[#4b0f8d] to-[#2d095b] text-white py-12 mt-20">
      <div className="w-[90%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-4 tracking-wide">Findedu.uz</h2>
          <p className="text-sm opacity-80 mb-1">{t("footer.copyright")}</p>
          <p className="text-sm opacity-80 mb-1">{t("footer.copyright1")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">{t("footer.category.title")}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">{t("footer.category.all")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.category.education")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.category.bio")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.category.contact")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.category.tavsiv")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.category.project")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">{t("footer.direction.title")}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">{t("footer.direction.it")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.direction.matematika")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.direction.marketing")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.direction.sat")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.direction.inglizTili")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.direction.smm")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.direction.dizayn")}</li>
              <li className="hover:text-white cursor-pointer">{t("footer.direction.biznes")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">{t("footer.social")}</h3>
            <div className="flex items-center gap-4 mt-2 text-xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#1877f2] transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#0088cc] transition-colors"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#e4405f] transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#ff0000] transition-colors"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
