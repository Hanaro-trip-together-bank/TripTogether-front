import { useState } from "react";
import Arrow from "../../../components/common/Arrow";
import Button from "../../../components/common/Button";
import Option from "../../../components/common/Option";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../../contexts/useNavigation";
import Modal from "../../../components/common/Modals/Modal";
import { useAuth } from "../../../contexts/useAuth";
import { useFetch } from "../../../hooks/useFetch";
import {
  AccountListPostURL,
  AddTeamPostURL,
  GenerateInviteLinkPostURL,
} from "../../../utils/urlFactory";
import { AccountsReqDto } from "../../../types/account/AccountRequestDto";
import { AccountsResDto } from "../../../types/account/AccountResponseDto";
import formatAccNo from "../../../utils/formatAccNo";
import { AddTeamReqDto } from "../../../types/team/TeamRequestDto";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import { useModal } from "../../../hooks/useModal";
import { AddTeamResDto } from "../../../types/team/TeamResponseDto";

interface MoimServiceSignUpPageProps {
  onDone: () => void;
}
function MoimServiceSignUpPage({ onDone }: MoimServiceSignUpPageProps) {
  const { back } = useNavigation();
  const [page, setPage] = useState(0);
  // 생성 요청용 정보: 사용자, 계좌번호, 팀명, 팀타입(여행 고정), 선호지역
  const { member } = useAuth();
  const [selectedAccountIdx, setSelectedAccountIdx] = useState("-1");
  const [selectedPreferenceType, setSelectedPreferenceType] = useState("국내");
  const [teamName, setTeamName] = useState("");

  const accountsRequestDto: AccountsReqDto = { memberIdx: member.memberIdx };
  const accountListData = useFetch<AccountsReqDto, AccountsResDto[]>(
    AccountListPostURL(),
    "POST",
    accountsRequestDto
  );

  const addTeamRequestDto: AddTeamReqDto = {
    memberIdx: member.memberIdx,
    accIdx: +selectedAccountIdx,
    teamType: "여행",
    teamName: teamName,
    preferenceType: selectedPreferenceType,
  };

  const { trigger: addTeamTrigger, data: addTeamIdxData } = useFetchTrigger<
    AddTeamReqDto,
    AddTeamResDto
  >(AddTeamPostURL(), "POST");

  const addTeam = () => {
    addTeamTrigger(addTeamRequestDto);
    setPage(2);
  };

  const signUpDone = () => {
    onDone();
    back();
  };

  // 초대하기
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const openInvitationModal = () => {
    setShowInvitationModal(true);
  };
  const closeInvitationModal = () => {
    setShowInvitationModal(false);
  };

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

  const fetchGenerateLink = () => {
    fetch(GenerateInviteLinkPostURL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberIdx: member.memberIdx,
        teamIdx: addTeamIdxData?.teamIdx,
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
        const updatedData = data.replace(
          "http://localhost:8080",
          "https://trip-together-kro.kr"
        );
        copyToClipboard(updatedData);
      })
      .catch((error) => {
        console.error("오류 발생: ", error);
      });
  };

  // 1: 계좌 선택 페이지
  if (page == 0)
    return (
      <VStack className="items-center w-full h-full">
        <NavigationBar title={"서비스가입"} />
        <VStack className="items-center w-full h-full gap-6 p-6">
          <span className="w-full text-2xl font-bold">
            어떤 계좌로 시작할까요?
          </span>
          <select
            className="w-full border-b border-black rounded-none custom-select"
            value={selectedAccountIdx}
            onChange={(e) => setSelectedAccountIdx(e.target.value)}
          >
            <option value={"-1"}>계좌 선택</option>
            {accountListData.data &&
              accountListData.data.map((account) => (
                <option key={account.accIdx} value={account.accIdx}>
                  {`${account.accName} - ${formatAccNo(account.accNumber)}`}
                </option>
              ))}
          </select>
          <BigDownArrow />
          <Button className="w-full !bg-white border border-primary border-dashed text-primary py-4 !rounded-2xl font-bold">
            모임 통장
          </Button>
          <Button className="w-full !bg-gray-50 !text-black py-4 !rounded-2xl font-bold">
            <HStack className="items-center justify-between w-full">
              <span>새로운 계좌 만들기</span>
              <Arrow direction="right" />
            </HStack>
          </Button>
          <Spacer />
          <Button
            className="!rounded-full !px-4"
            onClick={() => setPage(1)}
            disabled={+selectedAccountIdx < 0}
          >
            계속
          </Button>
        </VStack>
      </VStack>
    );

  // 2: 모임 정보 입력 페이지
  if (page == 1)
    return (
      <VStack className="items-center w-full h-full">
        <NavigationBar title={"서비스가입"} />
        <VStack className="items-center w-full h-full gap-6 p-6">
          {/* 모임 타입 선택 */}
          <span className="w-full text-2xl font-bold">어떤 모임인가요?</span>
          <img className="h-40" src={`/images/moim/plane.png`} alt="plane" />
          <span>여행</span>
          <HStack className="w-full">
            <Option>모임</Option>
            <Option>가족</Option>
            <Option>결혼</Option>
            <Option selected>여행</Option>
            <Option>쇼핑</Option>
            <Option>저축</Option>
          </HStack>
          {/* 모임 이름 입력 */}
          <input
            type="text"
            className="w-full pb-1 border-b border-black"
            placeholder="모임 이름을 입력해 주세요"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          {/* 선호 여행 지역 선택 */}
          <span className="w-full">선호 여행 지역</span>
          <HStack className="w-full">
            {["국내", "해외", "모두"].map((type) => (
              <Option
                key={type}
                onClick={() => setSelectedPreferenceType(type)}
                selected={selectedPreferenceType === type}
              >
                {type}
              </Option>
            ))}
          </HStack>
          <Spacer />
          <Button
            className="w-full"
            onClick={addTeam}
            disabled={teamName == ""}
          >
            다음
          </Button>
        </VStack>
      </VStack>
    );

  if (page == 2)
    return (
      <>
        <VStack className="items-center w-full h-full">
          <NavigationBar title={"가입완료"} onBack={signUpDone} />
          <VStack className="items-center w-full h-full gap-6 p-6 pt-12">
            {/* 동그라미 속 체크 */}
            <div className="p-2 border-2 border-black rounded-full text-primary">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline
                  points="20 6 9 17 4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <span className="w-full text-2xl text-center text-gray-500">
              <span className="font-bold text-black">{teamName}</span>
              을 <br />
              만들었어요
            </span>
            <Button className="w-full !bg-gray-50 !text-black py-4 !rounded-2xl font-bold">
              <HStack className="items-center justify-between w-full">
                <span>모임통장 카드 만들기</span>
                <Arrow direction="right" />
              </HStack>
            </Button>
            <Spacer />
            <VStack className="absolute bottom-16 right-4 !gap-0 items-center">
              <div className="p-2 text-white bg-secondary rounded-xl">
                모임원을 초대해보세요! 😊
              </div>
              <div className="border-8 w-0 h-0 border-secondary !border-x-transparent !border-b-transparent" />
            </VStack>
            <HStack className="w-full gap-2">
              <Button className="!w-1/2" onClick={signUpDone}>
                확인
              </Button>
              <Button className="!w-1/2" onClick={openInvitationModal}>
                초대하기
              </Button>
            </HStack>
          </VStack>
        </VStack>
        {/* 초대링크가 복사되었습니다. */}
        {inviteLinkCopiedModalData.modal}
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
      </>
    );
}
export default MoimServiceSignUpPage;

function BigDownArrow() {
  return (
    <svg
      width="100"
      height="50"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <polyline
        points="2.5,2.5 12.5,10 22.5,2.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
