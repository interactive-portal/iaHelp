import _ from "lodash";

import useGoLink from "@customhook/useGoLink";
import { useCloud } from "hooks/use-cloud";
import { toBoolean } from "@/util/helper";
import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";
import MoleculeFilterWrapper from "./MoleculeFilterWrapper";

export default function MoleculeFilter({
  item,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
  props = {},
}: {
  item?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
  props?: object;
}) {
  const cloudContext = useCloud();
  const { goLink } = useGoLink();

  const onClearAllDvc = () => {
    const emptyDvcQuery = _.forEach(
      cloudContext.cloudURL.query,
      (value, key) => {
        if (key.startsWith("dvc")) {
          cloudContext.cloudURL.query[key] = "removeIt";
        }
      }
    );

    goLink({
      urlObject: {
        query: emptyDvcQuery,
        props: {
          shallow: true,
        },
        keepQuery: true,
      },
    });
  };

  return (
    <BlockDiv customClassName="w-full" divNumber="MoleculeFilterOuter">
      <BlockDiv customClassName="w-full" divNumber="MoleculeFilterInner">
        <BlockDiv
          customClassName="flex flex-col space-y-9"
          divNumber="MoleculeFilterBody"
        >
          {item.map((item: any, index: number) => {
            if (!toBoolean(item.isrender || true)) return null;

            if (!_.isEmpty(item.children)) {
              return (
                <MoleculeFilter
                  key={item?.id || index}
                  item={item.children}
                  divNamePrefix={divNamePrefix}
                />
              );
            }
            return (
              <MoleculeFilterWrapper
                key={item?.id || index}
                item={item}
                customClassName={customClassName}
                customStyle={customStyle}
                divNamePrefix={divNamePrefix}
                props={props}
              />
            );
          })}
        </BlockDiv>
        <BlockDiv
          customClassName="mt-10 flex items-center justify-end"
          divNumber="MoleculeFilterFooter"
        >
          <RenderAtom
            item={{ value: "Арилгах" }}
            renderType="text"
            customClassName="text-sm text-rose-400 cursor-pointer hover:text-rose-600"
            onClick={onClearAllDvc}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
