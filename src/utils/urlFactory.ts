const BASE_URL = import.meta.env.VITE_API_URL;

//--------------- 메인 ---------------//

// POST - 간편 로그인: LoginReqDto -> LoginResDto
export const LoginURL = () => `${BASE_URL}/login`;

//--------------- 여행 ---------------//

// POST - 여행 생성: TripReqDto -> 201 Created
export const TripsPostURL = () => `${BASE_URL}/trips`;

// GET - 여행 상세 정보 읽기: () -> TripResDto
export const TripsGetURL = (tripIdx: number) => `${BASE_URL}/trips/${tripIdx}`;

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
