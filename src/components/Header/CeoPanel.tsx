import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import {
  HiOutlineChevronDown,
  HiOutlineBuildingLibrary,
  HiOutlinePlusCircle,
} from "react-icons/hi2";

const CeoDropdown = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1330);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="ceo">
          <AccordionTrigger className="px-4 py-2 bg-muted rounded-md text-sm font-medium flex items-center justify-between gap-2 hover:bg-muted/80 transition-colors">
            <span>{t("ceo")}</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 px-4 py-2">
            <button
              onClick={() => (window.location.href = "/my-centers")}
              className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-muted transition text-left"
            >
              <HiOutlineBuildingLibrary className="text-lg" />
              <span>{t("ceoEdu")}</span>
            </button>
            <button
              onClick={() => window.location.href = "/ceo"}
              className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-muted transition text-left"
            >
              <HiOutlinePlusCircle className="text-lg" />
              <span>{t("ceoNewEdu")}</span>
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <div className="relative inline-block">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer px-4 py-2 bg-muted rounded-md text-sm font-medium flex items-center gap-2 hover:bg-muted/80 transition-colors line-clamp-1">
            {t("ceo")}
            <HiOutlineChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2 shadow-lg rounded-md border bg-white dark:bg-zinc-900">
          <DropdownMenuItem onClick={() => (window.location.href = "/my-centers")} className="flex items-center gap-2">
            <HiOutlineBuildingLibrary className="text-lg" />
            <span>{t("ceoEdu")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => (window.location.href = "/ceo")} className="flex items-center gap-2">
            <HiOutlinePlusCircle className="text-lg" />
            <span>{t("ceoNewEdu")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CeoDropdown;
