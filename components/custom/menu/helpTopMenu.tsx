import { FC, useContext } from "react";
import Link from "next/link";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { useSession } from "next-auth/react";

type PropsType = {
  Menu?: any;
};

const HelpTopMenu: FC<PropsType> = ({ Menu }) => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const { data: session } = useSession();

  console.log(readyDatasrc);

  // const cloudContext = useCloud();
  // const rootDomain = cloudContext?.hostObject?.pageDomain;
  let data = Menu || [];
  return (
    <div className="h-full items-center md:flex sm:flex">
      <ul className="md:grid md:grid-flow-col md:auto-cols-max">
        {data?.map((item: any, index: number) => {
          return (
            <li key={index || item?.id} className="xl:py-0 md:py-0 py-4">
              <Link
                href={"/" + item?.url}
                className="hover:text-[#699BF7] text-base font-medium cursor:pointer text-[#585858]"
              >
                <span className="px-2"> {item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HelpTopMenu;
