import TrashCanInfo from "./trashcaninfo";

const status = ["added", "waiting", "removed"] as const;

const tempData = Array(10)
  .fill(0)
  .map((_, i) => ({
    title: `로데오 거리 쓰레기통 ${i + 1}`,
    lat: 1,
    lng: 1,
    status: status[0],
    imageList: ["/img/TEST.jpg", "/img/TEST.jpg", "/img/TEST.jpg"],
  }));

export default function FindTrashCan() {
  return (
    <div>
      <h2 className="font-extrabold text-xl">가장 가까운 쓰레기통 위치</h2>
      <TrashCanInfo
        title="로데오 거리 쓰레기통"
        lat={1}
        lng={1}
        status="added"
        imageList={["/img/TEST.jpg", "/img/TEST.jpg", "/img/TEST.jpg"]}
      />
      <div className="border w-full mt-8" />
      <div className="my-2">
        <h2 className="font-extrabold text-xl">주변 쓰레기통 위치</h2>
      </div>
      <div className="flex flex-col space-y-6">
        {tempData.map((data) => (
          <TrashCanInfo
            key={data.title}
            title={data.title}
            lat={data.lat}
            lng={data.lng}
            status={data.status}
            imageList={data.imageList}
          />
        ))}
      </div>
    </div>
  );
}
