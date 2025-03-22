export default function ProfilePage({params}:any) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-2 p-6  shadow-lg text-center">
        <p className="text-3xl">Profile</p>
        <p className="text-3xl">
          Profile Page: <span className="bg-orange-700 ml-0.1 p-2 rounded-md">{params.id}</span>
        </p>
      </div>
    </div>
  );
}
