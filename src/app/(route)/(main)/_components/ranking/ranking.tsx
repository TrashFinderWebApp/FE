const rankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-light-green border-2 border-light-green";
    case 2:
      return "bg-[#D5D5C7] bg-opacity-20 border-2 border-[#C5C5BD]";
    case 3:
      return "bg-[#E9A56A] bg-opacity-10 border-2 border-[#E9A56A]";
    default:
      return "bg-white border-[#AAAAAA] border-2 border-opacity-50";
  }
};

function UserRanking({
  rank,
  name,
  score,
  icon,
}: {
  rank: number;
  name: string;
  score: number;
  icon?: string;
}) {
  return (
    <div
      className={`flex rounded-tr-lg shadow-md px-4 py-2 items-center ${rankColor(rank)}`}
    >
      {rank > 3 ? (
        <span className="text-dark-blue font-extrabold text-[1.25rem] w-8 text-center">
          {rank}
        </span>
      ) : (
        <img
          src={`svg/rank${rank}icon.svg`}
          alt="랭킹 아이콘"
          className="w-8"
        />
      )}
      <div
        className={`flex items-center justify-between w-full px-4 ${
          rank === 1 ? "text-white" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src={icon ?? "img/TEST.jpg"} alt="사용자 아이콘" />
          </div>
          <div className={`text-lg${rank < 4 ? " font-bold" : ""}`}>{name}</div>
        </div>
        <div className="text-sm">{score}pt</div>
      </div>
    </div>
  );
}

export default function Ranking() {
  return (
    <div className="flex flex-col">
      <h2 className="text-[1.25rem] font-extrabold">랭킹</h2>
      <p className="text-dark-blue text-sm">
        * 해당 랭킹은 사용자들이 쓰레기통 위치를 성공적으로 등록함에 따라 얻은
        점수를 기반으로 한 순위입니다.
      </p>
      <div className="relative flex justify-end items-center gap-2 right-5 w-[calc(100%+3rem-4px)] py-2 px-4 border-y-2 bg-[#F5F5F5]">
        <div className="text-sm text-[#666666]">오후 00시 00분 기준</div>
        <button type="button">reload</button>
      </div>
      <div className="flex flex-col gap-4 my-8">
        {Array.from({ length: 10 }, (_, i) => (
          <UserRanking
            key={i}
            rank={i + 1}
            name={`사용자${i + 1}`}
            score={1000 - i * 100}
          />
        ))}
      </div>
    </div>
  );
}
