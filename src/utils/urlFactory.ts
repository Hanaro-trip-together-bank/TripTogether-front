const BASE_URL = import.meta.env.VITE_API_URL;

//--------------- 메인 ---------------//

// POST - 간편 로그인: LoginReqDto -> LoginResDto
export const LoginURL = () => `${BASE_URL}/login`;

//--------------- 여행 ---------------//

// POST - 여행 생성: TripReqDto -> 201 Created
export const TripsPostURL = () => `${BASE_URL}/trips`;

// GET - 여행 상세 정보 읽기: () -> TripResDto
export const TripsGetURL = (tripIdx: number) => `${BASE_URL}/trips/${tripIdx}`;

// DELETE - 여행 삭제
export const TipsDeleteURL = (id: number) => `${BASE_URL}/trips/${id}`;

// PUT - 여행 수정
export const TripsPutURL = (id: number) => `${BASE_URL}/trips/${id}`;

// GET - 모임 여행 목록 읽기
export const TripsLISTGetURL = (teamIdx: number) =>
  `${BASE_URL}/trips/teams/${teamIdx}`;

//GET - 대륙 목록 읽기
export const ContinentsGetUrlURL = () => `${BASE_URL}/continents`;

//GET - 국가 목록 읽기
export const CountriesGetURL = () => `${BASE_URL}/countries`;

//GET - 대륙별 국가 목록 읽기
export const CountriesGetByContinentURL = (continentIdx: number) =>
  `${BASE_URL}/countries/continents/${continentIdx}`;

//GET - 도시 목록 읽기
export const CitiesGetURL = () => `${BASE_URL}/cities`;

//GET - 국가별 도시 목록 읽기
export const CitiesGetByCountriesURL = (id: number) =>
  `${BASE_URL}/cities/countries/${id}`;

//GET - 카테고리별 장소(명소) 목록 읽기
export const PlacesGetByCategoriesURL = (categoryIdx: number) =>
  `${BASE_URL}/places/categories/${categoryIdx}`;

//GET - 카테고리별 도시별 장소(명소) 목록 읽기
export const PlacesGetByCategoriesAndCitiesURL = (
  categoryIdx: number,
  cityIdx: number
) => `${BASE_URL}/places?category_id=${categoryIdx}&city_id=${cityIdx}`;

// GET - 모임 여행 목록 읽기: () -> TripResDto[]
export const TeamTripsGetURL = (teamIdx: number) =>
  `${BASE_URL}/trips/teams/${teamIdx}`;

//--------------- 여행일정 ---------------//
// GET - 여행 일정 목록 읽기: () -> TripPlaceResDTO[]
export const TripPlacesGetURL = (tripIdx: number) =>
  `${BASE_URL}/trips/place/${tripIdx}`;

// PUT - 여행 일정 수정: TripPlaceUpdateReqDTO -> 200 OK
export const TripPlaceUpdatePutURL = (tripPlaceIdx: number) =>
  `${BASE_URL}/trips/place/info/${tripPlaceIdx}`;

// PUT - 여행 일정 순서 수정, 추가: TripPlaceUpdateOrderReqDTO -> 200 OK
export const TripPlaceOrderUpdatePutURL = (tripIdx: number) =>
  `${BASE_URL}/trips/place/${tripIdx}`;

//--------------- 댓글 ---------------//
// GET - 댓글 목록 조회: () -> TripReplyResDto[]
export const TripReplyGetURL = (tripPlaceIdx: number) =>
  `${BASE_URL}/trips/place/${tripPlaceIdx}/reply`;
// POST - 댓글 추가: TripReplyReqDto -> 200 ok
export const TripReplyPostURL = (tripPlaceIdx: number) =>
  `${BASE_URL}/trips/place/${tripPlaceIdx}/reply`;
// PUT - 댓글 수정: TripReplyUpdateReqDto -> 200 ok
export const TripReplyPutURL = (tripPlaceIdx: number) =>
  `${BASE_URL}/trips/place/${tripPlaceIdx}/reply`;
// DELETE - 댓글 삭제: TripReplyDeleteReqDto -> 200 ok
export const TripReplyDeleteURL = (tripPlaceIdx: number) =>
  `${BASE_URL}/trips/place/${tripPlaceIdx}/reply`;

//--------------- 장소/명소 ---------------//
// GET - 카테고리 목록 조회: () -> CategoryResDto[]
export const CategoriesGetURL = () => `${BASE_URL}/categories`;

// GET - 명소 목록 조회: () -> PlaceResDto[]
export const PlacesGetURL = (cityIdx: number = -1, categoryIdx: number = -1) =>
  `${BASE_URL}/places?${categoryIdx >= 0 ? `category_id=${categoryIdx}` : ""}${cityIdx >= 0 ? `&city_id=${cityIdx}` : ""}`;

