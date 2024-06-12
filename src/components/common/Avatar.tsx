import cn from "../../utils/cn";
import { HStack, VStack } from "./Stack";
const skinColors = {
  white: "bg-orange-100",
  yellow: "bg-orange-200",
  black: "bg-yellow-700",
  green: "bg-green-500",
};

type skinType = "white" | "yellow" | "black" | "green";
type emotionType = "default" | "smile" | "upset";
interface AvatarProps {
  backgroundColor?: string;
  skinColor?: skinType;
  eye?: emotionType;
  mouth?: emotionType;
  crown?: boolean;
  random?: boolean;
  seed?: number;
}

function Avatar({
  backgroundColor = "bg-red-400",
  skinColor = "yellow",
  eye = "default",
  mouth = "default",
  crown = false,
  random = false,
  seed,
}: AvatarProps) {
  if (random) {
    skinColor = ["white", "yellow", "black", "green"][
      Math.floor(seed ?? Math.random() * 4) % 4
    ] as skinType;
    mouth = ["default", "smile", "upset"][
      Math.floor(seed ?? Math.random() * 3) % 3
    ] as emotionType;
    eye = ["default", "smile", "upset"][
      Math.floor(seed ? seed * seed : Math.random() * 3) % 3
    ] as emotionType;
  }
  return (
    <div className="w-8 h-8">
      <VStack
        className={cn(
          "relative scale-50 justify-center items-center w-16 h-16 rounded-full -translate-y-4 -translate-x-4",
          backgroundColor
        )}
      >
        {/* 피부 */}
        <VStack
          className={cn(
            "!gap-0 items-center justify-center w-8 h-8 rounded-xl",
            skinColors[skinColor]
          )}
        >
          {/* 눈 */}
          <HStack className="!gap-0">
            <Eye type={eye} />
            <Eye type={eye} />
          </HStack>
          {/* 입 */}
          <Mouth type={mouth} />
        </VStack>
        {/* 왕관 */}
        {crown && (
          <div className="absolute top-1 right-1 rounded-full p-1 bg-yellow-400">
            <Crown />
          </div>
        )}
      </VStack>
    </div>
  );
}

export default Avatar;

function Eye({ type = "default" }: { type?: "default" | "smile" | "upset" }) {
  return (
    <svg
      width="6px"
      height="6px"
      viewBox="6 6 68 68"
      id="emoji"
      xmlns="http://www.w3.org/2000/svg"
      fill={type == "smile" ? "none" : "black"}
      stroke={type == "smile" ? "black" : ""}
      strokeWidth={type == "smile" ? 25 : 0}
    >
      <g id="line">
        {
          {
            default: (
              <path d="M56,36 C56,52.016 47.046,65 36,65 C24.954,65 16,52.016 16,36 C16,19.984 24.954,7 36,7 C47.046,7 56,19.984 56,36 z" />
            ),
            smile: (
              <path
                d="M16,36 C16,19.984 24.954,7 36,7 C47.046,7 56,19.984 56,36"
                transform="translate(0,20)"
                strokeLinecap="round"
              />
            ),
            upset: (
              <svg
                width="100"
                height="100"
                viewBox="6 6 68 68"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="22"
                  y1="30"
                  x2="38"
                  y2="30"
                  stroke="black"
                  strokeLinecap="round"
                  strokeWidth="20"
                />
              </svg>
            ),
          }[type]
        }
      </g>
    </svg>
  );
}

function Mouth({ type = "default" }: { type?: "default" | "smile" | "upset" }) {
  if (type == "smile")
    return (
      <svg
        width="6.5"
        height="5"
        viewBox="0 0 100 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0,0 A 50,50 0 0,0 100,0" fill="black" stroke="black" />
      </svg>
    );

  return (
    <svg viewBox="0 12 24 4" fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.9348 13.1725C15.3654 13.3446 15.5817 13.8402 15.3237 14.2255C15.0294 14.665 14.6493 15.0442 14.2032 15.3386C13.522 15.7881 12.7196 16.0185 11.9037 15.9988C11.0878 15.9792 10.2975 15.7104 9.6387 15.2287C9.20726 14.9131 8.8458 14.5161 8.573 14.0629C8.33384 13.6656 8.57376 13.181 9.01216 13.0299C9.45056 12.8788 9.91919 13.1274 10.2157 13.4839C10.3367 13.6294 10.4756 13.7603 10.63 13.8732C11.0122 14.1527 11.4708 14.3087 11.9441 14.3201C12.4175 14.3315 12.883 14.1978 13.2782 13.937C13.4379 13.8316 13.583 13.7076 13.7108 13.5681C14.0241 13.2262 14.5042 13.0005 14.9348 13.1725Z"
        transform={type == "upset" ? "rotate(180 12 14)" : ""}
      ></path>
    </svg>
  );
}

function Crown() {
  return (
    <svg
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="white"
    >
      <path d="M469.109,134.406c-23.688,0-42.891,19.203-42.891,42.891c0,11.281,4.453,21.453,11.563,29.109l-76.875,75.969 l-93.813-144.766c18.281-4.922,31.797-21.438,31.797-41.266c0-23.672-19.203-42.875-42.891-42.875s-42.891,19.203-42.891,42.875 c0,19.828,13.516,36.344,31.797,41.266l-93.813,144.766l-76.875-75.969c7.109-7.656,11.563-17.828,11.563-29.109 c0-23.688-19.203-42.891-42.891-42.891S0,153.609,0,177.297s19.203,42.891,42.891,42.891v238.344H256h213.109V220.188 c23.688,0,42.891-19.203,42.891-42.891S492.797,134.406,469.109,134.406z"></path>
    </svg>
  );
}
