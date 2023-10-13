import dynamic from "next/dynamic";
import MoleculeWrapperV3 from "./MoleculeWrapperV3";

export default function MoleculeCardV3({
  item,
  type = "001",
  moleculeProps,
}: {
  item?: any;
  type?: "001" | "002" | "003";
  moleculeProps?: {
    outsideClassName?: string;
    isMoleculeWorking?: boolean;
    divNamePrefix?: string;
    tooltip?: any;
    children?: any;
  };
}) {
  const typeList: any = {
    "001": "TypeCardV3/MoleculeCardType001",
    "002": "TypeCardV3/MoleculeCardType002",
    "003": "TypeCardV3/MoleculeCardType003",
  };

  const RenderComponent: any = dynamic(
    () =>
      import(`@/components/common/Molecule/V3/${typeList?.[type]}`).catch(
        (err) => {
          return () => <>Олдсонгүй</>;
        }
      ),
    {
      ssr: false,
      suspense: true,
    }
  );

  const typeProps = {
    item: item,
  };

  return (
    <MoleculeWrapperV3 {...moleculeProps}>
      <RenderComponent {...typeProps} />
    </MoleculeWrapperV3>
  );
}
