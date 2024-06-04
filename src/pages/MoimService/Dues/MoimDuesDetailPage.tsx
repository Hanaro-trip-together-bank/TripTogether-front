import { useEffect, useState } from "react";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import Arrow from "../../../components/common/Arrow";
import useToggle from "../../../hooks/useToggle";
import Modal from "../../../components/common/Modals/Modal";
import { DepositHistory } from "../../../types/due/Due";
import { useFetch } from "../../../hooks/useFetch.ts";
import { TeamMembersReqDto } from "../../../types/teamMember/TeamMemberRequestDto";
import { TeamMembersResDto } from "../../../types/teamMember/TeamMemberResponseDto";
import { TeamMembersPostURL } from "../../../utils/urlFactory.ts";

interface MoimDuesDetailPageProps {
  name: string;
  teamIdx: number;
}

function MoimDuesDetailPage({ name, teamIdx }: MoimDuesDetailPageProps) {
  const [member, setMember] = useState<string>(name);
  const [showMemberList, toggleShowMemberList] = useToggle();
  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [depositList, setDepositList] = useState<DepositHistory[]>([]);

  // 모임원 전체 정보 가져오기
  const requestData: TeamMembersReqDto = { teamIdx: teamIdx };
  const TeamMembersFetcher = useFetch<TeamMembersReqDto, TeamMembersResDto[]>(
    TeamMembersPostURL(),
    "POST",
    requestData
  );
  console.log(TeamMembersFetcher.error);

  return (
    <>
      <VStack className="min-h-full h-full bg-white pb-8">
        <NavigationBar title={"회비내역"} />
        <VStack className="p-4 h-full overflow-y-scroll">
          {/* 멤버 선택 */}
          <button onClick={toggleShowMemberList}>
            <HStack className="items-center font-bold mb-4">
              <span className="text-xl">{name}</span>
              <Arrow direction="down" />
            </HStack>
          </button>
          {/* 총 입금액 */}
          <VStack className="w-full p-4 rounded-xl bg-gray-100 mb-4">
            <span> 총 입금액 </span>
            <span>
              <span className="font-bold text-xl">
                {totalAmt.toLocaleString()}
              </span>
              원
            </span>
          </VStack>
          {/* 년도 */}
          <HStack className="w-full items-center justify-end text-sm">
            <span>2024년</span>
            <Arrow direction="down" />
          </HStack>
          {/* 개월 리스트 */}
          <VStack className="max-h-full w-full border-y border-gray-200 my-4 overflow-y-scroll">
            {depositList.map((deposit) => {
              return (
                <HStack className="py-4 items-center gap-4" key={deposit.month}>
                  <span> {deposit.month}월 </span>
                  <Spacer />
                  <span className="font-bold">
                    {deposit.amount.toLocaleString()}원
                  </span>
                </HStack>
              );
            })}
          </VStack>
          <Spacer />
        </VStack>
      </VStack>
      <Modal
        xButton
        backDrop
        modalType="sheet"
        show={showMemberList}
        onClose={toggleShowMemberList}
      >
        <VStack className="w-full">
          <span className="w-full pb-4 text-center border-b border-gray-200">
            모임원 선택
          </span>
          <VStack className="max-h-72 overflow-scroll gap-4 py-4">
            {TeamMembersFetcher.data ? (
              TeamMembersFetcher.data.map((teamMember) => {
                return (
                  <HStack
                    className="w-full justify-between"
                    key={teamMember.teamMemberIdx}
                  >
                    <span>{teamMember.memberName}</span>
                    <Arrow direction="right" />
                  </HStack>
                );
              })
            ) : (
              <NoResultView />
            )}
          </VStack>
        </VStack>
      </Modal>
    </>
  );
}

export default MoimDuesDetailPage;

// 조회결과 없을 때 표시
function NoResultView() {
  return (
    <VStack className="items-center h-full justify-center">
      <div className="border-2 w-10 h-10 text-center border-gray-500 rounded-full font-serif text-3xl font-bold text-gray-500">
        !
      </div>
      <span className="text-lg">조회 결과가 없어요.</span>
    </VStack>
  );
}
