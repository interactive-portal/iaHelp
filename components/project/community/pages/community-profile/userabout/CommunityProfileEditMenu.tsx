import RenderAtom from "@/components/common/Atom/RenderAtom";
import useCallProcess from "@/middleware/dataHook/useCallProcess";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { usePage } from "hooks/use-page";

export default function CommunityProfileEditMenu({
  item,
  formModalConfig,
  setFormModalConfig,
}: {
  item: any;
  formModalConfig?: any;
  setFormModalConfig?: any;
}) {
  const pageContext = usePage();
  const { callProcess, isProcessWorking } = useCallProcess();

  const items: MenuProps["items"] = [
    {
      key: "edit",
      icon: (
        <RenderAtom
          item={{ value: "far fa-pen" }}
          renderType="icon"
          customClassName="w-7 text-[#67748e]"
        />
      ),
      label: (
        <RenderAtom
          item={{ value: "Засах" }}
          renderType="text"
          customClassName="text-base font-medium text-left text-[#67748e]"
          onClick={async () => {
            console.log("Edit товч дарав item:", item);
            setFormModalConfig({
              ...formModalConfig,
              isShowModal: true,
              processMode: "edit",
              item,
            });
          }}
        />
      ),
    },
    {
      key: "delete",
      icon: (
        <RenderAtom
          item={{ value: "far fa-trash" }}
          renderType="icon"
          customClassName="w-7 text-[#67748e]"
        />
      ),
      label: (
        <RenderAtom
          item={{ value: "Устгах" }}
          renderType="text"
          customClassName={"text-base font-medium text-left text-[#67748e]"}
          onClick={async () => {
            console.log("Delete товч дарав");

            const result = await callProcess({
              command: formModalConfig?.processCodeDelete,
              parameter: {
                id: item?.id,
              },
            });

            if (result?.status == "success") {
              pageContext.kkk[formModalConfig?.listWidgetId]?.dataMutate();
            }
          }}
        />
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      arrow={{ pointAtCenter: true }}
    >
      <RenderAtom
        renderType="icon"
        item={{ value: "fa-regular fa-ellipsis" }}
        customClassName="text-[#A0A0A0] active:text-[#0165E0] text-lg w-8 h-8 rounded-full flex items-center justify-center bg-transparent hover:bg-gray-100 cursor-pointer"
      />
    </Dropdown>
  );
}
