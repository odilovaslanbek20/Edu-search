import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { HiOutlineChevronDown, HiOutlineBuildingLibrary, HiOutlinePlusCircle } from "react-icons/hi2";

const CeoDropdown = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer px-4 py-2 bg-muted rounded-md text-sm font-medium flex items-center gap-2 hover:bg-muted/80 transition-colors">
            {t("ceo")}
            <HiOutlineChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 mt-2 shadow-lg rounded-md border bg-white dark:bg-zinc-900">
          <DropdownMenuItem onClick={() => (window.location.href = "/my-centers")} className="flex items-center gap-2">
            <HiOutlineBuildingLibrary className="text-lg" />
            <span>{t("ceoEdu")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => (window.location.href = "/create-center")} className="flex items-center gap-2">
            <HiOutlinePlusCircle className="text-lg" />
            <span>{t("ceoNewEdu")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CeoDropdown;
