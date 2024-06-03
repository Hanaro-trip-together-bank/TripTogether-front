import { useEffect, useState } from "react";
import Arrow from "../../../components/common/Arrow";
import Avatar from "../../../components/common/Avatar";
import Button from "../../../components/common/Button";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../../contexts/useNavigation";
import { useFetch } from "../../../hooks/useFetch";
import {
  AcceptTeamMemberReqDto,
  AcceptTeamMembersReqDto,
  RejectTeamMembersReqDto,
  TeamMembersReqDto,
} from "../../../types/teamMember/TeamMemberRequestDto";
import { TeamMembersResDto } from "../../../types/teamMember/TeamMemberResponseDto";
import {
  AcceptTeamMemberPutURL,
  AcceptTeamMembersPutURL,
  ExportTeamMemberPutURL,
  ExportTeamMembersPutURL,
  ExportTeamPutURL,
  GenerateInviteLinkPostURL,
  RejectTeamMemberPutURL,
  TeamMembersPostURL,
} from "../../../utils/urlFactory";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import Loading from "../../../components/common/Modals/Loading";
import { useAuth } from "../../../contexts/useAuth";
import { useModal } from "../../../hooks/useModal";
import {
  ExportTeamReqDto,
  InviteTeamReqDto,
} from "../../../types/team/TeamRequestDto";
import Modal from "../../../components/common/Modals/Modal";

interface MoimMembersMainPageProps {}

