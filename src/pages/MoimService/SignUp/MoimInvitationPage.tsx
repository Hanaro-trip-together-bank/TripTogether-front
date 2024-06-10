/* eslint-disable react-hooks/exhaustive-deps */
import Arrow from "../../../components/common/Arrow";
import Button from "../../../components/common/Button";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useModal } from "../../../hooks/useModal";
import { useFetch } from "../../../hooks/useFetch";
import { InvitedTeamGetURL, JoinTeamPostURL } from "../../../utils/urlFactory";
import { InviteTeamResDto } from "../../../types/team/TeamResponseDto";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import { JoinTeamReqDto } from "../../../types/team/TeamRequestDto";
import { useAuth } from "../../../contexts/useAuth";
import { useNavigation } from "../../../contexts/useNavigation";
import LoginPage from "../../Main/LoginPage";
import Loading from "../../../components/common/Modals/Loading";
import { useEffect } from "react";

//[하나은행] 이채원님이 등산 동호회에 초대했어요. http://localhost:5173/invite?inviter=이채원&teamNo=2

interface MoimInvitationPageProps {
  inviter: string;
  teamIdx: number;
}
function MoimInvitationPage({ inviter, teamIdx }: MoimInvitationPageProps) {
  const { member } = useAuth();
  const { navigateTo } = useNavigation();
  const rejectInvitation = () => {
    window.location.href = "http://localhost:5173";
  };
  const moimData = useFetch<null, InviteTeamResDto>(
    InvitedTeamGetURL(inviter, teamIdx),
    "GET"
  );
  const moimJoinData = useFetchTrigger<JoinTeamReqDto, null>(
    JoinTeamPostURL(),
    "POST"
  );
  const { modal: joinModal, triggerModal: triggerJoinModal } = useModal(
    `${moimData.data?.teamName ?? ""} 모임에 참여할까요?`,
    () => {
      const joinTeamReqDto: JoinTeamReqDto = {
        memberIdx: member.memberIdx,
        teamIdx: teamIdx,
      };
      moimJoinData.trigger(joinTeamReqDto);
      triggerJoinModal();
      triggerJoinedModal();
    }
  );
  const tryJoin = () => {
    if (member.memberName != null) triggerJoinModal();
    else
      navigateTo({
        backgroundColor: "bg-secondary",
        page: <LoginPage />,
      });
  };
  const { modal: joinedModal, triggerModal: triggerJoinedModal } = useModal(
    "모임에 참여 신청을 보냈습니다. 모임 총무가 수락하면 모임서비스를 이용할 수 있습니다.",
    rejectInvitation,
    false
  );
  useEffect(() => {
    if (member.memberName) triggerJoinModal();
  }, [member]);
  return (
    <>
      <VStack className="w-full h-full items-center">
        <NavigationBar
          title={"모임서비스 초대"}
          onBack={rejectInvitation}
          onHome={rejectInvitation}
        />
        <VStack className="w-full h-full items-center p-6 pt-12">
          <Spacer />
          <span className="w-full text-2xl text-gray-500 text-center">
            <span className="text-black font-bold">
              {moimData.data?.teamName ?? ""}
            </span>
            <br />
            모임에 초대받았어요
          </span>
          <VStack className="w-full border-y border-gray-100 my-4 py-4 gap-4">
            <HStack className="justify-between">
              <span>초대자</span>
              <span className="font-bold">{moimData.data?.inviter ?? ""}</span>
            </HStack>
            <HStack className="justify-between">
              <span>모임이름</span>
              <span className="font-bold">{moimData.data?.teamName ?? ""}</span>
            </HStack>
          </VStack>
          <Button className="w-full !bg-gray-50 !text-black py-4 !rounded-2xl font-bold">
            <HStack className="w-full items-center justify-between">
              <span>모임통장 서비스가 궁금하다면?</span>
              <Arrow direction="right" />
            </HStack>
          </Button>
          <Spacer />
          <Spacer />
          <Button className="w-full" onClick={tryJoin}>
            참여하기
          </Button>
        </VStack>
      </VStack>
      <Loading show={moimData.isLoading} label="모임 정보를 불러오는 중 ..." />
      {joinModal}
      {joinedModal}
    </>
  );
}
export default MoimInvitationPage;
