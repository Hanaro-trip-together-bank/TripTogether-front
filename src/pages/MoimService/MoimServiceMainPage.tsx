import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modals/Modal";
import { HStack, Spacer, VStack } from "../../components/common/Stack";
import NavigationBar from "../../components/common/TopBars/NavigationBar";
import NavigationLink from "../../components/common/Navigation/NavigationLink";
import MoimServiceSignUpPage from "./SignUp/MoimServiceSignUpPage";
import MoimDetailPage from "./MoimDetailPage";
import { useFetch } from "../../hooks/useFetch";
import { MyMoimGetURL } from "../../utils/urlFactory";
import { TeamServiceListResDto } from "../../types/account/AccountResponseDto";
import { MyTeamListReqDto } from "../../types/team/TeamRequestDto";
import Loading from "../../components/common/Modals/Loading";

interface MoimServiceMainPageProps {
  memberIdx: number;
}

// eslint-disable-next-line no-empty-pattern
function MoimServiceMainPage({ memberIdx }: MoimServiceMainPageProps) {
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const info: MyTeamListReqDto = { memberIdx: memberIdx };

  const { data, isLoading } = useFetch<
    MyTeamListReqDto,
    TeamServiceListResDto[]
  >(MyMoimGetURL(), "POST", info);

  useEffect(() => {
    if (data && data.length === 0) {
      setTimeout(() => {
        setShowNewAccountModal(true);
      }, 500);
    }
  }, [data]);

  function formatString(input: string): string {
    if (input.length !== 14) {
      throw new Error("Input string must be exactly 14 characters long");
    }

    const part1 = input.slice(0, 3);
    const part2 = input.slice(3, 9);
    const part3 = input.slice(9, 14);

    return `${part1}-${part2}-${part3}`;
  }

  return (
    <>
      <VStack className="h-full">
        <NavigationBar title={"모임서비스"} />
        {/* 상단 어두운부분 */}
        <HStack className="p-4 bg-gray-100 items-center">
          <span>내 모임통장</span>
          <span className="rounded-full bg-gray-400 w-fit h-fit py-0.5 px-2 text-white text-sm leading-none">
            {data?.length}
          </span>
        </HStack>
        <VStack className="overflow-y-scroll p-6">
          {!isLoading &&
            data &&
            data.map((moim) => (
              <NavigationLink
                key={moim.teamIdx}
                to={{ backgroundColor: "bg-white", page: <MoimDetailPage /> }}
              >
                <VStack className="rounded-2xl h-32 w-full bg-white shadowed px-6 py-4 mb-4">
                  <HStack className="w-full justify-between mb-4 gap-4">
                    <VStack className="items-start">
                      <span className="font-bold">{moim.teamName}</span>
                      <span className="text-gray-500">
                        {formatString(moim.accNumber)}
                      </span>
                    </VStack>
                    <Spacer />
                    {moim.teamMemberState === "총무" && (
                      <span className="rounded-full  w-fit h-fit py-0.5 px-2 text-red-400 text-sm leading-none border border-red-400">
                        총무
                      </span>
                    )}
                    <VStack className="text-xs gap-0 text-gray-500 scale-50">
                      <span>●</span>
                      <span>●</span>
                      <span>●</span>
                    </VStack>
                  </HStack>
                  <HStack className="justify-end items-end">
                    <span className="font-bold text-lg">
                      {moim.accBalance.toLocaleString()}
                    </span>
                    <span>원</span>
                  </HStack>
                </VStack>
              </NavigationLink>
            ))}
          <Button
            className="w-full !bg-gray-100 !text-black"
            onClick={() => setShowNewAccountModal(true)}
          >
            <span className="text-gray-500">+</span> 모임 추가하기
          </Button>
        </VStack>
      </VStack>
      <Modal
        show={showNewAccountModal}
        onClose={() => setShowNewAccountModal(false)}
        backDrop
      >
        <VStack>
          {
            //TODO: 통장 개수 없을 때만 보여줄 문장
            data && data?.length == 0 && (
              <span className="text-bold text-gray-500 text-center">
                참여중인 모임이 없어요.
              </span>
            )
          }
          <span className="text-bold text-gray-500 pb-4">
            모임통장 서비스를 이용하시겠어요?
          </span>
          <HStack>
            <Button gray onClick={() => setShowNewAccountModal(false)}>
              취소
            </Button>
            <NavigationLink
              className="flex-grow"
              to={{
                page: <MoimServiceSignUpPage onDone={() => {}} />,
              }}
            >
              <Button
                className="w-full"
                onClick={() => setShowNewAccountModal(false)}
              >
                확인
              </Button>
            </NavigationLink>
          </HStack>
        </VStack>
      </Modal>
      <Loading show={isLoading} label="모임 목록을 불러오는 중 ..." />
    </>
  );
}
export default MoimServiceMainPage;