function MoimMembersMainPage({}: MoimMembersMainPageProps) {
  const { home } = useNavigation();
  const { member, login } = useAuth();

  // Todo: teamIdx 가져오기
  const requestData: TeamMembersReqDto = { teamIdx: 1 };
  const [currentTeamMemberIdx, setCurrentTeamMemberIdx] = useState<number>();

  // 모임원 전체 정보 가져오기
  const { data: teamMemersData, isLoading: isTeamMembersLoading } = useFetch<
    TeamMembersReqDto,
    TeamMembersResDto[]
  >(TeamMembersPostURL(), "POST", requestData);

  // 초대하기
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const openInvitationModal = () => {
    setShowInvitationModal(true);
  };
  const closeInvitationModal = () => {
    setShowInvitationModal(false);
  };

  const { data: link, trigger: inviteLinkTrigger } = useFetchTrigger<
    InviteTeamReqDto,
    string
  >(GenerateInviteLinkPostURL(), "POST");

  const generateInviteLink = () => {
    const inviteTeamDto: InviteTeamReqDto = {
      // Todo: teamIdx 가져오기
      memberIdx: member.memberIdx,
      teamIdx: 1,
    };
    inviteLinkTrigger(inviteTeamDto);
    alert("초대 링크가 복사되었습니다."); // Todo: 복사 기능 추가하기
  };

  useEffect(() => {
    if (link) {
      console.log(link);
    }
  }, [link]);

  // 모임원 전체 수락하기
  const { trigger: allAcceptTrigger } = useFetchTrigger<
    AcceptTeamMembersReqDto,
    null
  >(AcceptTeamMembersPutURL(), "PUT");

  const acceptAll = async () => {
    const acceptAllDto: AcceptTeamMembersReqDto = {
      // Todo: teamIdx 가져오기
      teamIdx: 1,
      memberIdx: member.memberIdx,
    };
    await allAcceptTrigger(acceptAllDto);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const acceptAllModalData = useModal(
    "모임 가입 신청을 전체 수락할까요?",
    () => {
      acceptAll();
      acceptedAllModalData.triggerModal();
    },
    true
  );

  const acceptedAllModalData = useModal("모임 가입 신청을 전체 수락했습니다.");

  // 모임원 거절하기
  const { trigger: rejectTrigger } = useFetchTrigger<
    AcceptTeamMemberReqDto,
    null
  >(RejectTeamMemberPutURL(), "PUT");

  const reject = async (teamMemberIdx: number | undefined) => {
    if (!teamMemberIdx) return;
    const rejectReqDto: AcceptTeamMemberReqDto = {
      // Todo: teamIdx 가져오기
      teamIdx: 1,
      teamMemberIdx: teamMemberIdx,
      memberIdx: member.memberIdx,
    };
    await rejectTrigger(rejectReqDto);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const rejectModalData = useModal(
    "모임 가입 신청을 거절할까요?",
    () => {
      reject(currentTeamMemberIdx);
      rejectedModalData.triggerModal();
    },
    true
  );

  const rejectedModalData = useModal("모임 가입 신청을 거절했습니다.");

  // 모임원 수락하기
  const { trigger: acceptTrigger } = useFetchTrigger<
    AcceptTeamMemberReqDto,
    null
  >(AcceptTeamMemberPutURL(), "PUT");

  const accept = async (teamMemberIdx: number | undefined) => {
    if (!teamMemberIdx) return;
    const acceptDto: AcceptTeamMemberReqDto = {
      // Todo: teamIdx 가져오기
      teamIdx: 1,
      teamMemberIdx: teamMemberIdx,
      memberIdx: member.memberIdx,
    };
    await acceptTrigger(acceptDto);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const acceptModalData = useModal(
    "모임 가입 신청을 수락할까요?",
    () => {
      accept(currentTeamMemberIdx);
      acceptedModalData.triggerModal();
    },
    true
  );

  const acceptedModalData = useModal("모임 가입 신청을 수락했습니다.");

  // 모임원 전체 내보내기
  const { trigger: exportAllTrigger } = useFetchTrigger<
    RejectTeamMembersReqDto,
    null
  >(ExportTeamMembersPutURL(), "PUT");

  const exportAll = async () => {
    const exportAllDto: RejectTeamMembersReqDto = {
      // Todo: teamIdx 가져오기
      teamIdx: 1,
      memberIdx: member.memberIdx,
    };
    await exportAllTrigger(exportAllDto);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const exportAllModalData = useModal(
    "모임원 전체를 내보낼까요?",
    () => {
      exportAll();
      exportedAllModalData.triggerModal();
    },
    true
  );

  const exportedAllModalData = useModal("모임원 전체를 내보냈습니다.");

  // 모임원 내보내기
  const { trigger: exportTrigger } = useFetchTrigger<
    AcceptTeamMemberReqDto,
    null
  >(ExportTeamMemberPutURL(), "PUT");

  const exportMember = async (teamMemberIdx: number | undefined) => {
    if (!teamMemberIdx) return;
    const exportDto: AcceptTeamMemberReqDto = {
      // Todo: teamIdx 가져오기
      teamIdx: 1,
      teamMemberIdx: teamMemberIdx,
      memberIdx: member.memberIdx,
    };
    await exportTrigger(exportDto);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const exportMemberModalData = useModal(
    "모임원을 내보낼까요?",
    () => {
      exportMember(currentTeamMemberIdx);
      exportedMemberModalData.triggerModal();
    },
    true
  );

  const exportedMemberModalData = useModal("모임원을 내보냈습니다.");

  // 모임나가기
  const { trigger: exportTeamTrigger } = useFetchTrigger<
    ExportTeamReqDto,
    null
  >(ExportTeamPutURL(), "PUT");

  const exportTeam = async () => {
    const exportTeamDto: ExportTeamReqDto = {
      // Todo: teamIdx 가져오기
      teamIdx: 1,
      memberIdx: member.memberIdx,
    };
    await exportTeamTrigger(exportTeamDto);
    setTimeout(() => {
      home();
    }, 1500);
  };

  const exportTeamModalData = useModal(
    "모임을 나가시겠습니까?",
    () => {
      exportTeam();
      exportedTeamModalData.triggerModal();
    },
    true
  );

  const exportedTeamModalData = useModal("모임을 나갔습니다.");

  useEffect(() => {
    if (!teamMemersData) return;
  }, [teamMemersData]);

  return (
    <>
      <VStack className="min-h-full bg-gray-50 pb-8">
        <NavigationBar title={"모임원 관리"} />
        <HStack className="justify-between items-center mx-6 py-4 border-b border-gray-200">
          <span>{teamMemersData?.length}명 참여 중</span>
          <Button
            className="!bg-gray-200 !text-black"
            onClick={openInvitationModal}
          >
            초대하기
          </Button>
        </HStack>
        <VStack className="min-w-full overflow-y-scroll px-6 gap-8">
          {/* 총무 */}
          <VStack className="w-full gap-4">
            <span className="text-sm"> 총무 </span>
            {teamMemersData?.map(
              (member) =>
                member.teamMemberState === "총무" && (
                  <HStack
                    key={member.teamMemberIdx}
                    className="items-center gap-4"
                  >
                    <Avatar crown />
                    <span>{member.memberName}</span>
                    <Spacer />
                    <span className="text-sm text-gray-500 underline">
                      총무변경
                    </span>
                  </HStack>
                )
            )}
          </VStack>
          {/* 대기 중 */}
          <VStack className="w-full gap-4">
            <HStack className="justify-between">
              <span className="text-sm"> 대기 중 </span>
              <button
                className="text-sm text-gray-500 underline"
                onClick={() => {
                  acceptAllModalData.triggerModal();
                }}
              >
                전체 수락하기
              </button>
            </HStack>
            {teamMemersData?.map(
              (member) =>
                member.teamMemberState === "수락대기" && (
                  <HStack
                    key={member.teamMemberIdx}
                    className="items-center gap-4"
                  >
                    <Avatar
                      backgroundColor="bg-cyan-200"
                      skinColor="white"
                      eye="smile"
                    />
                    <span>{member.memberName}</span>
                    <Spacer />

                    <button
                      className="text-sm text-gray-500 underline"
                      onClick={() => {
                        setCurrentTeamMemberIdx(member.teamMemberIdx);
                        rejectModalData.triggerModal();
                      }}
                    >
                      거절
                    </button>
                    <button
                      className="text-sm text-gray-500 underline"
                      onClick={() => {
                        setCurrentTeamMemberIdx(member.teamMemberIdx);
                        acceptModalData.triggerModal();
                      }}
                    >
                      수락
                    </button>
                  </HStack>
                )
            )}
          </VStack>
          {/* 모임원 */}
          <VStack className="w-full gap-4">
            <HStack className="justify-between">
              <span className="text-sm"> 모임원 </span>
              <button
                className="text-sm text-gray-500 underline"
                onClick={() => {
                  exportAllModalData.triggerModal();
                }}
              >
                전체 내보내기
              </button>
            </HStack>
            {teamMemersData?.map(
              (member) =>
                member.teamMemberState === "모임원" && (
                  <HStack
                    key={member.teamMemberIdx}
                    className="items-center gap-4"
                  >
                    <Avatar
                      crown
                      backgroundColor="bg-purple-400"
                      mouth="upset"
                      eye="upset"
                    />
                    <span>{member.memberName}</span>
                    <Spacer />
                    <button
                      className="text-sm text-gray-500 underline"
                      onClick={() => {
                        setCurrentTeamMemberIdx(member.teamMemberIdx);
                        exportMemberModalData.triggerModal();
                      }}
                    >
                      내보내기
                    </button>
                  </HStack>
                )
            )}
          </VStack>
        </VStack>
        <Spacer />
        <button
          className="border-y border-gray-200 py-4 mx-6"
          onClick={exportTeamModalData.triggerModal}
        >
          <HStack>
            <span> 모임나가기</span>
            <Spacer />
            <Arrow direction="right" />
          </HStack>
        </button>
      </VStack>
      <Loading show={isTeamMembersLoading} label="모임원을 불러오는 중 ..." />
      {/* 모임 가입 신청을 전체 수락할까요? */}
      {acceptAllModalData.modal}
      {/* 모임 가입 신청을 전체 수락했습니다. */}
      {acceptedAllModalData.modal}
      {/* 모임 가입 신청을 거절할까요? */}
      {rejectModalData.modal}
      {/* 모임 가입 신청을 거절했습니다. */}
      {rejectedModalData.modal}
      {/* 모임 가입 신청을 수락할까요? */}
      {acceptModalData.modal}
      {/* 모임 가입 신청을 수락했습니다. */}
      {acceptedModalData.modal}
      {/* 모임원 전체를 내보낼까요? */}
      {exportAllModalData.modal}
      {/* 모임원 전체를 내보냈습니다. */}
      {exportedAllModalData.modal}
      {/* 모임원을 내보낼까요? */}
      {exportMemberModalData.modal}
      {/* 모임원을 내보냈습니다. */}
      {exportedMemberModalData.modal}
      {/* 모임을 나가시겠습니까? */}
      {exportTeamModalData.modal}
      {/* 모임을 나갔습니다. */}
      {exportedTeamModalData.modal}
      {/* 초대링크 */}
      <Modal
        xButton
        backDrop
        show={showInvitationModal}
        onClose={closeInvitationModal}
      >
        <VStack className="w-full items-center">
          <span>초대하기</span>
          <HStack className="m-6 gap-4" onClick={generateInviteLink}>
            <img
              className="h-20"
              src={`/images/moim/invite.png`}
              alt="invite"
            />
          </HStack>
          <Button className="w-full" onClick={closeInvitationModal}>
            확인
          </Button>
        </VStack>
      </Modal>
    </>
  );
}

export default MoimMembersMainPage;
