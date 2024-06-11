import { useEffect, useState } from "react";
import Select2 from "../../../components/common/Select2";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import Arrow from "../../../components/common/Arrow";
import Button from "../../../components/common/Button";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import MoimDepositPage from "./MoimDepositPage";
import MoimDuesSetPage from "./MoimDuesSetPage";
import useToggle from "../../../hooks/useToggle";
import Modal from "../../../components/common/Modals/Modal";
import Check from "../../../components/common/Check";
import MoimDuesRequestPage from "./MoimDuesRequestPage";
import { useFetch } from "../../../hooks/useFetch.ts";
import {
  DueMember,
  DueMemStatusResDto,
  DueRuleReqDto,
  DueRuleResDto,
} from "../../../types/due/Due";
import {
  DuesGetRuleURL,
  DuesGetStatusUrl,
  TeamMembersPostURL,
} from "../../../utils/urlFactory.ts";
import Loading from "../../../components/common/Modals/Loading.tsx";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger.ts";
import MoimDuesDetailPage from "./MoimDuesDetailPage";
import Select from "../../../components/common/Select.tsx";
import { TeamMembersReqDto } from "../../../types/teamMember/TeamMemberRequestDto";
import { TeamMembersResDto } from "../../../types/teamMember/TeamMemberResponseDto";

interface MoimDuesMainPageProps {
  teamIdx: number;
  accIdx: number;
  teamName: string;
  teamMemberIdx: number;
  teamMemberStatus: string;
  memberIdx: number;
}

