import { UserLock, UploadCloud, BookOpenCheck } from "lucide-react";

const icons = {
  UserLock: <UserLock size={70} />,
  UploadCloud: <UploadCloud size={70} />,
  BookOpenCheck: <BookOpenCheck size={70} />,
};

export default function Card({ step }) {
  return (
    <div
      className={`w-[270px] h-[350px] relative ${step.cardbackgroundColor} flex flex-col justify-center items-center gap-10 px-4`}
    >
      <div
        className={`w-10 h-10 absolute top-8 left-8 ${step.color} flex justify-center items-center rounded-3xl text-white font-bold`}
      >
        <h1>{step.id}</h1>
      </div>

      {icons[step.icon]}
      <p className="text-xl font-medium text-black text-center">{step.title}</p>
      <p className="text-[14px] font-normal text-center">{step.description}</p>
    </div>
  );
}
