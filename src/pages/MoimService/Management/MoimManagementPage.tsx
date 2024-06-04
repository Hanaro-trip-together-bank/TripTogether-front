/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Arrow from "../../../components/common/Arrow";
import Loading from "../../../components/common/Modals/Loading";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import Toggle from "../../../components/common/Toggle";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useAuth } from "../../../contexts/useAuth";
import { useFetch } from "../../../hooks/useFetch";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import {
  ManageTeamReqDto,
  ToggleAlarmReqDto,
} from "../../../types/team/TeamRequestDto";
import { ManageTeamResDto } from "../../../types/team/TeamResponseDto";
import formatAccNo from "../../../utils/formatAccNo";
import {
  ManageTeamPostURL,
  ToggleAlarmPutURL,
} from "../../../utils/urlFactory";

interface MoimManagementPageProps {
  teamIdx: number;
}

function MoimManagementPage({ teamIdx }: MoimManagementPageProps) {
  const { member } = useAuth();
  const manageTeamReqDto: ManageTeamReqDto = {
    teamIdx: teamIdx,
    memberIdx: member.memberIdx,
  };
  const toggleAlarmReqDto: ToggleAlarmReqDto = {
    memberIdx: member.memberIdx,
  };
  const { data, isLoading, error, refetch } = useFetch<
    ManageTeamReqDto,
    ManageTeamResDto
  >(ManageTeamPostURL(), "POST", manageTeamReqDto);

  const toggleAlarmStatusData = useFetchTrigger<ToggleAlarmReqDto, null>(
    ToggleAlarmPutURL(),
    "PUT"
  );
  useEffect(() => {
    if (isLoading == false) refetch();
  }, [toggleAlarmStatusData.isLoading]);
  return (
    <>
      <VStack className="min-h-full bg-gray-50 pb-8">
        <NavigationBar title={"모임 설정"} />
        <VStack className="w-full px-6">
          {/* 모임 요약 카드 */}
          <VStack className="rounded-2xl w-full bg-white shadowed px-6 py-4 mb-4 !gap-0">
            <HStack className="w-full justify-between mb-4 pb-4 border-b border-gray-200">
              <VStack className="items-start">
                <span className="font-bold">{data?.teamName}</span>
                <span className="text-gray-500">
                  {data ? formatAccNo(data.accNumber) : ""}
                </span>
              </VStack>
              <div className="w-10 h-10 bg-blue-100 rounded-xl">
                <img src={`/images/moim/plane.png`} alt="plane" />
              </div>
            </HStack>
            <HStack className="justify-end items-end !gap-0">
              <span className="font-sm text-gray-500">잔액</span>
              <Spacer />
              <span className="font-bold text-lg">
                {data?.accBalance.toLocaleString()}
              </span>
              <span>원</span>
            </HStack>
          </VStack>
          {/* 메뉴 */}

          <HStack className="py-4 border-b border-gray-200 w-full justify-between">
            <span> 알림설정 </span>
            <Toggle
              selected={data?.alarmStatus}
              onClick={() => toggleAlarmStatusData.trigger(toggleAlarmReqDto)}
            />
          </HStack>

          <HStack className="py-4 border-b border-gray-200 w-full justify-between">
            <span> 약관/동의서/유의사항 </span>
            <Arrow direction="right" />
          </HStack>

          <HStack className="py-4 border-b border-gray-200 w-full justify-between">
            <span> 자동이체 </span>
            <Arrow direction="right" />
          </HStack>
        </VStack>
        <Spacer />
      </VStack>
      <Loading show={isLoading} label="모임 정보를 불러오는 중..." />
    </>
  );
}

export default MoimManagementPage;