function MoimDuesMainPage({
  accIdx,
  teamIdx,
  teamName,
  teamMemberIdx,
  teamMemberStatus,
  memberIdx,
}: MoimDuesMainPageProps) {
  const [depositOrExpenses, setDepositOrExpenses] = useState<number>(0);
  const [paidOrNot, setPaidOrNot] = useState<number>(0);
  const [showDuesRequest, toggleShowDuesRequest] = useToggle();
  const [dueMembers, setDueMembers] = useState<DueMember[]>([]);
  const [falseMembers, setFalseMembers] = useState<DueMember[]>([]);
  const [canRequest, setCanRequest] = useState<boolean>(false);
  const [selectedMembers, setSelectedMembers] = useState<TeamMembersResDto[]>(
    []
  );
  const requestData: TeamMembersReqDto = { teamIdx: teamIdx };

  const { data, trigger } = useFetchTrigger<
    TeamMembersReqDto,
    TeamMembersResDto[]
  >(TeamMembersPostURL(), "POST");

  const onCheck = (memberIdx: number) => {
    setSelectedMembers((prevMembers) => {
      const isContains = prevMembers.some(
        (member) => member.memberIdx === memberIdx
      );

      let updatedMembers;
      if (isContains) {
        updatedMembers = prevMembers.filter(
          (member) => member.memberIdx !== memberIdx
        );
      } else {
        const memberToAdd = data!.find(
          (member) => member.memberIdx === memberIdx
        );
        updatedMembers = memberToAdd
          ? [...prevMembers, memberToAdd]
          : prevMembers;
      }
      setCanRequest(updatedMembers.length === 0);
      return updatedMembers;
    });
  };

  useEffect(() => {
    if (showDuesRequest) {
      setSelectedMembers([]);
      setCanRequest(true);
    }
  }, [showDuesRequest]);

  const [total, setTotal] = useState<number>(0);

  // 현재 날짜를 기준으로 초기값 설정
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // 상태 설정
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const years = Array.from(
    new Array(20),
    (_, index) => currentYear - 10 + index
  );
  const months = Array.from(new Array(12), (_, index) => index + 1);

  const getFalseMembers = useFetchTrigger<null, DueMemStatusResDto>(
    DuesGetStatusUrl(year, month, false, accIdx, teamIdx),
    "GET"
  );
  const handleRequest = () => {
    trigger(requestData);
    toggleShowDuesRequest();
    setCanRequest(false);
    setSelectedMembers([]);
    getFalseMembers.trigger(null);
  };

  useEffect(() => {
    if (getFalseMembers.data?.data?.memberResponseDtos)
      setFalseMembers(getFalseMembers.data.data.memberResponseDtos);
  }, [getFalseMembers.data]);
  // 회비 규칙 조회
  const duesGetRuleFetcher = useFetch<DueRuleReqDto, DueRuleResDto>(
    DuesGetRuleURL(teamIdx),
    "GET"
  );

  const duesGetTrueStatusFetcher = useFetchTrigger<null, DueMemStatusResDto>(
    DuesGetStatusUrl(year, month, true, accIdx, teamIdx),
    "GET"
  );

  const duesGetFalseStatusFetcher = useFetchTrigger<null, DueMemStatusResDto>(
    DuesGetStatusUrl(year, month, false, accIdx, teamIdx),
    "GET"
  );

  console.log(teamMemberIdx);
  useEffect(() => {
    if (paidOrNot == 0) duesGetTrueStatusFetcher.trigger(null);
    else duesGetFalseStatusFetcher.trigger(null);
  }, [paidOrNot, year, month]);

  useEffect(() => {
    setTotal(0);
    if (duesGetTrueStatusFetcher.data?.data?.duesTotalAmount)
      setTotal(duesGetTrueStatusFetcher.data.data.duesTotalAmount);
  }, [duesGetTrueStatusFetcher.data]);

  useEffect(() => {
    setTotal(0);
    if (duesGetFalseStatusFetcher.data?.data?.duesTotalAmount)
      setTotal(duesGetFalseStatusFetcher.data.data.duesTotalAmount);
  }, [duesGetFalseStatusFetcher.data]);

  useEffect(() => {
    if (duesGetTrueStatusFetcher.data?.data.memberResponseDtos)
      setDueMembers(duesGetTrueStatusFetcher.data?.data.memberResponseDtos);
  }, [duesGetTrueStatusFetcher.data]);

  useEffect(() => {
    if (duesGetFalseStatusFetcher.data?.data.memberResponseDtos)
      setDueMembers(duesGetFalseStatusFetcher.data?.data.memberResponseDtos);
  }, [duesGetFalseStatusFetcher.data]);

  return (
    <>
      <VStack className="min-h-full h-full bg-white pb-8">
        <NavigationBar title={"회비내역"} />
        <Select2
          options={["입금", "지출"]}
          onSelect={(value) => {
            setDepositOrExpenses(value);
            setPaidOrNot(0);
          }}
        />
        {depositOrExpenses == 0 ? (
          // 입금 탭
          <>
            <VStack className="p-4">
              <HStack className="items-center text-sm">
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
                <select
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value, 10))}
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}월
                    </option>
                  ))}
                </select>
              </HStack>
              <HStack className="items-end !gap-0 font-bold">
                <span className="text-xl">{total.toLocaleString()}</span>
                <span>원</span>
              </HStack>
            </VStack>
            <VStack className="p-4 h-full">
              <NavigationLink
                className="mb-4"
                to={{
                  page: (
                    <MoimDuesSetPage
                      teamIdx={teamIdx}
                      accIdx={accIdx}
                      onDone={duesGetRuleFetcher.refetch}
                    />
                  ),
                }}
              >
                <HStack className="bg-gray-100 rounded-xl p-4 items-center justify-between">
                  <span className="text-gray-500">
                    {duesGetRuleFetcher.data?.data != null ? (
                      <>
                        매월 {duesGetRuleFetcher.data.data.duesDate}일
                        <span className="font-bold">
                          {" "}
                          {duesGetRuleFetcher.data.data.duesAmount.toLocaleString()}
                        </span>
                        원씩 모아요!
                      </>
                    ) : (
                      "등록된 회비가 없어요"
                    )}
                  </span>
                  <Arrow direction="right" />
                </HStack>
              </NavigationLink>
              <HStack className="flex flex-col h-full">
                <VStack className="items-center flex-grow relative">
                  <Select
                    className={"w-full"}
                    options={["회비 낸 사람", "안 낸 사람"]}
                    onSelect={setPaidOrNot}
                  />
                  {dueMembers.length !== 0 ? (
                    <VStack className="flex flex-col items-center w-full h-full overflow-y-auto">
                      {dueMembers.map((member) => (
                        <NavigationLink
                          className="w-full"
                          key={member.memberIdx}
                          to={{
                            page: (
                              <MoimDuesDetailPage
                                name={member.memberName}
                                memberIdx={member.memberIdx}
                                teamIdx={teamIdx}
                                accIdx={accIdx}
                              />
                            ),
                          }}
                        >
                          <MemberRow
                            name={member.memberName}
                            amount={member.memberAmount}
                          />
                        </NavigationLink>
                      ))}
                      <HStack className="absolute bottom-0 left-0 right-0 text-sm text-gray-500 items-start">
                        <span>※</span>
                        <span>
                          회비내역의 입금인은 총무가 편집할 수 있으므로, 실제
                          계좌 거래내역의 입금인과 다를 수 있습니다.
                        </span>
                      </HStack>
                    </VStack>
                  ) : (
                    <NoResultView />
                  )}
                </VStack>
                {teamMemberStatus === "총무" ? (
                  /* 총무라면 회비요청버튼 */
                  <Button className="!w-full" onClick={handleRequest}>
                    회비 요청하기
                  </Button>
                ) : (
                  /* 총무 아니라면 입금버튼 */
                  <NavigationLink
                    to={{
                      backgroundColor: "bg-gray-50",
                      page: (
                        <MoimDepositPage teamIdx={teamIdx} onDone={() => {}} />
                      ),
                    }}
                  >
                    <Button className="!w-full">회비 입금하기</Button>
                  </NavigationLink>
                )}
              </HStack>
            </VStack>
          </>
        ) : (
          <VStack className="p-4 h-full overflow-y-auto">
            <HStack className="items-center text-sm">
              <span>2024년 05월</span>
              <Arrow direction="down" />
            </HStack>
            <HStack className="items-end !gap-0 font-bold pb-4 border-b border-gray-200">
              <span className="text-xl">99,999</span>
              <span>원</span>
            </HStack>
            {/* 지출내역 1 */}
            <HStack className="py-4 border-b border-gray-200 justify-between">
              <VStack className="items-start !gap-0">
                <span className="text-sm text-gray-500">
                  05.23(목) 20:20:45
                </span>
                <span> 문혜영 </span>
              </VStack>
              <VStack className="items-end !gap-0">
                <span className="text-sm text-gray-500">타행송금</span>
                <span className="text-lg text-red-400"> - 10,100원</span>
                <span className="text-sm"> 잔액 0원</span>
              </VStack>
            </HStack>
            {/* 지출내역 2 */}
            <HStack className="py-4 border-b border-gray-200 justify-between">
              <VStack className="items-start !gap-0">
                <span className="text-sm text-gray-500">
                  05.17(금) 14:25:50
                </span>
                <span> 이신광 </span>
              </VStack>
              <VStack className="items-end !gap-0">
                <span className="text-sm text-gray-500">타행송금</span>
                <span className="text-lg text-red-400"> - 10,000원</span>
                <span className="text-sm"> 잔액 10,100원</span>
              </VStack>
            </HStack>
            <Spacer />
          </VStack>
        )}
      </VStack>
      <Modal
        xButton
        backDrop
        modalType="sheet"
        show={showDuesRequest}
        onClose={toggleShowDuesRequest}
      >
        <VStack className="w-full">
          <span className="w-full pb-4 text-center border-b border-gray-200">
            모임원 선택
          </span>
          <VStack className="max-h-72 overflow-auto">
            {data?.map((member) => {
              if (member.memberIdx != memberIdx) {
                return (
                  <HStack key={member.memberIdx} className="gap-2 my-2">
                    <Check onClick={() => onCheck(member.memberIdx)} />
                    <span>{member.memberName}</span>
                  </HStack>
                );
              }
              return null;
            })}
          </VStack>
          <NavigationLink
            to={{
              page: (
                <MoimDuesRequestPage
                  teamIdx={teamIdx}
                  teamName={teamName}
                  requestees={selectedMembers?.map((member) => ({
                    memberIdx: member.memberIdx,
                    memberName: member.memberName,
                  }))}
                />
              ),
            }}
          >
            <Button
              className="w-full"
              disabled={canRequest}
              onClick={toggleShowDuesRequest}
            >
              확인
            </Button>
          </NavigationLink>
        </VStack>
        <Loading
          show={duesGetRuleFetcher.isLoading}
          label="입금 내역 조회 중입니다."
        />
      </Modal>
    </>
  );
}

export default MoimDuesMainPage;

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

// 회비 낸 사람, 안 낸 사람 한 줄
// TODO: 멤버 구조체로 바꾸면서 이름말고 id로 넘길 듯ㄴ
function MemberRow({ name, amount }: { name: string; amount: number }) {
  return (
    <HStack
      key={name}
      className="w-full border-b border-gray-100 py-4 items-center"
    >
      <span>{name}</span>
      <Spacer />
      <span className="font-bold">{amount.toLocaleString()}원</span>
      <Arrow direction="right" />
    </HStack>
  );
}
