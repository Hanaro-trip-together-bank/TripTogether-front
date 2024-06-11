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
  ChangeOwnerReqDto,
  RejectTeamMembersReqDto,
  TeamMembersReqDto,
} from "../../../types/teamMember/TeamMemberRequestDto";
import { TeamMembersResDto } from "../../../types/teamMember/TeamMemberResponseDto";
import {
  AcceptTeamMemberPutURL,
  AcceptTeamMembersPutURL,
  ChangeOwnerPutURL,
  ExportTeamMemberPutURL,
  ExportTeamMembersPutURL,
  GenerateInviteLinkPostURL,
  RejectTeamMemberPutURL,
  TeamMembersPostURL,
} from "../../../utils/urlFactory";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import Loading from "../../../components/common/Modals/Loading";
import { useAuth } from "../../../contexts/useAuth";
import { useModal } from "../../../hooks/useModal";
import Modal from "../../../components/common/Modals/Modal";
import { colorPacks } from "../../../utils/colorPack.ts";
import useToggle from "../../../hooks/useToggle.ts";
import Check2 from "../../../components/common/Check2.tsx";

interface MoimMembersMainPageProps {
  teamIdx: number;
  teamMemberStatus: string;
  teamMemberIdx: number;
}

function MoimMembersMainPage({
  teamIdx,
  teamMemberStatus,
  teamMemberIdx,
}: MoimMembersMainPageProps) {
  const { home, back } = useNavigation();
  const { member } = useAuth();
  const [showMemberList, toggleShowMemberList] = useToggle(false);
  const requestData: TeamMembersReqDto = { teamIdx: teamIdx };
  const [currentTeamMemberIdx, setCurrentTeamMemberIdx] = useState<number>();

  // 모임원 전체 정보 가져오기
  const {
    data: teamMemersData,
    isLoading: isTeamMembersLoading,
    refetch,
  } = useFetch<TeamMembersReqDto, TeamMembersResDto[]>(
    TeamMembersPostURL(),
    "POST",
    requestData
  );

  // 초대하기
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const openInvitationModal = () => {
    setShowInvitationModal(true);
  };
  const closeInvitationModal = () => {
    setShowInvitationModal(false);
  };
  const changedOwnerModalData = useModal(
    "총무를 변경했습니다.",
    () => {
      back();
      back();
    },
    false
  );
  const inviteLinkCopiedModalData = useModal("초대 링크가 복사되었습니다.");

  // 초대링크 복사
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      closeInvitationModal();
      inviteLinkCopiedModalData.triggerModal();
    } catch (error) {
      console.error(error);
    }
  };

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchGenerateLink = () => {
    fetch(GenerateInviteLinkPostURL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberIdx: member.memberIdx,
        teamIdx: teamIdx,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("오류 발생");
        }
      })
      .then((data) => {
        // http://localhost:8080을 BASE_URL로 치환
        const updatedData = data.replace("http://localhost:8080", BASE_URL);
        copyToClipboard(updatedData);
      })
      .catch((error) => {
        console.error("오류 발생: ", error);
      });
  };

  // 모임원 전체 수락하기
  const { trigger: allAcceptTrigger, isLoading: allAcceptIsLoading } =
    useFetchTrigger<AcceptTeamMembersReqDto, null>(
      AcceptTeamMembersPutURL(),
      "PUT"
    );

  const acceptAll = () => {
    const acceptAllDto: AcceptTeamMembersReqDto = {
      teamIdx: teamIdx,
      memberIdx: member.memberIdx,
    };
    allAcceptTrigger(acceptAllDto);
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
  const { trigger: rejectTrigger, isLoading: rejectIsLoading } =
    useFetchTrigger<AcceptTeamMemberReqDto, null>(
      RejectTeamMemberPutURL(),
      "PUT"
    );

  const reject = (teamMemberIdx: number | undefined) => {
    if (!teamMemberIdx) return;
    const rejectReqDto: AcceptTeamMemberReqDto = {
      teamIdx: teamIdx,
      teamMemberIdx: teamMemberIdx,
      memberIdx: member.memberIdx,
    };
    rejectTrigger(rejectReqDto);
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
  const { trigger: acceptTrigger, isLoading: acceptIsLoading } =
    useFetchTrigger<AcceptTeamMemberReqDto, null>(
      AcceptTeamMemberPutURL(),
      "PUT"
    );

  const accept = (teamMemberIdx: number | undefined) => {
    if (!teamMemberIdx) return;
    const acceptDto: AcceptTeamMemberReqDto = {
      teamIdx: teamIdx,
      teamMemberIdx: teamMemberIdx,
      memberIdx: member.memberIdx,
    };
    acceptTrigger(acceptDto);
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
  const { trigger: exportAllTrigger, isLoading: exportAllIsLoading } =
    useFetchTrigger<RejectTeamMembersReqDto, null>(
      ExportTeamMembersPutURL(),
      "PUT"
    );

  const exportAll = () => {
    const exportAllDto: RejectTeamMembersReqDto = {
      teamIdx: teamIdx,
      memberIdx: member.memberIdx,
    };
    exportAllTrigger(exportAllDto);
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
  const { trigger: exportTrigger, isLoading: exportIsLoading } =
    useFetchTrigger<AcceptTeamMemberReqDto, null>(
      ExportTeamMemberPutURL(),
      "PUT"
    );

  const exportMember = (teamMemberIdx: number | undefined) => {
    if (!teamMemberIdx) return;
    const exportDto: AcceptTeamMemberReqDto = {
      teamIdx: teamIdx,
      teamMemberIdx: teamMemberIdx,
      memberIdx: member.memberIdx,
    };
    exportTrigger(exportDto);
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

  const exportedTeamModalData = useModal("모임을 나갔습니다.", home, false);

  const exportTeamModalData = useModal(
    "모임을 나가시겠습니까?",
    () => {
      exportMember(currentTeamMemberIdx);
      exportedTeamModalData.triggerModal();
    },
    true
  );

  // 총무 변경
  // const [selectedMembers, setSelectedMembers] = useState<TeamMembersResDto[]>(
  //   []
  // );
  const [currentOwnerTeamMemberIdx, setCurrentOwnerTeamMemberIdx] =
    useState<number>();

  // 총무 변경 기능
  const { trigger: changeOwnerTrigger, isLoading: changeOwnerIsLoading } =
    useFetchTrigger<ChangeOwnerReqDto, null>(ChangeOwnerPutURL(), "PUT");

  const changeOwner = (newOwnerIdx: number | undefined) => {
    if (!newOwnerIdx || !currentOwnerTeamMemberIdx) return;

    const changeOwnerDto: ChangeOwnerReqDto = {
      teamIdx: teamIdx,
      curOwnerIdx: currentOwnerTeamMemberIdx,
      newOwnerIdx: newOwnerIdx,
    };

    changeOwnerTrigger(changeOwnerDto);
    changedOwnerModalData.triggerModal();
  };

  useEffect(() => {
    console.log("teamIdx: " + teamIdx);
    if (!teamMemersData) return;
  }, [teamMemersData]);

  // 새로고침
  useEffect(() => {
    if (
      !allAcceptIsLoading &&
      !rejectIsLoading &&
      !acceptIsLoading &&
      !exportAllIsLoading &&
      !exportIsLoading &&
      !changeOwnerIsLoading
    ) {
      refetch();
    }
  }, [
    allAcceptIsLoading,
    rejectIsLoading,
    acceptIsLoading,
    exportAllIsLoading,
    exportIsLoading,
    changeOwnerIsLoading,
  ]);

  return (
    <>
      <VStack className="min-h-full pb-8 bg-gray-50">
        <NavigationBar title={"모임원 관리"} />
        <HStack className="items-center justify-between py-4 mx-6 border-b border-gray-200">
          <span>{teamMemersData?.length}명 참여 중</span>
          {teamMemberStatus === "총무" ? (
            <Button
              className="!bg-gray-200 !text-black"
              onClick={openInvitationModal}
            >
              초대하기
            </Button>
          ) : null}
        </HStack>
        <VStack className="min-w-full gap-8 px-6 overflow-y-auto">
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
                    <Avatar
                      crown={true}
                      backgroundColor={
                        colorPacks[member.memberIdx % colorPacks.length]
                          .backgroundColor
                      }
                      seed={member.memberIdx}
                      eye="smile"
                    />
                    <span>{member.memberName}</span>
                    <Spacer />
                    {teamMemberStatus === "총무" ? (
                      <button
                        className="text-sm text-gray-500 underline"
                        onClick={() => {
                          toggleShowMemberList();
                          setCurrentOwnerTeamMemberIdx(member.teamMemberIdx);
                          setCurrentTeamMemberIdx(undefined);
                        }}
                      >
                        총무변경
                      </button>
                    ) : null}
                  </HStack>
                )
            )}
          </VStack>
          {/* 대기 중 */}
          <VStack className="w-full gap-4">
            <HStack className="justify-between">
              <span className="text-sm"> 대기 중 </span>
              {teamMemberStatus === "총무" ? (
                <button
                  className="text-sm text-gray-500 underline"
                  onClick={() => {
                    acceptAllModalData.triggerModal();
                  }}
                >
                  전체 수락하기
                </button>
              ) : null}
            </HStack>
            {teamMemersData?.map(
              (member) =>
                member.teamMemberState === "수락대기" && (
                  <HStack
                    key={member.teamMemberIdx}
                    className="items-center gap-4"
                  >
                    <Avatar
                      backgroundColor={
                        colorPacks[member.memberIdx % colorPacks.length]
                          .backgroundColor
                      }
                      seed={member.memberIdx}
                      skinColor="white"
                      eye="smile"
                      random
                    />
                    <span>{member.memberName}</span>
                    <Spacer />
                    {teamMemberStatus === "총무" ? (
                      <button
                        className="text-sm text-gray-500 underline"
                        onClick={() => {
                          setCurrentTeamMemberIdx(member.teamMemberIdx);
                          rejectModalData.triggerModal();
                        }}
                      >
                        거절
                      </button>
                    ) : null}
                    {teamMemberStatus === "총무" ? (
                      <button
                        className="text-sm text-gray-500 underline"
                        onClick={() => {
                          setCurrentTeamMemberIdx(member.teamMemberIdx);
                          acceptModalData.triggerModal();
                        }}
                      >
                        수락
                      </button>
                    ) : null}
                  </HStack>
                )
            )}
          </VStack>
          {/* 모임원 */}
          <VStack className="w-full gap-4">
            <HStack className="justify-between">
              <span className="text-sm"> 모임원 </span>
              {teamMemberStatus === "총무" ? (
                <button
                  className="text-sm text-gray-500 underline"
                  onClick={() => {
                    exportAllModalData.triggerModal();
                  }}
                >
                  전체 내보내기
                </button>
              ) : null}
            </HStack>
            {teamMemersData?.map(
              (member) =>
                member.teamMemberState === "모임원" && (
                  <HStack
                    key={member.teamMemberIdx}
                    className="items-center gap-4"
                  >
                    <Avatar
                      backgroundColor={
                        colorPacks[member.memberIdx % colorPacks.length]
                          .backgroundColor
                      }
                      seed={member.memberIdx}
                      skinColor="white"
                      mouth="upset"
                      eye="upset"
                      random
                    />
                    <span>{member.memberName}</span>
                    <Spacer />
                    {teamMemberStatus === "총무" ? (
                      <button
                        className="text-sm text-gray-500 underline"
                        onClick={() => {
                          setCurrentTeamMemberIdx(member.teamMemberIdx);
                          exportMemberModalData.triggerModal();
                        }}
                      >
                        내보내기
                      </button>
                    ) : null}
                  </HStack>
                )
            )}
          </VStack>
        </VStack>
        <Spacer />
        <button
          className="py-4 mx-6 border-gray-200 border-y"
          onClick={() => {
            setCurrentTeamMemberIdx(teamMemberIdx);
            exportTeamModalData.triggerModal();
          }}
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
      {/* 총무를 변경했습니다. */}
      {changedOwnerModalData.modal}
      {/* 초대링크가 복사되었습ㄴ디ㅏ. */}
      {inviteLinkCopiedModalData.modal}
      {/* 초대링크 */}
      <Modal
        xButton
        backDrop
        show={showInvitationModal}
        onClose={closeInvitationModal}
      >
        <VStack className="items-center w-full">
          <span>초대하기</span>
          <HStack className="gap-4 m-6" onClick={fetchGenerateLink}>
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
      {/* 총무변경 */}
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
          <VStack className="overflow-scroll max-h-72">
            {teamMemersData
              ?.filter((member) => member.teamMemberState === "모임원")
              .map((member) => (
                <HStack key={member.teamMemberIdx} className="gap-2 my-2">
                  <Check2
                    checked={member.teamMemberIdx == currentTeamMemberIdx}
                    onClick={() => {
                      setCurrentTeamMemberIdx(member.teamMemberIdx);
                    }}
                  />
                  <span>{member.memberName}</span>
                </HStack>
              ))}
          </VStack>
          <Button
            className="w-full"
            disabled={currentTeamMemberIdx == undefined}
            onClick={() => {
              changeOwner(currentTeamMemberIdx);
              toggleShowMemberList();
            }}
          >
            확인
          </Button>
        </VStack>
      </Modal>
    </>
  );
}

export default MoimMembersMainPage;
