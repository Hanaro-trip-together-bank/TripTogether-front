import { useEffect, useState } from "react";
import cn from "../../../utils/cn";
import { HStack, VStack } from "../Stack";

interface KeyPadButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

function MiniButton({ label, onClick, className = "" }: KeyPadButtonProps) {
  const baseClassName =
    "text-white text-sm p-1 bg-secondary-accent rounded-md w-16";
  const processedClassName = cn(baseClassName, className);
  return (
    <button className={processedClassName} onClick={onClick}>
      {label}
    </button>
  );
}
function BigButton({ label, onClick, className = "" }: KeyPadButtonProps) {
  const baseClassName =
    "text-center text-white text-2xl hover:bg-secondary-accent rounded-xl h-16 mb-2 transition-colors";
  const processedClassName = cn(baseClassName, className);
  return (
    <button className={processedClassName} onClick={onClick}>
      {label}
    </button>
  );
}
function BackButton({ onClick, className = "" }: KeyPadButtonProps) {
  const baseClassName =
    "flex flex-row justify-center items-center hover:bg-secondary-accent rounded-xl h-16 mb-2 transition-colors";
  const processedClassName = cn(baseClassName, className);
  return (
    <button className={processedClassName} onClick={onClick}>
      <svg className="w-6 h-6" viewBox="0 0 1400 1000" fill="white">
        <path d="M90.352941 512 90.352941 512C90.352941 561.808824 466.876386 893.436413 466.876386 893.436413 491.663089 915.595839 539.016734 933.647059 572.343567 933.647059L1144.385777 933.647059C1210.791514 933.647059 1264.941176 879.753165 1264.941176 813.271675L1264.941176 210.728324C1264.941176 144.387622 1210.966679 90.352941 1144.385777 90.352941L572.343567 90.352941C538.797568 90.352941 491.976192 108.195569 467.275565 130.205566 467.275565 130.205566 90.352941 462.191176 90.352941 512L90.352941 512ZM798.117647 448.110824 649.112124 299.105301C631.269707 281.262868 602.796243 281.393566 585.153717 299.036075 567.38822 316.801584 567.542212 345.313738 585.222957 362.99448L734.22848 512 585.222957 661.00552C567.38051 678.847955 567.511221 707.321416 585.153717 724.963924 602.919243 742.729433 631.431379 742.575441 649.112124 724.894699L798.117647 575.889176 947.12317 724.894699C964.965587 742.737131 993.439051 742.606432 1011.081577 724.963924 1028.847074 707.198416 1028.693082 678.686262 1011.012337 661.00552L862.006814 512 1011.012337 362.99448C1028.854784 345.152045 1028.724073 316.678584 1011.081577 299.036075 993.316051 281.270566 964.803915 281.42456 947.12317 299.105301L798.117647 448.110824ZM0 512C0 451.000055 46.04151 400.247371 193.416222 258.98649 201.001352 251.716009 208.764085 244.322514 216.692344 236.815608 258.494554 197.235093 303.171765 156.113154 347.834669 115.79134 363.456512 101.687878 377.967616 88.685541 391.002353 77.08179 398.855288 70.090967 404.49542 65.098401 407.166163 62.748062 448.494622 25.921502 516.73594 0 572.343567 0L1144.385777 0C1260.804698 0 1355.294118 94.424547 1355.294118 210.728324L1355.294118 813.271675C1355.294118 929.643954 1260.702118 1024 1144.385777 1024L572.343567 1024C516.813101 1024 448.017378 997.772113 407.157579 961.239953 404.099885 958.546839 398.465446 953.559407 390.620582 946.575809 377.599337 934.984153 363.103262 921.995303 347.497623 907.90637 302.881009 867.62605 258.250059 826.545577 216.490918 787.003645 208.561333 779.495084 200.797545 772.100048 193.211573 764.82816 46.014283 623.72552 0 572.991482 0 512Z" />
      </svg>
    </button>
  );
}

interface KeypadProps {
  type?: number;
  onAppend: (digit: number) => void; // 맨뒤에 숫자 더하기
  onAdd: (number: number) => void; // 수 자체를 더하기
  onRemove: () => void; // 하나 지우기
  onClear: () => void; // 전체 지우기
  onDone: () => void; // 완료
}