//--------------- 회비 ---------------//

export const DuesGetRuleURL = (teamIdx: number) =>
  `${BASE_URL}/dues/rule/${teamIdx}`;

// /dues?paid=false&date=2024-05&accIdx=1&teamIdx=1
export const DuesGetStatusUrl = (
  year: number,
  month: number,
  status: boolean,
  accIdx: number,
  teamIdx: number
) =>
  `${BASE_URL}/dues?paid=${status}&date=${year}-${month.toString().padStart(2, "0")}&accIdx=${accIdx}&teamIdx=${teamIdx}`;

export const DuesSetRuleURL = () => `${BASE_URL}/dues/rule`;

export const DuesDeleteRuleURL = (teamIdx: number) =>
  `${BASE_URL}/dues/rule/${teamIdx}`;

export const DuesGetTotalAmtURL = (accIdx: number, memberIdx: number) =>
  `${BASE_URL}/dues/details/${accIdx}/total-amount?memberIdx=${memberIdx}`;

export const DuesGetMemDepositHisURL = (
  accIdx: number,
  memberIdx: number,
  year: number
) =>
  `${BASE_URL}/dues/details/${accIdx}?memberIdx=${memberIdx}&duesYear=${year}`;

//--------------- 모임원 ---------------//

// POST - 모임원 전체 출력: TeamMembersReqDto -> TeamMembersResDto
export const TeamMembersPostURL = () => `${BASE_URL}/team`;

// POST - 모임 초대하기 (초대링크 생성): InviteTeamReqDto -> String
export const GenerateInviteLinkPostURL = () => `${BASE_URL}/team/invite-team`;

// PUT - 총무 변경: ChangeOwnerReqDto -> 200 OK
export const ChangeOwnerPutURL = () => `${BASE_URL}/team/change-owner`;

// PUT - 모임원 전체 수락 (수락대기-> 모임원으로 상태 변경): AcceptTeamMembersReqDto -> 200 OK
export const AcceptTeamMembersPutURL = () => `${BASE_URL}/team/accept-all`;

// PUT - 모임원 거절 (수락대기-> 모임원 삭제): AcceptTeamMemberReqDto -> 200 OK
export const RejectTeamMemberPutURL = () => `${BASE_URL}/team/reject-one`;

// PUT - 모임원 수락 (수락대기-> 모임원으로 상태 변경): AcceptTeamMemberReqDto -> 200 OK
export const AcceptTeamMemberPutURL = () => `${BASE_URL}/team/accept-one`;

// PUT - 모임원 전체 내보내기 (모임원-> 모임원 삭제): RejectTeamMembersReqDto -> 200 OK
export const ExportTeamMembersPutURL = () => `${BASE_URL}/team/export-members`;

// PUT - 모임원 내보내기 (모임원-> 모임원 삭제): AcceptTeamMemberReqDto -> 200 OK
export const ExportTeamMemberPutURL = () => `${BASE_URL}/team/export-member`;

// PUT - 모임서비스 나가기 (전체 내보내기 후 모임 삭제): ExportTeamReqDto -> 200 OK
export const ExportTeamPutURL = () => `${BASE_URL}/team/export-team`;

//POST - 회비 요청
export const DuesRequestPostURL = () => `${BASE_URL}/dues/request`;

// PUT - 선호 여행 등록/수정/삭제
export const PreferencePutURL = () => `/team/preference`;

//------------------- 내 모임 --------------------------

// POST - 내 모임 서비스 조회
export const MyMoimGetURL = () => `${BASE_URL}/account`;

// POST - 모임서비스 상세 조회: DetailTeamReqDto -> DetailTeamResDto
export const MoimDetailPostURL = () => `${BASE_URL}/account/detail`;

//--------------- 모임서비스 가입 ---------------//

// POST - 전체 계좌 조회 (계좌 선택 기능): AccountsReqDto -> AccountsResDto
export const AccountListPostURL = () => `${BASE_URL}/accounts`;

// POST - 모임서비스 가입: AddTeamReqDto -> 200 OK
export const AddTeamPostURL = () => `${BASE_URL}/account/add`;

//--------------- 모임관리 ---------------//

// POST - 모임관리 페이지: ManageTeamReqDto -> ManageTeamResDto
export const ManageTeamPostURL = () => `${BASE_URL}/account/set`;
// PUT - 알림설정 (on/off): ToggleAlarmReqDto -> 200 ok
export const ToggleAlarmPutURL = () => `${BASE_URL}/account/alarm`;

// PUT - 공지 등록, 수정
export const NoticePutURL = () => `${BASE_URL}/account/notice`;

// PUT - 선호 여행 등록, 수정
export const PreferTripPutURL = () => `${BASE_URL}/team/preference`;
