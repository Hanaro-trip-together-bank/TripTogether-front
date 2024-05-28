import { useState } from "react";
import Button from "./Button";
import { HStack } from "./Stack";
import cn from "../../utils/cn";
import { useCountryCartManager } from "../../contexts/Country-Cart-Context";

interface TripViewProps {
  id: number;
  name: string;
  category: string;
  image: string;
  roundedFull?: boolean;
}

function TripView({
  id,
  name,
  category,
  image,
  roundedFull = false,
}: TripViewProps) {
  const [selected, setSelect] = useState(false);
  const { addCountry, removeCountry } = useCountryCartManager();
  const onClickSelect = () => {
    selected
      ? removeCountry(id)
      : addCountry({ countryGeoId: id, image, nameKo: name });
    setSelect(!selected);
  };

  const baseImageClassName = "w-14 h-14 rounded-xl my-1";
  const roundedFullImageClassName = roundedFull ? "!rounded-full" : "";

  const processedImageClassName = cn(
    baseImageClassName,
    roundedFullImageClassName
  );

  return (
    <HStack className="p-2 border-b-0.5 items-center w-full font-bold">
      <img className={processedImageClassName} src={image} alt={name} />
      <div className="mx-3 mt-1 my-auto">
        <p className="">{name}</p>
        <p className="text-sm text-gray-400 mt-2">{category}</p>
      </div>
      <div className="ml-auto">
        {!selected ? (
          <Button
            // gray={false}
            roundedFull={true}
            className="my-3 w-5 h-5 !px-3 text-xs !bg-white border border-primary text-primary"
            onClick={onClickSelect}
          >
            선택
          </Button>
        ) : (
          <Button
            gray={true}
            roundedFull={true}
            className="my-3 w-5 h-5 !px-3 text-xs"
            onClick={onClickSelect}
          >
            취소
          </Button>
        )}
      </div>
    </HStack>
  );
}

export default TripView;