function Keypad({
  type = 1,
  onAppend,
  onAdd,
  onRemove,
  onClear,
  onDone,
}: KeypadProps) {
  const [numberList, setNumberList] = useState<number[]>([]);
  useEffect(() => {
    // 초기 버튼 리스트
    const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    // 두 개의 랜덤한 인덱스 선택
    const indices: number[] = [];
    while (indices.length < 2) {
      const randomIndex = Math.floor(Math.random() * (numberList.length + 1));
      if (!indices.includes(randomIndex)) indices.push(randomIndex);
    }
    // 인덱스를 오름차순으로 정렬 (뒤에서부터 삽입하면 인덱스가 어긋나지 않음)
    indices.sort((a, b) => a - b);
    // 선택한 인덱스에 -1, -2 끼워넣기
    indices.forEach((index) => {
      numberList.splice(index, 0, -index - 1);
    });
    setNumberList(numberList);
  }, []);
  switch (type) {
    case 1:
      return (
        <VStack className="mt-8">
          <HStack className="justify-evenly">
            {[1, 5, 10, 100].map((value) => (
              <MiniButton
                key={value}
                label={`+${value}만`}
                onClick={() => onAdd(value * 10000)}
              />
            ))}
            <MiniButton label="지우기" onClick={onClear} />
          </HStack>
          <HStack className="flex-wrap !gap-0">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <BigButton
                className="w-4/12"
                key={value}
                label={`${value}`}
                onClick={() => onAppend(value)}
              />
            ))}
            <BackButton className="w-4/12" label="지움" onClick={onRemove} />
            <BigButton
              className="w-4/12"
              label="0"
              onClick={() => onAppend(0)}
            />
            <BigButton className="w-4/12" label="완료" onClick={onDone} />
          </HStack>
        </VStack>
      );
    case 2: {
      return (
        <VStack className="mt-8">
          <HStack className="flex-wrap !gap-0">
            {numberList.map((value) =>
              value >= 0 ? (
                <BigButton
                  className="w-3/12"
                  key={value}
                  label={`${value}`}
                  onClick={() => onAppend(value)}
                />
              ) : (
                <HStack
                  key={value}
                  className="items-center justify-center w-3/12 text-primary opacity-50"
                >
                  <svg fill="currentColor" width="30" height="30">
                    <g transform="matrix(1.3333333,0,0,-1.3333333,-66.666576,536.66305)">
                      <g id="g21">
                        <g id="g23" clipPath="url(#clipPath27)">
                          <g id="g595" transform="translate(66.3243,389.0586)">
                            <path d="M 0,0 C -0.059,0.346 -0.152,0.681 -0.291,0.991 -0.729,1.937 -1.338,2.73 -2.254,3.264 -3.675,4.094 -5.394,4.088 -6.801,3.235 -7.437,2.851 -7.961,2.297 -8.299,1.632 -8.413,1.406 -8.506,1.17 -8.582,0.929 c -0.371,-1.178 -0.357,-2.763 0.311,-3.838 0.218,-0.352 0.533,-0.651 0.918,-0.801 0.386,-0.148 0.843,-0.133 1.19,0.093 0.448,0.288 0.527,0.841 0.444,1.331 -0.105,0.625 -0.185,1.242 0.044,1.855 0.075,0.196 0.179,0.384 0.329,0.53 0.092,0.087 0.2,0.16 0.315,0.214 0.242,0.119 0.519,0.172 0.785,0.128 0.467,-0.076 0.847,-0.436 1.055,-0.861 0.206,-0.423 0.262,-0.903 0.285,-1.374 0.097,-2.053 -0.393,-4.18 -0.916,-6.151 -0.054,-0.204 -0.11,-0.406 -0.167,-0.608 -0.046,-0.156 -0.124,-0.354 -0.026,-0.507 0.043,-0.064 0.111,-0.11 0.183,-0.139 0.305,-0.123 0.553,0.063 0.757,0.269 1.204,1.211 1.975,2.773 2.503,4.379 0.197,0.599 0.366,1.211 0.48,1.832 C 0.063,-1.868 0.152,-0.896 0,0" />
                          </g>
                          <g id="g599" transform="translate(74.9415,398.5479)">
                            <path d="M 0,0 C 0,0.308 -0.272,0.511 -0.566,0.502 -0.863,0.49 -1.139,0.339 -1.412,0.233 c -5.295,-2.012 -11.266,-2.393 -16.846,-1.59 -0.955,0.138 -1.922,0.33 -2.882,0.48 -0.599,0.094 -1.194,0.23 -1.799,0.275 -0.516,0.04 -1.16,0.058 -1.577,-0.3 -0.55,-0.476 -0.511,-1.377 -0.199,-1.973 0.375,-0.714 1.031,-1.249 1.714,-1.657 0.663,-0.395 1.455,-0.817 2.246,-0.767 2.132,0.136 4.259,0.342 6.379,0.617 3.614,0.47 7.404,0.913 10.799,2.315 1.11,0.459 2.205,1.03 3.156,1.769 C -0.248,-0.467 0,-0.25 0,0" />
                          </g>
                          <g id="g603" transform="translate(59.7559,400.3623)">
                            <path d="m 0,0 c 0,-1.15 0.934,-2.082 2.084,-2.082 1.149,0 2.082,0.932 2.082,2.082 0,0.171 -0.039,0.343 -0.113,0.498 C 3.875,0.877 3.674,1.062 3.695,1.514 3.721,2.127 2.937,2.135 2.514,2.135 2.054,2.135 1.564,2.071 1.149,1.862 0.818,1.694 0.533,1.438 0.332,1.126 0.124,0.807 0.01,0.429 0.001,0.048 0,0.031 0,0.016 0,0" />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </HStack>
              )
            )}
            <div className="w-9/12" />
            <BackButton className="w-3/12" label="지움" onClick={onRemove} />
          </HStack>
        </VStack>
      );
    }
    case 3:
      return (
        <VStack className="mt-8">
          <HStack className="flex-wrap !gap-0">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <BigButton
                className="w-4/12"
                key={value}
                label={`${value}`}
                onClick={() => onAppend(value)}
              />
            ))}
            <BackButton className="w-4/12" label="지움" onClick={onRemove} />
            <BigButton
              className="w-4/12"
              label="0"
              onClick={() => onAppend(0)}
            />
            <BigButton className="w-4/12" label="완료" onClick={onDone} />
          </HStack>
        </VStack>
      );
    default:
      return <>잘못된 키보드 타입입니다. </>;
  }
}

export default Keypad;
