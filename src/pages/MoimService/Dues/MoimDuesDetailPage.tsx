import { useEffect, useState } from "react";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import Arrow from "../../../components/common/Arrow";
import useToggle from "../../../hooks/useToggle";
import Modal from "../../../components/common/Modals/Modal";
import {
  DepositHistory,
  DueMemDepositHisResDto,
  DueMemStatusResDto,
} from "../../../types/due/Due";
import { useFetch } from "../../../hooks/useFetch.ts";
import { TeamMembersReqDto } from "../../../types/teamMember/TeamMemberRequestDto";
import { TeamMembersResDto } from "../../../types/teamMember/TeamMemberResponseDto";
import {
  DuesGetMemDepositHisURL,
  DuesGetTotalAmtURL,
  TeamMembersPostURL,
} from "../../../utils/urlFactory.ts";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger.ts";

interface MoimDuesDetailPageProps {
  memberIdx: number;
  name: string;
  teamIdx: number;
  accIdx: number;
}

function MoimDuesDetailPage({
  memberIdx,
  name,
  teamIdx,
  accIdx,
}: MoimDuesDetailPageProps) {
  const [memIdx, setMemIdx] = useState<number>(memberIdx);
  const [memName, setMemName] = useState<string>(name);
  const currentYear = new Date().getFullYear();
  const [showMemberList, toggleShowMemberList] = useToggle();
  const [year, setYear] = useState<number>(currentYear);
  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [depositList, setDepositList] = useState<DepositHistory[]>([]);

  const years = Array.from(
    new Array(20),
    (_, index) => currentYear - 10 + index
  );

  // 모임원 전체 정보 가져오기
  const requestData: TeamMembersReqDto = { teamIdx: teamIdx };
  const TeamMembersFetcher = useFetch<TeamMembersReqDto, TeamMembersResDto[]>(
    TeamMembersPostURL(),
    "POST",
    requestData
  );

  const GetMemberTotalAmtFetcher = useFetchTrigger<null, DueMemStatusResDto>(
    DuesGetTotalAmtURL(accIdx, memIdx),
    "GET"
  );

  const GetMemDepositHisFetcher = useFetchTrigger<null, DueMemDepositHisResDto>(
    DuesGetMemDepositHisURL(accIdx, memIdx, year),
    "GET"
  );

  useEffect(() => {
    if (GetMemberTotalAmtFetcher.data?.data?.duesTotalAmount)
      setTotalAmt(GetMemberTotalAmtFetcher.data?.data.duesTotalAmount);
  }, [GetMemberTotalAmtFetcher.data]);

  useEffect(() => {
    if (GetMemDepositHisFetcher.data?.data)
      setDepositList(
        GetMemDepositHisFetcher.data?.data.sort(
          (a, b) => a.duesOfMonth - b.duesOfMonth
        )
      );
  }, [GetMemDepositHisFetcher.data]);

  useEffect(() => {
    GetMemberTotalAmtFetcher.trigger(null);
  }, [memIdx, memName]);

  useEffect(() => {
    GetMemDepositHisFetcher.trigger(null);
  }, [year, memIdx, memName]);

  return (
    <>
      <VStack className="min-h-full h-full bg-white pb-8">
        <NavigationBar title={"회비내역"} />
        <VStack className="p-4 h-full overflow-y-scroll">
          {/* 멤버 선택 */}
          <button onClick={toggleShowMemberList}>
            <HStack className="items-center font-bold mb-4">
              <span className="text-xl">{memName}</span>
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
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </select>
          </HStack>
          {/* 개월 리스트 */}
          <VStack className="max-h-full w-full border-y border-gray-200 my-4 overflow-y-scroll">
            {depositList.length != 0 ? (
              depositList.map((deposit) => {
                return (
                  <HStack
                    className="py-4 items-center gap-4"
                    key={deposit.duesOfMonth}
                  >
                    <span> {deposit.duesOfMonth}월 </span>
                    <Spacer />
                    <span className="font-bold">
                      {deposit.duesAmount.toLocaleString()}원
                    </span>
                  </HStack>
                );
              })
            ) : (
              <NoResultView />
            )}
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
          <VStack className="max-h-72 overflow-y-scroll overflow-x-hidden gap-2 py-4">
            {TeamMembersFetcher.data ? (
              TeamMembersFetcher.data.map((teamMember) => {
                return (
                  <HStack
                    className="justify-between"
                    key={teamMember.teamMemberIdx}
                    onClick={() => {
                      setMemIdx(teamMember.memberIdx);
                      setMemName(teamMember.memberName);
                      toggleShowMemberList();
                    }}
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
