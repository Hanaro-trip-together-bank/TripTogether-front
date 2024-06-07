import { useEffect, useState } from "react";
import Button from "./Button";
import { HStack, VStack } from "./Stack";
import cn from "../../utils/cn";
import { useCityCartManager } from "../../contexts/City-Cart-Context";
import Arrow from "./Arrow";
import { useTrip } from "../../contexts/Trip-Context";

interface TripViewProps {
  id: number;
  nameKo: string;
  nameEn: string;
  subtitle: string;
  image: string;
  roundedFull?: boolean;
  hasArrowButton?: boolean;
}

function TripView({
  id,
  nameKo,
  nameEn,
  subtitle,
  image,
  roundedFull = false,
  hasArrowButton = false,
}: TripViewProps) {
  const [selected, setSelect] = useState(false);
  const { addCity, removeCity } = useCityCartManager();
  const onClickSelect = () => {
    selected ? removeCity(id) : addCity({ cityIdx: id, image, nameKo, nameEn });
    setSelect(!selected);
  };

  const baseImageClassName = "w-14 h-14 rounded-xl my-1";
  const roundedFullImageClassName = roundedFull ? "!rounded-full" : "";

  const processedImageClassName = cn(
    baseImageClassName,
    roundedFullImageClassName
  );

  return (
    <HStack className="p-2 border-b-0.5 items-center w-full font-bold hover:bg-gray-200">
      <img className={processedImageClassName} src={image} alt={nameKo} />
      <VStack className="mx-3 mt-1 items-start">
        <p className="">{nameKo}</p>
        <p className="text-sm text-gray-400 mt-0">{subtitle}</p>
      </VStack>
      <div className="ml-auto">
        {hasArrowButton ? (
          <Arrow direction="right" />
        ) : !selected ? (
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
